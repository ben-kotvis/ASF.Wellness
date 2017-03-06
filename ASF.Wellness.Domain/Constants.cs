using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASF.Wellness.Domain
{
    public class Constants
    {
        public class ServiceNames
        {
            public const string ParticipantActorServiceKeyName = "ParticipantActorService";
            public const string ApprovalActorServiceKeyName = "ApprovalActorService";
            public const string ApplicationName = "ASF.Wellness";
        }
        public static class Formats
        {
            /// <summary>
            /// fabric:/{0}/{1}
            /// </summary>
            public const string FabricUrlFormat = "fabric:/{0}/{1}";
        }

    }
}
