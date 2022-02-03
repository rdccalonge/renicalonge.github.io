// (c) 2020 Joystick Interactive | Nep

(function() {
/**-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=->
 * SET UP ALL ASSETS HERE
 * - pre_images
 * - post_images
 * - JS
 * - CSS
 * - HTML
 */
var TX_Config = (function() {

	var preloaded = 0,
	
	pre_images = [
		// ['#id','url'], ['.class','url'],
		
	],

	post_images = [
		['#s2_background','https://media.truex.com/image_assets/2021-02-12/956c2721-5753-4865-b643-5fa03edc83b4.jpg'],
		['#s2_copy','https://media.truex.com/image_assets/2021-02-12/9ec00394-1cc4-4675-991c-a6a712eec8cd.png'],
		['#logo','https://media.truex.com/image_assets/2021-02-12/20dd64b0-d919-4427-b5a9-aea5564adc8e.png'],
		['.hs_txt','https://media.truex.com/image_assets/2021-02-12/5f5f19aa-ea70-493c-96b5-23a9a5845dfe.png'],
		['.spr_cta','https://media.truex.com/image_assets/2021-02-12/9a98f09b-248b-4c97-96be-1905a2fd152a.png'],
		['#img_close','https://media.truex.com/image_assets/2021-02-12/23daeea2-008e-4575-b5dd-4e5633e726ac.png'],
	],

	JS = [
		'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.1/gsap.min.js',
	],

	CSS = 'https://media.truex.com/file_assets/2021-02-12/983d2a47-4d71-4351-8aa3-476068ecfec6.css',

	HTML = 'https://media.truex.com/file_assets/2021-02-12/46282cfc-5304-4ca0-af46-49f00515ff92.html',

	init = function() {
		TXM.dispatcher.addEventListenerOnce('ENGAGEMENT_STARTED', started);
		TXM.dispatcher.addEventListenerOnce('ENGAGEMENT_ENDED', ended);
		load_images(pre_images);
		load_layout(CSS);
		load_layout(HTML);
		load_js(JS);
	},

	update_progress = function() {
		const total_assets = pre_images.length + JS.length + 2;
		preloaded++;		
		TXM.dispatcher.dispatchEvent('ENGAGEMENT_ASSET_LOADING_PROGRESS', preloaded / total_assets);
		if(preloaded == total_assets) complete();
	},

	load_images = function(urls) {
		for (let i = 0; i < urls.length; i++) {
			let url = urls[i][1];
			if(urls == post_images) $('<img />').attr('src', url);
			else $('<img />').attr('src', url).load(update_progress);
		}
	},

	load_layout = function(url) {
		$.ajax({ url:url, dataType:'text', success:loaded });
		function loaded(data) {
			if(url == HTML) $('#ad_stage').html(data);
			else $('<style></style>').append(data).appendTo('head');
			update_progress();
		}
	},

	load_js = function(urls) {
		for (let i = 0; i < urls.length; i++) {
			let url = urls[i];
			$.getScript(url, update_progress);
		}
	},

	complete = function() {
		let all_images = pre_images.concat(post_images);

		for (let i = 0; i < all_images.length; i++) {
			$(all_images[i][0]).css('background-image', 'url(' + all_images[i][1] + ')');
		}

		$(TX_Var.button).on( 'click' , TX_Button.MOUSECLICK);
		if(TX_Var.desktop) {
			$(TX_Var.button).css('cursor','pointer');
			$(TX_Var.button).hover(TX_Button.MOUSEOVER, TX_Button.MOUSEOUT);
		}

		TXM.dispatcher.dispatchEvent('INTERACTIVE_ASSET_READY');

		TX_API.initclick();
		TX_API.autoscale();
		TX_Content.STEP_1();

		setTimeout(function(){ load_images(post_images); },1000);
	},
	
	started = function() {
		// CONSOLE LOG FOR MOBILE (UNCOMMENT ONLY FOR TESTING)
		/*$(TX_Var.container).append($('<div>', {
			id: 'console',
			width: 960,
			height: 30,
			css:{
				bottom: 0,
				left: 0,
				background: 'rgba(0,0,0,0.6)',
				color: 'yellow',
				fontFamily: 'Arial, Helvetica, sans-serif',
				fontSize: '120%',
				textAlign: 'center',
				lineHeight: '150%',
				pointerEvents: 'none',
				zIndex: 5
			},
			end: TX_Var.console = '#console'
		}));

		$(TX_Var.console).html('status');*/

		if(typeof TX_Video !== "undefined" && typeof TX_Video.AUTOPLAY == "number" ) {
			let tmr_autoplay = setInterval(function(){
				if(TX_Video.READY) {
					clearInterval(tmr_autoplay);
					$('<img />').attr('src', TX_Video.VIDEOS[TX_Video.AUTOPLAY].preview).load(TX_Video.LOAD(TX_Video.AUTOPLAY));
				}
			},200);
		}
	},

	ended = function() {
		if(typeof TX_Audio !== "undefined") Howler.unload();

		if(typeof TX_Vast !== "undefined") TX_Vast.DESTROY();

		if(typeof TX_Video !== "undefined") {
			try { if( !$(TX_Video.content)[0].muted) TX_Video.MUTE(); } catch(e) {}
			try { if( !$(TX_Video.content)[0].paused)TX_Video.PAUSE(); } catch(e) {}
			TX_Video.DESTROY();
		}
	};

	return {
		init		: init,
		pre_images	: pre_images,
		pos_images	: post_images,
		started		: started,
		ended		: ended
	};

})();

/**-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=->
 * UTILITY, NOTHING TO EDIT HERE
 */	
var TX_API = {

	initclick: function(e) {
		$(window).on('click', initialClicked);

		function initialClicked() {
			$(window).off('click');

			if(typeof TX_Video !== 'undefined') {
				TX_Video.SOUND_DISABLED = false;
				try { 
					if( !TX_Video.STATUS._100 ) {
						if( $(TX_Video.content)[0].paused && $(TX_Video.content).is(':visible')) TX_Video.PLAY();
						if( $(TX_Video.content)[0].muted ) TX_Video.UNMUTE();
					} 
				} catch(e) {}
			}

			if(typeof TX_Vast !== 'undefined') {
				TX_Vast.SOUND_DISABLED = false;
				try { if( adsManager.getVolume() == TX_Var.zero ) TX_Vast.UNMUTE(); } catch(e) {}
			}
		}
	},

	clickthru: function(trackname, end_on_trueattention) {
		if( TXM.api.true_attention.completed && end_on_trueattention ) {
			TX_Config.ended();
			TXM.api.endEngage();
		}
		TXM.utils.popupWebsite( trackname );
	},

	track: function(trackname) {
		TXM.api.track( 'other', trackname );
	},

	clickdelay: function(sec) {
		TX_Var.isButtonReady = false;
		setTimeout(function(){
			TX_Var.isButtonReady = true;
		},sec*1000);
	},

	autoscale: function() {
		$(window).resize(updateScale);
		updateScale();

		function updateScale() {
			var transform = $('#ad_container').css('transform');
			if(transform != 'none') {
				try {
					var values = transform.split('(')[1];
					values = values.split(')')[0];
					values = values.split(',');
					var a = values[0];
					var b = values[1];
					TX_Var.stageScale = Math.sqrt(a*a + b*b);
				}
				catch(e) {
					TX_Var.stageScale = 1;
				}
			}
			else {
				TX_Var.stageScale = 1;
			}

		}
	},

	timespent: function() {
		return TXM.utils.timeSpent();
	},

	mobile: {
		Android: function() {
			return navigator.userAgent.match(/Android/i) ? true : false;
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i) ? true : false;
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
		},
		iPad: function() {
			return navigator.userAgent.match(/iPad/i) ? true : false;
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i) ? true : false;
		},
		any: function() {
			return (TX_API.mobile.Android() || TX_API.mobile.BlackBerry() || TX_API.mobile.iOS() || TX_API.mobile.Windows());
		}
	},

	browser: {
		Chrome: function() {
			return navigator.userAgent.match(/Chrome/i) ? true : false;
		},
		Firefox: function() {
			return navigator.userAgent.match(/Firefox/i) ? true : false;
		},
		Safari: function() {
			return (navigator.userAgent.match(/Safari/i) && !TX_API.browser.Chrome()) ? true : false;
		},
		IE10: function() {
			return navigator.userAgent.match(/MSIE/i) ? true : false;
		},
		IE11: function() {
			return navigator.userAgent.match(/Trident/i) ? true : false;
		},
		Edge: function() {
			return navigator.userAgent.match(/Edge/i) ? true : false;
		},
		Kik: function() {
			return navigator.userAgent.match(/Kik/i) ? true : false;
		},
		Explorer: function() {
			return (TX_API.browser.IE10() || TX_API.browser.IE11() || TX_API.browser.Edge());
		}
	}
};

