<%@ WebHandler Language="C#" Class="Handler" Debug="true" %>

using System;
using System.Web;
using System.IO;
using System.Net;
using System.Configuration;

public class Handler : IHttpHandler {
	
	public void ProcessRequest (HttpContext context) {

        // return the mime-type
        context.Response.Charset="utf-8";
        // expires immediately
        context.Response.Expires = 0;
        // do not cache
        context.Response.CacheControl = "no-cache";

		context.Response.Write("{\"counters\":[{\"count\":3},{\"count\":1},{\"count\":5},{\"count\":7}]}");
	}

	public bool IsReusable {
		get {
			return false;
		}
	}
}