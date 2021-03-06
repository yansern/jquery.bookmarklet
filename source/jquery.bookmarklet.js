/**
 * jquery.bookmarklet
 * Generates social bookmarks that doesn't slow down initial page load.
 *
 * Copyright (c) 2012 Jensen Tonne
 * www.jstonne.com
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

$.bookmarklet = function(elem, type, options, callback) {
	var node = this[type].call($(elem), options);

    // On IE9, addEventListener() does not necessary fire the onload event
    // after the script is loaded, therefore we use the attachEvent() method,
    // as it behaves correctly.
    if (node.attachEvent && !$.browser.opera)
    {
        node.attachEvent("onreadystatechange", callback);
    } else {
        node.addEventListener("load", callback, false);
    }
};

$.fn.bookmarklet = function(type, options, callback) {
	var node = this,
		type = type,
		options = options,
		callback = callback;

	$(document).ready(function(){
		$.bookmarklet[type].call(node, options, callback);
	});
};

$.bookmarklet.tweetMeme = function(options) {
	var node = this[0],
		parent = node.parentNode,
		iframe = document.createElement("iframe")

	options.url = options.url.replace(/\+/g, "%2b");

    switch (options.style) {
	    case "compact":
	        var h = 20;
	        var w = 90;
	        break;
	    default:
	        var h = 61;
	        var w = 50;
	        break
    }

    var src = "http://api.tweetmeme.com/button.js?" + $.param(options);

    if (document && document.referrer) {
        var ref = document.referrer;
        if (ref) {
            src += "&o=" + escape(ref)
        }
    }

	parent.insertBefore(iframe, node);
	parent.removeChild(node);

    $(iframe).attr({
    	src: src,
    	width: w,
    	height: h,
    	frameborder: 0,
    	scrolling: "no"
    });

    return iframe;
};

$.bookmarklet.linkedIn = function(options) {
	var node = this[0],
		parent = node.parentNode,
		config = document.createElement("script"),
		script = document.createElement("script");

	$(config)
		.attr({
			"type": "in/share",
			"data-url": options.url,
			"data-counter": options.counter
		});

	parent.insertBefore(config, node);
	parent.insertBefore(script, node);
	parent.removeChild(node);

	$(script)
		.attr({
			type: "text/javascript",
			src: "https://platform.linkedin.com/in.js"
		});

	return script;
};

$.bookmarklet.digg = function(options) {
	var node = this[0],
		parent = node.parentNode,
		button = document.createElement("a"),
		script = document.createElement("script");

	$(button)
		.addClass("DiggThisButton", options.class)
		.attr({
			href: "https://digg.com/submit?url=" + options.url + "&title=" + options.title
		});

	parent.insertBefore(button, node);
	parent.insertBefore(script, node);
	parent.removeChild(node);

	$(script)
		.attr({
			type: "text/javascript",
			async: "true",
			src: "http://widgets.digg.com/buttons.js"
		});

	return script;
};

$.bookmarklet.stumbleUpon = function(options) {
	var node = this[0],
		parent = node.parentNode,
		button = document.createElement("su:badge"),
		script = document.createElement("script");

	$(button)
		.attr({
			layout: options.layout,
			location: options.url
		});

	parent.insertBefore(button, node);
	parent.insertBefore(script, node);
	parent.removeChild(node);

	$(script)
		.attr({
			type: "text/javascript",
			src: "https://platform.stumbleupon.com/1/widgets.js"
		});

	return script;
};

$.bookmarklet.twitter = function(options) {
	var node = this[0],
		parent = node.parentNode,
		button = document.createElement("a"),
		script = document.createElement("script");

	$(button)
		.attr({
			"class": "twitter-share-button",
			"href": "https://twitter.com/share",
			"data-url": options.url,
			"data-counturl": options.url,
			"data-count": options.count
		})
		.html("Tweet");

	parent.insertBefore(button, node);
	parent.insertBefore(script, node);
	parent.removeChild(node);

	$(script)
		.attr({
			type: "text/javascript",
			src: "https://platform.twitter.com/widgets.js"
		});

	return script;
};

$.bookmarklet.googlePlusOne = function(options) {
	var node = this[0],
		parent = node.parentNode,
		button = document.createElement("g:plusone"),
		script = document.createElement("script");

	$(button)
		.attr({
			size: options.size,
			href: options.href
		});

	parent.insertBefore(button, node);
	parent.insertBefore(script, node);
	parent.removeChild(node);

	$(script)
		.attr({
			type: "text/javascript",
			src: "https://apis.google.com/js/plusone.js"
		});

	return script;
};

$.bookmarklet.facebookLike = function(options) {
	var node = this[0],
		parent = node.parentNode,
		root   = document.createElement('div'),
		button = document.createElement("fb:like"),
		script = document.createElement("script");

	root.id = "fb-root";

	$(button)
		.attr({
			href: options.url,
			send: options.send,
			layout: options.layout,
			action: options.verb,
			locale: options.locale,
			colorscheme: options.theme,
			show_faces: options.faces,
		})
		.css({
			height: options.height,
			width: options.width
		});

	parent.insertBefore(button, node);
	parent.insertBefore(root, node);
	parent.insertBefore(script, node);
	parent.removeChild(node);

	$(script)
		.attr({
			type: "text/javascript",
			src: "https://connect.facebook.net/" + options.locale + "/all.js#xfbml=1"
		});

	return script;
};
