using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace ASF.Wellness.Participant.Domain
{
    [DataContract]
    public class Approval
    {
        [DataMember]
        public int Month { get; set; }
        
        [DataMember]
        public int Year { get; set; }

        [DataMember]
        public string ApprovedByUserId { get; set; }

        [DataMember]
        public DateTimeOffset ApprovalDate { get; set; }
    }
}
