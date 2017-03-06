using Microsoft.ServiceFabric.Actors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASF.Wellness.Participant.Domain
{
    public interface IApproval : IActor
    {
        Task Submit(ApprovalSubmission submission);

        Task Approve();

        Task Reject(ApprovalRejection reason);
    }
}
