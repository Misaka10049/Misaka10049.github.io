var uA=navigator.userAgent;
var isAndroid=(uA.indexOf('Android')!=-1)||(uA.indexOf('Linux')!=-1);
var isIOS=!!uA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
var isWechat=(uA.match(/MicroMessenger/i)=='micromessenger');