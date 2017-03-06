using ASF.Wellness.Domain;
using Microsoft.ServiceFabric.Actors;
using Microsoft.ServiceFabric.Actors.Client;
using Microsoft.ServiceFabric.Actors.Runtime;
using Microsoft.ServiceFabric.Services.Remoting.Client;
using System;
using System.Collections.Generic;
using System.Fabric;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASF.Wellness.Participant
{
    public class CustomActorService : ActorService
    {

        public IActorProxyFactory ActorProxyFactory { get; private set; }
        public IServiceProxyFactory ServiceProxyFactory { get; private set; }
        public IRepositoryFactories Factories { get; private set; }

        //no additional constructor parameters
        public CustomActorService(StatefulServiceContext context, ActorTypeInformation actorTypeInfo, IActorProxyFactory actorProxyFactory, IServiceProxyFactory serviceProxyFactory, IRepositoryFactories factories,
            Func<ActorService, ActorId, ActorBase> actorFactory = null, Func<Microsoft.ServiceFabric.Actors.Runtime.ActorBase, IActorStateProvider, IActorStateManager> stateManagerFactory = null,
            IActorStateProvider stateProvider = null, ActorServiceSettings settings = null) 
            : base(context, actorTypeInfo, actorFactory, stateManagerFactory, stateProvider, settings)
        {
            ActorProxyFactory = actorProxyFactory;
            ServiceProxyFactory = serviceProxyFactory;
            Factories = factories;
        }


    }
}
