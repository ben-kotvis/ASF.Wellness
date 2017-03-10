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
using Microsoft.ServiceFabric.Services.Remoting.Runtime;

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


        public async Task Add(Activity activity)
        {
            using (var transaction = this.StateManager.CreateTransaction())
            {
                var myDictionary = await this.StateManager.GetOrAddAsync<IReliableDictionary<string, Activity>>(transaction, ActivityStateKey);

                // seed table for the time being
                await myDictionary.AddAsync(transaction, activity.Id, activity);

                await transaction.CommitAsync();
            }
        }

        protected override IEnumerable<ServiceReplicaListener> CreateServiceReplicaListeners()
        {
            return new[]
            {
                new ServiceReplicaListener(context => this.CreateServiceRemotingListener(context))
            };
        }

        
        protected override async Task RunAsync(CancellationToken cancellationToken)
        {
            //await Add(new Activity() { Id = "608EE52F-2E51-4687-8BEE-9C7772B90AB1", Name = "Running" });
            //await Add(new Activity() { Id = "18B2C608-84BA-476A-A426-BEF961F3CE6E", Name = "Walking" });            
        }
    }
}
