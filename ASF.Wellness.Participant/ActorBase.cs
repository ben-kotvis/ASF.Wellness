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
    public abstract class ActorBase : Actor
    {
        private const string ParticipationsKeyName = "Participations";
        private const string ApprovalsKeyName = "Approvals";
        private const string SubscriberKeyName = "Subscriber";

        protected readonly IActorProxyFactory _actorProxyFactory;
        protected readonly IServiceProxyFactory _serviceProxyFactory;
        protected readonly IRepositoryFactories _factories;

        /// <summary>
        /// Initializes a new instance of Participant
        /// </summary>
        /// <param name="actorService">The Microsoft.ServiceFabric.Actors.Runtime.ActorService that will host this actor instance.</param>
        /// <param name="actorId">The Microsoft.ServiceFabric.Actors.ActorId for this actor instance.</param>
        public ActorBase(ActorService actorService, ActorId actorId, IActorProxyFactory actorProxyFactory, IServiceProxyFactory serviceProxyFactory, IRepositoryFactories factories)
            : base(actorService, actorId)
        {
            _actorProxyFactory = actorProxyFactory;
            _serviceProxyFactory = serviceProxyFactory;
            _factories = factories;
        }
        
        
    }
}
