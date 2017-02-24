using Microsoft.ServiceFabric.Actors;
using Microsoft.ServiceFabric.Actors.Client;
using Microsoft.ServiceFabric.Actors.Runtime;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ServiceFabric.Mocks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASF.Wellness.Participant.Test
{

    public abstract class FixtureBase
    {
        protected static MockActorProxyFactory _proxyFactory;
        static FixtureBase()
        {
            _proxyFactory = new MockActorProxyFactory();
        }

        [TestCleanup]
        public void Cleanup()
        {
            _proxyFactory = new MockActorProxyFactory();
        }


        protected async Task<ParticipantActor> CreateParticipantActor(ActorId id)
        {
            Func<ActorService, ActorId, ParticipantActor> result = (service, actorId) => new ParticipantActor(service, actorId);
            var actor = await CreateActorConditional<ParticipantActor>(id, result);
            return actor;
        }

        private async Task<T> CreateActorConditional<T>(ActorId id, Func<ActorService, ActorId, ActorBase> funcOverride)
            where T : Actor, IActor
        {

            var svc = MockActorServiceFactory.CreateActorServiceForActor<T>(funcOverride);
            var actor = svc.Activate(id);
            await actor.InvokeOnActivateAsync();

            _proxyFactory.RegisterActor(actor);
            return actor;
        }
    }
}
