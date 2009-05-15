// Maker public facing javascript API.
// version: 0.3a

var Maker = {
  version: "0.3a",
  
  find_maps: function(maker_tag, maker_user, callback) {
    Maker._check_hosts()
    var q = "tag:" + maker_tag.split(/[, ]+/).join(" and tag:") //comma delimited tag spliting
    if(maker_user != undefined && maker_user != "") {q +=  " and user:" + maker_user}
    Maker.search(q, callback)
  },
  
  search: function(q,callback) {
    FlashMap.jsonp(Maker.maker_host + "/searches.json", callback, "query="+encodeURIComponent(q))
  },
  
  load_map: function(dom_id, map_id, options) {  
    Maker._check_hosts()
    FlashMap.load_map(dom_id, map_id, arguments[2])  
  },
  resize_when_ready: function() { FlashMap.resize_when_ready() },
  resize_map_to_fit: function() { FlashMap.resize_map_to_fit() },
  
  _hostNotDefinedError: {
    name: 'HostNotDefinedError',
    message: 'Please specify Maker.maker_host, Maker.finder_host and Maker.core_host before proceeding.'
  },
  _check_hosts: function() {
    if (!this.maker_host) throw(Maker._hostNotDefinedError);
  },
  
  addControls: function( args ) {
       var map = FlashMap.map
       map.showControl("Zoom", args.zoom || false);
       map.showControl("Layers", args.layers || false);
       map.showControl("Styles", args.styles || false); 
       map.showControl("Basemap", args.map_type || false);
       map.showControl("Legend", args.legend || false, "open"); 
       // showControl("Legend", true, "close"); 
   },

   addSmallControls: function() {
       var map = FlashMap.map
       showControl("Zoom", args.zoom);
       showControl("Legend", args.legend, "open"); 
   },

   addLargeControls: function() {
       var map = FlashMap.map
       showControl("Zoom", args.zoom);
       showControl("Layers", args.layers);
       showControl("Legend", args.legend, "open"); 
   },

   addMapTypeControls: function() {
       var map = FlashMap.map

       // TODO: Add provider code
   },

   dragging: function(on) {
       var map = FlashMap.map

       // TODO: Add provider code
   },

   setCenterAndZoom: function(point, zoom) { 
       var map = FlashMap.map
       map.setCenterZoom(point.lat, point.lon,zoom);
   },

   getCenter: function() {
       var map = FlashMap.map
       var point = map.getCenterZoom()[0];
       return point;
   },

   setCenter: function(point, options) {
       var map = FlashMap.map
       map.setCenter(point.lat, point.lon);            
   },

   setZoom: function(zoom) {
       var map = FlashMap.map
       map.setZoom(zoom);
   },

   getZoom: function() {
       var map = FlashMap.map
       return map.getZoom();
   },

   getZoomLevelForBoundingBox: function( bbox ) {
       var map = FlashMap.map
       // NE and SW points from the bounding box.
       var ne = bbox.getNorthEast();
       var sw = bbox.getSouthWest();
       var zoom;

       // TODO: Add provider code

       return zoom;
   },

   setMapType: function(type) {
       var map = FlashMap.map
       switch(type) {
           case mxn.Mapstraction.ROAD:
           map.setMapProvider("OpenStreetMap (road)");
           break;
           case mxn.Mapstraction.SATELLITE:
           map.setMapProvider("BlueMarble");
           break;
           case mxn.Mapstraction.HYBRID:
           map.setMapProvider("Google Hybrid");
           break;
           default:
           map.setMapProvider(type);
       }	 
   },

   getMapType: function() {
       var map = FlashMap.map
       switch(map.getMapProvider) {
           case "OpenStreetMap (Road)":
               retu

       }
       // TODO: Add provider code

       //return mxn.Mapstraction.ROAD;
       //return mxn.Mapstraction.SATELLITE;
       //return mxn.Mapstraction.HYBRID;

   },

   getBounds: function () {
       var map = FlashMap.map
       return map.getExtent();
   },

   setBounds: function(bounds){
       var map = FlashMap.map;
       map.setExtent(bounds.north, bounds.south, bounds.east, bounds.west);
       // map.setExtent(51.9,52.25,-4.3,-3.75)
       //map.setExtent(n,s,e,w);
   },

   addImageOverlay: function(id, src, opacity, west, south, east, north, oContext) {
       var map = FlashMap.map

       // TODO: Add provider code
   },

   addOverlay: function(url, autoCenterAndZoom) {
       var map = FlashMap.map
       var me = this;
       Maker.load_map(this.element.id, url);
       setTimeout(function() { me.maps[me.api] = swfobject.getObjectById(FlashMap.dom_id);}, 500);
   },

   addTileLayer: function(tile_url, opacity, copyright_text, min_zoom, max_zoom) {
       var map = FlashMap.map

       // TODO: Add provider code
   },

   toggleTileLayer: function(tile_url) {
       var map = FlashMap.map

       // TODO: Add provider code
   },

   getPixelRatio: function() {
       var map = FlashMap.map

       // TODO: Add provider code	
   },

   mousePosition: function(element) {
       var map = FlashMap.map

       // TODO: Add provider code	
   }
  
}


