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
		['#background','https://media.truex.com/image_assets/2020-10-20/49436e6b-8262-4f84-a5d7-bfc0fcb2d875.jpg'],
		['#logo','https://media.truex.com/image_assets/2020-10-04/4efbd428-7b8e-440a-b17d-6319f60ec80b.png'],
		['#btn_cta','https://media.truex.com/image_assets/2020-10-20/d9aa75cb-63a9-4b73-b59b-c4371ec4f11e.png'],
		['#cta_bar','https://media.truex.com/image_assets/2020-10-20/705c8237-b87b-42f2-a483-150efeae8e04.png'],
		['#cta_txt','https://media.truex.com/image_assets/2020-10-20/da85cd4c-6687-4af7-829c-17916d89d884.png'],
		['#btn_right','https://media.truex.com/image_assets/2020-10-08/dc99e6b5-142e-4372-ade4-3b457df4736f.png'],
		['#btn_left','https://media.truex.com/image_assets/2020-10-08/39c3074b-42d9-4ee8-a7f8-576160887131.png'],
		['#btn_3','https://media.truex.com/image_assets/2020-10-04/d5df4b77-74af-4945-814c-18c533c30c28.png'],
		['#btn_2','https://media.truex.com/image_assets/2020-10-04/a1c8540e-7955-4341-bd7d-b09b598491fd.png'],
		['#btn_1','https://media.truex.com/image_assets/2020-10-04/d29af700-42a3-4263-9f6d-c63a0fd67393.png'],
		['#slider_txt2','https://media.truex.com/image_assets/2020-10-06/8da781d6-be6c-4caa-86ff-074ae919c6a1.png'],
		['#slider_txt3','https://media.truex.com/image_assets/2020-10-20/3cb8a461-d206-4ad5-919c-c7c09f580d95.png'],
		['#slider_txt1','https://media.truex.com/image_assets/2020-10-06/c414fa14-a4d3-4435-88fb-1c3ef8a99453.png'],
		['.social','https://media.truex.com/image_assets/2020-10-04/09eaee5d-2999-4e01-8f03-ce92bef428f3.png'],
		['#arrow_next','https://media.truex.com/image_assets/2020-10-06/43fdd282-7e7e-4e10-8549-341c43871912.png'],
		['.replay','https://media.truex.com/image_assets/2020-03-19/a51551db-d4b9-4899-96ba-16f70abab327.png']
	   
	],

	post_images = [
		// ['#id','url'], ['.class','url'],
		['#border','https://media.truex.com/image_assets/2020-10-06/b4b68f80-3e4e-4f6c-8138-34b1dd937d33.png'],
		['.shadow','https://media.truex.com/image_assets/2020-10-08/8c43f6be-0f28-4edb-b483-5cab4fa67664.png'],
//		['.rectangle','https://media.truex.com/image_assets/2020-10-21/1a9bd5b0-5ce8-4415-9197-bfb90d9a3c80.png'],
		['#rect_1','https://media.truex.com/image_assets/2020-10-21/26349c4f-1e01-4583-831f-f63b5632e796.png'],
		['#rect_2','https://media.truex.com/image_assets/2020-10-21/fcd47a0b-cc20-42a5-b500-b4116fccdfb5.png'],
		['#rect_3','https://media.truex.com/image_assets/2020-10-21/ffe2aee3-09f4-4a58-9c56-99caaeb73c0e.png'],
			['#slider_image3','https://media.truex.com/image_assets/2020-10-08/2b6c2cc2-74bf-4632-9b64-cf699e16321d.jpg'],
		['#slider_image2','https://media.truex.com/image_assets/2020-10-08/2de58435-0b64-49bd-a7a7-f9d6079b5618.jpg'],
		['#slider_image1','https://media.truex.com/image_assets/2020-10-20/c1b79361-89b1-44fd-8937-adcc71215fa8.jpg'],
		
	],

	JS = [
		'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.0/gsap.min.js',
	],
    