/**-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=->
 * SET UP ALL USER INTERACTIONS HERE [class='button']
 * TX_API.clickthru('trackname', false);
 * TX_API.track('trackname');
 */
var TX_Button = {

	MOUSECLICK: function(e) {
		if(!TX_Var.isButtonReady) return;
		TX_API.clickdelay(0.2);
		switch (this.id) {
			case 'btn_cta':
				TX_API.clickthru('Learn ' + TX_Var.tracker[TX_Var.current], false);
				break;
			case 'btn_hs_txt_0':
			case 'btn_hs_img_0':
				TX_API.track('Traffic');
				TX_Content.STEP_3(0);
				break;
			case 'btn_hs_txt_1':
			case 'btn_hs_img_1':
				TX_API.track('Package');
				TX_Content.STEP_3(1);
				break;
			case 'btn_hs_txt_2':
			case 'btn_hs_img_2':
				TX_API.track('Homework');
				TX_Content.STEP_3(2);
				break;
			case 'btn_hs_txt_3':
			case 'btn_hs_img_3':
				TX_API.track('Show');
				TX_Content.STEP_3(3);
				break;
			case 'btn_close':
				TX_API.track('X ' + TX_Var.tracker[TX_Var.current]);
				TX_Video.STOP();
				gsap.to(['#STEP_3','#container #vid_container'], 0.5, { opacity:0, onComplete: TX_Content.STEP_2 });
				break;
		}
	},

	MOUSEOVER: function(e) {
		switch (this.id) {
			case 'btn_hs_txt_0':
			case 'btn_hs_img_0':
				gsap.to(".hs_txt.hs_txt_0",0.2, {opacity:0});
				gsap.to(".hs_txt.hs_txt_0.hs_txt_hover",0.2, {opacity:1});
				gsap.to(".hs_img_hover_0",0.2, {opacity:1});
				break;
			case 'btn_hs_txt_1':
			case 'btn_hs_img_1':
				gsap.to(".hs_txt.hs_txt_1",0.2, {opacity:0});
				gsap.to(".hs_txt.hs_txt_1.hs_txt_hover",0.2, {opacity:1});
				gsap.to(".hs_img_hover_1",0.2, {opacity:1});
				break;
			case 'btn_hs_txt_2':
			case 'btn_hs_img_2':
				gsap.to(".hs_txt.hs_txt_2",0.2, {opacity:0});
				gsap.to(".hs_txt.hs_txt_2.hs_txt_hover",0.2, {opacity:1});
				gsap.to(".hs_img_hover_2",0.2, {opacity:1});
				break;
			case 'btn_hs_txt_3':
			case 'btn_hs_img_3':
				gsap.to(".hs_txt.hs_txt_3",0.2, {opacity:0});
				gsap.to(".hs_txt.hs_txt_3.hs_txt_hover",0.2, {opacity:1});
				gsap.to(".hs_img_hover_3",0.2, {opacity:1});
				break;
			case 'btn_cta':
				gsap.to("#cta_static",0.2, {opacity:0});
				gsap.to("#cta_hover",0.2, {opacity:1});
				break;
			case 'btn_close':
				gsap.to('#img_close', 0.2, {z:0.001, scale:0.9});
				break;
		}
	},

	MOUSEOUT: function(e) {
		switch (this.id) {
			case 'btn_hs_txt_0':
			case 'btn_hs_img_0':
				gsap.to(".hs_txt.hs_txt_0",0.2, {opacity:1});
				gsap.to(".hs_txt.hs_txt_0.hs_txt_hover",0.2, {opacity:0});
				gsap.to(".hs_img_hover_0",0.2, {opacity:0});
				break;
			case 'btn_hs_txt_1':
			case 'btn_hs_img_1':
				gsap.to(".hs_txt.hs_txt_1",0.2, {opacity:1});
				gsap.to(".hs_txt.hs_txt_1.hs_txt_hover",0.2, {opacity:0});
				gsap.to(".hs_img_hover_1",0.2, {opacity:0});
				break;
			case 'btn_hs_txt_2':
			case 'btn_hs_img_2':
				gsap.to(".hs_txt.hs_txt_2",0.2, {opacity:1});
				gsap.to(".hs_txt.hs_txt_2.hs_txt_hover",0.2, {opacity:0});
				gsap.to(".hs_img_hover_2",0.2, {opacity:0});
				break;
			case 'btn_hs_txt_3':
			case 'btn_hs_img_3':
				gsap.to(".hs_txt.hs_txt_3",0.2, {opacity:1});
				gsap.to(".hs_txt.hs_txt_3.hs_txt_hover",0.2, {opacity:0});
				gsap.to(".hs_img_hover_3",0.2, {opacity:0});
				break;
			case 'btn_cta':
				gsap.to("#cta_static",0.2, {opacity:1});
				gsap.to("#cta_hover",0.2, {opacity:0});
				break;
			case 'btn_close':
				gsap.to('#img_close', 0.2, {z:0.001, scale:1});
				break;
		}
	}

};

