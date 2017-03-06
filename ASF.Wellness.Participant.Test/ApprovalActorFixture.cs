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
    public class ApprovalActorFixture : FixtureBase
    {

        private const string ParticipationsKeyName = "Participations";

        [TestMethod]
        public async Task approve_submissions()
        {
            ParticipantActor target = await CreateParticipantActor(ActorId.CreateRandom());

            var currentDate = DateTimeOffset.UtcNow;

            await target.AddActivity(new ParticipantActivity() { Points = 1, Date = currentDate });
            await target.AddEvent(new ParticipantEvent() { Id = Guid.NewGuid().ToString(), Points = 1, Date = currentDate });


            await target.SubmitForApproval(currentDate.Month, currentDate.Year);

            
        }

        
        
    }
}
