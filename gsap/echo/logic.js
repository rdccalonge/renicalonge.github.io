// (c) 2020 Joystick Interactive | Nep

(function() {
	
	/**-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=->
	 * SET UP ALL ASSETS HERE
	 */
	var TX_Asset = { 
		
		INIT_IMAGES: [
			// ['#',''], ['.',''],
			['.bg','https://media.truex.com/image_assets/2020-08-31/91bd0785-10db-4a18-a56e-b7d18da4631e.png'],
			['#img_loading','https://media.truex.com/image_assets/2020-03-05/66b0bb18-f854-49cd-9b4b-239845b67dad.png'],
			['.spr_mic','https://media.truex.com/image_assets/2020-07-30/36bb210b-31ff-4fad-8a99-e1c241e38720.png'],
			['.spr_mics','https://media.truex.com/image_assets/2020-07-30/814e38bf-f4e8-4df3-84c7-ddef30338736.png'],
			['.img_product','https://media.truex.com/image_assets/optimized/2021-03-10/9b10536aa53d4dbdd613dbf4ac3b13a1.png'],
			
		],
	
		OTHER_IMAGES: [
			// ['#',''], ['.',''],
			['#logo','https://media.truex.com/image_assets/2020-08-16/7d5a56f2-6f36-46be-a5c3-50a4261c4f68.png'],
			['#intro_bubble','https://media.truex.com/image_assets/2020-07-30/09dad710-1bbd-4442-945e-f2e3de60c3aa.png'],
			['#txt_cta','https://media.truex.com/image_assets/2020-08-24/bc9e2827-5443-4ed5-ad5c-5d5301d71997.png'],
		],
	
		INIT_JS: [
			'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.5/TweenMax.min.js',
			'https://media.truex.com/file_assets/2019-03-08/d0ed7934-e5fb-4fb2-b939-b6dd4222ab26.js', //callbackManager.js
			'https://media.truex.com/file_assets/2019-04-22/5e6ea8e0-0f46-48c2-8b48-ded35ac903ae.js', //audioRecorder.js
			'https://media.truex.com/file_assets/2019-03-08/4f579b5b-845b-4d61-ad2f-a8cf6c1fd61a.js'  //spanWorker.js
		],
		
	//    INIT_CSS: 'styles.css',
	
	//	INIT_HTML: 'markup.html'
	//
		INIT_CSS: 'https://media.truex.com/file_assets/2020-08-31/66a7f256-749e-4c51-8fbf-0af5884911cb.css',
	//
		INIT_HTML: 'https://media.truex.com/file_assets/2020-09-02/0180db51-ee0c-4f9a-9b3f-18a3800c1036.html'
		
		
	};
	
	/**-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=->
	 * SET UP ALL USER INTERACTIONS HERE
	 */
	var	TX_Button = {
		
		MOUSECLICK: function(e) {
			
			let toggleicon		= TX_Var.TOGGLEICON,
				bubblespeech	= TX_Var.BUBBLESPEECH,
				is_micon		= TX_Var.is_micon,
				active_mic		= TX_Voice.ACTIVE_MIC;
			
			if(!TX_Var.isButtonReady) return;
			TX_API.CLICK_DELAY(0.5);
			
			//TX_API.CLICKTHRU('trackname', false);
			//TXM.api.track( 'other', 'name' );
			
			switch (this.id) {
				case 'btn-1':
					TweenMax.set([TX_Var.logo, TX_Var.BUBBLESPEECH], {display:'block', autoAlpha:0, pointerEvents:'none'});
					if( active_mic ) TX_Voice.READY();
					else TX_Creative.PLAY_NOVOICE();				
					break;
				case 'btn-2':
					TweenMax.set([TX_Var.logo, TX_Var.BUBBLESPEECH], {display:'block', autoAlpha:0, pointerEvents:'none'});
					TX_Creative.PLAY_NOVOICE();
					break;
				case 'btn_stillthere_micon':
					TX_Creative.CONTINUE(true);
					break;
				case 'btn_stillthere_micoff':				
					TweenMax.to([toggleicon, bubblespeech], 0.2, {autoAlpha:1});
					TX_Creative.CONTINUE(false);
					break;
				case 'btn_toggleicon':		
					if( TX_Var.is_micon ) {
						TXM.api.track( 'other', 'Mic OFF' );
						TX_Var.is_micon = false;
						TX_Creative.TOGGLEICON();
						TX_Creative.BUBBLESPEECH();
					} else {
						TXM.api.track( 'other', 'Mic ON' );
						TX_Var.is_micon = true;
						if( TX_Voice.is_ready ) {
							TX_Creative.TOGGLEICON();
							TX_Creative.BUBBLESPEECH();
							TX_Creative.START_RECOGNITION();
						} else {
							TweenMax.set([toggleicon, bubblespeech], {pointerEvents:'none'});
							TweenMax.to([toggleicon, bubblespeech], 0.2, {autoAlpha:0});
							TX_Voice.READY();
						}
					}
					break;
				case 'btn_lights':
					TX_Creative.STEP_3(0, false);
					break;
				case 'btn_roomba':
					TX_Creative.STEP_4(1, false);
					break;
				case 'btn_xbox':
					TX_Creative.STEP_5(2, false);
					break;
				case 'btn_doorbell':
					TX_Creative.STEP_6(3, false);
					break;
				case 'btn_underwater':
					TX_Creative.STEP_7(4, false);
					break;
				case 'btn_temp':
					TX_Creative.STEP_8(5, false);
					break;
				case 'btn_cta':				
					TX_API.CLICKTHRU(TX_Var.config[TX_Var.current].cta, false);
					break;
				case 'btn_navleft':
					TX_Creative.SWAPCARD(false);
					break;
				case 'btn_navright':
					TX_Creative.SWAPCARD(true);
					break;
				case 'btn_close':
					TXM.api.track( 'other', 'utteranceX' );
					TX_Creative.STEP_2(false);
					if( is_micon ) TX_Creative.START_RECOGNITION();
					break;
			}
		},
			
		MOUSEOVER: function(e) {
			switch (this.id) {
				case 'btn-1':
					TweenMax.to(this, 0.2, {backgroundColor:'rgba(255,255,255,0.2)'});
					TweenMax.to(TX_Var.txt_intro_micon, 0.2, {color:'white'});
					break;
				case 'btn-2':
					TweenMax.to(this, 0.2, {backgroundColor:'rgba(255,255,255,0.2)'});
					TweenMax.to(TX_Var.txt_intro_micoff, 0.2, {color:'white'});
					
					break;
				case 'btn_intro_micoff':
					TweenMax.to(TX_Var.txt_intro_micoff, 0.2, {color:'white'});
					break;
				case 'btn_stillthere_micon':
					TweenMax.to(TX_Var.img_stillthere_micon, 0.1, {backgroundColor:'#247bff'});
					break;
				case 'btn_stillthere_micoff':
					TweenMax.to(TX_Var.img_stillthere_micoff, 0.1, {backgroundColor:'#247bff'});
					break;
				case 'btn_lights':
					TweenMax.to(TX_Var.btn_lights + ' .bg_speech', 0.2, {alpha:1});
					break;
				case 'btn_roomba':
					TweenMax.to(TX_Var.btn_roomba + ' .bg_speech', 0.2, {alpha:1});
					break;
				case 'btn_xbox':
					TweenMax.to(TX_Var.btn_xbox + ' .bg_speech', 0.2, {alpha:1});
					break;
				case 'btn_doorbell':
					TweenMax.to(TX_Var.btn_doorbell + ' .bg_speech', 0.2, {alpha:1});
					break;
				case 'btn_underwater':
					TweenMax.to(TX_Var.btn_underwater + ' .bg_speech', 0.2, {alpha:1});
					break;
				case 'btn_temp':
					TweenMax.to(TX_Var.btn_temp + ' .bg_speech', 0.2, {alpha:1});
					break;
				case 'btn_cta':
					TweenMax.to(this, 0.1, {backgroundColor:'#247bff'});
					break;
				case 'btn_navleft':
					TweenMax.to(TX_Var.ico_navleft, 0.1, {fill:'#00a7ce'});
					break;
				case 'btn_navright':
					TweenMax.to(TX_Var.ico_navright, 0.1, {fill:'#00a7ce'});
					break;
				case 'btn_close':
					TweenMax.to(TX_Var.ico_close, 0.1, {fill:'#247bff'});
					break;
			}
		},
			
		MOUSEOUT: function(e) {
			switch (this.id) {
				case 'btn-1':
					TweenMax.to(this, 0.2, {backgroundColor:'rgba(255,255,255,0.0)'});
					TweenMax.to(TX_Var.txt_intro_micon, 0.2, {color:'#00a7ce'});
					break;
				case 'btn-2':
					TweenMax.to(this, 0.2, {backgroundColor:'rgba(255,255,255,0.0)'});
					TweenMax.to(TX_Var.txt_intro_micoff, 0.2, {color:'#00a7ce'});
					break;
				case 'btn_intro_micoff':
					TweenMax.to(TX_Var.txt_intro_micoff, 0.2, {color:'#00a7ce'});
					break;
				case 'btn_stillthere_micon':
					TweenMax.to(TX_Var.img_stillthere_micon, 0.1, {backgroundColor:'#00a7ce'});
					break;
				case 'btn_stillthere_micoff':
					TweenMax.to(TX_Var.img_stillthere_micoff, 0.1, {backgroundColor:'#00a7ce'});
					break;
				case 'btn_lights':
					TweenMax.to(TX_Var.btn_lights + ' .bg_speech', 0.2, {alpha:0.6});
					break;
				case 'btn_roomba':
					TweenMax.to(TX_Var.btn_roomba + ' .bg_speech', 0.2, {alpha:0.6});
					break;
				case 'btn_xbox':
					TweenMax.to(TX_Var.btn_xbox + ' .bg_speech', 0.2, {alpha:0.6});
					break;
				case 'btn_doorbell':
					TweenMax.to(TX_Var.btn_doorbell + ' .bg_speech', 0.2, {alpha:0.6});
					break;
				case 'btn_underwater':
					TweenMax.to(TX_Var.btn_underwater + ' .bg_speech', 0.2, {alpha:0.6});
					break;
				case 'btn_temp':
					TweenMax.to(TX_Var.btn_temp + ' .bg_speech', 0.2, {alpha:0.6});
					break;
				case 'btn_cta':
					TweenMax.to(this, 0.1, {backgroundColor:'#00a7ce'});
					break;
				case 'btn_navleft':
					TweenMax.to(TX_Var.ico_navleft, 0.1, {fill:'white'});
					break;
				case 'btn_navright':
					TweenMax.to(TX_Var.ico_navright, 0.1, {fill:'white'});
					break;
				case 'btn_close':
					TweenMax.to(TX_Var.ico_close, 0.1, {fill:'#00a7ce'});
					break;
			}
		}
		
	};
	
	/**-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=->
	 * SET UP YOUR CREATIVE HERE
	 */
	var TX_Creative = {
		
		INIT: function() {
			
			TX_Var.INTRO 					= '#container #INTRO';
			TX_Var.txt_intro0 				= '#container #INTRO #txt_intro0';
			TX_Var.txt_intro1 				= '#container #INTRO #txt_intro1';
			TX_Var.spr_mic					= '#container #INTRO .spr_mic';
			TX_Var.txt_intro_micoff			= '#container #INTRO #txt_intro_micoff';
			TX_Var.txt_intro_micon			= '#container #INTRO #txt_intro_micon';
			
			TX_Var.STILLTHERE 				= '#container #STILLTHERE';
			TX_Var.txt_stillthere1			= '#container #STILLTHERE #txt_stillthere1';
			TX_Var.img_stillthere_micon 	= '#container #STILLTHERE #img_stillthere_micon';
			TX_Var.img_stillthere_micoff	= '#container #STILLTHERE #img_stillthere_micoff';
			
			TX_Var.TOGGLEICON 				= '#container #TOGGLEICON';
			TX_Var.txt_listening 			= '#container #TOGGLEICON #txt_listening';
			TX_Var.intro_bubble 			= '#container #TOGGLEICON #intro_bubble';
			TX_Var.ico_micon 				= '#container #TOGGLEICON #ico_micon';
			TX_Var.ico_micoff 				= '#container #TOGGLEICON #ico_micoff';
			TX_Var.rnd_micon 				= '#container #TOGGLEICON #rnd_micon';
			
			TX_Var.BUBBLESPEECH 			= '#container #BUBBLESPEECH';
			TX_Var.btn_speech 				= '#container #BUBBLESPEECH .btn_speech';
			TX_Var.btn_lights 				= '#container #BUBBLESPEECH #btn_lights';
			TX_Var.btn_roomba 				= '#container #BUBBLESPEECH #btn_roomba';
			TX_Var.btn_xbox 				= '#container #BUBBLESPEECH #btn_xbox';
			TX_Var.btn_doorbell 			= '#container #BUBBLESPEECH #btn_doorbell';
			TX_Var.btn_underwater 			= '#container #BUBBLESPEECH #btn_underwater';
			TX_Var.btn_temp 				= '#container #BUBBLESPEECH #btn_temp';
			TX_Var.txt_lights 				= '#container #BUBBLESPEECH #txt_lights';
			TX_Var.txt_roomba 				= '#container #BUBBLESPEECH #txt_roomba';
			TX_Var.txt_xbox 				= '#container #BUBBLESPEECH #txt_xbox';
			TX_Var.txt_doorbell 			= '#container #BUBBLESPEECH #txt_doorbell';
			TX_Var.txt_underwater 			= '#container #BUBBLESPEECH #txt_underwater';
			TX_Var.txt_temp                 = '#container #BUBBLESPEECH #txt_temp';
			TX_Var.ico_mic	 				= '#container #BUBBLESPEECH .ico_mic';
					
			TX_Var.GALLERY 					= '#container #GALLERY';
			TX_Var.next_card 				= '#container #GALLERY #next_card';
			TX_Var.current_card 			= '#container #GALLERY #current_card';		
			TX_Var.txt_cta 					= '#container #GALLERY #txt_cta';
			TX_Var.ico_navleft 				= '#container #GALLERY #ico_navleft';
			TX_Var.ico_navright 			= '#container #GALLERY #ico_navright';
			TX_Var.ico_close 				= '#container #GALLERY #ico_close';
					
			TX_Var.logo 					= '#container #logo';
			TX_Var.img_loading 				= '#container #img_loading';		
			
			TX_Var.is_micon					= true;
			TX_Var.is_micon_init			= true;
			TX_Var.is_micoff_init			= true;
			TX_Var.is_gallery				= false;
			
			TX_Var.idle_timer				= null;
			TX_Var.steam				    = null;
			TX_Var.current					= 0;
			TX_Var.step						= 0;
			
			
			TX_Var.transparent				= 'https://media.truex.com/image_assets/2020-03-06/6460190d-c54b-4055-8feb-62afb58614de.png';
			TX_Var.cta                      = '#txt_cta';
			TX_Var.btn_cta                  = '#btn_cta';
			
			TX_Var.config	 				= [
					{	
						tracking: 'Lights',
						title: "Echo Dot  + LIFX Smart Bulbs",
						description: "Change the ambience of your room instantly, just by asking Alexa. Dim the lights, play romantic music, and enjoy your time together. Its romance uninterrupted.",
						product_posY: -0,
						cta_width: 238,
						cta_pos: 'top',
						cta: 'CTALinkBulb'
					},
					{	
						tracking: 'Roomba',
						title: "Echo + iRobot Roomba",
						description: "Popcorn, cereal, and pet fur everywhere! Your floor could use a touch up but youre busy with more important things. Dont stress over the mess or let cleaning interrupt your personal time, just say, Alexa, ask Roomba to start cleaning.",
						product_posY: -534 ,
						cta_width: 238,
						cta_pos: 'top',
						cta: 'CTARoomba'
					},
					{	
						tracking: 'Xbox',
						title: "XBox Skill",
						description: "You get game ready with drinks and snacks. Alexa will get the game going without interrupting your game-ready rituals.",
						product_posY: -801,
						cta_width: 175,
						cta_pos: 'bottom',
						cta: 'CTAXbox'
					},
					{	
						tracking: 'Doorbell',
						title: "Echo +  TP Link Colored Smart Bulbs",
						description: "Set the mood and score some major make out points. Echo routines allow you to control as many devices as you want with one command. So dim the lights and play romantic music, all by just saying, Alexa, turn on date night",
						product_posY: -1068,
						cta_width: 238,
						cta_pos: 'top',
						cta: 'CTADoorbell'
					},
					{	
						tracking: 'Underwater',
						title: "Echo Dot  + TP Link",
						description: "Transport yourself underwater without getting wet with a custom smart home routine. Turn the lights blue and play ocean sounds, all by saying, Alexa, lets have an underwater adventure. Set up routines using the Alexa app to customize the actions your devices take when you make a specific request.",
						product_posY: -1335,
						cta_width: 175,
						cta_pos: 'bottom',
						cta: 'CTASmartCam'
					},
					{	
						tracking: 'Temp',
						title: "Echo + Honeywell Smart Thermostat",
						description: "One second youre cold and the next second youre melting. Instead of interrupting your day to adjust the thermostat, just ask Alexa. Set the temperature to your personal preference, all from the comfort of&well, anywhere in the house. ",
						product_posY: -1602,
						cta_width: 238,
						cta_pos: 'top',
						cta: 'CTAThermo'
					},
		
				];
			
			$('#status').css({opacity:0});
			$('#vid_base').css({opacity:0});
				
			TX_Creative.STEP_1();
		},
		
		STEP_1: function() {
			
			
			if( TXM.params.current_step >=2 ) {
				TXM.params.last_step_index = false;
				TXM.api.setCurrentStep(1);
			}
			
			TX_Var.step = 1;
			
			TX_Creative.VID_BASE();
			TX_Creative.INTRO();
			
			TX_Date.INIT();
			TX_Video.INIT();		
			TX_Audio.INIT();
			//Reni
			TX_Voice.INIT();
		},
		
		STEP_2: function(init) {
			
			if(TX_Var.step !=2 ) {
				TXM.api.setCurrentStep(2);
				TX_Var.step = 2;
			}
			
			
			TX_Creative.LOADING(false);
			TweenMax.killTweensOf(TX_Var.spr_mic);
			TweenMax.to([TX_Var.INTRO, TX_Var.GALLERY], 0.2, {autoAlpha:0, onComplete: on_complete});
			
			if( init ) {
				TweenMax.to([TX_Var.logo, TX_Var.BUBBLESPEECH], 0.5, {autoAlpha:1});
				
				if( TX_Voice.ACTIVE_MIC ) TweenMax.fromTo([TX_Var.TOGGLEICON], 0.5, {display:'block', autoAlpha:0}, {autoAlpha:1});
			}
			
			TweenMax.set(TX_Var.BUBBLESPEECH, {autoAlpha:1});
			
			TX_Creative.TOGGLEICON();
			TX_Creative.BUBBLESPEECH();
			
			function on_complete () {			
				TweenMax.set([TX_Var.INTRO, TX_Var.GALLERY], {display:'none'});
			}
		},
		
		STEP_3: function(current, voice) {
			
			if(voice === true){
				clearTimeout(TX_Var.idle_timer);
				
				TXM.api.track( 'other', 'Voice ' + TX_Var.config[current].tracking );
				TXM.api.setCurrentStep(3);
				TX_Var.step = 3;
				TX_Var.current = current;
				//	$(TX_Video.content)[0].currentTime = 2.4204;
				TX_Creative.STOP_RECOGNITION();
				TX_Creative.PLAYALEXA_MICON();
			}
			else{
				TXM.api.track( 'other', TX_Var.config[current].tracking );
				TXM.api.setCurrentStep(3);
				TX_Var.step = 3;
				TX_Var.current = current;
				//	$(TX_Video.content)[0].currentTime = 2.4204;
				TX_Creative.PLAYALEXA_MICOFF();
				
			}
			
		},
						
		STEP_4: function(current, voice) {

			if(voice === true){
				clearTimeout(TX_Var.idle_timer);
				TXM.api.track( 'other', 'Voice ' + TX_Var.config[current].tracking );
				TXM.api.setCurrentStep(4);
				TX_Var.step = 4;
				TX_Var.current = current;
				//  $(TX_Video.content)[0].currentTime = 4;
				TX_Creative.STOP_RECOGNITION();
				TX_Creative.PLAYALEXA_MICON();
			}
			else{
				TXM.api.track( 'other', TX_Var.config[current].tracking );
				TXM.api.setCurrentStep(4);
				TX_Var.step = 4;
				TX_Var.current = current;
				//$(TX_Video.content)[0].currentTime = 4;
				TX_Creative.PLAYALEXA_MICOFF();
			
			}
				
		},
	
		STEP_5: function(current, voice) {
			
			if(voice === true){
				clearTimeout(TX_Var.idle_timer);
				TXM.api.track( 'other', 'Voice ' + TX_Var.config[current].tracking );
				TXM.api.setCurrentStep(5);
				TX_Var.step = 5;
				TX_Var.current = current;
			   //$(TX_Video.content)[0].currentTime = 3.2824;
				TX_Creative.STOP_RECOGNITION();
				TX_Creative.PLAYALEXA_MICON();
			}
			else{
				TXM.api.track( 'other', TX_Var.config[current].tracking );
				TXM.api.setCurrentStep(5);
				TX_Var.step = 5;
				TX_Var.current = current;
				//$(TX_Video.content)[0].currentTime = 3.2824;
				TX_Creative.PLAYALEXA_MICOFF();
				
			}

		},

		STEP_6: function(current, voice) {
			
			if(voice === true){
				clearTimeout(TX_Var.idle_timer);
				TXM.api.track( 'other', 'Voice ' + TX_Var.config[current].tracking );
				TXM.api.setCurrentStep(6);
				TX_Var.step = 6;
				TX_Var.current = current;
				//$(TX_Video.content)[0].currentTime = 3.2824;
				TX_Creative.STOP_RECOGNITION();
				TX_Creative.PLAYALEXA_MICON();
			}
			else{
				TXM.api.track( 'other', TX_Var.config[current].tracking );
				TXM.api.setCurrentStep(6);
				TX_Var.step = 6;
				TX_Var.current = current;
				//$(TX_Video.content)[0].currentTime = 3.2824;
				TX_Creative.PLAYALEXA_MICOFF();
				
			}

		},

		STEP_7: function(current, voice) {
			
			if(voice === true){
				clearTimeout(TX_Var.idle_timer);
				TXM.api.track( 'other', 'Voice ' + TX_Var.config[current].tracking );
				TXM.api.setCurrentStep(7);
				TX_Var.step = 7;
				TX_Var.current = current;
			  //  $(TX_Video.content)[0].currentTime = 3.4600;
				TX_Creative.STOP_RECOGNITION();
				TX_Creative.PLAYALEXA_MICON();
			}
			else{
				TXM.api.track( 'other', TX_Var.config[current].tracking );
				TXM.api.setCurrentStep(7);
				TX_Var.step = 7;
				TX_Var.current = current;
				//$(TX_Video.content)[0].currentTime = 3.4600;
				TX_Creative.PLAYALEXA_MICOFF();
				
			}

		},

		STEP_8: function(current, voice) {
			
			if(voice === true){
				clearTimeout(TX_Var.idle_timer);
				TXM.api.track( 'other', 'Voice ' + TX_Var.config[current].tracking );
				TXM.api.setCurrentStep(8);
				TX_Var.step = 8;
				TX_Var.current = current;
			//	  $(TX_Video.content)[0].currentTime = 3.6437;
				TX_Creative.STOP_RECOGNITION();
				TX_Creative.PLAYALEXA_MICON();
			}
			else{
				TXM.api.track( 'other', TX_Var.config[current].tracking );
				TXM.api.setCurrentStep(8);
				TX_Var.step = 8;
				TX_Var.current = current;
				//$(TX_Video.content)[0].currentTime = 3.6437;
				TX_Creative.PLAYALEXA_MICOFF();
			
			}

		},

		VID_BASE: function() {
			
			let vid_base 		= '#vid_base',
				vid_base_url 	= TXM.params.vid_base;

			if(!TXM.params.vid_base)
				vid_base_url = 'https://media.truex.com/video_assets/2020-08-31/dbe08953-69b3-4aa0-a973-7732d93960dd_large.mp4';
			
			$(vid_base).css({
				width: '100%',
				height: '100%'
			});
			
			$(vid_base).on('timeupdate', video_progress);
			
			$(vid_base)[0].src = vid_base_url;
			$(vid_base)[0].load();			
			$(vid_base)[0].play();
					
			function video_progress(e) {
				
				if( e.currentTarget.currentTime >= 0.01 ) {
					TXM.api.track('multimedia', 'video_start', 'Base');
					$(vid_base).css({opacity:1});				
					$(vid_base).off('timeupdate');
				}
				
			}
		},
		
		INTRO: function() {
			
			let intro 			= TX_Var.INTRO,
				txt_intro1 		= TX_Var.txt_intro1,
				spr_mic			= TX_Var.spr_mic,
				M_txt_intro1 	= 'Tap to turn on your mic and explore an Alexa smart home.';
			
			if(!TX_Var.desktop) {
				$(txt_intro1).html(M_txt_intro1);
			}
			
	//		Reni
			TweenMax.to(spr_mic,0.2,{repeat:-1,backgroundPosition: "-1084px",ease:SteppedEase.config(15)});
			
			TweenMax.fromTo(intro, 0.5, {display:'block', autoAlpha:0},{autoAlpha:1});
		},
		
		TOGGLEICON: function() {
			
			let toggleicon		= TX_Var.TOGGLEICON,
				txt_listening 	= TX_Var.txt_listening,
				intro_bubbles	= TX_Var.intro_bubbles,
				ico_micon 		= TX_Var.ico_micon,
				ico_micoff 		= TX_Var.ico_micoff,
				rnd_micon 		= TX_Var.rnd_micon,
				is_micon		= TX_Var.is_micon;
			
			$(toggleicon).css({pointerEvents:'none'});
							
			if( is_micon ) {
				
				if( TX_Audio.SFX_intro_micoff.playing() ) TX_Audio.STOP('SFX_intro_micoff');
				TweenMax.to(ico_micoff, 0.5, {alpha:0});
				TweenMax.to(ico_micon, 0.5, {alpha:1});
				
				$(rnd_micon).css({
					borderRightColor: '#00a7ce',
					borderBottomColor: '#00a7ce'
				});
							
			} else {
				
				if( TX_Audio.SFX_intro_micon.playing() ) TX_Audio.STOP('SFX_intro_micon');
				
				clearTimeout(TX_Var.idle_timer);
				TX_Creative.STOP_RECOGNITION();
				TweenMax.to([ico_micon,txt_listening,intro_bubbles], 0.5, {alpha:0});			
				TweenMax.to(ico_micoff, 0.5, {alpha:1});			
			}
		},
		
		BUBBLESPEECH: function() {
			
			let bubblespeech	= TX_Var.BUBBLESPEECH,
				toggleicon		= TX_Var.TOGGLEICON,
				ico_mic	 		= TX_Var.ico_mic,
				is_micon		= TX_Var.is_micon,
				btn_speech		= TX_Var.btn_speech,
				is_gallery		= TX_Var.is_gallery,
				extra_width		= 0,
				with_mic		= 0,
				interval_SFX	= null,
				active_SFX		= 'SFX_intro_micoff',
				is_init			= 'is_micoff_init',
				config	 		= [
									{ btn: TX_Var.btn_lights,	width: 175 },
									{ btn: TX_Var.btn_roomba,	width: 181 },
									{ btn: TX_Var.btn_xbox,		width: 224 },
									{ btn: TX_Var.btn_doorbell,	width: 245 },
									{ btn: TX_Var.btn_underwater,	width: 237 },
									{ btn: TX_Var.btn_temp,	width: 252 }
								];
			
			$(bubblespeech).css({pointerEvents:'none'});
			$(btn_speech).css({opacity:0});
			
			if( is_micon ) {			
				extra_width = 12;
				with_mic = 1;
				active_SFX = 'SFX_intro_micon';
				is_init	= 'is_micon_init';
				
			} 
	
			TweenMax.to(ico_mic, 0.2, {alpha: with_mic});
			
			for (let i = 0; i < config.length; i++) {
				TweenMax.to(config[i].btn, 0.2, { width: config[i].width + extra_width });
			}
			
			
			if( TX_Var[is_init] ) {
				
				TX_Var[is_init] = false;
				
				TX_Audio.PLAY(active_SFX);
				
				interval_SFX = setInterval(function(){								
					if( TX_Audio[active_SFX].seek() >= 0.5 ) {
						clearInterval(interval_SFX);					
						TweenMax.staggerFromTo(btn_speech, 0.5, {alpha:0}, {alpha:1}, 0.2, on_complete);
					}
				}, 200);
				
			} else {
				if( is_gallery ) TweenMax.staggerFromTo(btn_speech, 0.5, {alpha:0}, {alpha:1}, 0.2, on_complete);
				else on_complete();
			}
				
			
			function on_complete () {
				
				if( !is_micon ) $(bubblespeech).css({pointerEvents:'auto'});
				$(toggleicon).css({pointerEvents:'auto'});
				$(btn_speech).css({opacity:1});			
				TX_Var.is_gallery = false;
				
			}
		},
		
		GALLERY: function() {
			
			let gallery				= TX_Var.GALLERY,
				next_card 			= TX_Var.next_card,
				current_card		= TX_Var.current_card,			
				current_product 	= TX_Var.current_card + ' .img_product',
				current_title 		= TX_Var.current_card + ' .txt_title',
				current_description	= TX_Var.current_card + ' .txt_description',
				config				= TX_Var.config,
				current				= TX_Var.current,
				cta                 = TX_Var.cta,
				btn_cta             = TX_Var.btn_cta;

			TX_Var.is_gallery = true;
	//		$(current_title).html(config[current].title);
	//      
	//		$(current_description).html(config[current].description);

			$(current_product).css({
				backgroundPositionY: config[current].product_posY
			});
			
			$(cta).css({
				backgroundPosition: config[current].cta_pos,
			});
			$(btn_cta).css({
				width: config[current].cta_width
			});
			
			$(current_title).html(config[current].title);
			
			$(current_description).html(config[current].description);
			
			TweenMax.fromTo(gallery, 0.5, {display:'block', autoAlpha:0},{autoAlpha:1});
			
			TX_Audio.UNMUTE('BGM_base');
			
		},
		
		STILLTHERE: function() {
			
			let stillthere			= TX_Var.STILLTHERE,
				toggleicon			= TX_Var.TOGGLEICON,
				bubblespeech		= TX_Var.BUBBLESPEECH,
				txt_stillthere1 	= TX_Var.txt_stillthere1,
				M_txt_stillthere1 	= 'Click below to explore an Alexa smart home.';
			
			if(!TX_Var.desktop) $(txt_stillthere1).html(M_txt_stillthere1);
			
			TX_Creative.STOP_RECOGNITION();
			
			TweenMax.set([toggleicon, bubblespeech, stillthere], {pointerEvents:'none'});
			TweenMax.to([toggleicon, bubblespeech], 0.2, {autoAlpha:0});
			
			TweenMax.fromTo(stillthere, 0.5, {display:'block', autoAlpha:0}, {autoAlpha:1, onComplete: on_complete});	
			
			function on_complete () {
				TweenMax.set(stillthere, {pointerEvents:'auto'});			
			}
			
		},
		
		SWAPCARD: function(is_next) {
			
			let gallery				= TX_Var.GALLERY,
				next_card 			= TX_Var.next_card,
				current_card		= TX_Var.current_card,			
				current_product 	= TX_Var.current_card + ' .img_product',
				current_title 		= TX_Var.current_card + ' .txt_title ',
				current_description	= TX_Var.current_card + ' .txt_description',
				next_product 		= TX_Var.next_card + ' .img_product',
				next_title 			= TX_Var.next_card + ' .txt_title',
				next_description	= TX_Var.next_card + ' .txt_description',
				config				= TX_Var.config,
				current				= TX_Var.current,
				cta                 = TX_Var.cta,
				btn_cta             = TX_Var.btn_cta,
				position_x			= [-650,650];
			
			TXM.api.track( 'other', 'Arrows' );
//			if( is_next ) {
//				
//				if( current >= 5 ) current = 0;
//				else current++;
//				
//				position_x = [-650,650];
//				
//			} else {
//				
//				if( current <= 0 ) current = 5;
//				else current--;
//				
//				position_x = [650,-650];
//				
//			}
			if( is_next ) {               
			  
				if( current === 11 ){
					current = 6;
				}else if( current === 5 ){
					current = 0;
				}else{
					current++;
				}
				position_x = [-650,650];
				
			} else {
				if( current === 0 ){
					current = 5;
				}else if( current === 6 ){
					current = 11;
				}else{
					current--;
				}
				
				position_x = [650,-650];
				
			}
			$(cta).css({
				backgroundPosition: config[current].cta_pos,
				
			});
			$(btn_cta).css({
				width: config[current].cta_width
			});
			
			$(next_product).css({
				backgroundPositionY: config[current].product_posY
			});
			
			$(next_title).html(config[current].title);
			$(next_description).html(config[current].description);
			
			TweenMax.fromTo(current_card, 0.5, { x: 0 }, { x: position_x[0] });
			TweenMax.fromTo(next_card, 0.5, { x: position_x[1] }, { x: 0, onComplete: update_card });
			
			function update_card () {
				
				$(current_product).css({
					backgroundPositionY: config[current].product_posY
				});
				
				 $(current_title).html(config[current].title);
				$(current_description).html(config[current].description);
				
				TweenMax.set(current_card, { x: 0 });
				TweenMax.set(next_card, { x: 650 });
				
				TX_Var.current = current;
				
			}
			
		},
		
		PLAYALEXA_MICOFF: function() {
			
			let bubblespeech	= TX_Var.BUBBLESPEECH,
				toggleicon		= TX_Var.TOGGLEICON,			
				current			= TX_Var.current,
				audio			= ['lights','roomba','xbox','doorbell','underwater','temp'],
				init_SFX		= 'SFX_init_' + audio[current];
			
			$(bubblespeech).css({pointerEvents:'none'});
			$(toggleicon).css({pointerEvents:'none'});
							
			if( TX_Audio.SFX_intro_micoff.playing() ) TX_Audio.STOP('SFX_intro_micoff');
			
			TweenMax.to(bubblespeech, 0.2, {alpha:0, onComplete:on_complete});
			$(TX_Video.content)[0].muted = false;	 
			function on_complete () {
				//TX_Audio.PLAY(init_SFX);
				TX_Video.LOAD(current);
			}
			
			
		},
		
		PLAYALEXA_MICON: function() {
			
			let bubblespeech	= TX_Var.BUBBLESPEECH,
				toggleicon		= TX_Var.TOGGLEICON,
				current			= TX_Var.current;
			
			$(toggleicon).css({pointerEvents:'none'});
							
			if( TX_Audio.SFX_intro_micon.playing() ) TX_Audio.STOP('SFX_intro_micon');
			
			TweenMax.to(bubblespeech, 0.2, {alpha:0, onComplete:on_complete});
									 
			function on_complete () {
				TX_Video.LOAD(current);
			}
			
		},
		
		LOADING: function(is_loading) {
			
	
			let img_loading = TX_Var.img_loading;
			
			if( is_loading ) {
				//disable this
				$(TX_Var.INTRO).css({pointerEvents:'none'});
				TweenMax.to([TX_Var.INTRO, TX_Var.GALLERY], 0.2, {autoAlpha:0});
				
				TweenMax.fromTo(img_loading, 0.5, {rotation:0}, {z:0, rotation:360, repeat:-1, ease:Power0.easeNone });
				TweenMax.to(img_loading, 0.2, {alpha:1});
			} else {
				TweenMax.killTweensOf(img_loading);
				TweenMax.to(img_loading, 0.2, {alpha:0});
			}
		},
		
		PLAY_VOICE: function() {
			
			if( TX_Var.step == 1 ) TXM.api.track( 'other', 'Voice' );
			TX_Var.is_micon = true;
			TX_Creative.STEP_2(true);
			
		},
		
		PLAY_NOVOICE: function() {
			
			if( TX_Var.step == 1 ) TXM.api.track( 'other', 'No Voice' );
			TX_Var.is_micon = false;
			TX_Creative.STEP_2(true);
			
		},
		
		IDLE_TIMER: function() {
		
			clearTimeout(TX_Var.idle_timer);
			TX_Var.idle_timer = setTimeout(TX_Creative.STILLTHERE, 35000);
	//		Reni
		},
		
		CONTINUE: function(with_mic) {
		
			let stillthere			= TX_Var.STILLTHERE,
				toggleicon			= TX_Var.TOGGLEICON,
				bubblespeech		= TX_Var.BUBBLESPEECH,
				is_micon 			= TX_Var.is_micon;
			
			TweenMax.set(stillthere,{pointerEvents:'none'});
			TweenMax.to(stillthere, 0.2, {autoAlpha:0});
			
			if( is_micon === with_mic ) {
				TweenMax.to([toggleicon, bubblespeech], 0.5, {autoAlpha:1, pointerEvents:'none', onComplete: on_complete});
				if( is_micon ) TX_Creative.START_RECOGNITION();
				
			} else {
				TX_Var.is_micon = with_mic;
				
				if( !with_mic ) TXM.api.track( 'other', 'Mic OFF' );
				
				TX_Creative.TOGGLEICON();
				TX_Creative.BUBBLESPEECH();
			}
					
			function on_complete () {			
				TweenMax.set(toggleicon, {pointerEvents:'auto'});
				
				if(!TX_Var.is_micon) TweenMax.set(bubblespeech, {pointerEvents:'auto'});
			}
		},
		
		START_RECOGNITION: function() {
			
			let is_micon 		= TX_Var.is_micon,
				rnd_micon 		= TX_Var.rnd_micon,
				txt_listening 	= TX_Var.txt_listening,
				intro_bubble 	= TX_Var.intro_bubble;
			
			$(rnd_micon).css({
				borderRightColor: '#0C6278',
				borderBottomColor: '#0C6278'
			});
			
			TweenMax.fromTo(txt_listening, 0.8, {alpha:1}, {alpha:0.6, repeat:-1, ease:Power0.easeNone , yoyo:true});	
			TweenMax.fromTo(intro_bubble, 0.8, {alpha:1}, {alpha:0.6, repeat:-1, ease:Power0.easeNone , yoyo:true});
			TweenMax.fromTo(rnd_micon, 1, {rotation:0}, {z:0, rotation:360, repeat:-1, ease:Power0.easeNone });
			
			if( is_micon ) TX_Creative.IDLE_TIMER();
			
			TX_Voice.RECOGNIZED = false;
			TX_Voice.START();
			
		},
		
		STOP_RECOGNITION: function() {
			
			let rnd_micon 		= TX_Var.rnd_micon,
				txt_listening 	= TX_Var.txt_listening,
				intro_bubble 	= TX_Var.intro_bubble ;
			TX_Voice.STOP();
			TX_Voice.RECOGNIZED = true;
			
			$(rnd_micon).css({
				borderRightColor: '#00a7ce',
				borderBottomColor: '#00a7ce'
			});
					
			TweenMax.killTweensOf([rnd_micon,txt_listening]);
			TweenMax.to(txt_listening, 0.2, {alpha:0});
			TweenMax.to(intro_bubble, 0.2, {alpha:0});
		},
	};
		
		
	/**-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=->
	 * SET UP DYNAMIC DATE HERE | TX_Date.INIT();
	 * add to debug link to force preview: &force_rotation=Video_1
	 */
	var TX_Date= (function () {
		
		var force_rotation,
			currentDate,
			date_today,
			date_tomorrow,
			date_thisweek;
		
		function INIT(){
			
			force_rotation 	= TXM.params.force_rotation;
			currentDate		= (new Date()).getTime();
			date_today 		= '9/01/2020 00:00';
			date_tomorrow 	= '6/6/2020 00:00';
			date_thisweek 	= '6/3/2020 00:00';
			date_tickets	= '5/12/2020 21:00';

			
			switch(true){
					
				// NOW
				//case currentDate >= Date.parse(date_today):
				case Date.parse(force_rotation) >= Date.parse(date_today):				
					TX_Var.config[0].product_posY = -267;
					break;
					
					
	//			// TOMORROW
	//			case currentDate >= Date.parse(date_tomorrow) && !force_rotation:
	//			case Date.parse(force_rotation) >= Date.parse(date_tomorrow):			
	//			
	//				break;
	//				
	//			// THIS FRIDAY
	//			case currentDate >= Date.parse(date_thisweek) && !force_rotation:
	//			case Date.parse(force_rotation) >= Date.parse(date_thisweek):				
	//		
	//				break;
	//			
	//			// TICKETS
	//			case currentDate >= Date.parse(date_tickets) && !force_rotation:
	//			case Date.parse(force_rotation) >= Date.parse(date_tickets):				
	//			
	//				break;
					
				// SOON
				default:				
					//console.log('SOON');
			}
			
		}
	
		return {
			INIT : INIT
		};
	
	})();    
		
	/**-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-> 
	 * SET UP VOICE RECOGNITION HERE | TX_PocketSphinx.INIT(); [ https://github.com/syl22-00/pocketsphinx.js ]
	 */
		
	var TX_Voice = {
		
			INIT: function(e) {
				
				TX_Voice.is_ready = false;
				
				/*try {
					navigator.mediaDevices.getUserMedia({ audio: true })
					.then(stream => {
						TX_Voice.ACTIVE_MIC = true;
					}).catch(err => {
						TX_Voice.ACTIVE_MIC = false;
						
					});
				}
				catch ( error ) { TX_Voice.ACTIVE_MIC = false; }*/
				
				try {
					
					if ( navigator.mediaDevices.getUserMedia ) TX_Voice.ACTIVE_MIC = true;
				}
				catch ( error ) { TX_Voice.ACTIVE_MIC = false; }
				
						
				if( TX_API.IS_MOBILE.any() && TX_API.IS_BROWSER.Kik() ) TX_Voice.ACTIVE_MIC = false;
				if( TX_API.IS_BROWSER.IE10() || TX_API.IS_BROWSER.IE11() ) TX_Voice.ACTIVE_MIC = false;
				
				// CMU dictionary format (http://www.speech.cs.cmu.edu/cgi-bin/cmudict)			
				TX_Voice.WORD_LIST = [
					
					// Alexa, dim the lights
					[TX_Var.config[0].tracking, 'D IH M DH AH L AY T S '],
					
					// Alexa, tell roomba to start cleaning
					[TX_Var.config[1].tracking, 'T EH L R UH M B AH T UW S T AA R T K L IY N IH NG'],
					[TX_Var.config[1].tracking + '(2)', 'T EH L R UH M B AH S T AA R T K L IY N IH NG'],
					
					// Alexa, ask Xbox to turn on
					[TX_Var.config[2].tracking, 'B AH K S T UW T ER N AA N'],
					[TX_Var.config[2].tracking + '(2)', 'AE S K EH K S B AA K S T ER N AA N'],
					
					// Alexa, show me the front door
					[TX_Var.config[3].tracking, 'SH OW M IY DH AH F R AH N T D AO R'],
					// Alexa, underwater adventure
					[TX_Var.config[4].tracking, 'AH N D ER W AO T ER AE D V EH N CH ER'],
					
						// Alexa, set the living room to 72 degrees
					[TX_Var.config[5].tracking, 'S EH T DH AH L IH V IH NG R UW M T UW S EH V AH N T IY T UW D IH G R IY Z'],
					//[TX_Var.config[5].tracking + '(2)', 'L IH V IH NG R UW M T UW S EH V AH N T IY T UW'],
	//				
				   // [TX_Var.config[5].tracking, 'S EH V AH N T IY T UW D IH G R IY Z'],
					
					// fillers
					['ALEXA', 'AH L EH K S AH'],
					
					['NULL', 'K L IH K'],
					['NULL(2)', 'T AO K'],
					['NULL(3)', 'S N AE P'],
					['NULL(4)', 'TH OW N OW N'],
					['NULL(5)', 'P AA K']
					
				];
	
				for( let i = 0; i < TX_Voice.WORD_LIST.length; i++ ) {
					TX_Voice.GRAMMARS[0].g.transitions.push({ from: 0, to: 0, word: TX_Voice.WORD_LIST[i][0]});
				}
				
				
							
			},
		
			ON: TX_Creative.PLAY_VOICE,
			
			OFF: TX_Creative.PLAY_NOVOICE,
		
			RECOGNIZED: false,
		
			ASSETS: [ // ADD TO TX_Asset.INIT_JS []
				'https://media.truex.com/file_assets/2019-03-08/d0ed7934-e5fb-4fb2-b939-b6dd4222ab26.js', //callbackManager.js
				'https://media.truex.com/file_assets/2019-04-22/5e6ea8e0-0f46-48c2-8b48-ded35ac903ae.js', //audioRecorder.js
				'https://media.truex.com/file_assets/2019-03-08/4f579b5b-845b-4d61-ad2f-a8cf6c1fd61a.js'  //spanWorker.js
			],
		
			UPDATE_OUTPUT: function ( currentword ) {
				TweenMax.to(TX_Var.intro_bubble , 0.2, {alpha:0});
			   
				switch(currentword) {
					  
					case TX_Var.config[0].tracking: TX_Creative.STEP_3(0,true);
						break;
					case TX_Var.config[1].tracking: TX_Creative.STEP_4(1,true);
						break;
					case TX_Var.config[2].tracking: TX_Creative.STEP_5(2,true);
						break;
					case TX_Var.config[3].tracking: TX_Creative.STEP_6(3,true);
						break;
					case TX_Var.config[4].tracking: TX_Creative.STEP_7(4,true);
						break;
					case TX_Var.config[5].tracking: TX_Creative.STEP_8(5,true);
						break;
				}
			},
		
			GRAMMARS: [{ 
				title: 'grammarLists', 
				g: { numStates: 1, start: 0, end: 0, transitions:[]}
			}],
		
			GRAMMAR_ID: [],
		
			FEED_GRAMMAR: function( g, index, id ) {
				
				let PRJ				= TX_Voice.POST_RECOGNIZER_JOB,
					grammars		= TX_Voice.GRAMMARS,
					grammar_id		= TX_Voice.GRAMMAR_ID,				
					feed_grammar	= TX_Voice.FEED_GRAMMAR;
				
				if ( id && (grammar_id.length > 0) ) grammar_id[0].id = id.id;
				
				if ( index < g.length ) {
					
					grammar_id.unshift({title: g[index].title});
					
					PRJ({command: 'addGrammar', data: g[index].g},
						function(id) { feed_grammar(grammars, index + 1, { id:id }); });
					
				}
				
			},
		
			FEED_WORDS: function( words ) {
				
				let PRJ				= TX_Voice.POST_RECOGNIZER_JOB,
					grammars		= TX_Voice.GRAMMARS,
					feed_grammar	= TX_Voice.FEED_GRAMMAR;
				
				PRJ(
					{command: 'addWords', data: words}, 
					function() {
						feed_grammar(grammars, 0);
					}
				);
				
			},
		
			INIT_RECOGNIZER: function( words ) {
				
				let threshold 		= '1e-40',
					PRJ				= TX_Voice.POST_RECOGNIZER_JOB,
					recorder		= TX_Voice.RECORDER,
					recognizer		= TX_Voice.RECOGNIZER,
					feed_words		= TX_Voice.FEED_WORDS,
					word_list		= TX_Voice.WORD_LIST;
				
				//if( !TX_API.IS_MOBILE.any() && TX_API.IS_BROWSER.Chrome ) threshold = '1e-25';
				//if(TXUtils.isMobile.any()) threshold = '1e-40';
				
				PRJ(
					{
						command: 'initialize', 
						data: [ ['-kws_threshold', threshold] ]
					},
					function() {
						if( recorder ) recorder.consumers = [recognizer];
						
						feed_words(word_list);
					}
				);
				
			},
		
			POST_RECOGNIZER_JOB: function( message, callback ) {
				
				var msg 				= message || {},
					recognizer			= TX_Voice.RECOGNIZER,
					callback_manager	= TX_Voice.CALLBACK_MANAGER;
				
				if( callback_manager ) msg.callbackId = callback_manager.add(callback);
				if( recognizer ) recognizer.postMessage(msg);
					
			},	
		
			READY: function() {
				
				let update_status 		= TX_Voice.UPDATE_STATUS,
					spawn_worker		= TX_Voice.SPAWN_WORKER,
					init_recognizer		= TX_Voice.INIT_RECOGNIZER,
					update_output		= TX_Voice.UPDATE_OUTPUT,
					reset				= TX_Voice.RESET,
					start_usermedia		= TX_Voice.START_USERMEDIA;
				
				update_status('Waiting for approval to access the microphone');
				
				TX_Creative.LOADING(true);
				
				TX_Voice.CALLBACK_MANAGER = new CallbackManager();
	
				spawn_worker('https://media.truex.com/file_assets/2019-03-08/4f579b5b-845b-4d61-ad2f-a8cf6c1fd61a.js', function(worker) {
	
					worker.onmessage = function(e) {
						var hypseg 		= e.data.hypseg,
							currentword = (e.data.hasOwnProperty('hyp')) ? hypseg.pop().word : '<sil>';
						
						if (e.data.hasOwnProperty('id')) {
							var clb 	= TX_Voice.CALLBACK_MANAGER.get(e.data.id),
								data 	= {};
							if ( e.data.hasOwnProperty('data')) data = e.data.data;
							if(clb) clb(data);
						}
	
						if (e.data.hasOwnProperty('hyp')) {
							var newHyp = e.data.hyp;
	
							if (e.data.hasOwnProperty('final') && e.data.final) {
								newHyp = "Final: " + newHyp;
							} else {
								
								let currentHyp = newHyp.replace("NULL ", ""),
									speechText = currentHyp.split(" ").reverse();
									
								$('#status').html( currentword + ' >> ' + TX_Voice.IDLE + ' | ' + speechText );
	
								if(currentword == '<sil>') {
									if(speechText.length >= 1 && speechText[0] !== '') {
										TX_Voice.IDLE++;
										if(TX_Voice.IDLE >= 4) {									
											for (i = 0; i < speechText.length; i++) { 
												update_output(speechText[i]);
												reset();
												speechText = [];
												break;
											}
										}
									}						
								} else {
									TX_Voice.IDLE = 0;
								}
							}					
						} 
	
						if (e.data.hasOwnProperty('status') && (e.data.status == "error")) {
							update_status("Error in " + e.data.command + " with code " + e.data.code);
						}
					};
	
					init_recognizer();
					
				});
				
				try {
					
					window.AudioContext = window.AudioContext || window.webkitAudioContext;
					window.URL = window.URL || window.webkitURL;
					TX_Voice.AUDIO_CONTEXT = new AudioContext();
					update_status("Web Audio browser initialized");
					
					
					if ( navigator.mediaDevices.getUserMedia ) {
						navigator.mediaDevices.getUserMedia({audio: true})
							.then(start_usermedia)
							.catch(
								function(e) {
									update_status(e);
									update_status("No live audio input in this browser");
									TX_Voice.OFF();
									
								}
							);
					} else {
						update_status("No web audio support in this browser");
						TX_Voice.OFF();
					}
	
				} catch (e) {
					update_status("Error initializing Web Audio browser");			
					TX_Voice.OFF();
				}
	
			},
		
			START_USERMEDIA: function( stream ) {
				
				let update_status 	= TX_Voice.UPDATE_STATUS,
					recognizer		= TX_Voice.RECOGNIZER,
					audio_context	= TX_Voice.AUDIO_CONTEXT,
					input 			= TX_Voice.AUDIO_CONTEXT.createMediaStreamSource(stream),
					play_voice		= TX_Creative.PLAY_VOICE;
				 
				var audioRecorderConfig = {errorCallback: function(x) {
					//testing++;
					update_status("Error from recorder: " + x + ' | '/* + testing*/);
	
				}};
				
				// Firefox hack https://support.mozilla.org/en-US/questions/984179
				window.firefox_audio_hack = input;
				
				TX_Voice.RECORDER = new AudioRecorder(input, audioRecorderConfig);
	
				if (recognizer) TX_Voice.RECORDER.consumers = [recognizer];
				
				update_status("Audio recorder ready");
				
				if( TX_API.IS_MOBILE.Android() ) {
					setTimeout(function(){
						if( !TX_Var.end ) TX_Voice.ON();
					}, 2000);
				} else {
					TX_Voice.ON();
				}
				TX_Var.steam = stream;
				TX_Voice.is_ready = true;
						
			},
		
			SPAWN_WORKER: function( workerURL, onReady ) {
				
				let response		= null,
					get 			= new XMLHttpRequest();
				
				get.open("GET", workerURL, true);
				
				get.onreadystatechange = function() {
					
					if( get.readyState == 4 && get.status == 200 ) {
						
						let blob	= null;
						
						response = get.responseText;					
						
						try {
							
							blob = new Blob([response], {type: 'application/javascript'});
							
						} catch (e) {
							
							let BlobBuilder = window.WebKitBlobBuilder || window.MozBlobBuilder,
								bb = new BlobBuilder();
							
							bb.append(ab);
							blob = bb.getBlob(mimeString);
							
						}
	
						TX_Voice.RECOGNIZER = new Worker(window.URL.createObjectURL(blob));
						
						TX_Voice.RECOGNIZER.onmessage = function(event) {
							onReady(TX_Voice.RECOGNIZER);
						};
						
						TX_Voice.RECOGNIZER.postMessage({});
						
					}
					
				};
				
				
				
				get.send();
				
			},
			
			START: function() {
				let recorder = TX_Voice.RECORDER;			
				if(recorder) recorder.start(1);			
			},
	
			STOP: function() {
				let recorder = TX_Voice.RECORDER;			
				if(recorder) recorder.stop();
			},
	
			RESET: function() {
				let stop 	= TX_Voice.STOP,
					start 	= TX_Voice.START;
				
				stop();
				
				setTimeout(function(){
					TX_Voice.IDLE = 0;
					if( !TX_Voice.RECOGNIZED && !TX_Var.end ) start();
				}, 2000);
			},
		
			UPDATE_STATUS: function (status) {
				//console.log('STATUS: ' + status);
				$('#status').html('STATUS: ' + status);
			},
		
		//Reni - end audio media
			END_USERMEDIA: function() {
                try {
                    TX_Var.steam.getTracks().forEach(function(track){track.stop();});
                }
                catch(e) {}
			  
			},
				
			RECOGNIZER: null,
			RECORDER: null,
			AUDIO_CONTEXT: null,
			CALLBACK_MANAGER: null,		
			IDLE: 0,
			ACTIVE_MIC: true
	};
		
	/**-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-> 
	 * SET UP AUDIO HERE | TX_Audio.INIT();
	 */
	var TX_Audio = {
		
			ASSETS: [ 
				// ['', {src:[''], loop:false, volume:1 }],
				['BGM_base', {src:['https://media.truex.com/audio_assets/2018-04-25/fa4fb4c2-4a0c-401d-ae2b-7244a0239810.mp3'], loop:true, volume:0.12 }],
                ['SFX_sorry', {src:['https://media.truex.com/audio_assets/2018-04-25/a40bcb4a-39dd-448d-8f1b-42e12f58497c.mp3'], loop:false, volume:1 }],
				['SFX_intro_micoff', {src:['https://media.truex.com/audio_assets/2020-09-11/29dbc02d-eedc-4347-a516-697d13cb5072.mp3'], loop:false, volume:1 }],
				['SFX_intro_micon', {src:['https://media.truex.com/audio_assets/2020-08-04/b975818e-9b1d-4495-84f1-fa9bd6811fff.mp3'], loop:false, volume:1 }],
				
				['SFX_init_lights', {src:['https://media.truex.com/audio_assets/2020-08-28/2b7c8ae8-1f23-43ca-b602-622f9f3fa00c.mp3'], loop:false, volume:1 }],
				['SFX_init_roomba', {src:['https://media.truex.com/audio_assets/2020-08-28/e5548a5c-202e-491b-b6c8-17512bbb21ee.mp3'], loop:false, volume:1 }],
				['SFX_init_xbox', {src:['https://media.truex.com/audio_assets/2020-08-28/c084fd94-160e-402a-a240-0981dd03d9ca.mp3'], loop:false, volume:1 }],
				['SFX_init_doorbell', {src:['https://media.truex.com/audio_assets/2020-08-28/157e2e73-a406-4c89-9165-cc5a0ca002ce.mp3'], loop:false, volume:1 }],
				['SFX_init_underwater', {src:['https://media.truex.com/audio_assets/2020-09-09/0388d97a-983c-46f9-a919-f3b09aa87997.mp3'], loop:false, volume:1 }],
				['SFX_init_temp', {src:['https://media.truex.com/audio_assets/2020-08-28/34816048-5930-4ae8-8e82-d60f918659ac.mp3'], loop:false, volume:1 }],
	
				['SFX_post_lights', {src:['https://media.truex.com/audio_assets/2020-09-09/e54c4923-3017-4580-b9a7-e8a19a2aa234.mp3'], loop:false, volume:1 }],
				['SFX_post_roomba', {src:['https://media.truex.com/audio_assets/2020-09-09/d69feef0-13d4-4ea4-9ae3-c19432b6f45e.mp3'], loop:false, volume:1 }],
				['SFX_post_xbox', {src:['https://media.truex.com/audio_assets/2020-09-09/20827b05-7b87-4fbe-9d85-9c983bf5a3ec.mp3'], loop:false, volume:1 }],
				['SFX_post_doorbell', {src:['https://media.truex.com/audio_assets/2020-09-09/436ec076-db6e-4757-8576-4e815339ed9e.mp3'], loop:false, volume:1 }],
				['SFX_post_underwater', {src:['https://media.truex.com/audio_assets/2020-09-09/362fddcf-65b0-4af1-a21e-babbc72b615c.mp3'], loop:false, volume:1 }],
				['SFX_post_temp', {src:['https://media.truex.com/audio_assets/2020-09-09/62cbbd8e-e9a8-40f5-a21e-e3c6720b847d.mp3'], loop:false, volume:1 }],
			],
		
			INIT: function(e) {
				
				if ( ( (Math.random() < 0.5) && !TXM.params.force_rotation ) || TXM.params.force_rotation == 'v2' )
					TX_Audio.ASSETS[2][1].src = ['https://media.truex.com/audio_assets/2018-06-18/2cca59b9-be10-43e5-9174-8f753b05bbba.mp3'];
	
				TX_Var.img_audio = '.img_audio';
				TX_Var.btn_audio = '#btn_audio';
				
				$.getScript('https://media.truex.com/file_assets/2019-03-22/ca6cac2b-b0ba-4acd-8fa7-93e80e87dd4a.js', TX_Audio.READY);
	
			},
		
			READY: function(e) {			
				for (let i = 0; i < TX_Audio.ASSETS.length; i++) {
					TX_Audio.ASSETS[i][1].preload = true;								
					TX_Audio[ TX_Audio.ASSETS[i][0] ] = new Howl(TX_Audio.ASSETS[i][1]);
					
					if( i != TX_Var.zero ) create_listener(i);
				}			
				TX_Audio.PLAY('BGM_base');
				
				function create_listener(num){
					TX_Audio[ TX_Audio.ASSETS[num][0] ].on('end', function(){
						TX_Audio.ON_END(TX_Audio.ASSETS[num][0]);
					});
				}
			},
		
			PLAY: function(id) {
				/*if( TX_Audio[id].playing() ) TX_Audio[id].seek(0);
				else TX_Audio[id].play();*/
				TX_Audio[id].play();
			},
		
			PAUSE: function(id) {
				TX_Audio[id].pause();
			},
		
			STOP: function(id) { 
				TX_Audio[id].stop(); 
			},
		
			MUTE: function(id) {
				TX_Audio[id].volume(0);
			},
		
			UNMUTE: function(id) {			
				if( id == 'BGM_base' ) TX_Audio[id].volume(0.12);
				else TX_Audio[id].volume(1);
			},
				
			SEEK: function(id, time) {
				TX_Audio[id].seek(time);
			},
	
			VOLUME_ON: function() {
				Howler.volume(1);
			},
		
			VOLUME_OFF: function() {
				Howler.volume(0);
			},
		
			ON_END: function(id) {
				
				switch (id) {
					case 'SFX_intro_micon':
						TX_Creative.START_RECOGNITION();
						break;
					case 'SFX_init_lights':
					
						TX_Video.LOAD(0);
						break;	
					case 'SFX_init_roomba':
				
						TX_Video.LOAD(1);
						break;
					case 'SFX_init_xbox':
				
						TX_Video.LOAD(2);
						
						break;
					case 'SFX_init_doorbell':
				
						TX_Video.LOAD(3);
						break;
					case 'SFX_init_underwater':
					
						TX_Video.LOAD(4);
						break;
					case 'SFX_init_temp':
					
						TX_Video.LOAD(5);
						break;
				}
			},
		
			END: function(e) {
				Howler.unload();
			},
			
			ACTIVE: true
	};
	
	/**-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=->
	 * SET UP VIDEO HERE | TX_Video.INIT();
	 */
	var TX_Video = {
		
			ASSETS: [
				['#vid_play','https://media.truex.com/image_assets/2018-11-04/94794111-c105-4943-b227-e2d38aa8ca45.png'],
				['#vid_replay','https://media.truex.com/image_assets/2020-01-03/95d0c717-1c58-4def-bd0e-a0b891c00206.png'],
				['#vid_unmute','https://media.truex.com/m/container/click_for_sound.png'],
				['#vid_unmute_mob','https://media.truex.com/image_assets/2018-04-03/7ccd9d86-998f-42c9-8551-86dac4cf7db6.png'],
			],
		
			CONFIG: [ 
//				{ source: TXM.params.vid_lights2		},  https://media.truex.com/file_assets/2020-09-15/c37f69dc-3335-4d78-a127-6ebe8282481a.mp4
//				{ source: TXM.params.vid_roomba2		}, 	https://media.truex.com/file_assets/2020-09-15/642d150f-9370-4e12-86ba-fb9379e3689c.mp4
//				{ source: TXM.params.vid_xbox2 			},	https://media.truex.com/file_assets/2020-09-15/92f1933d-b225-4abc-a372-f410751c1054.mp4
//				{ source: TXM.params.vid_doorbell2		},	https://media.truex.com/file_assets/2020-09-15/02373dae-c2b8-4da3-9014-fa45b7b07f1a.mp4
//				{ source: TXM.params.vid_underwater2	},	https://media.truex.com/file_assets/2020-09-15/666379c3-86e1-414a-a552-a0cff2a582f9.mp4
//				{ source: TXM.params.vid_temp2			},	https://media.truex.com/file_assets/2020-09-15/2821480f-712d-4293-b199-ec5964566170.mp4

				{ source: TXM.params.vid_lights2		},
				{ source: TXM.params.vid_roomba2		},
				{ source: TXM.params.vid_xbox2 			},
				{ source: TXM.params.vid_doorbell2		},
				{ source: TXM.params.vid_underwater2	},
				{ source: TXM.params.vid_temp2			}
			],
		
			////CURRENT: 0,
		
			STYLE: { left: 0, top: 0, width: 960, height: 540, center: true },
		
			INIT: function(autoplay) {
				 
				TX_Video.SETUP();
				
				if( autoplay >= 0 && autoplay <= TX_Video.CONFIG.length ) {
					$('<img />').attr('src', TX_Video.CONFIG[autoplay].preview).load(TX_Video.LOAD(autoplay));
					TX_Video.AUTOPLAY = true;
				}
				
			},
			
			LOAD: function(e) {
			
		       // console.log(e);
				TX_Creative.LOADING(true);

				TX_Video.CURRENT = e;
				
				TX_Video.DESTROY();
				
				$(TX_Video.container).css({
					backgroundImage: 'url(' + TX_Video.CONFIG[TX_Video.CURRENT].preview + ')',
					display: 'block'
				});
							
				$(TX_Video.content).on('play', TX_Video.START);
				$(TX_Video.content).on('ended', TX_Video.END);
				$(TX_Video.content).on('timeupdate', TX_Video.PROGRESS);
				
                try {
                    $('#vid_base')[0].pause();
                }
                catch(e) {}
								
				$(TX_Video.content)[0].src = TX_Video.CONFIG[TX_Video.CURRENT].source;
				//$(TX_Video.content)[0].load();
			
				$(TX_Video.content)[0].play();     
				TX_Video.STATUS._100 = false;
					
			},
		
			START: function(e) {
							
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

                  switch (TX_Video.CURRENT) {
						case 0:
							$(TX_Video.content)[0].currentTime = 2.6204;
							break;
						case 1:
							 $(TX_Video.content)[0].currentTime = 4;
							break;
						case 2:
							 $(TX_Video.content)[0].currentTime = 3.2824;
							break;
						case 3:
							$(TX_Video.content)[0].currentTime = 3.2824;
							break;
						case 4:
							$(TX_Video.content)[0].currentTime = 3.3600;
							break;
						case 5:
							$(TX_Video.content)[0].currentTime = 3.7437;
							break;
					}
			   
					TX_Video.TRACK('video_start');
					$(TX_Video.player).css('opacity', 1);
					$(TX_Video.container).css({backgroundImage: 'none'});
					TX_Video.focus_interval = setInterval( TX_Video.INTERVAL, 1000);
					
					TX_Creative.LOADING(false);				
					TX_Audio.MUTE('BGM_base');
				
					if(TX_Video.CURRENT <=5) {
			
						$(TX_Video.content)[0].muted = true;
						TX_Audio[TX_Video.CONFIG[TX_Video.CURRENT].sfx].play();
			 	}					
					
				}
				
				if( !TX_Video.STATUS._100 && e.currentTarget.currentTime >= 0.01 && $(TX_Video.content)[0].paused ) {
					if( TX_Audio[TX_Video.CONFIG[TX_Video.CURRENT].sfx].playing() ) $(TX_Video.content)[0].currentTime = TX_Audio[TX_Video.CONFIG[TX_Video.CURRENT].sfx].seek();
				}
				
			
			},
		
			END: function(e) {
				
				TX_Video.STATUS._100 = true;
				TX_Video.TRACK('video_stop');
				
				$(TX_Video.container).css({
					display: 'none',
					backgroundImage: 'url(' + TX_Video.CONFIG[TX_Video.CURRENT].endscreen + ')'
				});
				
				$(TX_Video.btn_play).css({
					display: 'none',
					backgroundImage: 'url(' + TX_Video.ASSETS[1][1] + ')',
					backgroundColor: 'rgba(0,0,0,0.4)'
				});
				
				TX_Video.DESTROY();
				TX_Creative.GALLERY();
				
				$('#vid_base')[0].play();
			},
		
			DESTROY: function(e) {
				
				clearInterval(TX_Video.focus_interval);
				$(TX_Video.player).css('opacity', 0);
				$(TX_Video.content).off('play');
				$(TX_Video.content).off('ended');
				$(TX_Video.content).off('timeupdate');
				TX_Video.STATUS._0 = false;
			},
		
			PLAY: function(e) {
				
				$(TX_Video.btn_play).hide();
				if( TX_Video.STATUS._100 ) {
					TX_Video.LOAD(TX_Video.CURRENT);
				} else {
					$(TX_Video.content)[0].play();
				}
				
			},
		
			PAUSE: function(e) {
				
				$(TX_Video.btn_play).show();
				$(TX_Video.content)[0].pause();
			},
	
			UNMUTE: function() {
				
				$(TX_Video.content)[0].muted = false;
				$(TX_Video.content)[0].volume = 1;
			},
		
			MUTE: function() {
				
				$(TX_Video.content)[0].muted = true;
				$(TX_Video.content)[0].volume = 0;
			},
		
			SETUP: function() {
				
				TX_Video.VIDEOS 		= '#VIDEOS';
				TX_Video.container 		= '#vid_container';
				TX_Video.player 		= '#vid_player';
				TX_Video.content 		= '#vid_content';
				TX_Video.btn_play 		= '#vid_play';
				TX_Video.btn_vid 		= '.btn_vid';
				
				let div_container 		= "<div id='vid_container'></div>",				
					div_player 			= "<div id='vid_player'></div>",
					div_content 		= "<video id='vid_content' preload='none' poster='https://media.truex.com/image_assets/2018-11-20/5133bcfb-082e-4973-ae38-0e0aa9c5eaea.png' muted playsinline webkit-playsinline></video>",
					div_play 			= "<div id='vid_play' class='btn_vid'></div>",
					cnt_demo 			= 0;
				
				$(TX_Video.VIDEOS).append(div_container);
				$(TX_Video.container).append(div_player);
				$(TX_Video.container).append(div_play);
				$(TX_Video.player).append(div_content);
	
				$(TX_Video.container).css({
					display: 'none',
					left: TX_Video.STYLE.left,
					top: TX_Video.STYLE.top,
					width: TX_Video.STYLE.width,
					height: TX_Video.STYLE.height,
					backgroundColor: 'transparent',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					overflow: 'hidden',
				});
				
				$(TX_Video.player).css({
					pointerEvents: 'none',
					left: '0px',
					top: '0px',
					width: '100%',
					height: '100%',
					opacity: 0
				});
	
				$(TX_Video.content).css({
					width: '100%',
					height: '100%'
				});
				
				$(TX_Video.btn_vid).css({
					display: 'none',
					left: '0px',
					top: '0px',
					width: '100%',
					height: '100%',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center',
				});
				
				for (let i = 0; i < TX_Video.ASSETS.length; i++) {
					$(TX_Video.ASSETS[i][0]).css('background-image', 'url(' + TX_Video.ASSETS[i][1] + ')');
				}
				
				if( TX_Video.STYLE.center ) $(TX_Video.container).addClass('center');
				
				if( !TX_Video.CONFIG[0].source ) TX_Video.SOUND_DISABLED = true;
				
				for (let i = 0; i < TX_Video.CONFIG.length; i++) {
					
					if( !TX_Video.CONFIG[i].source ) {
						
						TX_Video.CONFIG[i].source = TX_Video.DEMO_URL[cnt_demo];					
						if( cnt_demo >= TX_Video.DEMO_URL.length ) {
							cnt_demo = 0;
						} else {
							cnt_demo++;
						}
					}
					
					TX_Video.CONFIG[i].trackname = TX_Var.config[i].tracking;
					TX_Video.CONFIG[i].preview = TX_Var.transparent;
					TX_Video.CONFIG[i].endscreen = TX_Var.transparent;
					
					TX_Video.CONFIG[i].sfx = 'SFX_post_' + TX_Var.config[i].tracking.toLowerCase();
				}
				
				if( TX_Var.desktop ) {
					$(TX_Video.btn_vid).css('cursor', 'pointer');
				}
	
				$(TX_Video.btn_play).on( 'click' , TX_Video.PLAY);
				
			},
		
			INTERVAL: function() {			
				if( $(TX_Video.content)[0].paused ) $(TX_Video.btn_play).show();
				else $(TX_Video.btn_play).hide();
			},
		
			TRACK: function(state) {
				TXM.api.track('multimedia', state, TX_Video.CONFIG[TX_Video.CURRENT].trackname);
			},
			
			SOUND_DISABLED: TXM.params.autoplay_with_sound_disabled,
		
			DEMO_URL: [
				  'https://media.truex.com/file_assets/2020-09-15/c37f69dc-3335-4d78-a127-6ebe8282481a.mp4', //lights
				  'https://media.truex.com/file_assets/2020-09-15/642d150f-9370-4e12-86ba-fb9379e3689c.mp4', //roomba
				  'https://media.truex.com/file_assets/2020-09-15/92f1933d-b225-4abc-a372-f410751c1054.mp4', //xbox
				  'https://media.truex.com/file_assets/2020-09-15/02373dae-c2b8-4da3-9014-fa45b7b07f1a.mp4', //doorbell
				  'https://media.truex.com/file_assets/2020-09-15/666379c3-86e1-414a-a552-a0cff2a582f9.mp4', //underwater
				  'https://media.truex.com/file_assets/2020-09-15/2821480f-712d-4293-b199-ec5964566170.mp4', //temp

				  'https://media.truex.com/video_assets/2021-02-26/4d545fb1-e4b9-4e6e-83e9-157a78620cc2_large.mp4', //lights
				  'https://media.truex.com/video_assets/2021-02-26/a746e2ad-b7b9-4d95-953b-e61fadc38ad9_large.mp4', //roomba
				  'https://media.truex.com/video_assets/2021-02-26/c7c503cc-b1b5-442d-bb25-4411df721b29_large.mp4', //xbox
				  'https://media.truex.com/video_assets/2021-02-26/16e73cab-6c0e-4996-a616-56fdaa78839d_large.mp4', //doorbell
				  'https://media.truex.com/video_assets/2021-02-26/638cc2f5-1fa4-4b3e-b47d-faa117998916_large.mp4', //underwater
				  'https://media.truex.com/video_assets/2021-02-26/0bcde814-ee1d-47e3-a568-5a51dff1ae11_large.mp4', //temp
			],
		
			STATUS: { _0: false, _100: false }
	};
	
	/**-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=->
	 * NO NEED TO EDIT HERE
	 */
	var TX_Listener = {
		
			READY: function(e) {
			    TXM.dispatcher.addEventListenerOnce('ENGAGEMENT_STARTED', TX_Listener.STARTED);
	            TXM.dispatcher.addEventListenerOnce('ENGAGEMENT_ENDED', TX_Listener.ENDED);
				TX_Loader.IMAGE(TX_Asset.INIT_IMAGES);
				TX_Loader.CSS(TX_Asset.INIT_CSS);
				TX_Loader.JS(TX_Asset.INIT_JS);
				TX_Loader.HTML(TX_Asset.INIT_HTML);
			},
		
			STARTED: function(e) {			
				if( typeof(TXM.API_SERVER) == 'undefined' ) TXM.dispatcher.dispatchEvent('ENGAGEMENT_STARTED');
			},
	
			START: function(e) {			
				setTimeout(function() {
					if( typeof TX_Video !== 'undefined' && TX_Video.AUTOPLAY ) $(TX_Video.content)[0].play();				
				}, 100);
			},
		
			ENDED: function(e) {		
				TX_Voice.END_USERMEDIA();
				TX_Audio.END();
				TX_Video.DESTROY();
                
                try {
                    TX_Video.MUTE();
                } catch (e) {}
                
                try {
                    TX_Video.PAUSE();
                } catch (e) {}
                				
				clearTimeout(TX_Var.idle_timer);
				TX_Var.end = true;
				
			}
	};
	
	var TX_Var = {
		
			desktop: 			TXM.params.desktop ? true : false,
			stageScale:			1,
			isButtonReady:		true,
			container:			'#container',
			button:				'.button',
			zero:				0,
			end:				false
			
	};
		
	var TX_Loader = {
		
			IMAGE: function(urls) {
				for (let i = 0; i < urls.length; i++) {
					let url = urls[i][1];
	
					if(urls == TX_Asset.INIT_IMAGES)
						$('<img />').attr('src', url).load(TX_Loader.UPDATE_ASSETS);
					else
						$('<img />').attr('src', url);
				}
			},
	
			JS: function(urls){
				for (let i = 0; i < urls.length; i++) {
					let url = urls[i];
					$.getScript(url, TX_Loader.UPDATE_ASSETS);
				}
			},
	
			CSS: function(url) {
				$.ajax({
					url      : url,
					dataType : 'text',
					success  : onCSSLoaded
				});
	
				function onCSSLoaded(data) {
					$('<style></style>').append(data).appendTo('head');
					TX_Loader.UPDATE_ASSETS();
				}
			},
	
			HTML: function(url) {
				$.ajax({
					url      : url,
					dataType : 'text',
					success  : function (data) {
						TX_Markup = data;
						TX_Loader.UPDATE_ASSETS();
					}
				});
			},
	
			UPDATE_ASSETS: function() {
				TX_Loader.LOADED_ASSETS +=1;			
				const quotientAssets = TX_Loader.LOADED_ASSETS / TX_Loader.TOTAL_ASSETS;
				TXM.dispatcher.dispatchEvent('ENGAGEMENT_ASSET_LOADING_PROGRESS', quotientAssets);
				
				if(TX_Loader.LOADED_ASSETS == TX_Loader.TOTAL_ASSETS) TX_Loader.COMPLETE();
			},
			
			COMPLETE: function() {
				
				$('#ad_stage').html(TX_Markup);
				
				for (let i = 0; i < TX_Asset.INIT_IMAGES.length; i++) {
					$(TX_Asset.INIT_IMAGES[i][0]).css('background-image', 'url(' + TX_Asset.INIT_IMAGES[i][1] + ')');
				}
				
				TX_Creative.INIT();
				
				for (let i = 0; i < TX_Asset.OTHER_IMAGES.length; i++) {
					$(TX_Asset.OTHER_IMAGES[i][0]).css('background-image', 'url(' + TX_Asset.OTHER_IMAGES[i][1] + ')');
				}
				
				$(TX_Var.button).on( 'click' , TX_Button.MOUSECLICK);
				
				if(TX_Var.desktop) {
					$(TX_Var.button).css('cursor','pointer');	
					$(TX_Var.button).hover(TX_Button.MOUSEOVER, TX_Button.MOUSEOUT);
				}
				
				TX_API.INIT_CLICK();
				
				TX_API.AUTOSCALE();
				
				TX_Loader.IMAGE(TX_Asset.OTHER_IMAGES);
				
				TXM.dispatcher.dispatchEvent('INTERACTIVE_ASSET_READY');
			},
	
			TOTAL_ASSETS: 2 + TX_Asset.INIT_IMAGES.length + TX_Asset.INIT_JS.length,
		
			LOADED_ASSETS: 0
	};
	
	var	TX_API = {
			
			INIT_CLICK: function(e) {
				$(window).on('click', initialClicked);
				
				function initialClicked() {
					$(window).off('click');				
					
					if(typeof TX_Video !== 'undefined') {
						try { 
							if( !TX_Video.STATUS._100 ) {
								if( $(TX_Video.content)[0].paused && $(TX_Video.content).is(':visible')) TX_Video.PLAY();
							} 
						} catch(e) {}
					}
					
					if(typeof TX_Audio !== 'undefined') {
						/**/
					}
				}
			},
		
			CLICKTHRU: function(trackname, end_on_trueattention) {
				if( TXM.api.true_attention.completed && end_on_trueattention ) {
					TX_Listener.ENDED();
					TXM.api.endEngage();
				}
				
				TXM.utils.popupWebsite( trackname );
			},
		
			TIME_SPENT: function(name, sec, dothis) {
				if(sec === false)
					clearInterval(TX_API[name]);
				else {
					TX_API[name] = setInterval(function(){				
						if(TXM.utils.timeSpent() >= sec * 1000) {
							clearInterval(TX_API[name]);
							dothis();
						}
					}, 1000);
				}			
			},
				
			CLICK_DELAY: function(sec) {
				TX_Var.isButtonReady = false;
				setTimeout(function(){
					TX_Var.isButtonReady = true;
				},sec*1000);
			},
			
			AUTOSCALE: function() {			
				$(window).resize(updateScale);
				updateScale();
				
				function updateScale() {
					var transform = $('#ad_container').css('transform');
					if(transform != 'none'){
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
					else 
						TX_Var.stageScale = 1;
				}			
			},			
			
			IS_MOBILE: {				
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
					return (TX_API.IS_MOBILE.Android() || TX_API.IS_MOBILE.BlackBerry() || TX_API.IS_MOBILE.iOS() || TX_API.IS_MOBILE.Windows());
				}
			},
			
			IS_BROWSER: {
				Chrome: function() {
					return navigator.userAgent.match(/Chrome/i) ? true : false;
				},
				Firefox: function() {
					return navigator.userAgent.match(/Firefox/i) ? true : false;
				},
				Safari: function() {
					return (navigator.userAgent.match(/Safari/i) && !TX_API.IS_BROWSER.Chrome()) ? true : false;
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
					return (TX_API.IS_BROWSER.IE10() || TX_API.IS_BROWSER.IE11() || TX_API.IS_BROWSER.Edge());
				}
			}
	};
	
	var	TX_Markup;
		
	TX_Listener.READY();
	
	})();