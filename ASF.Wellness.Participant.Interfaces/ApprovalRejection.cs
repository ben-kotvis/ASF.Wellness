using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace ASF.Wellness.Participant.Domain
{
    [DataContract]
    public class ApprovalRejection
    {
        [DataContract]
        public enum Reasons
        {
            [EnumMember]
            SubmissionTooLate,

            [EnumMember]
            SubmissionTooEarly,
            
            [EnumMember]
            SubmissionInvalid
        }

        [DataMember]
        public string Description { get; set; }

        [DataMember]
        public Reasons Reason { get; set; }
    }
}