/**-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=->
 * SET UP ALL GLOBAL VARIABLES HERE
 */	
var TX_Var = {

	desktop: 			TXM.params.desktop ? true : false,
	zero:				0,
	stageScale:			1,
	isButtonReady:		true,
	container:			'#container',
	button:				'#container .button',
	current:			null,
	tracker:			['Traffic','Package','Homework','Show'],
	INTRO:				true

};

/**-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=->
 * SET UP ALL CONTENTS HERE
 */
var TX_Content = {

	STEP_1: function() {
		if(TXM.params.current_step >=2) {
			TXM.params.last_step_index = false;
			TXM.api.setCurrentStep(1);
		}

		TX_Carousel.INIT();
		TX_Video.INIT(2);
	},

	STEP_2: function() {
		TXM.api.setCurrentStep(2);
		$('#STEP_2').show();
		$('#STEP_3').hide();
		$('#container #vid_container').hide();
	},

	STEP_3: function(num) {
		TXM.api.setCurrentStep(3);
		TX_Var.current = num;
		CSSPlugin.defaultTransformPerspective = 1000;
		TX_Carousel.FORCE_ACTIVE(TX_Var.current);
		gsap.fromTo(['#STEP_3','#container #vid_container'], 0.5, {display:'block', opacity:0}, {opacity:1});
		TX_Video.LOAD(TX_Var.current);
	},

	SWAP_VIDEO: function() {
		TX_Video.STOP();
		gsap.to('#container #vid_container', 0.3, {opacity:0, onComplete: function(){
			gsap.to('#container #vid_container', 0.3, {opacity:1, onComplete: function(){
				TX_Video.LOAD(TX_Var.current);
			}});
		}});
	}
};

