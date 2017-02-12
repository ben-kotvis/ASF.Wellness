using System;
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
using Mocks;

namespace ASF.Wellness.Participant.Test
{
    [TestClass]
    public class ParticipantActorFixture
    {

        private const string ParticipationsKeyName = "Participations";

        private static ICodePackageActivationContext codePackageContext = new MockCodePackageActivationContext(
            "fabric:/someapp",
            "SomeAppType",
            "Code",
            "1.0.0.0",
            Guid.NewGuid().ToString(),
            @"C:\Log",
            @"C:\Temp",
            @"C:\Work",
            "ServiceManifest",
            "1.0.0.0"
            );

        private static StatefulServiceContext statefulServiceContext = new StatefulServiceContext(
            new NodeContext("Test", new NodeId(new BigInteger(0), new BigInteger(0)), new BigInteger(0), "TestType", "localhost"),
            codePackageContext,
            "",
            new Uri("fabric:/testapp/testservice"),
            new byte[0],
            Guid.NewGuid(),
            0);

        
        [TestMethod]
        public async Task validate_new_actor_has_no_participations()
        {
            MockServiceProxyFactory serviceProxyFactory = new MockServiceProxyFactory();
            ParticipantActor target = await CreateParticipantActor();
            var participations = await target.GetMonthParticipations(1, 2017);
            Assert.IsFalse(participations.Activities.Any());
            Assert.IsFalse(participations.Events.Any());
        }

        [TestMethod]
        public async Task validate_annual_total_on_events_and_activities()
        {
            MockServiceProxyFactory serviceProxyFactory = new MockServiceProxyFactory();
            ParticipantActor target = await CreateParticipantActor();

            var currentDate = DateTimeOffset.UtcNow;

            var current = await target.StateManager.GetStateAsync<Participations>(ParticipationsKeyName);

            int monthChanger = -1;
            if(currentDate.Month == 1)
            {
                monthChanger = 1;
            }

            current.Events.Add(new ParticipantEvent() { Id = Guid.NewGuid().ToString(), Points = 1, Date = currentDate.AddMonths(monthChanger) });
            current.Events.Add(new ParticipantEvent() { Id = Guid.NewGuid().ToString(), Points = 1, Date = currentDate });
            current.Activities.Add(new ParticipantActivity() { Points = 1, Date = currentDate });

            await target.StateManager.SetStateAsync(ParticipationsKeyName, current);

            var participations = await target.GetMonthParticipations(currentDate.Month, currentDate.Year);
            Assert.AreEqual(3, participations.AnnualTotalPoints);            
        }


        [TestMethod]
        public async Task validate_month_total_on_events_and_activities()
        {
            MockServiceProxyFactory serviceProxyFactory = new MockServiceProxyFactory();
            ParticipantActor target = await CreateParticipantActor();

            var currentDate = DateTimeOffset.UtcNow;

            var current = await target.StateManager.GetStateAsync<Participations>(ParticipationsKeyName);

            int monthChanger = -1;
            if (currentDate.Month == 1)
            {
                monthChanger = 1;
            }

            current.Events.Add(new ParticipantEvent() { Id = Guid.NewGuid().ToString(), Points = 1, Date = currentDate.AddMonths(monthChanger) });
            current.Events.Add(new ParticipantEvent() { Id = Guid.NewGuid().ToString(), Points = 1, Date = currentDate });
            current.Activities.Add(new ParticipantActivity() { Points = 1, Date = currentDate });

            await target.StateManager.SetStateAsync(ParticipationsKeyName, current);

            var participations = await target.GetMonthParticipations(currentDate.Month, currentDate.Year);
            Assert.AreEqual(2, participations.MonthTotalPoints);
        }

        [TestMethod]
        public async Task validate_average_on_events_and_activities()
        {
            MockServiceProxyFactory serviceProxyFactory = new MockServiceProxyFactory();
            ParticipantActor target = await CreateParticipantActor();

            var currentDate = DateTimeOffset.UtcNow;

            var current = await target.StateManager.GetStateAsync<Participations>(ParticipationsKeyName);

            current.StartDate = DateTimeOffset.UtcNow.AddYears(-1);
            current.Events.Add(new ParticipantEvent() { Id = Guid.NewGuid().ToString(), Points = 1, Date = currentDate.AddMonths(-1) });
            current.Events.Add(new ParticipantEvent() { Id = Guid.NewGuid().ToString(), Points = 1, Date = currentDate });
            current.Activities.Add(new ParticipantActivity() { Points = 11, Date = currentDate });

            await target.StateManager.SetStateAsync(ParticipationsKeyName, current);

            var participations = await target.GetMonthParticipations(currentDate.Month, currentDate.Year);
            Assert.AreEqual(1, Math.Floor(participations.AveragePointsPerMonth));
        }

        private static async Task<ParticipantActor> CreateParticipantActor()
        {
            try
            {
                var target = new ParticipantActor(
                    new ActorService(
                        context: statefulServiceContext,
                        actorTypeInfo: ActorTypeInformation.Get(typeof(ParticipantActor)),
                        stateManagerFactory: (actorBase, stateProvider) => new MockActorStateManager()),
                    new ActorId(Guid.NewGuid()));
                await target.InternalActivateAsync(codePackageContext);
                return target;
            }
            catch (Exception e)
            {
                throw;
            }
        }
    }
}
