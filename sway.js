/* Sway (c) 2016 Benson Pan. MIT @license: en.wikipedia.org/wiki/MIT_License */

/* Note: Sway relies on JQuery and Velocity.js; a copy can be found on VelocityJS.org */

(function ( $ ) {
	var callCount = 0;
	$.fn.sway = function(animation)
	{
		function rgb2hex(rgb) {
			if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;

			rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
			function hex(x) {
				return ("0" + parseInt(x).toString(16)).slice(-2);
			}
			return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
		}
	
		var velocity_param;
		var message;

		for (var key in animation)
		{
			velocity_param = key;
		}
		
		this.each(function(i, obj)
		{
			message = $(this).text();
			$(this).html('');
			callCount++;
			
			while (message != '')
			{
				var indexSpace1 = message.indexOf(' ');
				if (indexSpace1 != -1)
				{
					if (message.indexOf('<br>') == 0)
					{
						$(this).append('<br>');
						message = message.substring(indexSpace1 + 1);
					}
				
					else
					{
						$(this).append('<div class="inner-sway' + callCount + '">' + message.substring(0, indexSpace1) + '</div> ');
						message = message.substring(indexSpace1 + 1);
					}
			
				}
				else
				{
					$(this).append('<div class="inner-sway' + callCount + '">' + message + '</div>');
					message = '';
				}
			}
			
			$('.inner-sway' + callCount).each(function(i, obj)
			{
				var temp = {};
				var ending = {};
				temp[velocity_param] = parseInt(animation[velocity_param]) * -1;
			
				
				if ("scale".indexOf(velocity_param) != -1)
				{
					ending[velocity_param] = 1;
				}
				else if ("fontSizeopacity".indexOf(velocity_param) != -1)
				{
					ending[velocity_param] = $(this).css(velocity_param);
					temp[velocity_param] = $(this).css(velocity_param) / 2;
				}
				else if ("color".indexOf(velocity_param) != -1)
				{
					temp = animation;
					ending[velocity_param] = rgb2hex($(this).css(velocity_param));
				}
				else
				{
					ending[velocity_param] = $(this).css(velocity_param);
				}
				// FOLLOWING ARE NOT SUPPORTED:
				if ("heightwidth".indexOf(velocity_param) == -1)
				{
					$(this).hover(function()
					{
						if ($('.velocity-animating'))
							$(this).stop();
						$(this).velocity(animation, {duration:100, easing: 'easeOutBounce'});
						$(this).velocity(temp, {duration:200, easing: 'easeOutBounce'});
						$(this).velocity(ending, {duration:250, easing: 'easeOutBounce'});
					}, 
					function()
					{
					});
				}	
			
			});
			$('.inner-sway' + callCount).css({'display':'inline-block'});
		
		});
	}
}(jQuery));