/********************************************************************** CAROUSEL
 * CREATE CAROUSEL | TX_Carousel.INIT();
 */
var TX_Carousel = (function() {
	
    var script = 'https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js',
    
    ASSETS = [
        ['.carousel_img_nav','https://media.truex.com/image_assets/2021-02-12/9f1a19a2-809f-4828-b8fa-cb5c215101e5.png'],
        
	],
	
	IMAGES = [
		['#carousel_pic0','https://media.truex.com/image_assets/2021-02-12/2c3a7040-f88a-4b5a-92ba-03bd17c11703.png'],
		['#carousel_pic1','https://media.truex.com/image_assets/2021-02-12/2c3a7040-f88a-4b5a-92ba-03bd17c11703.png'],
		['#carousel_pic2','https://media.truex.com/image_assets/2021-02-12/2c3a7040-f88a-4b5a-92ba-03bd17c11703.png'],
		['#carousel_pic3','https://media.truex.com/image_assets/2021-02-12/2c3a7040-f88a-4b5a-92ba-03bd17c11703.png'],
    ],
    
    TEXTS = [
		['#carousel_txt0','https://media.truex.com/image_assets/2021-02-12/c79b92c2-c9e9-484d-b0f8-b769f2c31c0f.png'],
		['#carousel_txt1','https://media.truex.com/image_assets/2021-02-13/3bc38dab-ae8c-4feb-b67c-1daa8fc4fd86.png'],
		['#carousel_txt2','https://media.truex.com/image_assets/2021-02-13/24be32ca-7a62-4604-9fd7-f34e6e2c99bf.png'],
		['#carousel_txt3','https://qa-media.truex.com/image_assets/optimized/2021-02-17/d5352a18d7fa3d6a041d57eccba277d8.png'],
	],

    container 				= '#container #carousel_container',
	content 				= '#container #carousel_content',
	indicator 				= '#container #carousel_indicator',
	indicators 				= '#container .carousel_indicators',
	btn_nav 				= '#container .carousel_btn_nav',
	btn_navleft 			= '#container #carousel_btn_navleft',
	btn_navright 			= '#container #carousel_btn_navright',
	img_nav 				= '#container .carousel_img_nav',
	pics 					= '#container .carousel_pics',

    img_length        		= IMAGES.length,
    all_images 				= ASSETS.concat(IMAGES),	
    positions          		= [],
    active            		= 0,
    
	INIT = function() {
		if(TX_Var.desktop) CONFIG();
		else $.getScript(script, CONFIG);
	},

	CONFIG = function() {
		
		let _containerLeft          = 0,
            _containerTop           = 0,
            _containerWidth         = 960,
			_containerHeight        = 500,
			_containerColor         = 'rgba(0,0,0,0.5)',

            _contentWidth       = 960,
            _contentHeight      = 500,

			_indicatorDisplay   = 'block',
            _indicatorSize      = 10,
            _indicatorBottom    = -100,
            _indicatorSpace     = 5,
            _indicatorBorder    = '1px solid white',

            _navWidth           = 39,
            _navHeight          = 50,
			_navSpace           = 18;
					
		$('#STEP_3').prepend(
			
			"<div id='carousel_container'>" +
				"<div id='carousel_content'></div>" +
				"<div id='carousel_indicator' class='centerX'></div>" +
				"<div id='carousel_btn_navleft' class='carousel_btn_nav centerY'>" +
					"<div class='carousel_img_nav'></div>" +
				"</div>" +
				"<div id='carousel_btn_navright' class='carousel_btn_nav centerY'>" +
					"<div class='carousel_img_nav'></div>" + 
				"</div>" +
			"</div>"			
		);

		$(container).css({
			left: _containerLeft,
			top: _containerTop,
			width: _containerWidth,
			height: _containerHeight,
			backgroundColor: _containerColor,
			overflow: 'hidden'
		});
		
        $(content).css({
            width:              _contentWidth * img_length + _contentWidth,
            height:             _contentHeight
        });
        
        $(indicator).css({
			display:			_indicatorDisplay,
            bottom:             _indicatorBottom,
            width:              _indicatorSize * img_length + _indicatorSpace * img_length - _indicatorSpace,
            height:             _indicatorSize
        });
                
        $(btn_nav).css({
			top:				-14,
            width:              _navWidth,
            height:             _navHeight,
            backgroundColor:    'rgba(0,0,0,0)'
        });
        
        $(btn_navleft).css({
            left:              _navSpace
        });
        
        $(btn_navright).css({
            right:              _navSpace,
            transform:          'translateZ(0) rotate(180deg)'
        });
        
        $(img_nav).css({
            width:              _navWidth,
            height:             _navHeight,
            backgroundPosition: 'center'
        });
                
        for (let i = 0; i < img_length; i++) {
            
            $(content).append($('<div>', {
				id:             'carousel_pic'+i,
                class:          'carousel_pics',
                width:          _contentWidth,
                height:         _contentHeight,
                css: {
                    position:           'relative',
                    float:              'left',
                    backgroundImage:    'url(' + IMAGES[i][1] + ')'
                    
                }
            }));

            $(indicator).append($('<div>', {
                id:             'carousel_indicator_' + i, 
                class:          'carousel_indicators',
                width:          _indicatorSize,
                height:         _indicatorSize,
                css: {
                    border:             _indicatorBorder,
                    borderRadius:       _indicatorSize,
                    boxSizing:          'border-box',
                    position:           'relative',
                    float:              'left'
                }
            }));

            $('#carousel_pic'+i).append($('<div>', {
                id:             'carousel_txt'+i,
                class:          'carousel_txt',
                width:          _contentWidth,
                height:         _contentHeight,
                css: {
                    position:           'absolute',
                    backgroundImage:    'url(' + TEXTS[i][1] + ')'
                }
			}));
            
            $(indicator).append($('<div>', {
                class:          'carousel_space',
                width:          _indicatorSpace,
                height:         _indicatorSize,
                css: {
                    position:           'relative',
                    float:              'left',                    
                }
            }));
            
            // update positions
            positions.push(-Math.abs(i*_contentWidth));
		}
        
        // additional image
        $(content).append($('<div>', {
            class:          'carousel_pics',
            width:          _contentWidth,
            height:         _contentHeight,
            css: {
                position:           'relative',
                float:              'left',
                backgroundImage:    'url(' + IMAGES[0][1] + ')'
            }
		}));		
        positions.push(-Math.abs(img_length*_contentWidth));

		// update background images
		for (let i = 0; i < ASSETS.length; i++) {
			$(ASSETS[i][0]).css('background-image', 'url(' + ASSETS[i][1] + ')');
		}

		// remove JQuery Mobile defaults
		if(!TX_Var.desktop) {
			$.mobile.loading().hide();  /* Remove Loading Text */ 
			$.mobile.autoInitializePage = false; /* Remove Blue Border */ 
        }
        
        ADD_EVENTS();
        UPDATE_INDICATOR();	
	},

	ADD_EVENTS = function() {
		$(btn_navleft).on( 'click' , NAVLEFT);
        $(btn_navright).on( 'click' , NAVRIGHT);
		if(TX_Var.desktop) {
			$(btn_nav).css('cursor','pointer');	
			$(btn_nav).hover(MOUSEOVER, MOUSEOUT);
		} else {
			$(content).on('swipeleft', NAVRIGHT); 
			$(content).on('swiperight', NAVLEFT);
		}
	},

	FORCE_ACTIVE = function(num){
		active = num;
		gsap.to(content,0, {alpha:0, onComplete: function() {
			gsap.fromTo(content, 0, {x: positions[active]}, {alpha:1, onComplete: function() {
				$(btn_nav).css({pointerEvents:'auto'});
			}});
        }}); 

		$(btn_nav).show();		
		if(active <= TX_Var.zero) {
			$(btn_navleft).hide();
		}
		else if(active >= 3) {
			$(btn_navright).hide();
		}

		gsap.set('#btn_cta', {opacity:1});

	},

	NAVLEFT  = function(e) {
		if(active === 0) return;
        $(btn_nav).css({pointerEvents:'none'});
		TX_API.track('arrow'); 

        if(active === 0) {
            active = img_length - 1;
            gsap.set(content, {x: positions[img_length]});
        } else {
            active--;
		}   

        // animate slide
        /* gsap.to(content, 0.5, {x: positions[active], onComplete: function() {
            $(btn_nav).css({pointerEvents:'auto'});
        }}); */

        
        // animate alpha
        gsap.to(content, 0.2, {alpha:0, onComplete: function() {
			gsap.fromTo(content, 0.5, {x: positions[active]}, {alpha:1, onComplete: function() {
				$(btn_nav).css({pointerEvents:'auto'});
			}});
        }}); 
        
        UPDATE_INDICATOR();
	},
    
    NAVRIGHT = function(e) {
		if(active === 3) return;
        $(btn_nav).css({pointerEvents:'none'});        
		TX_API.track('arrow');        

        active++;
        
        // animate slide
        /* gsap.to(content, 0.5, {x: positions[active], onComplete: function() {
            if(active == img_length) {
                active = 0;
                gsap.set(content, {x: positions[active]});
            }
            $(btn_nav).css({pointerEvents:'auto'});
        }}); */

        
        // animate alpha
		gsap.to(content, 0.2, {alpha:0, onComplete: function() {
			if(active == img_length) active = 0;
			gsap.fromTo(content, 0.3, {x: positions[active]}, {alpha:1, onComplete: function() {				
				$(btn_nav).css({pointerEvents:'auto'});
			}});
        }});

        UPDATE_INDICATOR();
	},
    
	MOUSEOVER = function(e) {
        gsap.to('#' + this.id + ' .carousel_img_nav', 0.2, {z:0.001, scale:0.9});
	},

	MOUSEOUT = function(e) {
        gsap.to('#' + this.id + ' .carousel_img_nav', 0.2, {z:0.001, scale:1});
	},

    UPDATE_INDICATOR = function() {
		let indicator = '#container #carousel_indicator_' + active;
		if(active == img_length) indicator = '#container #carousel_indicator_0';
        gsap.to(indicators, 0.5, {backgroundColor: 'transparent'});        
        gsap.to(indicator, 0.5, {backgroundColor: 'white'});
		TX_Var.current = active;

		$(btn_nav).show();
		if(active <= TX_Var.zero) {
			$(btn_navleft).hide();
		}
		else if(active >= img_length-1) {
			$(btn_navright).hide();
		}
		gsap.to('#btn_cta', 0.3,{opacity:0, onComplete: function(){
			gsap.to('#btn_cta', 0.3, {opacity:1});
		}});

		if(!TX_Var.INTRO)TX_Content.SWAP_VIDEO();
	};

	// add all images to preload
	for (let i = 0; i < all_images.length; i++) {
		TX_Config.pos_images.push(all_images[i]);
	}
	
	return {
		INIT : INIT,
		FORCE_ACTIVE : FORCE_ACTIVE
	};
	
})();

