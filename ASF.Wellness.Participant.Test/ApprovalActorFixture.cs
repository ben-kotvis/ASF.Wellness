﻿using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.ServiceFabric.Actors;
using Microsoft.ServiceFabric.Actors.Runtime;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Fabric;
using System.Reflection;
using System.Threading.Tasks;
using ASF.Wellness.Participant.Domain;
using ASF.Wellness.Participant;
using System.Numerics;
using ServiceFabric.Mocks;
using ASF.Wellness.Participant.Test.Infrastructure;

namespace ASF.Wellness.Participant.Test
{
    [TestClass]
    public class ApprovalActorFixture : FixtureBase
    {

        private const string ParticipationsKeyName = "Participations";

        [TestMethod]
        public async Task approve_submissions()
        {

            _actorProxyFactory.MisingActor += actorProxyFactory_MisingActor;
            ParticipantActor target = await CreateParticipantActor(ActorId.CreateRandom());

            var currentDate = DateTimeOffset.UtcNow;

            await target.AddActivity(new ParticipantActivity() { Points = 1, Date = currentDate });
            await target.AddEvent(new ParticipantEvent() { Id = Guid.NewGuid().ToString(), Points = 1, Date = currentDate });


            await target.SubmitForApproval(currentDate.Month, currentDate.Year);

            
        }

        private void actorProxyFactory_MisingActor(object sender, Infrastructure.MisingActorEventArgs args)
        {
            var registrar = (MyMockActorProxyFactoryWrapper)sender;
            Func<ActorService, ActorId, ActorBase> actorFactory = (service, actorId) => new ApprovalActor(service, actorId, _actorProxyFactory, _serviceProxyFactory, _factories);
            var svc = MockActorServiceFactory.CreateActorServiceForActor<ApprovalActor>(actorFactory);
            var actor = svc.Activate(args.Id);
            registrar.RegisterActor(actor);
        }
    }
}
