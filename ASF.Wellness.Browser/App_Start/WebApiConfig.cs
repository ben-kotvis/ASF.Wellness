using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace ASF.Wellness.Browser
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            //config.MapHttpAttributeRoutes();
            //
            //
            //
            //config.Routes.MapHttpRoute(
            //    name: "DefaultApi",
            //    routeTemplate: "api/{controller}/{id}",
            //    defaults: new { id = RouteParameter.Optional }
            //);

            //config.Routes.MapHttpRoute(name: "default", routeTemplate: "{controller=Home}/{action=Index}/");

            // when the user types in a link handled by client side routing to the address bar 
            // or refreshes the page, that triggers the server routing. The server should pass 
            // that onto the client, so Angular can handle the route
            //config.Routes.MapHttpRoute(
            //    name: "spa-fallback",
            //    routeTemplate: "{*url}",
            //    defaults: new { controller = "Home", action = "Index" }
            //);
        }
    }
}
