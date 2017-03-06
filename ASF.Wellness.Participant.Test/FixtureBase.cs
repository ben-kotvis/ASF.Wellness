using ASF.Wellness.Domain;
using Microsoft.ServiceFabric.Actors;
using Microsoft.ServiceFabric.Actors.Client;
using Microsoft.ServiceFabric.Actors.Runtime;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using ServiceFabric.Mocks;
using System;
using System.Collections.Generic;
using System.Fabric;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASF.Wellness.Participant.Test
{
    public abstract class FixtureBase
    {
        protected static MockActorProxyFactory _actorProxyFactory;        
        protected static MockServiceProxyFactory _serviceProxyFactory;
        protected static IRepositoryFactories _factories;

        static FixtureBase()
        {
            _actorProxyFactory = new MockActorProxyFactory();      
            

            _serviceProxyFactory = new MockServiceProxyFactory();

            var repositoryFactoryMock = new Mock<IRepositoryFactories>();
            
            // setup repositories when you can
            _factories = repositoryFactoryMock.Object;
        }

        [TestCleanup]
        public void Cleanup()
        {
            _actorProxyFactory = new MockActorProxyFactory();
            _serviceProxyFactory = new MockServiceProxyFactory();
        }
        protected async Task<ApprovalActor> CreateApprovalActor(ActorId id)
        {
            Func<CustomActorService, ActorId, ApprovalActor> result = (service, actorId) => new ApprovalActor(service, actorId);
            var actor = await CreateActorConditional<ApprovalActor>(id, result);
            return actor;
        }

        protected async Task<ParticipantActor> CreateParticipantActor(ActorId id)
        {
            Func<CustomActorService, ActorId, ParticipantActor> result = (service, actorId) => new ParticipantActor(service, actorId);
            var actor = await CreateActorConditional<ParticipantActor>(id, result);
            return actor;
        }

        private async Task<T> CreateActorConditional<T>(ActorId id, Func<CustomActorService, ActorId, ActorBase> funcOverride)
            where T : Actor, IActor
        {
            var stateManager = new MockActorStateManager();
            Func<Microsoft.ServiceFabric.Actors.Runtime.ActorBase, IActorStateProvider, IActorStateManager> stateManagerFactory = (actr, stateProvider) => stateManager;

            IActorStateProvider actorStateProvider = new MockActorStateProvider();
            actorStateProvider.Initialize(ActorTypeInformation.Get(typeof(T)));

            var context = MockStatefulServiceContextFactory.Default;

            var customActorService = new CustomActorService(context, ActorTypeInformation.Get(typeof(T)), _actorProxyFactory, _serviceProxyFactory, _factories, null, stateManagerFactory); 
            var actor = customActorService.Activate<T>(id);
            await actor.InvokeOnActivateAsync();

            _actorProxyFactory.RegisterActor(actor);
            return actor;
        }
    }
}
