using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace ASF.Wellness.Participant.Domain
{
    [DataContract]
    public class MonthParticipations
    {
        public MonthParticipations()
        {
            Events = new List<ParticipantEvent>();
            Activities = new List<ParticipantActivity>();
        }

        [DataMember]
        public List<ParticipantEvent> Events { get; set; }

        [DataMember]
        public List<ParticipantActivity> Activities { get; set; }

        [DataMember]
        public int Month { get; set; }
        
        [DataMember]
        public int Year { get; set; }

        [DataMember]
        public decimal MonthTotalPoints { get; set; }

        [DataMember]
        public decimal AnnualTotalPoints { get; set; }
        
        [DataMember]
        public decimal AveragePointsPerMonth { get; set; }
    }
}
