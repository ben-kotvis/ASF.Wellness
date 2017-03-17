using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.ServiceFabric.Actors;
using Microsoft.ServiceFabric.Actors.Runtime;
using Microsoft.ServiceFabric.Actors.Client;
using ASF.Wellness.Participant.Domain;
using ASF.Wellness.Participant.Domain.Validation;
using System.Fabric;
using Microsoft.ServiceFabric.Services.Remoting.Client;
using ASF.Wellness.Domain;
using ASF.Wellness.Domain.Repositories;
using Microsoft.ServiceFabric.Data;

namespace ASF.Wellness.Participant
{
    /// <remarks>
    /// This class represents an actor.
    /// Every ActorID maps to an instance of this class.
    /// The StatePersistence attribute determines persistence and replication of actor state:
    ///  - Persisted: State is written to disk and replicated.
    ///  - Volatile: State is kept in memory only and replicated.
    ///  - None: State is kept in memory only and not replicated.
    /// </remarks>
    [StatePersistence(StatePersistence.Persisted)]
    public class ParticipantActor : ActorBase, IParticipant
    {
        private const string ActorStateKeyName = "ActorState";
        private const string ApprovalsKeyName = "Approvals";
        private const string SubscriberKeyName = "Subscriber";
        
        /// <summary>
        /// Initializes a new instance of Participant
        /// </summary>
        /// <param name="actorService">The Microsoft.ServiceFabric.Actors.Runtime.ActorService that will host this actor instance.</param>
        /// <param name="actorId">The Microsoft.ServiceFabric.Actors.ActorId for this actor instance.</param>
        public ParticipantActor(ActorService actorService, ActorId actorId, IActorProxyFactory actorProxyFactory, IServiceProxyFactory serviceProxyFactory, IRepositoryFactories factories)
            : base(actorService, actorId, actorProxyFactory, serviceProxyFactory, factories)
        {
        }

        /// <summary>
        /// This method is called whenever an actor is activated.
        /// An actor is activated the first time any of its methods are invoked.
        /// </summary>
        protected override async Task OnActivateAsync()
        {
            ActorEventSource.Current.ActorMessage(this, "Actor activated.");

            ConditionalValue<Participations> state = await this.StateManager.TryGetStateAsync<Participations>(ActorStateKeyName);

            if (!state.HasValue)
            {
                var participations = new Participations()
                {
                    Records = new List<ParticipationMonthYear>()
                {
                    CreateMonthYear(DateTimeOffset.UtcNow.Month, DateTimeOffset.UtcNow.Year)
                }
                };

                await this.StateManager.TryAddStateAsync(ActorStateKeyName, participations);
            }

        }
        
        private ParticipationMonthYear CreateMonthYear(int month, int year)
        {
            return new ParticipationMonthYear()
            {
                Activities = new List<ParticipantActivity>(),
                Events = new List<ParticipantEvent>(),
                Approvals = new List<Approval>(),
                Month = month,
                Year = year,
            };
        }

        public async Task SubmitForApproval(int month, int year)
        {
            var participations = await this.StateManager.GetStateAsync<Participations>(ActorStateKeyName);

            var records = participations.Records.FirstOrDefault(i => i.Month == month && i.Year == year);            

            var submission = new ApprovalSubmission()
            {
                Activities = records.Activities.Where(i => !i.Approved).Select(i => i.Id).ToList(),
                Events = records.Events.Where(i => !i.Approved).Select(i => i.Id).ToList(),
                ParticipantActorId = this.Id
            };
            
            var approval = _actorProxyFactory.CreateActorProxy<IApproval>(ServiceFabricHelpers.ApprovalServiceUri, ServiceFabricHelpers.CreateActorId());
            
            await approval.Submit(submission);
        }

        public async Task AddActivity(ParticipantActivity participantActivity)
        {
            
            var participations = await this.StateManager.GetStateAsync<Participations>(ActorStateKeyName);
            var records = participations.Records.FirstOrDefault(i => i.Month == participantActivity.Date.Month && i.Year == participantActivity.Date.Year);
            
            if (records == null)
            {
                records = CreateMonthYear(participantActivity.Date.Month, participantActivity.Date.Year);
                participations.Records.Add(records);
            }

            records.Activities.Add(participantActivity);

            var validator = new PaticipationsValidator();
            var result = await validator.ValidateAsync(participations);

            if(result.IsValid)
            {
                await this.StateManager.SetStateAsync<Participations>(ActorStateKeyName, participations);
            }
            else
            {
                throw new ApplicationException(result.Errors.First().ErrorMessage);
            }

        }

        public async Task AddEvent(ParticipantEvent participantEvent)
        {
            var participations = await this.StateManager.GetStateAsync<Participations>(ActorStateKeyName);
            var records = participations.Records.FirstOrDefault(i => i.Month == participantEvent.Date.Month && i.Year == participantEvent.Date.Year);

            if(records == null)
            {
                records = CreateMonthYear(participantEvent.Date.Month, participantEvent.Date.Year);
                participations.Records.Add(records);
            }

            records.Events.Add(participantEvent);
            var validator = new PaticipationsValidator();
            var result = await validator.ValidateAsync(participations);

            if (result.IsValid)
            {
                await this.StateManager.SetStateAsync<Participations>(ActorStateKeyName, participations);
            }
            else
            {
                throw new ApplicationException(result.Errors.First().ErrorMessage);
            }
        }

        public async Task<MonthParticipations> GetMonthParticipations(int month, int year)
        {
            var participations = await this.StateManager.GetStateAsync<Participations>(ActorStateKeyName);

            var records = participations.Records.FirstOrDefault(i => i.Month == month && i.Year == year);

            if(records == null)
            {
                return new MonthParticipations();
            }

            var activities = records.Activities.Where(i => !i.Approved).Select(i => new { Month = i.Date.Month, Year = i.Date.Year, Points = i.Points, Id = i.Id });

            var events = records.Events.Where(i => !i.Approved).Select(i => new { Month = i.Date.Month, Year = i.Date.Year, Points = i.Points, Id = i.Id });

            var combined = events.Union(activities);

            var totalMonths = (decimal)(DateTimeOffset.UtcNow.Subtract(participations.StartDate).TotalDays / (365 / 12));

            var monthParticipations = new MonthParticipations();
            monthParticipations.Activities.AddRange(records.Activities);
            monthParticipations.Events.AddRange(records.Events);
            monthParticipations.Month = month;
            monthParticipations.Year = year;
            monthParticipations.MonthTotalPoints = monthParticipations.Activities.Sum(i => i.Points) + monthParticipations.Events.Sum(i => i.Points);
            monthParticipations.AnnualTotalPoints = combined.Where(i => i.Year == year).Sum(i => i.Points);
            monthParticipations.AveragePointsPerMonth = totalMonths > 0 ? Math.Round(combined.Sum(i => i.Points) / totalMonths, 2) : 0;

            return monthParticipations; 
        }
        
    }
}