CSS = 'https://media.truex.com/file_assets/2020-10-21/ee661641-1dfe-4cad-bb94-acc333279fd3.css',
HTML = 'https://media.truex.com/file_assets/2020-10-21/5ab88518-a94f-46c7-ae14-de6e51b7148b.html',
		
		   
		
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
		
		TX_API.initclick();		
		TX_API.autoscale();
		TX_Content.STEP_1();
		
		TXM.dispatcher.dispatchEvent('INTERACTIVE_ASSET_READY');
		
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
		
		setTimeout(function(){
			if(typeof TX_Video !== 'undefined' && TX_Video.AUTOPLAY)
				$(TX_Video.content)[0].play();
		},200);
	},
	
	ended = function() {
		if(typeof TX_Audio !== 'undefined') Howler.unload();
		
		if(typeof TX_Vast !== 'undefined') TX_Vast.DESTROY();
		
		if(typeof TX_Video !== 'undefined') {
			TX_Video.DESTROY();
			TX_Video.MUTE();
			TX_Video.PAUSE();
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
			
			if(typeof TX_Audio !== 'undefined') {
				/**/
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
			case 'cta':
				TX_API.clickthru('Watch Now', false);
				break;
			case '':
				TX_API.track('trackname');
				break;
			case 'slide1':
			case 'slide2':
			case 'slide3':
				
				gsap.to(".shadow",0.3,{autoAlpha:0});
				gsap.to(".replay",{opacity:0});
				gsap.to(".sliders", {pointerEvents: "auto"});
				gsap.to(".slider_image", 0.3, {border: "4px solid white"});
				let id = this.id.slice(-1);
				
				TX_Video.LOAD(parseInt(id));
				TX_Var.currentSlide = id;
				gsap.to(this, {pointerEvents: "none", });
				gsap.to("#shadow-" + id, 0.3, {autoAlpha:1});
				gsap.to("div#container", {pointerEvents: "none"});
				gsap.to("#slider_image" + id, 0.3, {border: "4px solid #f15d2a"});
				break;
			case 'left_div':
				gsap.to(".replay",{opacity:0});
				gsap.to(".shadow", 0.3, {autoAlpha:0});
				gsap.to(".sliders", {pointerEvents: "auto"});
				gsap.to(".slider_image", 0.3, {border: "4px solid white"});
				var current = TX_Var.currentSlide;
			
				if(current > 1){
					current --;
				}else{
					current = 3;
				}
				TX_Var.currentSlide = current;
				TX_Video.LOAD(parseInt(current));
				gsap.to("#slider_image" + current, 0.3, {border: "4px solid #f15d2a"});
				gsap.to("#slide" + current, {pointerEvents: "none"});
				gsap.to("#shadow-" + current, 0.3, {autoAlpha:1});
				gsap.to("div#container", {pointerEvents: "none"});
				break;
			case 'right_div':
				gsap.to(".replay",{opacity:0});
				gsap.to(".shadow", 0.3, {autoAlpha:0});
				gsap.to(".sliders", {pointerEvents: "auto"});
				gsap.to(".slider_image", 0.3, {border: "4px solid white"});
		    	var current = TX_Var.currentSlide;
				if(current < 3){
					current ++;
				}else{
					current = 1;
				}
				TX_Var.currentSlide = current;
				TX_Video.LOAD(parseInt(current));
				gsap.to("#slider_image" + current, 0.3, {border: "4px solid #f15d2a"});
				gsap.to("#slide" + current, {pointerEvents: "none"});
				gsap.to("#shadow-" + current, 0.3, {autoAlpha:1});
				gsap.to("div#container", {pointerEvents: "none"});
				break;
			case 'arrow_next':
				TX_Content.STEP_2();
				break;
				case 'fb':
				TX_API.clickthru('Facebook', false);
				break;
				case 'twitter':
				TX_API.clickthru('Twitter', false);
				break;
				case 'instagram':
				TX_API.clickthru('Instagram', false);
				break;
				case 'youtube':
				TX_API.clickthru('Youtube', false);
				break;
		}
	},
		
	MOUSEOVER: function(e) {
		switch (this.id) {
			case 'cta':
				gsap.to("#btn_cta", {scale: .85 });
				break;
			case 'left_div':
				gsap.to("#btn_left", {scale: .75 });
				break;
		    case 'right_div':
				gsap.to("#btn_right", {scale: .75 });
				break;
		    case 'fb':
		    case 'twitter':
		    case 'instagram':
		    case 'youtube':
		    case 'next_arrow':
				gsap.to(this, {scale: .85 });
				break;
		}
	},
		
	MOUSEOUT: function(e) {
		switch (this.id) {
			case 'cta':
				gsap.to("#btn_cta", {scale: 1 });
				break;
			case 'left_div':
				gsap.to("#btn_left", {scale: 1 });
				break;
		    case 'right_div':
				gsap.to("#btn_right", {scale: 1 });
				break;
		    case 'fb':
		    case 'twitter':
		    case 'instagram':
		    case 'youtube':
			case 'next_arrow':
				gsap.to(this, {scale: 1 });
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
	currentSlide:       0,
	tmr_continue:		null
	
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
		TX_Video.INIT(0);
		TX_Var.tmr_continue = setTimeout(function(){
			gsap.to("#arrow_next", 0.3, {pointerEvents: "auto", autoAlpha:1})
		},1000);
		
		
	},
	
	STEP_2: function() {
		clearTimeout(TX_Var.tmr_continue);
		gsap.to("#arrow_next", 0.3, {autoAlpha:0});
		TXM.api.setCurrentStep(2);
		TX_Video.MINIMIZE(189, -74,.44);
		
	}
};

	/**-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=->
 * CREATE VIDEO | TX_Video.INIT();
 */
var TX_Video = {
	
	ASSETS: [
		['#vid_play','https://media.truex.com/image_assets/2018-11-04/94794111-c105-4943-b227-e2d38aa8ca45.png'],
		['#vid_replay','https://media.truex.com/image_assets/2020-03-19/a51551db-d4b9-4899-96ba-16f70abab327.png'],
		['#vid_unmute','https://media.truex.com/image_assets/2020-03-31/35db18eb-a709-46d7-b80f-5c0fc446e380.png'],
		['#vid_unmute_mob','https://media.truex.com/image_assets/2018-04-03/7ccd9d86-998f-42c9-8551-86dac4cf7db6.png'],
	],

	VIDEOS: [ 
		{
			source:      TXM.params.IntroVideo,
			trackname:	 'Intro Video',
            trackreplay: 'Intro Replay',
			preview:	 'https://media.truex.com/image_assets/2020-10-06/ecedd892-43a6-43f8-b81f-7953d8719cad.png',
			endscreen:	 'https://media.truex.com/image_assets/2020-10-06/240240a5-5603-4a71-9a47-34bee55eb3aa.png'
		},
		{
			source:      TXM.params.DetailerVideo,
			trackname:	 'Detailer Video',
            trackreplay: 'Detailer Replay',
			preview:	 'https://media.truex.com/image_assets/2020-10-06/ecedd892-43a6-43f8-b81f-7953d8719cad.png',
			endscreen:	 'https://media.truex.com/image_assets/2020-10-20/b01729b6-ac90-43ac-9e9a-3dab4a4b1232.png'
		},
		{
			source:      TXM.params.SalonVideo,
			trackname:	 'Salon Video',
            trackreplay: 'Salon Replay',
			preview:	 'https://media.truex.com/image_assets/2020-10-06/ecedd892-43a6-43f8-b81f-7953d8719cad.png',
			endscreen:	 'https://media.truex.com/image_assets/2020-10-20/b01729b6-ac90-43ac-9e9a-3dab4a4b1232.png'
		},
		{
			source:      TXM.params.NonprofitVideo,
			trackname:	 'Nonprofit Video',
            trackreplay: 'Nonprofit Replay',
			preview:	 'https://media.truex.com/image_assets/2020-10-06/ecedd892-43a6-43f8-b81f-7953d8719cad.png',
			endscreen:	 'https://media.truex.com/image_assets/2020-10-20/b01729b6-ac90-43ac-9e9a-3dab4a4b1232.png'
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
		if( autoplay >= 0 && autoplay <= this.VIDEOS.length ) {
			$('<img />').attr('src', this.VIDEOS[autoplay].preview).load(this.LOAD(autoplay));
			this.AUTOPLAY = true;
		}			
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
        );

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
    
    PLACEHOLDER: function(){
        
        let count   = 0,
            url     = [
                'https://media.truex.com/video_assets/2020-10-05/c29398cf-7a72-469a-91c9-b57c2441479b_large.mp4',
                'https://media.truex.com/video_assets/2020-10-14/99030a46-6b66-4cd4-9852-3ec0caf1f327_large.mp4',
                'https://media.truex.com/video_assets/2020-10-14/a2ca92e5-19a2-4520-ba1e-0520b91ec686_large.mp4',
                'https://media.truex.com/video_assets/2020-10-14/32e0e831-01f5-4e26-b1eb-2019638a7e61_large.mp4',
                'https://media.truex.com/video_assets/2018-09-25/53e53034-20b4-4a8a-a135-7574679659f3_large.mp4'
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
			gsap.to("div#container", {pointerEvents: "auto"});
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
		
		if(TX_Var.currentSlide > 0){
			gsap.to("#replay-" + TX_Var.currentSlide, {opacity:1})
			gsap.to("#slide" + TX_Var.currentSlide, {pointerEvents: "auto"})
		}
		const current = TX_Video.VIDEOS[TX_Video.CURRENT];
		
		TX_Video.STATUS._100 = true;
		TX_Video.TRACK('video_completed');
		
		$(TX_Video.container).css({
//			display: 'none',
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
		
		TX_Content.STEP_2();
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
		$(TX_Video.container).hide();
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
		gsap.to(TX_Video.container, {duration:0.2, z:0.001, x:_x, y:_y, scale:_scale, ease:'none', border: '9px solid white'});			
		gsap.to(TX_Video.btn_vid, {duration:0.2, z:0.001, scale:1, ease:'none'});
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