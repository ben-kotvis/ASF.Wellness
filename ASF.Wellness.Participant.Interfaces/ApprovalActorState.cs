using Microsoft.ServiceFabric.Actors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace ASF.Wellness.Participant.Domain
{
    [DataContract]
    public class ApprovalActorState
    {
        [DataContract]
        public enum Steps
        {
            [EnumMember]
            Created,

            [EnumMember]
            Submitted,

            [EnumMember]
            SentToApprover,

            [EnumMember]
            Approved,

            [EnumMember]
            Rejected
        }

        [DataMember]
        public ActorId ParticipantActorId { get; set; }

        [DataMember]
        public Steps CurrentStep { get; set; }

    }


}
