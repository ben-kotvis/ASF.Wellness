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
    public class ParticipantActor : Actor, IParticipant
    {
        private const string ParticipationsKeyName = "Participations";
        private const string ApprovalsKeyName = "Approvals";


        /// <summary>
        /// Initializes a new instance of Participant
        /// </summary>
        /// <param name="actorService">The Microsoft.ServiceFabric.Actors.Runtime.ActorService that will host this actor instance.</param>
        /// <param name="actorId">The Microsoft.ServiceFabric.Actors.ActorId for this actor instance.</param>
        public ParticipantActor(ActorService actorService, ActorId actorId)
            : base(actorService, actorId)
        {
        }

        /// <summary>
        /// This method is called whenever an actor is activated.
        /// An actor is activated the first time any of its methods are invoked.
        /// </summary>
        protected override async Task OnActivateAsync()
        {

            ActorEventSource.Current.ActorMessage(this, "Actor activated.");
            await InternalActivateAsync(this.ActorService.Context.CodePackageActivationContext);
            // The StateManager is this actor's private state store.
            // Data stored in the StateManager will be replicated for high-availability for actors that use volatile or persisted state storage.
            // Any serializable object can be saved in the StateManager.
            // For more information, see https://aka.ms/servicefabricactorsstateserialization

           
        }

        public async Task InternalActivateAsync(ICodePackageActivationContext context)
        {
            var participations = new Participations()
            {
                Activities = new List<ParticipantActivity>(),
                Events = new List<ParticipantEvent>()
            };

            await this.StateManager.TryAddStateAsync(ParticipationsKeyName, participations);

            await this.StateManager.TryAddStateAsync("count", 0);
        }


        /// <summary>
        /// TODO: Replace with your own actor method.
        /// </summary>
        /// <returns></returns>
        Task<int> IParticipant.GetCountAsync(CancellationToken cancellationToken)
        {
            return this.StateManager.GetStateAsync<int>("count", cancellationToken);
        }

        /// <summary>
        /// TODO: Replace with your own actor method.
        /// </summary>
        /// <param name="count"></param>
        /// <returns></returns>
        Task IParticipant.SetCountAsync(int count, CancellationToken cancellationToken)
        {
            // Requests are not guaranteed to be processed in order nor at most once.
            // The update function here verifies that the incoming count is greater than the current count to preserve order.
            return this.StateManager.AddOrUpdateStateAsync("count", count, (key, value) => count > value ? count : value, cancellationToken);
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
