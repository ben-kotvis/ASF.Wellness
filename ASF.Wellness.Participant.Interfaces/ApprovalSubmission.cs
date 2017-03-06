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
    public class ApprovalSubmission
    {
        [DataMember]
        public List<string> Activities { get; set; }
        
        [DataMember]
        public List<string> Events { get; set; }

        [DataMember]
        public ActorId ParticipantActorId { get; set; }
    }
}
