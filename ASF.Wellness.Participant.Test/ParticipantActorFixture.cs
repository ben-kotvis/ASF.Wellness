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
using ServiceFabric.Mocks;

namespace ASF.Wellness.Participant.Test
{
    [TestClass]
    public class ParticipantActorFixture : FixtureBase
    {

        private const string ParticipationsKeyName = "Participations";

        [TestMethod]
        public async Task validate_new_actor_has_no_participations()
        {
            MockServiceProxyFactory serviceProxyFactory = new MockServiceProxyFactory();
            ParticipantActor target = await CreateParticipantActor(ActorId.CreateRandom());
            var participations = await target.GetMonthParticipations(1, 2017);
            Assert.IsFalse(participations.Activities.Any());
            Assert.IsFalse(participations.Events.Any());
        }

        [TestMethod]
        public async Task validate_annual_total_on_events_and_activities()
        {
            MockServiceProxyFactory serviceProxyFactory = new MockServiceProxyFactory();
            ParticipantActor target = await CreateParticipantActor(ActorId.CreateRandom());

            var currentDate = DateTimeOffset.UtcNow;

            var current = await target.StateManager.GetStateAsync<Participations>(ParticipationsKeyName);

            int monthChanger = -1;
            if(currentDate.Month == 1)
            {
                monthChanger = 1;
            }

            var record = current.Records.FirstOrDefault();

            record.Events.Add(new ParticipantEvent() { Id = Guid.NewGuid().ToString(), Points = 1, Date = currentDate.AddMonths(monthChanger) });
            record.Events.Add(new ParticipantEvent() { Id = Guid.NewGuid().ToString(), Points = 1, Date = currentDate });
            record.Activities.Add(new ParticipantActivity() { Points = 1, Date = currentDate });

            await target.StateManager.SetStateAsync(ParticipationsKeyName, current);

            var participations = await target.GetMonthParticipations(currentDate.Month, currentDate.Year);
            Assert.AreEqual(3, participations.AnnualTotalPoints);            
        }

        [TestMethod]
        public async Task validate_month_total_on_events_and_activities()
        {
            MockServiceProxyFactory serviceProxyFactory = new MockServiceProxyFactory();
            ParticipantActor target = await CreateParticipantActor(ActorId.CreateRandom());

            var currentDate = DateTimeOffset.UtcNow;

            var current = await target.StateManager.GetStateAsync<Participations>(ParticipationsKeyName);

            int monthChanger = -1;
            if (currentDate.Month == 1)
            {
                monthChanger = 1;
            }

            var record = current.Records.FirstOrDefault();
            record.Events.Add(new ParticipantEvent() { Id = Guid.NewGuid().ToString(), Points = 1, Date = currentDate.AddMonths(monthChanger) });
            record.Events.Add(new ParticipantEvent() { Id = Guid.NewGuid().ToString(), Points = 1, Date = currentDate });
            record.Activities.Add(new ParticipantActivity() { Points = 1, Date = currentDate });

            await target.StateManager.SetStateAsync(ParticipationsKeyName, current);

            var participations = await target.GetMonthParticipations(currentDate.Month, currentDate.Year);
            Assert.AreEqual(2, participations.MonthTotalPoints);
        }

        [TestMethod]
        public async Task validate_average_on_events_and_activities()
        {
            MockServiceProxyFactory serviceProxyFactory = new MockServiceProxyFactory();
            ParticipantActor target = await CreateParticipantActor(ActorId.CreateRandom());

            var currentDate = DateTimeOffset.UtcNow;

            var current = await target.StateManager.GetStateAsync<Participations>(ParticipationsKeyName);

            var record = current.Records.FirstOrDefault();
            current.StartDate = DateTimeOffset.UtcNow.AddYears(-1);
            record.Events.Add(new ParticipantEvent() { Id = Guid.NewGuid().ToString(), Points = 1, Date = currentDate.AddMonths(-1) });
            record.Events.Add(new ParticipantEvent() { Id = Guid.NewGuid().ToString(), Points = 1, Date = currentDate });
            record.Activities.Add(new ParticipantActivity() { Points = 11, Date = currentDate });

            await target.StateManager.SetStateAsync(ParticipationsKeyName, current);

            var participations = await target.GetMonthParticipations(currentDate.Month, currentDate.Year);
            Assert.AreEqual(1, Math.Floor(participations.AveragePointsPerMonth));
        }
        
    }
}
