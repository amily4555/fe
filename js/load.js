/*
 * load.js
 */
(function( window, undefined ){
	'use strict';
	var l = {}, _ = l;
	window.l = _;

	l.loadScript = function( url, callback ){
		var script = document.createElement("script");
	        script.src = url;
	        script.type = "text/javascript";
	        script.charset = "utf-8";

		if (script.readyState){ // for IE 
			script.onreadystatechange = function(){   
			   if(script.readyState == "loaded" || script.readyState == "complete"){   
					script.onreadystatechange = null; 
					callback && callback();
			   }
			};
		}else { // 标准浏览器
			script.onload = function(){
				callback && callback();
			};
		}

		document.getElementsByTagName("head")[0].appendChild(script);
	};

	l.loadCss = function( url ){
		var istyle = document.createElement('link');
        istyle.href = url;
        istyle.type = "text/css";
        istyle.rel = "stylesheet";
        istyle.async = true;
        document.getElementsByTagName("head")[0].appendChild( istyle );
	};

	l.load = function( arr, callback ){
		var loadjs = function( arr, index, callback ){
			var l = arr.length;
			if( index === l ) {
				callback && callback();
				return false;
			}else if( index == ( l - 1 ) ){
				var o = arr[index];
				if( o.key == "standard" ){
					_.load[ o.key ]( o.data, o.ieData, callback );
				}else{
					_.load[ o.key ]( o.data, callback );
				}
			}else{
				var o = arr[index];
				if ( o.key == "standard" ){
					_.load[ o.key ]( o.data, o.ieData, function(){
						loadjs( arr, index + 1, o.callback );
					});
				}else{
					_.load[ o.key ]( o.data, function(){
						loadjs( arr, index + 1, o.callback );
					});
				}
			}
		}

        loadjs( arr, 0, callback );
	};

	l.load.css = function( arr ){
		for( var i = 0, l = arr.length; i < l; i ++ ){
			_.loadCss( arr[i] );
		}
	};

	//按队列加载
	l.load.queue = function( arr, callback ){
		var queue = function( arr, index, callback ){
			var l = arr.length;
			if( index === l ) {
				return false;
			}else if( index == (l - 1) ){
				_.loadScript( arr[index], callback );
			}else{
				_.loadScript( arr[index], function(){
					queue( arr, index + 1, callback );
				} );
			}
		}

		queue( arr, 0, callback );
	};

	l.load.hash = function( arr, callback ){
		for( var i = 0, l = arr.length; i < l; i ++ ){
			_.loadScript( arr[i], function(){
				if( i === l - 1 ){
					callback && callback();
				}
			});
		}
	};

	l.load.standard = function( arrStandard, arrIE8, callback ){
		var ver = _.ie();
		if( !ver || ver >8 ){
			_.load.queue( arrStandard, callback );
		}else{
			_.load.queue( arrIE8, callback );
		}
	};

	l.load.item = function( item, callback ){
		_.loadScript( item[0], callback );
	};

	
	l.ie = function(){
		var v = 3,
	    div = document.createElement('div'),
	    all = div.getElementsByTagName('i');
	    while (div.innerHTML = '<!--[if gt IE ' + (++v) + ']><I></I><![endif]-->', all[0]);
	    return v > 4 ? v: 0;
	};

	/** ie 版本大于 ie8 和 小于ie8 事件 */
	l.ie.lt8 = function( url1, url2 ){
		var ver = _.ie();
		if( ver && ver >8 ){
			fn2 && fn2();
		}else{
			fn2 && fn2();
		}
	};

	//页面初始化
	l.init = function(){
		var ver = _.ie();

		//IE8 兼容 Angularjs 
		if( ver == 8 ){
			document.createElement('ng-include');
	        document.createElement('ng-pluralize');
	        document.createElement('ng-view');
	 
	        // Optionally these for CSS
	        document.createElement('ng:include');
	        document.createElement('ng:pluralize');
	        document.createElement('ng:view');
		}

		if( ver && ver < 8 ){
			location.href = "ie.html";
		}
	};

	l.init();

})( window );
