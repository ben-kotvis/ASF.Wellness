using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace ASF.Wellness.Participant.Domain
{
    [DataContract]
    public class ParticipantActivity
    {
        [DataMember]
        public string Id { get; set; }
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public string UserId { get; set; }
        [DataMember]
        public DateTimeOffset Date { get; set; }
        [DataMember]
        public int NumberOfMinutes { get; set; }
        [DataMember]
        public decimal Points { get; set; }
        [DataMember]
        public bool Approved { get; set; }
    }
}
