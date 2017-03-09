using System;
using System.Collections.Generic;
using System.Fabric;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.ServiceFabric.Data.Collections;
using Microsoft.ServiceFabric.Services.Communication.Runtime;
using Microsoft.ServiceFabric.Services.Runtime;
using ASF.Wellness.Domain;
using ASF.Wellness.Domain.ServiceInterfaces;

namespace ASF.Services.Activities
{
    /// <summary>
    /// An instance of this class is created for each service replica by the Service Fabric runtime.
    /// </summary>
    internal sealed class Activities : StatefulService, IActivityService
    {
        private const string ActivityStateKey = "Activities";

        public Activities(StatefulServiceContext context)
            : base(context)
        { }

        public async Task<List<Activity>> All(CancellationToken cancellationToken)
        {
            var myDictionary = await this.StateManager.GetOrAddAsync<IReliableDictionary<string, Activity>>(ActivityStateKey);

            var result = new List<Activity>();

            using (var transaction = this.StateManager.CreateTransaction())
            {
                var enumerableDictionary = await myDictionary.CreateEnumerableAsync(transaction);

                using (var item = enumerableDictionary.GetAsyncEnumerator())
                {
                    while (await item.MoveNextAsync(cancellationToken))
                    {
                        result.Add(item.Current.Value);
                    }
                }
            }

            return result;
        }

        /// <summary>
        /// Optional override to create listeners (e.g., HTTP, Service Remoting, WCF, etc.) for this service replica to handle client or user requests.
        /// </summary>
        /// <remarks>
        /// For more information on service communication, see https://aka.ms/servicefabricservicecommunication
        /// </remarks>
        /// <returns>A collection of listeners.</returns>
        protected override IEnumerable<ServiceReplicaListener> CreateServiceReplicaListeners()
        {
            return new ServiceReplicaListener[0];
        }

        /// <summary>
        /// This is the main entry point for your service replica.
        /// This method executes when this replica of your service becomes primary and has write status.
        /// </summary>
        /// <param name="cancellationToken">Canceled when Service Fabric needs to shut down this service replica.</param>
        protected override async Task RunAsync(CancellationToken cancellationToken)
        {            
            var myDictionary = await this.StateManager.GetOrAddAsync<IReliableDictionary<string, Activity>>(ActivityStateKey);            
            
        }
    }
}
