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
        private const string ParticipationsKeyName = "Participations";
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

            var participations = new Participations()
            {
                Activities = new List<ParticipantActivity>(),
                Events = new List<ParticipantEvent>()
            };

            await this.StateManager.TryAddStateAsync(ParticipationsKeyName, participations);

        }
        
        public async Task SubmitForApproval(int month, int year)
        {
            var participations = await this.StateManager.GetStateAsync<Participations>(ParticipationsKeyName);

            var activities = participations.Activities.Where(i => !i.Approved && i.Date.Month == month && i.Date.Year == year);

            var events = participations.Events.Where(i => !i.Approved && i.Date.Month == month && i.Date.Year == year);


            var submission = new ApprovalSubmission()
            {
                Activities = activities.Select(i => i.Id).ToList(),
                Events = events.Select(i => i.Id).ToList(),
                ParticipantActorId = this.Id
            };
            
            var approval = _actorProxyFactory.CreateActorProxy<IApproval>(ServiceFabricHelpers.ApprovalServiceUri, ServiceFabricHelpers.CreateActorId());
            
            await approval.Submit(submission);
        }

        public async Task AddActivity(ParticipantActivity participantActivity)
        {
            
            var participations = await this.StateManager.GetStateAsync<Participations>(ParticipationsKeyName);
            participations.Activities.Add(participantActivity);
            var validator = new PaticipationsValidator();
            var result = await validator.ValidateAsync(participations);

            if(result.IsValid)
            {
                await this.StateManager.SetStateAsync<Participations>(ParticipationsKeyName, participations);
            }
            else
            {
                throw new ApplicationException(result.Errors.First().ErrorMessage);
            }

        }

        public async Task AddEvent(ParticipantEvent participantEvent)
        {
            var participations = await this.StateManager.GetStateAsync<Participations>(ParticipationsKeyName);
            participations.Events.Add(participantEvent);
            var validator = new PaticipationsValidator();
            var result = await validator.ValidateAsync(participations);

            if (result.IsValid)
            {
                await this.StateManager.SetStateAsync<Participations>(ParticipationsKeyName, participations);
            }
            else
            {
                throw new ApplicationException(result.Errors.First().ErrorMessage);
            }
        }

        public async Task<MonthParticipations> GetMonthParticipations(int month, int year)
        {
            var participations = await this.StateManager.GetStateAsync<Participations>(ParticipationsKeyName);

            var activities = participations.Activities.Where(i => !i.Approved).Select(i => new { Month = i.Date.Month, Year = i.Date.Year, Points = i.Points, Id = i.Id });

            var events = participations.Events.Where(i => !i.Approved).Select(i => new { Month = i.Date.Month, Year = i.Date.Year, Points = i.Points, Id = i.Id });

            var combined = events.Union(activities);

            var totalMonths = (decimal)(DateTimeOffset.UtcNow.Subtract(participations.StartDate).TotalDays / (365 / 12));

            var monthParticipations = new MonthParticipations();
            monthParticipations.Activities.AddRange(participations.Activities.Where(i => i.Date.Month == month && i.Date.Year == year));
            monthParticipations.Events.AddRange(participations.Events.Where(i => i.Date.Month == month && i.Date.Year == year));
            monthParticipations.Month = month;
            monthParticipations.Year = year;
            monthParticipations.MonthTotalPoints = monthParticipations.Activities.Sum(i => i.Points) + monthParticipations.Events.Sum(i => i.Points);
            monthParticipations.AnnualTotalPoints = combined.Where(i => i.Year == year).Sum(i => i.Points);
            monthParticipations.AveragePointsPerMonth = totalMonths > 0 ? Math.Round(combined.Sum(i => i.Points) / totalMonths, 2) : 0;

            return monthParticipations; 
        }
        
    }
}
