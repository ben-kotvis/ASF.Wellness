using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.ServiceFabric.Actors;

namespace ASF.Wellness.Participant.Domain
{
    public interface IParticipant : IActor
    {
        Task AddActivity(ParticipantActivity participantActivity);

        Task AddEvent(ParticipantEvent participantEvent);

        Task<MonthParticipations> GetMonthParticipations(int month, int year);

        Task SubmitForApproval(int month, int year);
    }
}
