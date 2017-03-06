using Microsoft.ServiceFabric.Actors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASF.Wellness.Domain
{
    public class ServiceFabricHelpers
    {
        public static Uri ServiceUri(string serviceName)
        {
            return new Uri(string.Format(Constants.Formats.FabricUrlFormat, Constants.ServiceNames.ApplicationName, serviceName));
        }

        public static Uri ApprovalServiceUri
        {
            get { return ServiceUri(Constants.ServiceNames.ApprovalActorServiceKeyName); }
        }
        
        public static Uri ParticipantServiceUri
        {
            get { return ServiceUri(Constants.ServiceNames.ParticipantActorServiceKeyName); }
        }
        
        public static ActorId CreateActorId()
        {
            return new ActorId(Guid.NewGuid());
        }
    }
}
