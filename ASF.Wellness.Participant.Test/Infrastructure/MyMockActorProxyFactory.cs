using Microsoft.ServiceFabric.Actors;
using Microsoft.ServiceFabric.Actors.Client;
using ServiceFabric.Mocks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.ServiceFabric.Services.Remoting;

namespace ASF.Wellness.Participant.Test.Infrastructure
{
    public class MisingActorEventArgs : EventArgs
    {
        public ActorId Id { get; set; }
    }

    public delegate void MisingActorEventHandler(object sender, MisingActorEventArgs args);
    public class MyMockActorProxyFactoryWrapper : IActorProxyFactory
    {
        private MockActorProxyFactory _proxy;
        public MyMockActorProxyFactoryWrapper()
        {
            _proxy = new MockActorProxyFactory();
        }

        public event MisingActorEventHandler MisingActor;

        public void RegisterActor(IActor actor)
        {
            _proxy.RegisterActor(actor);
        }

        public TActorInterface CreateActorProxy<TActorInterface>(Uri serviceUri, ActorId actorId, string listenerName = null) where TActorInterface : IActor
        {
            try
            {
                return _proxy.CreateActorProxy<TActorInterface>(serviceUri, actorId, listenerName);
            }
            catch
            {
                OnMisingActor(this, actorId);
                return _proxy.CreateActorProxy<TActorInterface>(serviceUri, actorId, listenerName);
            }            
        }

        public TActorInterface CreateActorProxy<TActorInterface>(ActorId actorId, string applicationName = null, string serviceName = null, string listenerName = null) where TActorInterface : IActor
        {
            try
            {
                return _proxy.CreateActorProxy<TActorInterface>(actorId, applicationName, serviceName, listenerName);
            }
            catch
            {
                OnMisingActor(this, actorId);
                return _proxy.CreateActorProxy<TActorInterface>(actorId, applicationName, serviceName, listenerName);
            }
        }

        public TServiceInterface CreateActorServiceProxy<TServiceInterface>(Uri serviceUri, long partitionKey, string listenerName = null) where TServiceInterface : IService
        {
            return _proxy.CreateActorServiceProxy<TServiceInterface>(serviceUri, partitionKey, listenerName);
        }

        public TServiceInterface CreateActorServiceProxy<TServiceInterface>(Uri serviceUri, ActorId actorId, string listenerName = null) where TServiceInterface : IService
        {
            return _proxy.CreateActorServiceProxy<TServiceInterface>(serviceUri, actorId, listenerName);
        }

        protected virtual void OnMisingActor(object sender, ActorId id)
        {
            var args = new MisingActorEventArgs()
            {
                Id = id
            };
 
            MisingActor?.Invoke(sender, args);
        }
    }
}
