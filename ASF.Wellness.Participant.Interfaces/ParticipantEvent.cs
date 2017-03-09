using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace ASF.Wellness.Participant.Domain
{
    [DataContract]
    public class ParticipantEvent : ParticipantRecord
    {
        [DataMember]
        public string FileId { get; set; }
    }
}