/********************************************************************** VIDEO
 * TX_Video.INIT(); 				- create video
 * AUTOPLAY 						- num / false
 * TX_Video.LOAD(num); 				- load new video
 * TX_Video.MINIMIZE(x,y,scale);	- minimize video
 * TX_Video.MAXIMIZE();				- maximize video
 * TX_Video.PLAY();					- play video
 * TX_Video.PAUSE();				- pause video
 * TX_Video.STOP();					- stop video
 * TX_Video.MUTE();					- mute video
 * TX_Video.UNMUTE();				- unmute video
 */
var TX_Video = {

	ASSETS: [
		['#vid_play','https://media.truex.com/image_assets/2018-11-04/94794111-c105-4943-b227-e2d38aa8ca45.png'],
		['#vid_replay','https://media.truex.com/image_assets/2020-03-19/a51551db-d4b9-4899-96ba-16f70abab327.png'],
		['#vid_unmute','https://media.truex.com/image_assets/2020-03-31/35db18eb-a709-46d7-b80f-5c0fc446e380.png'],
		['#vid_unmute_mob','https://media.truex.com/image_assets/2018-04-03/7ccd9d86-998f-42c9-8551-86dac4cf7db6.png'],
	],

	AUTOPLAY: 2,

	VIDEOS: [
		{
			source:      TXM.params.Traffic,
			trackname:	 'Traffic',
			trackreplay: 'Traffic Replay',
			preview:	 'https://media.truex.com/image_assets/2021-02-13/33e14686-4768-45b1-a678-9c715c5e7e04.jpg',
			endscreen:	 'https://media.truex.com/image_assets/2021-02-12/9ce75065-d702-40d1-a85d-64b14c4078c3.jpg'
		},
		{
			source:      TXM.params.Package,
			trackname:	 'Package',
			trackreplay: 'Package Replay',
			preview:	 'https://media.truex.com/image_assets/2021-02-13/ab96b697-583f-499b-a132-50ada1e146dd.jpg',
			endscreen:	 'https://media.truex.com/image_assets/2021-02-12/ef3bd1f4-ebc5-4961-b7b8-4abe06e04889.jpg'
		},
		{
			source:      TXM.params.Homework,
			trackname:	 'Homework',
			trackreplay: 'Homework Replay',
			preview:	 'https://media.truex.com/image_assets/2021-02-13/1b75f954-5a63-40a0-8447-b2f368f28964.jpg',
			endscreen:	 'https://media.truex.com/image_assets/2021-02-12/1dcae70e-c0f6-4077-993f-92622e82c60e.jpg'
		},
		{
			source:      TXM.params.Show,
			trackname:	 'Show',
			trackreplay: 'Show Replay',
			preview:	 'https://media.truex.com/image_assets/2021-02-13/eb8a0488-55da-4032-a599-54300475fd9d.jpg',
			endscreen:	 'https://media.truex.com/image_assets/2021-02-12/e252808f-b52b-40d8-82fc-4b91b3798858.jpg'
		},
	],

	INIT: function(autoplay) {
		this.CONFIG();

		// add placeholder videos
		if( !this.VIDEOS[0].source ) this.PLACEHOLDER();
		
		if( TX_Var.desktop ) $(this.btn_vid).css('cursor', 'pointer');
		else $(this.btn_unmute).css({backgroundImage: 'url(' + this.ASSETS[3][1] + ')'});
		
		// this will unmute video if allowed
		if( !this.SOUND_DISABLED ) {
			$(this.content)[0].removeAttribute('muted');
			this.UNMUTE();
		}
		
		// add button listener
		$(this.btn_unmute).on( 'click' , this.UNMUTE);
		$(this.btn_play).on( 'click' , this.PLAY);

		// autoplay
		if( autoplay >= 0 && autoplay <= this.VIDEOS.length ) this.AUTOPLAY = autoplay;
	},

    CONFIG: function() {        
		let _videoLeft          = 0,
            _videoTop           = -20,
            _videoWidth         = 960,
            _videoHeight        = 540,
            _videoCenter        = true;
		
		this.container          = '#container #vid_container';
		this.player 		    = '#container #vid_player';
		this.content 		    = '#container #vid_content';
		this.btn_unmute         = '#container #vid_unmute';
		this.btn_play           = '#container #vid_play';
		this.btn_vid            = '#container .btn_vid';
        this.CURRENT            = 0;
        this.STATUS             = { _0: false, _25: false, _50: false, _75: false, _100: false };
        this.SOUND_DISABLED     = TXM.params.autoplay_with_sound_disabled;
        
        $(TX_Var.container).append(
            "<div id='vid_container'>" +
                "<div id='vid_player'>" +
                    "<video id='vid_content' preload='none' poster='https://media.truex.com/image_assets/2018-11-20/5133bcfb-082e-4973-ae38-0e0aa9c5eaea.png' muted playsinline webkit-playsinline></video>" +
                "</div>" +
                "<div id='vid_unmute' class='btn_vid'></div>" +
                "<div id='vid_play' class='btn_vid'></div>" +
            "</div>" 
        ).append( function(){ TX_Video.READY = true; } );

		$(this.container).css({
			display: 'none',
			left: _videoLeft,
			top: _videoTop,
			width: _videoWidth,
			height: _videoHeight,
			backgroundColor: 'transparent',
			backgroundSize: 'cover',
			backgroundRepeat: 'no-repeat',
			overflow: 'hidden',
		});

		$(this.player).css({
			pointerEvents: 'none',
			left: '0px',
			top: '0px',
			width: '100%',
			height: '100%',
			opacity: 0
		});

		$(this.content).css({
			width: '100%',
			height: '100%'
		});
		
		$(this.btn_vid).css({
			display: 'none',
			left: '0px',
			top: '0px',
			width: '100%',
			height: '100%',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
            backgroundSize: 'auto'
		});
		
        for (let i = 0; i < this.ASSETS.length; i++) {
			$(this.ASSETS[i][0]).css('background-image', 'url(' + this.ASSETS[i][1] + ')');
		}
		
		if( _videoCenter ) $(this.container).addClass('center');
	},
    
    PLACEHOLDER: function() {
                let count   = 0,
            url     = [
                'https://media.truex.com/video_assets/2021-02-08/a071c6ef-a029-43e3-a66a-8c0c2db8eccd_large.mp4',
				'https://media.truex.com/video_assets/2021-02-08/522ad916-ffb0-4923-9d25-281e9464d2a6_large.mp4',
				'https://media.truex.com/video_assets/2021-02-08/4351e445-05e0-4dd9-adac-d1eb1fe24e94_large.mp4',
				'https://media.truex.com/video_assets/2021-02-08/68740f1e-14cd-48b4-a560-ebd6f6ce8143_large.mp4'
            ];

		for (let i = 0; i < this.VIDEOS.length; i++) {

			if( !this.VIDEOS[i].source ) {
				this.VIDEOS[i].source = url[count];
				if( count >= url.length ) count = 0;
				else count++;
			}
		}
        
        this.SOUND_DISABLED = true;
    },

	LOAD: function(num) {
		this.CURRENT = num;
		
		this.DESTROY();
		
		$(this.container).css({
			backgroundImage: 'url(' + this.VIDEOS[num].preview + ')',
			display: 'block'
		});
		
		$(this.content).on('play', this.START);
		$(this.content).on('ended', this.END);
		$(this.content).on('timeupdate', this.PROGRESS);
		
		$(this.content)[0].src = this.VIDEOS[num].source;
		$(this.content)[0].load();
		$(this.content)[0].play();

		this.STATUS._100 = false;
	},

	START: function(e) {
		if( TX_Video.VIDEOS[TX_Video.CURRENT].is_replay ) TX_Video.TRACK('video_replay');
        TX_Video.VIDEOS[TX_Video.CURRENT].is_replay = false;
		
		$(TX_Video.btn_play).css({
			display: 'none',
			backgroundImage: 'url(' + TX_Video.ASSETS[0][1] + ')',
			backgroundColor: 'transparent'
		});

	},

	PROGRESS: function(e) {
		let progress = e.currentTarget.currentTime / e.currentTarget.duration;

		if( !TX_Video.STATUS._0 && e.currentTarget.currentTime >= 0.01 ) {
			TX_Video.STATUS._0 = true;
			TX_Video.TRACK('video_started');
			$(TX_Video.player).css('opacity', 1);
			$(TX_Video.container).css({backgroundImage: 'none'});

			if(!TX_Video.SOUND_DISABLED) TX_Video.UNMUTE();
			if( $(TX_Video.content)[0].muted ) $(TX_Video.btn_unmute).show();
			TX_Video.focus_interval = setInterval( TX_Video.INTERVAL, 1000);

		}
		else if( !TX_Video.STATUS._25 && progress >= 0.25 ) {
			TX_Video.STATUS._25 = true;
			TX_Video.TRACK('video_first_quartile');
		}
		else if ( !TX_Video.STATUS._50 && progress >= 0.50 ) {
			TX_Video.STATUS._50 = true;
			TX_Video.TRACK('video_second_quartile');
		}
		else if ( !TX_Video.STATUS._75 && progress >= 0.75 ) {
			TX_Video.STATUS._75 = true;
			TX_Video.TRACK('video_third_quartile');
		}

	},

	END: function(e) {
		const current = TX_Video.VIDEOS[TX_Video.CURRENT];

		TX_Video.STATUS._100 = true;
		TX_Video.TRACK('video_completed');

		$(TX_Video.container).css({
			backgroundImage: 'url(' + current.endscreen + ')'
		});

		$(TX_Video.btn_play).css({
			display: 'block',
			backgroundImage: 'url(' + TX_Video.ASSETS[1][1] + ')',
			backgroundColor: 'rgba(0,0,0,0.4)'
		});

		TX_Video.DESTROY();

		current.is_replay = true;
		current.trackname = current.trackreplay;
		
		if(TX_Var.INTRO) {
			TX_Var.INTRO = false;
			$(TX_Video.container).hide();
			TX_Video.MINIMIZE(-151,10,0.5);
			$(TX_Video.container).css({borderRadius:6});
			TX_Content.STEP_2();			
		} else {
						
			$(TX_Video.container).show();
		}
	},

	DESTROY: function() {
		clearInterval(this.focus_interval);
		$(this.player).css('opacity', 0);
		$(this.btn_unmute).hide();
		$(this.content).off('play');
		$(this.content).off('ended');
		$(this.content).off('timeupdate');
		this.STATUS._0 = false;
		this.STATUS._25 = false;
		this.STATUS._50 = false;
		this.STATUS._75 = false;
	},

	STOP: function(e) {
		$(TX_Video.content)[0].pause();
		TX_Video.DESTROY();
		//$(TX_Video.container).hide();
	},

	PLAY: function(e) {
		$(TX_Video.btn_play).hide();
		if( $(TX_Video.content)[0].muted ) TX_Video.UNMUTE();
		if( TX_Video.STATUS._100 ) TX_Video.LOAD(TX_Video.CURRENT);
		else $(TX_Video.content)[0].play();
	},

	PAUSE: function(e) {
		$(TX_Video.btn_play).show();
		$(TX_Video.content)[0].pause();
	},

	UNMUTE: function() {
		$(TX_Video.btn_unmute).hide();
		$(TX_Video.content)[0].muted = false;
		$(TX_Video.content)[0].volume = 1;
	},

	MUTE: function() {
		$(TX_Video.content)[0].muted = true;
		$(TX_Video.content)[0].volume = 0;
	},

	MINIMIZE: function(_x,_y,_scale) {
		gsap.to(TX_Video.container, {duration:0.2, z:0.001, x:_x, y:_y, scale:_scale, ease:'none'});
		//gsap.to(TX_Video.btn_vid, {duration:0.2, z:0.001, scale:2, ease:'none'});
	},

	MAXIMIZE: function() {
		gsap.to(TX_Video.container, {duration:0.2, z:0, x:0, y:0, scale:1, ease:'none'});
		gsap.to(TX_Video.btn_vid, {duration:0.2, z:0.001, scale:1, ease:'none'});
	},

	INTERVAL: function() {
		if( $(TX_Video.content)[0].paused ) {
			$(TX_Video.btn_play).show();
			$(TX_Video.btn_unmute).hide();
		} else {				
			$(TX_Video.btn_play).hide();
			if( $(TX_Video.content)[0].muted ) $(TX_Video.btn_unmute).show();
			else $(TX_Video.btn_unmute).hide();
		}
	},

	TRACK: function(state) {
		TXM.api.track('multimedia', state, this.VIDEOS[this.CURRENT].trackname);
	},

	LIGHTBOX: function() {
		$(TX_Var.container).append($('<div>', {
			id: 'lightbox',
			width: '100%',
			height: '100%',
			css:{
				top: 0,
				left: 0,
				background: 'rgba(0,0,0,0.75)'
			},
			end: TX_Var.lightbox = '#lightbox'
		}));
	},
};

TX_Config.init();

})();