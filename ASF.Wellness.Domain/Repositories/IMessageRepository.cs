using Microsoft.ServiceFabric.Actors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace ASF.Wellness.Domain.Repositories
{
    public interface IMessageRepository
    {
        Task Send(string recipient, string message);
    }
    
}