// Internal API. Use of these methods is strongly discouraged.
var FlashMap = {
  load_map: function(dom_id, map_id) {
    var options = Object.f1_extend({
      afterFinish: { }
    }, arguments[2] || { });
    
    FlashMap.dom_id = dom_id;
    var flashvars  = {map_id:map_id, core_host: Maker.core_host + '/', maker_host: Maker.maker_host + '/', dev:"false"}    
    var params     = {base: Maker.maker_host, "allowScriptAccess":"always", "allowNetworking": "all"};
    var attributes = {"allowScriptAccess":"always", "allowNetworking": "all"};
    f1_swfobject21.embedSWF(Maker.maker_host + "/Embed.swf", dom_id, "100%", "710", "9.0.0", Maker.maker_host + "/expressInstall.swf", flashvars, params, attributes)
    setTimeout(function() { FlashMap.map = f1_swfobject21.getObjectById(FlashMap.dom_id);}, 500);
    if(typeof options.afterFinish == "function") {options.afterFinish(dom_id, map_id)}
  },
  
  resize_when_ready: function() {
    var t = setTimeout("FlashMap.resize_map_to_fit();", 500); //flash init is a bit slow.
  },
  
	resize_map_to_fit: function() {
		var windowHeight = document.viewport.getHeight();
		var margin = 77
		var mapHeight = Math.max(windowHeight - margin, 600)
		//alert("mapHeight: " + mapHeight + " windowHeight: " + windowHeight + ", margin: " + margin)
		f1_swfobject21.getObjectById(FlashMap.dom_id).style.height = mapHeight + "px";
	},
	
	store_map_location: function() {
    centerZoom = FlashMap.map.getCenterZoom();
    location.hash = "lat="+centerZoom[0]+"&lon="+centerZoom[1]+"&zoom="+centerZoom[2];
  },
  
  load_map_location: function() {
    var zooms;
    if(zooms = location.hash.match(/lat=([-\d\.]+)&lon=([-\d\.]+)&zoom=(\d+)/)) {
        centerZoom = FlashMap.map.setCenterZoom(zooms[1],zooms[2],zooms[3]);
    }
  }, 
  
  jsonp: function(url,callback,query) {
      if (url.indexOf("?") > -1)
          url += "&callback=" 
      else
          url += "?callback=" 
      url += callback + "&";
      if (query)
          url += query + "&";   
      url += new Date().getTime().toString(); // prevent caching        

      var script = document.createElement("script");        
      script.setAttribute("src",url);
      script.setAttribute("type","text/javascript");                
      document.body.appendChild(script);
  }
  
}


// from prototype.js to allow this code to work without prototype.js
Object.f1_extend = function(destination, source) {
  for (var property in source)
    destination[property] = source[property];
  return destination;
};

