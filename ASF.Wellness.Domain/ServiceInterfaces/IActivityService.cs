using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ASF.Wellness.Domain.ServiceInterfaces
{
    public interface IActivityService
    {
        Task<List<Activity>> All(CancellationToken cancellationToken);
    }
}
