using Microsoft.ServiceFabric.Services.Remoting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ASF.Wellness.Domain.ServiceInterfaces
{
    public interface IActivityService : IService
    {
        Task<List<Activity>> All(CancellationToken cancellationToken);
        Task Add(Activity activity);
    }
}
