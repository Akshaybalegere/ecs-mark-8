var serviceWorkerOption = {
  "assets": [
    "/static/js/vendor.ef7f820a963dfb70f538.js",
    "/static/js/app.1f791406c5dab57667a0.js",
    "/static/js/manifest.2ae2e69a05c33dfc65f8.js",
    "/static/css/app.45aaf63e5e1d21fd1481b578de676226.css"
  ]
};
        
        !function(t){var i={};function n(o){if(i[o])return i[o].exports;var e=i[o]={i:o,l:!1,exports:{}};return t[o].call(e.exports,e,e.exports,n),e.l=!0,e.exports}n.m=t,n.c=i,n.d=function(t,i,o){n.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:o})},n.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(i,"a",i),i},n.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},n.p="/",n(n.s="3gGW")}({"3gGW":function(t,i){self.addEventListener("push",function(t){var i=t.data&&t.data.json();if(i){var n={badge:"https://storage.googleapis.com/public.pratilipi.com/pratilipi-logo/png/ic_launcher.png",body:i.summary,icon:"https://storage.googleapis.com/public.pratilipi.com/pratilipi-logo/png/Logo-2C-RGB-200px.png",data:i};t.waitUntil(self.registration.showNotification(i.displayTitle,n))}}),self.addEventListener("notificationclick",function(t){t.notification.close(),t.waitUntil(clients.openWindow(t.notification.data.pageUrl))})}});
//# sourceMappingURL=sw.js.map