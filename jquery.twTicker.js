/**
 * "twTicker" jQuery plugin
 *
 * Simple Twitter slideshow.
 *
 * @author     RaNa design associates, inc.
 * @copyright  2010 RaNa design associates, inc.
 * @license    http://www.opensource.org/licenses/mit-license.html  MIT License
 * @version    Release: 1.1
 * @since      2010-09-16
 * @update     2011-10-12
 */

(function($) {
	$.fn.twTicker = function(options) {
		if (!this[0]) { return; }
		// Variable to keep index of instance
		if (!$.twTicker) { $.twTicker = {}; }
		if (!$.twTicker.index) { $.twTicker.index = 0; }

		this.each(function(i) {
			var index = $.twTicker.index;
			var instanceName = "instance" + (index + i);
			// Make new instance in $.twTicker array object
			$.twTicker[instanceName] = new $.TwTicker();
			// Merge options from arguments
			var opt = $.twTicker[instanceName].options;
			$.extend(opt, options);
			// Append wrapper element
			$.twTicker[instanceName].wrapper = $('<div/>', {
					"class": opt.wrapperClassName
				}).appendTo(this);
			// Insert loading image
			$.twTicker[instanceName].showLoadingImg();
			// Insert Twitter script element
			$('<script/>', {
				"src": "/twTicker_proxy.php?q=" + opt.query + "&rpp=" + opt.length + "&callback=jQuery.twTicker.instance" + (index + i) + ".callback"
			}).appendTo("head");
			// Update index of instance
			$.twTicker.index ++;
			// Setting for style
			$(this).addClass(opt.className);
		});

		return this;
	};

	// TwTicker Constructor
	$.TwTicker = function() {
		this.options = {
			query: "from%3Atoptweets_ja",
			// Query Example
			//   %23TagName
			//   from%3AUserName
			length: 5,
			tweetLink: true,
			duration: 20000,
			loading: true,
			loadingImg: "loading.gif",
			loadingImgId: "twTickerLoadingImg",
			className: "twTicker",
			wrapperClassName: "twTickerWrapper",
			datePosition: "after",
			dateFormat: function(y, m, d, hs, ms ,ss) {
				return " (" + y + "-" + m + "-" + d + " " + hs + ":" + ms + ":" + ss + ")";
			}
		};
		this.wrapper = {};
	};

	$.TwTicker.prototype = {
		callback: function(data) {
			var self = this,
				opt = this.options,
				res = data.statuses,
				resLength = data.statuses.length,
				tweetContainers = [];
			this.hideLoadingImg();
			// Prevent query error
			if (!res[0]) { return; }

			// Build Tweet List
			var $twTickerInner = $('<div/>', {"class":"twTickerInner"});
			$.each(res, function(i) {
				var resUser = res[i].user.screen_name,
					resText = res[i].text,
					resDate = res[i].created_at,
					resId = res[i].id_str,
					content = "";
				// Join text data
				content =  resUser + ": " + resText;
				if (opt.datePosition === "before") {
					content = self.createDateText(resDate) + content
				} else {
					content += self.createDateText(resDate)
				}
				content = self.htmlspecialchars(content);
				// Set content link
				if (opt.tweetLink) {
					content = $('<a/>', {
							"href": "http://twitter.com/" + resUser + "/status/" + resId,
							"target": "_blank"
						}).html(content);
				}
				// Tweet container
				tweetContainers[i] = $('<div/>', {"class":"tweet"});
				// Publish
				tweetContainers[i].append(content).appendTo($twTickerInner);
			});

			// Copy Tweet List and append to wrapper
			var $twTickerInner2 = $twTickerInner.clone();
			$(this.wrapper).append($twTickerInner).append($twTickerInner2);

			// Constant variables in animation function
			var boxIndex = 0,
				baseDuration = opt.duration * resLength;
			// Animation function
			function animateTweet() {
				// Animation target box is alternately changed
				var $box = (boxIndex === 0) ? $twTickerInner : $twTickerInner2;
				var boxWidth = $box.width(),
					boxMarginL = $box.css("marginLeft");

				boxMarginL = boxMarginL.slice(0, boxMarginL.indexOf("px"));
				boxMarginL = parseInt(boxMarginL) || 0;
				// Compute remaining distance
				var distance = (boxMarginL === 0) ?
					boxWidth : boxWidth + boxMarginL;
				// Compute animation duration
				var duration = Math.floor(baseDuration * (distance / boxWidth));
				// Animation
				$box.animate({
					"marginLeft": "-=" + distance + "px"
				}, duration, "linear", function() {
					// Change target box
					boxIndex = (boxIndex === 0) ? 1 : 0;
					$box.appendTo(self.wrapper).css({"marginLeft": 0});
					// Recursive Processing
					animateTweet();
				});
			}
			// Initial animation
			animateTweet();
			// If hover to tweet wrapper, stop the animation.
			this.wrapper.hover(function() {
				$twTickerInner.stop();
				$twTickerInner2.stop();
			}, function() {
				animateTweet();
			});
		},
		showLoadingImg: function() {
			var opt = this.options;
			if (opt.loading) {
				var $loadingImg = $('<img/>', {
					"src": opt.loadingImg,
					"id": opt.loadingImgId
				}).appendTo(this.wrapper);
			}
		},
		hideLoadingImg: function() {
			var opt = this.options;
			if (opt.loading) {
				$("#" + opt.loadingImgId).remove();
			}
		},
		createDateText: function(responseDateText) {
			// ResponseDateText example:
			// ["Fri,", "17", "Sep", "2010", "06:28:39", "+0000"]
			var created_at = responseDateText.split(" ");
				// Date string -> Date object
			var d = new Date(created_at[2] + " " + created_at[1] + ", " + created_at[3] + ", " + created_at[4]);
				// UTC -> JST (+9h)
			d.setHours(d.getHours() + 9);
				// If hour/minutes in single digit, add "0" to it's double digit
			var dY = d.getFullYear(),
				dM = d.getMonth() + 1,
				dD = d.getDate(),
				dHs = (d.getHours() + 100).toString().slice(1, 3),
				dMs = (d.getMinutes() + 100).toString().slice(1, 3),
				dSs = (d.getSeconds() + 100).toString().slice(1, 3);
			return this.options.dateFormat(dY,dM,dD,dHs,dMs,dSs);
		},
		htmlspecialchars: function(s) {
			s = s.replace(/&/g,"&amp;").replace(/&amp;amp;/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#039;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
			return s;
		},

		// Below this line, inactive method.
		createUserLink: function(text) {
			text = '<a href="http://twitter.com/' + text + '" target="_blank">' + text + '</a>';
			return text;
		},
		createReplyLink: function(text) {
			text = text.replace(/@([\w_]+)/g, '<a href="http://twitter.com/$1" target="_blank">@$1</a>');
			return text;
		},
		createTagLink: function(text) {
			text = text.replace(/#([\w_]+)/g, '<a href="http://twitter.com/#search?q=%23$1" target="_blank">#$1</a>');
			return text;
		}
	};

})(jQuery);