/* SWFObject v2.1 <http://code.google.com/p/swfobject/>
	Copyright (c) 2007-2008 Geoff Stearns, Michael Williams, and Bobby van der Sluis
	This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
*/
var f1_swfobject21=function(){var b="undefined",Q="object",n="Shockwave Flash",p="ShockwaveFlash.ShockwaveFlash",P="application/x-shockwave-flash",m="SWFObjectExprInst",j=window,K=document,T=navigator,o=[],N=[],i=[],d=[],J,Z=null,M=null,l=null,e=false,A=false;var h=function(){var v=typeof K.getElementById!=b&&typeof K.getElementsByTagName!=b&&typeof K.createElement!=b,AC=[0,0,0],x=null;if(typeof T.plugins!=b&&typeof T.plugins[n]==Q){x=T.plugins[n].description;if(x&&!(typeof T.mimeTypes!=b&&T.mimeTypes[P]&&!T.mimeTypes[P].enabledPlugin)){x=x.replace(/^.*\s+(\S+\s+\S+$)/,"$1");AC[0]=parseInt(x.replace(/^(.*)\..*$/,"$1"),10);AC[1]=parseInt(x.replace(/^.*\.(.*)\s.*$/,"$1"),10);AC[2]=/r/.test(x)?parseInt(x.replace(/^.*r(.*)$/,"$1"),10):0}}else{if(typeof j.ActiveXObject!=b){var y=null,AB=false;try{y=new ActiveXObject(p+".7")}catch(t){try{y=new ActiveXObject(p+".6");AC=[6,0,21];y.AllowScriptAccess="always"}catch(t){if(AC[0]==6){AB=true}}if(!AB){try{y=new ActiveXObject(p)}catch(t){}}}if(!AB&&y){try{x=y.GetVariable("$version");if(x){x=x.split(" ")[1].split(",");AC=[parseInt(x[0],10),parseInt(x[1],10),parseInt(x[2],10)]}}catch(t){}}}}var AD=T.userAgent.toLowerCase(),r=T.platform.toLowerCase(),AA=/webkit/.test(AD)?parseFloat(AD.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,q=false,z=r?/win/.test(r):/win/.test(AD),w=r?/mac/.test(r):/mac/.test(AD);/*@cc_on q=true;@if(@_win32)z=true;@elif(@_mac)w=true;@end@*/return{w3cdom:v,pv:AC,webkit:AA,ie:q,win:z,mac:w}}();var L=function(){if(!h.w3cdom){return }f(H);if(h.ie&&h.win){try{K.write("<script id=__ie_ondomload defer=true src=//:><\/script>");J=C("__ie_ondomload");if(J){I(J,"onreadystatechange",S)}}catch(q){}}if(h.webkit&&typeof K.readyState!=b){Z=setInterval(function(){if(/loaded|complete/.test(K.readyState)){E()}},10)}if(typeof K.addEventListener!=b){K.addEventListener("DOMContentLoaded",E,null)}R(E)}();function S(){if(J.readyState=="complete"){J.parentNode.removeChild(J);E()}}function E(){if(e){return }if(h.ie&&h.win){var v=a("span");try{var u=K.getElementsByTagName("body")[0].appendChild(v);u.parentNode.removeChild(u)}catch(w){return }}e=true;if(Z){clearInterval(Z);Z=null}var q=o.length;for(var r=0;r<q;r++){o[r]()}}function f(q){if(e){q()}else{o[o.length]=q}}function R(r){if(typeof j.addEventListener!=b){j.addEventListener("load",r,false)}else{if(typeof K.addEventListener!=b){K.addEventListener("load",r,false)}else{if(typeof j.attachEvent!=b){I(j,"onload",r)}else{if(typeof j.onload=="function"){var q=j.onload;j.onload=function(){q();r()}}else{j.onload=r}}}}}function H(){var t=N.length;for(var q=0;q<t;q++){var u=N[q].id;if(h.pv[0]>0){var r=C(u);if(r){N[q].width=r.getAttribute("width")?r.getAttribute("width"):"0";N[q].height=r.getAttribute("height")?r.getAttribute("height"):"0";if(c(N[q].swfVersion)){if(h.webkit&&h.webkit<312){Y(r)}W(u,true)}else{if(N[q].expressInstall&&!A&&c("6.0.65")&&(h.win||h.mac)){k(N[q])}else{O(r)}}}}else{W(u,true)}}}function Y(t){var q=t.getElementsByTagName(Q)[0];if(q){var w=a("embed"),y=q.attributes;if(y){var v=y.length;for(var u=0;u<v;u++){if(y[u].nodeName=="DATA"){w.setAttribute("src",y[u].nodeValue)}else{w.setAttribute(y[u].nodeName,y[u].nodeValue)}}}var x=q.childNodes;if(x){var z=x.length;for(var r=0;r<z;r++){if(x[r].nodeType==1&&x[r].nodeName=="PARAM"){w.setAttribute(x[r].getAttribute("name"),x[r].getAttribute("value"))}}}t.parentNode.replaceChild(w,t)}}function k(w){A=true;var u=C(w.id);if(u){if(w.altContentId){var y=C(w.altContentId);if(y){M=y;l=w.altContentId}}else{M=G(u)}if(!(/%$/.test(w.width))&&parseInt(w.width,10)<310){w.width="310"}if(!(/%$/.test(w.height))&&parseInt(w.height,10)<137){w.height="137"}K.title=K.title.slice(0,47)+" - Flash Player Installation";var z=h.ie&&h.win?"ActiveX":"PlugIn",q=K.title,r="MMredirectURL="+j.location+"&MMplayerType="+z+"&MMdoctitle="+q,x=w.id;if(h.ie&&h.win&&u.readyState!=4){var t=a("div");x+="SWFObjectNew";t.setAttribute("id",x);u.parentNode.insertBefore(t,u);u.style.display="none";var v=function(){u.parentNode.removeChild(u)};I(j,"onload",v)}U({data:w.expressInstall,id:m,width:w.width,height:w.height},{flashvars:r},x)}}function O(t){if(h.ie&&h.win&&t.readyState!=4){var r=a("div");t.parentNode.insertBefore(r,t);r.parentNode.replaceChild(G(t),r);t.style.display="none";var q=function(){t.parentNode.removeChild(t)};I(j,"onload",q)}else{t.parentNode.replaceChild(G(t),t)}}function G(v){var u=a("div");if(h.win&&h.ie){u.innerHTML=v.innerHTML}else{var r=v.getElementsByTagName(Q)[0];if(r){var w=r.childNodes;if(w){var q=w.length;for(var t=0;t<q;t++){if(!(w[t].nodeType==1&&w[t].nodeName=="PARAM")&&!(w[t].nodeType==8)){u.appendChild(w[t].cloneNode(true))}}}}}return u}function U(AG,AE,t){var q,v=C(t);if(v){if(typeof AG.id==b){AG.id=t}if(h.ie&&h.win){var AF="";for(var AB in AG){if(AG[AB]!=Object.prototype[AB]){if(AB.toLowerCase()=="data"){AE.movie=AG[AB]}else{if(AB.toLowerCase()=="styleclass"){AF+=' class="'+AG[AB]+'"'}else{if(AB.toLowerCase()!="classid"){AF+=" "+AB+'="'+AG[AB]+'"'}}}}}var AD="";for(var AA in AE){if(AE[AA]!=Object.prototype[AA]){AD+='<param name="'+AA+'" value="'+AE[AA]+'" />'}}v.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+AF+">"+AD+"</object>";i[i.length]=AG.id;q=C(AG.id)}else{if(h.webkit&&h.webkit<312){var AC=a("embed");AC.setAttribute("type",P);for(var z in AG){if(AG[z]!=Object.prototype[z]){if(z.toLowerCase()=="data"){AC.setAttribute("src",AG[z])}else{if(z.toLowerCase()=="styleclass"){AC.setAttribute("class",AG[z])}else{if(z.toLowerCase()!="classid"){AC.setAttribute(z,AG[z])}}}}}for(var y in AE){if(AE[y]!=Object.prototype[y]){if(y.toLowerCase()!="movie"){AC.setAttribute(y,AE[y])}}}v.parentNode.replaceChild(AC,v);q=AC}else{var u=a(Q);u.setAttribute("type",P);for(var x in AG){if(AG[x]!=Object.prototype[x]){if(x.toLowerCase()=="styleclass"){u.setAttribute("class",AG[x])}else{if(x.toLowerCase()!="classid"){u.setAttribute(x,AG[x])}}}}for(var w in AE){if(AE[w]!=Object.prototype[w]&&w.toLowerCase()!="movie"){F(u,w,AE[w])}}v.parentNode.replaceChild(u,v);q=u}}}return q}function F(t,q,r){var u=a("param");u.setAttribute("name",q);u.setAttribute("value",r);t.appendChild(u)}function X(r){var q=C(r);if(q&&(q.nodeName=="OBJECT"||q.nodeName=="EMBED")){if(h.ie&&h.win){if(q.readyState==4){B(r)}else{j.attachEvent("onload",function(){B(r)})}}else{q.parentNode.removeChild(q)}}}function B(t){var r=C(t);if(r){for(var q in r){if(typeof r[q]=="function"){r[q]=null}}r.parentNode.removeChild(r)}}function C(t){var q=null;try{q=K.getElementById(t)}catch(r){}return q}function a(q){return K.createElement(q)}function I(t,q,r){t.attachEvent(q,r);d[d.length]=[t,q,r]}function c(t){var r=h.pv,q=t.split(".");q[0]=parseInt(q[0],10);q[1]=parseInt(q[1],10)||0;q[2]=parseInt(q[2],10)||0;return(r[0]>q[0]||(r[0]==q[0]&&r[1]>q[1])||(r[0]==q[0]&&r[1]==q[1]&&r[2]>=q[2]))?true:false}function V(v,r){if(h.ie&&h.mac){return }var u=K.getElementsByTagName("head")[0],t=a("style");t.setAttribute("type","text/css");t.setAttribute("media","screen");if(!(h.ie&&h.win)&&typeof K.createTextNode!=b){t.appendChild(K.createTextNode(v+" {"+r+"}"))}u.appendChild(t);if(h.ie&&h.win&&typeof K.styleSheets!=b&&K.styleSheets.length>0){var q=K.styleSheets[K.styleSheets.length-1];if(typeof q.addRule==Q){q.addRule(v,r)}}}function W(t,q){var r=q?"visible":"hidden";if(e&&C(t)){C(t).style.visibility=r}else{V("#"+t,"visibility:"+r)}}function g(s){var r=/[\\\"<>\.;]/;var q=r.exec(s)!=null;return q?encodeURIComponent(s):s}var D=function(){if(h.ie&&h.win){window.attachEvent("onunload",function(){var w=d.length;for(var v=0;v<w;v++){d[v][0].detachEvent(d[v][1],d[v][2])}var t=i.length;for(var u=0;u<t;u++){X(i[u])}for(var r in h){h[r]=null}h=null;for(var q in f1_swfobject21){f1_swfobject21[q]=null}f1_swfobject21=null})}}();return{registerObject:function(u,q,t){if(!h.w3cdom||!u||!q){return }var r={};r.id=u;r.swfVersion=q;r.expressInstall=t?t:false;N[N.length]=r;W(u,false)},getObjectById:function(v){var q=null;if(h.w3cdom){var t=C(v);if(t){var u=t.getElementsByTagName(Q)[0];if(!u||(u&&typeof t.SetVariable!=b)){q=t}else{if(typeof u.SetVariable!=b){q=u}}}}return q},embedSWF:function(x,AE,AB,AD,q,w,r,z,AC){if(!h.w3cdom||!x||!AE||!AB||!AD||!q){return }AB+="";AD+="";if(c(q)){W(AE,false);var AA={};if(AC&&typeof AC===Q){for(var v in AC){if(AC[v]!=Object.prototype[v]){AA[v]=AC[v]}}}AA.data=x;AA.width=AB;AA.height=AD;var y={};if(z&&typeof z===Q){for(var u in z){if(z[u]!=Object.prototype[u]){y[u]=z[u]}}}if(r&&typeof r===Q){for(var t in r){if(r[t]!=Object.prototype[t]){if(typeof y.flashvars!=b){y.flashvars+="&"+t+"="+r[t]}else{y.flashvars=t+"="+r[t]}}}}f(function(){U(AA,y,AE);if(AA.id==AE){W(AE,true)}})}else{if(w&&!A&&c("6.0.65")&&(h.win||h.mac)){A=true;W(AE,false);f(function(){var AF={};AF.id=AF.altContentId=AE;AF.width=AB;AF.height=AD;AF.expressInstall=w;k(AF)})}}},getFlashPlayerVersion:function(){return{major:h.pv[0],minor:h.pv[1],release:h.pv[2]}},hasFlashPlayerVersion:c,createSWF:function(t,r,q){if(h.w3cdom){return U(t,r,q)}else{return undefined}},removeSWF:function(q){if(h.w3cdom){X(q)}},createCSS:function(r,q){if(h.w3cdom){V(r,q)}},addDomLoadEvent:f,addLoadEvent:R,getQueryParamValue:function(v){var u=K.location.search||K.location.hash;if(v==null){return g(u)}if(u){var t=u.substring(1).split("&");for(var r=0;r<t.length;r++){if(t[r].substring(0,t[r].indexOf("="))==v){return g(t[r].substring((t[r].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(A&&M){var q=C(m);if(q){q.parentNode.replaceChild(M,q);if(l){W(l,true);if(h.ie&&h.win){M.style.display="block"}}M=null;l=null;A=false}}}}}();