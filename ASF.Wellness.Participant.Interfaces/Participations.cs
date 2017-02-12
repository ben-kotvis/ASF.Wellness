using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace ASF.Wellness.Participant.Domain
{
    [DataContract]
    public class Participations
    {
        [DataMember]
        public List<ParticipantEvent> Events { get; set; }

        [DataMember]
        public List<ParticipantActivity> Activities { get; set; }

        [DataMember]
        public DateTimeOffset StartDate { get; set; }
    }
}
