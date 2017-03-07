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
    public class ApprovalActor : ActorBase, IApproval
    {
        private const string ActorStateKeyName = "ActorState";

        private ApprovalActorState _state;
        /// <summary>
        /// Initializes a new instance of Participant
        /// </summary>
        /// <param name="actorService">The Microsoft.ServiceFabric.Actors.Runtime.ActorService that will host this actor instance.</param>
        /// <param name="actorId">The Microsoft.ServiceFabric.Actors.ActorId for this actor instance.</param>
        public ApprovalActor(ActorService actorService, ActorId actorId, IActorProxyFactory actorProxyFactory, IServiceProxyFactory serviceProxyFactory, IRepositoryFactories factories)
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

            _state = new ApprovalActorState()
            {
                CurrentStep = ApprovalActorState.Steps.Created
            };

            await this.StateManager.TryAddStateAsync(ActorStateKeyName, _state);

        }

        public async Task Submit(ApprovalSubmission submission)
        {
            // lookup the approver
            var messageRepository = _factories.CreateMessageRepository();
            await messageRepository.Send("recipient", "message");
            
        }

        public async Task Approve()
        {

        }


        public async Task Reject(ApprovalRejection reason)
        {

        }

    }
}
