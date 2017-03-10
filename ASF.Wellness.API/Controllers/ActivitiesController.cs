using ASF.Wellness.Domain;
using ASF.Wellness.Domain.ServiceInterfaces;
using Microsoft.ServiceFabric.Services.Remoting.Client;
using System;
using System.Collections.Generic;
using System.Fabric;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.ServiceFabric.Services.Client;
using System.Threading;
using System.Web.Http.Cors;

namespace ASF.Wellness.API.Controllers
{
    [EnableCors(origins: "http://localhost:1670", headers: "*", methods: "*")]
    [ServiceRequestActionFilter]
    public class ActivitiesController : ApiController
    {
        [HttpGet]
        public async Task<List<Activity>> GetActivities()
        {
            //var activationContext = FabricRuntime.GetActivationContext();
                        
            IActivityService activityService = ServiceProxy.Create<IActivityService>(ServiceFabricHelpers.ActivitiesServiceUri);
            return await activityService.All(CancellationToken.None);
        }


        [HttpPost]
        public async Task Post(Activity item)
        {
            //var activationContext = FabricRuntime.GetActivationContext();

            IActivityService activityService = ServiceProxy.Create<IActivityService>(ServiceFabricHelpers.ActivitiesServiceUri);
            await activityService.Add(item);
        }
    }
}
