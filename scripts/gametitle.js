class GameTitle extends Phaser.Scene {

    constructor () {
        
        super({ key: 'GameTitle' });
        
        var playButton;        
        var aboutButton;         
        var gmusic;        
        var logo;        
        var brainer_logo;        
        var menuAbout;        
        var zen;        
        var closeButton;
        var settingsButton;
        var menuSettings;
        var textAbout;
        var textSound;
        var onButtonOver;
        var onButtonClick;
       // console.log(this);
        
        var menuDialog;        
        var setDialog;
        var rexSlider;
          
        //console.log(this.scene.key);
                
    }

    preload () {
	
        // this.load.image('face', 'assets/pics/bw-face.png');
	    //this.load.image('logo', 'assets/sprites/phaser3-logo.png');
        //this.load.baseURL = window.location;  	
        this.load.image('backround'           , 'assets/bg.png');
        this.load.image('menubg'              , 'assets/menubg.png');
        this.load.image('logo'                , 'assets/logo.png');
        this.load.image('brain_logo'          , 'assets/brain_logo.png');
        this.load.image('playbutton'          , 'assets/button_play.png');
        this.load.image('aboutbutton'         , 'assets/button_about.png');
        this.load.image('button_ok'           , 'assets/button_ok.png');        
        this.load.image('u_placeh'            , 'assets/upp_placeholder.png');        
        this.load.image('zen'                 , 'assets/zen.png');
        
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        
        this.load.spritesheet('ok_sheet'        , '/assets/ok_sheet.png', { frameWidth: 128, frameHeight: 48 });        
        this.load.spritesheet('about_sheet'     , '/assets/about_sheet.png', { frameWidth: 128, frameHeight: 48 });
        this.load.spritesheet('sett_sheet'      , '/assets/settings_sheet.png', { frameWidth: 192, frameHeight: 64 });
        this.load.spritesheet('play_sheet'      , '/assets/play_sheet.png', { frameWidth: 128, frameHeight: 64 });  
        
        this.load.audio('menu_music', [
        'assets/audio/menu.ogg'
        ]);
        
        this.load.audio('onbuttonclick', [
        'assets/audio/onbuttonclick.ogg'
        ]);
        
        this.load.audio('onbuttonover', [
        'assets/audio/onbuttonover.ogg'
        ]);
                        
        this.load.scenePlugin('rexuiplugin', 'assets/plugins/rexuiplugin.min.js', 'rexUI', 'rexUI');
        
//        this.load.scenePlugin({
//            key: 'rexuiplugin',
//            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
//            sceneKey: 'rexUI'
//        });      
                 
    }

    create () {	

        this.sound.pauseOnBlur  = false;
        
        this.gmusic             = this.sound.add('menu_music', {volume: localStorage.getItem('volume') == null ? 1 : localStorage.getItem('volume')}); 
        this.onButtonOver       = this.sound.add('onbuttonover', {volume: localStorage.getItem('volume') == null ? 1 : localStorage.getItem('volume')});
        this.onButtonClick      = this.sound.add('onbuttonclick', {volume: localStorage.getItem('volume') == null ? 1 : localStorage.getItem('volume')});
                       
        this.bg             = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'backround').setOrigin(0).setAlpha(0);
        this.logo           = this.add.image(this.scale.width/2, this.scale.height/3 , 'logo').setAlpha(0);        
        this.brainer_logo   = this.add.image(this.scale.width/2-this.scale.width/4, this.scale.height - this.scale.height/2, 'brain_logo').setAlpha(0);        
        this.zen            = this.add.image(this.scale.width/2, this.scale.height - this.scale.height/2 - this.scale.height/3 - this.scale.height/40, 'zen').setAlpha(0);
                        
        WebFont.load({
            google: {
                families: [ 'Freckle Face', 'Finger Paint', 'Marck Script', 'Cormorant Unicase' ]
            }            
        });
            
        //this.playButton  = this.add.image(this.scale.width/2, this.scale.height - this.scale.height/4, 'playbutton').setAlpha(0);        
        //this.aboutButton = this.add.image(this.scale.width/2, this.scale.height - this.scale.height/8, 'aboutbutton').setAlpha(0);
        
        this.playButton = new Phaser.Button(this, {
            
            x: this.scale.width/2 - 64,
            y: this.scale.height - this.scale.height/5 - this.scale.height/7,
            spritesheet: "play_sheet",
            on: {
                click: () => {
                    
                   var tween = this.tweens.addCounter({
                        from: 100,
                        to: 0,
                        duration: 200,
                        onStart: () => {
                                
                          this.onButtonClick.play();  

                        },
                        onUpdate: () =>  {
                            
                            var value = Math.floor(tween.getValue());

                            this.bg.setTint(Phaser.Display.Color.GetColor(value, value, value));
                            this.logo.setTint(Phaser.Display.Color.GetColor(value, value, value));
                            this.brainer_logo.setTint(Phaser.Display.Color.GetColor(value, value, value));
                            this.playButton.sprite.setTint(Phaser.Display.Color.GetColor(value, value, value));
                            this.aboutButton.sprite.setTint(Phaser.Display.Color.GetColor(value, value, value));
                            this.settingsButton.sprite.setTint(Phaser.Display.Color.GetColor(value, value, value));
                            this.zen.setTint(Phaser.Display.Color.GetColor(value, value, value)); 

                        },
                        onComplete: ()=>{   

                            this.gmusic.stop();

                            this.scene.stop('GameTitle');
                            //this.scene.destroy('GameLevels');
                            //this.scene.destroy('GameMenu');
                            //this.scene.add('GameLevels');
                            this.scene.start('GameLevels', {nextLevel:0});

                        }
                    });

                },
                over: () => {
                    
                    this.onButtonOver.play();
                  //  console.log("Mouse over!");
                    
                },
                up: () => {
                  //  console.log("Released!");
                },
                out: () => {
                   // console.log("Mouse out!");
                }
            },

            frames: {click: 0, over: 0, up: 0, out: 1}
            
        });
                
        this.aboutButton = new Phaser.Button(this, {
            
            x: this.scale.width/2-64,
            y: this.scale.height - this.scale.height/16 - this.scale.height/18,
            spritesheet: "about_sheet",
            on: {
                click: () => {

                    this.onButtonClick.play();
                    
                    this.playButton.sprite.input.enabled        = false;            
                    this.aboutButton.sprite.input.enabled       = false; 
                    this.settingsButton.sprite.input.enabled    = false;

                    this.showMessageBox();   

                },
                over: () => {
                    
                    this.onButtonOver.play();
                 //   console.log("Mouse over!");
                    
                },
                up: () => {
                 //   console.log("Released!");
                },
                out: () => {
                 //  console.log("Mouse out!");
                }
            },

            frames: {click: 0, over: 0, up: 0, out: 1}
            
        });
        
        this.settingsButton = new Phaser.Button(this, {
            
            x: this.scale.width/2-96,
            y: this.scale.height - this.scale.height/8 - this.scale.height/9,
            spritesheet: "sett_sheet",
            on: {
                click: () => {

                    this.onButtonClick.play();
                    
                    this.playButton.sprite.input.enabled        = false;            
                    this.aboutButton.sprite.input.enabled       = false; 
                    this.settingsButton.sprite.input.enabled    = false;

                    this.showSettingsBox();   

                },
                over: () => {
                    
                    this.onButtonOver.play();
                 //   console.log("Mouse over!");
                    
                },
                up: () => {
                  //  console.log("Released!");
                },
                out: () => {
                  //  console.log("Mouse out!");
                }
            },

            frames: {click: 0, over: 1, up: 0, out: 0}
            
        });
        
        this.playButton.sprite.setAlpha(0);        
        this.aboutButton.sprite.setAlpha(0);
        this.settingsButton.sprite.setAlpha(0);
                                                
        this.tweens.add({
            
            targets: this.bg,
            alphaTopLeft: { value: 1, duration: 300, ease: 'Power1' },
            alphaTopRight: { value: 1, duration: 300, ease: 'Power1' },
            alphaBottomLeft: { value: 1, duration: 300, ease: 'Power1', },
            alphaBottomRight: { value: 1, duration: 300, ease: 'Power1' },            
            yoyo: false,
            repeat: 0,
            
            onComplete:()=>{    
                          
                this.brainer_logo.setAlpha(1);                
               
                this.tweens.add({
                    targets: [this.brainer_logo],
                    x: this.scale.width/2,                 
                    ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
                    duration: 400,
                    repeat: 0, // -1: infinity
                    yoyo: false,
                    onComplete:()=>{
               
                        this.logo.setAlpha(1);                   
                        this.playButton.sprite.setAlpha(1);  
                        this.aboutButton.sprite.setAlpha(1);   
                        this.settingsButton.sprite.setAlpha(1);
                        this.zen.setAlpha(1); 
                                              
                        this.tweens.add({
                            targets: [ this.playButton, this.logo ],
                            x: this.scale.width-this.scale.width/3,
                            duration: 20,
                            ease: 'Sine.easeOut',
                            flipX: false,
                            yoyo: true,
                            repeat: 0,                    
                            delay: function (i, total, target) {
                                return i * 50;
                            },
                            onComplete:()=>{
                                
                                //console.log(this.gmusic);
                                                                       
                                this.gmusic.play(); 
                                
                            }
                        });

                    }
                });
                  
            }

        });
      
        this.scale.on('resize', this.resizeGameTitle, this); 
                
        //this.scene.on('shutdown', ()=>(console.log('shutdown' + this.scene.key)), this);
                  
        this.sound.context.resume();     

        this.events.once('shutdown', this.shutdown, this);
        this.events.once('start',   this.wake, this);
        
        this.menuAbout      = false;  
        this.menuSettings   = false;
                              
        //console.log(this.scale);
    
    }
    
    showMessageBox() {
        //just in case the message box already exists
        //destroy it
        
        if (this.menuDialog) {
            
            //this.menuDialog.clear(true);            
            this.menuDialog.destroy();
            
        }
        //make a group to hold all the elements
        this.menuDialog = this.physics.add.group();
        
        //make the back of the message box
        var back = this.add.tileSprite(this.scale.width - this.scale.width/2, this.scale.height - this.scale.height/2, this.scale.width/2, this.scale.height/2, 'menubg').setAlpha(0);
        
        //back.setAlpha(0.9);
        
        var placeh = this.add.image(this.scale.width - this.scale.width/2, this.scale.height - this.scale.height/2 - this.scale.height/6, 'u_placeh').setAlpha(0);
        
        //make the close button
        //var closeButton = this.add.image(this.scale.width - this.scale.width/2, this.scale.height - this.scale.height/3, 'button_ok');
        
        this.closeButton = new Phaser.Button(this, {
            
            x: this.scale.width - this.scale.width/2 - 64,
            y: this.scale.height - this.scale.height/3,
            spritesheet: "ok_sheet",
            on: {
                click: () => {
                    
                    this.onButtonClick.play();
                    
                    var tween = this.tweens.addCounter({
                        from: 70,
                        to: 0,
                        duration: 300,
                        onUpdate: () => {
                            
                            var value = Math.floor(tween.getValue());

                            back.setTint(Phaser.Display.Color.GetColor(value, value, value));
                            
                            placeh.setTint(Phaser.Display.Color.GetColor(value, value, value));
                                                        
                            this.closeButton.sprite.setTint(Phaser.Display.Color.GetColor(value, value, value));
                            
                            this.textAbout.setTint(Phaser.Display.Color.GetColor(value, value, value));

                        },
                        onComplete: ()=>{   

                            this.closeButton.sprite.destroy();
                    
                            this.menuAbout = false;

                            this.hideBox();

                            //console.log("Clicked!");

                        }
                    });
                    
                },
                over: () => {
                    
                    this.onButtonOver.play();                    
                 //   console.log("Mouse over!");
                    
                },
                up: () => {
                  //  console.log("Released!");
                },
                out: () => {
                //    console.log("Mouse out!");
                }
            },

            frames: {click: 0, over: 1, up: 0, out: 0}
            
        });
        
        this.closeButton.sprite.setAlpha(0);
        
       // console.log(this.closeButton);
          
        //closeButton.setInteractive({ useHandCursor: true });
        
        //make a text field
        
        //add the elements to the group
        this.menuDialog.add(back);
        //this.menuDialog.add(closeButton);        
        
        this.menuDialog.add(placeh);
      
        //closeButton.once('pointerdown', ()=>{ this.hideBox()}, this);
        
      //  console.log(this.closeButton);
        
        this.menuDialog.x = this.scale.width - this.scale.width/2;
        this.menuDialog.y = this.scale.height - this.scale.height/2;        
                
        this.tweens.add({
            
            targets: back,
            alphaTopLeft: { value: 0.9, duration: 300, ease: 'Power1' },
            alphaTopRight: { value: 0.9, duration: 300, ease: 'Power1' },
            alphaBottomLeft: { value: 0.9, duration: 300, ease: 'Power1', },
            alphaBottomRight: { value: 0.9, duration: 300, ease: 'Power1' },            
            yoyo: false,
            repeat: 0,
            
            onComplete: ()=>{  
                          
                placeh.setAlpha(1); 

                this.closeButton.sprite.setAlpha(1);
                
                if(this.textAbout){
                  
                    this.textAbout.destroy();
                    
                }

                // Basic text wrapping based on width.
                this.textAbout = this.make.text({
                    x: this.scale.width/2,
                    y: this.scale.height - this.scale.height/2,
                    text: "2020(c). Brainer game is the HTML5 Game based on Idiocracy film. Additional thanks to zvukipro.com and others for provided game resources. Powered on Phaser Game Engine.",
                    origin: { x: 0.5, y: 0.5 },
                    style: {                
                        fontFamily: 'Cormorant Unicase',
                        //font: 'bold 25px',
                        fontSize: '14px',
                        fontStyle: 'bold',
                        fill: '#000000',
                        wordWrap: { width: this.scale.width/3 }
                    }
                });

                this.menuDialog.add(this.textAbout);

              // console.log(this.textAbout);                     

            }
            
        });
                
        this.menuAbout = true;

        
    }
    
    hideBox() {
        
        //destroy the box when the button is pressed
        if(this.menuDialog.children !==undefined){
          
            this.menuDialog.clear(true);
            
        }
                
        this.menuDialog.destroy();
        
        this.playButton.sprite.input.enabled        = true;            
        this.aboutButton.sprite.input.enabled       = true; 
        this.settingsButton.sprite.input.enabled    = true;
        
    }
    
    showSettingsBox() {
        //just in case the message box already exists
        //destroy it
        
        if (this.setDialog) {
            
            //this.menuDialog.clear(true);            
            this.setDialog.destroy();
            
        }
        //make a group to hold all the elements
        this.setDialog = this.physics.add.group();
        
        //make the back of the message box
        var back = this.add.tileSprite(this.scale.width - this.scale.width/2, this.scale.height - this.scale.height/2, this.scale.width/2, this.scale.height/2, 'menubg').setAlpha(0);
        
        //back.setAlpha(0.9);
        
        var placeh = this.add.image(this.scale.width - this.scale.width/2, this.scale.height - this.scale.height/2 - this.scale.height/6, 'u_placeh').setAlpha(0);
        
        //make the close button
        //var closeButton = this.add.image(this.scale.width - this.scale.width/2, this.scale.height - this.scale.height/3, 'button_ok');
        
        this.closeButton = new Phaser.Button(this, {
            
            x: this.scale.width - this.scale.width/2 - 64,
            y: this.scale.height - this.scale.height/3,
            spritesheet: "ok_sheet",
            on: {
                click: () => {
                    
                    this.onButtonClick.play();
                    
                    this.rexSlider.destroy();
                    
                    var tween = this.tweens.addCounter({
                        from: 70,
                        to: 0,
                        duration: 300,
                        onUpdate: () => {
                            
                            var value = Math.floor(tween.getValue());

                            back.setTint(Phaser.Display.Color.GetColor(value, value, value));
                            
                            placeh.setTint(Phaser.Display.Color.GetColor(value, value, value));
                                                        
                            this.closeButton.sprite.setTint(Phaser.Display.Color.GetColor(value, value, value));
                            
                            this.textSound.setTint(Phaser.Display.Color.GetColor(value, value, value));

                        },
                        onComplete: ()=>{   
                                                     
                            this.closeButton.sprite.destroy();
                    
                            this.menuSettings = false;

                            this.hideSettingsBox();

                            //console.log("Clicked!");

                        }
                    });
                    
                },
                over: () => {
                    
                    this.onButtonOver.play();                    
                 //   console.log("Mouse over!");
                    
                },
                up: () => {
                  //  console.log("Released!");
                },
                out: () => {
                //    console.log("Mouse out!");
                }
            },

            frames: {click: 0, over: 1, up: 0, out: 0}
            
        });
        
        this.closeButton.sprite.setAlpha(0);
        
       // console.log(this.closeButton);
          
        //closeButton.setInteractive({ useHandCursor: true });
        
        //make a text field
        
        //add the elements to the group
        this.setDialog.add(back);
        //this.menuDialog.add(closeButton);        
        
        this.setDialog.add(placeh);
      
        //closeButton.once('pointerdown', ()=>{ this.hideBox()}, this);
        
      //  console.log(this.closeButton);
        
        this.setDialog.x = this.scale.width - this.scale.width/2;
        this.setDialog.y = this.scale.height - this.scale.height/2;        
                
        this.tweens.add({
            
            targets: back,
            alphaTopLeft: { value: 0.9, duration: 300, ease: 'Power1' },
            alphaTopRight: { value: 0.9, duration: 300, ease: 'Power1' },
            alphaBottomLeft: { value: 0.9, duration: 300, ease: 'Power1', },
            alphaBottomRight: { value: 0.9, duration: 300, ease: 'Power1' },            
            yoyo: false,
            repeat: 0,
            
            onComplete: ()=>{  
                          
                placeh.setAlpha(1); 

                this.closeButton.sprite.setAlpha(1);
                
                if(this.textSound){
                  
                    this.textSound.destroy();
                    
                }
                
                if(this.rexSlider){
                   
                    this.rexSlider.destroy();
                   
                }
                                
                this.rexSlider = this.rexUI.add.slider({
                            x: this.scale.width/2,
                            y: this.scale.height/2,
                            width: 200,
                            height: 20,
                            orientation: 'x',

                            track: this.rexUI.add.roundRectangle(0, 0, 0, 0, 6, 0xfaf4dd),
                            thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0x000000),
                    
                            value:localStorage.getItem('volume') == null ? 1 : localStorage.getItem('volume'),

                            valuechangeCallback: function (value) {
                        
                                localStorage.setItem('volume',value);
                                
                            },
                            space: {
                                top: 4,
                                bottom: 4
                            },
                            input: 'drag', // 'drag'|'click'
                        }, this)
                            .layout();
                
                this.rexSlider.on('valuechange', function(newValue, oldValue, slider){
                                                                             
                        this.gmusic.setVolume(localStorage.getItem('volume') == null ? 1 : localStorage.getItem('volume'));        
                        this.onButtonOver.setVolume(localStorage.getItem('volume') == null ? 1 : localStorage.getItem('volume'));
                        this.onButtonClick.setVolume(localStorage.getItem('volume') == null ? 1 : localStorage.getItem('volume'));

                   //     console.log(localStorage.getItem('volume'));
                      
                }, this);
                              
           //     console.log(this.rexSlider);

                // Basic text wrapping based on width.
                this.textSound = this.make.text({
                    x: this.scale.width/2,
                    y: this.scale.height - this.scale.height/2 - this.scale.height/20,
                    text: "Volume level:",
                    origin: { x: 0.5, y: 0.5 },
                    style: {                
                        fontFamily: 'Cormorant Unicase',
                        //font: 'bold 25px',
                        fontSize: '14px',
                        fontStyle: 'bold',
                        fill: '#000000',
                        wordWrap: { width: this.scale.width/3 }
                    }
                });

                this.setDialog.add(this.textSound);

              // console.log(this.textAbout);                     

            }
            
        });

        this.menuSettings = true;

        
    }
    
    hideSettingsBox() {
        
        //destroy the box when the button is pressed
        
        console.log(this.setDialog);
        
        if(this.setDialog.children !==undefined){
                              
            this.setDialog.clear(true);
            
        }
        
        this.setDialog.destroy();        
            
        this.rexSlider.destroy();
           
        this.playButton.sprite.input.enabled        = true;            
        this.aboutButton.sprite.input.enabled       = true; 
        this.settingsButton.sprite.input.enabled    = true; 
        
    }
        
    shutdown() {
        
     // console.log('shutdown' + this.scene.key);        
             
      this.scale.removeAllListeners();
        
    }
    
    wake() {
        
//        this.sound.pauseOnBlur = false;
////
//        this.music = this.sound.add('menu_music');
////
//        this.music.play();
        
        this.bg.destroy();        
                
        this.playButton.sprite.destroy();
        
        this.aboutButton.sprite.destroy();
        
        this.zen.destroy();
        
        this.bg             = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'backround').setOrigin(0).setAlpha(0);
        this.logo           = this.add.image(this.scale.width/2, this.scale.height/3 , 'logo').setAlpha(0);        
        this.brainer_logo   = this.add.image(this.scale.width/2-this.scale.width/4, this.scale.height - this.scale.height/2, 'brain_logo').setAlpha(0);        
        this.zen            = this.add.image(this.scale.width/2, this.scale.height - this.scale.height/2 - this.scale.height/3 - this.scale.height/40, 'zen').setAlpha(0);
        
        WebFont.load({
            google: {
                families: [ 'Freckle Face', 'Finger Paint', 'Marck Script', 'Cormorant Unicase' ]
            }            
        });
        
        //this.playButton  = this.add.image(this.scale.width/2, this.scale.height - this.scale.height/4, 'playbutton').setAlpha(0);        
        //this.aboutButton = this.add.image(this.scale.width/2, this.scale.height - this.scale.height/8, 'aboutbutton').setAlpha(0);
        
        this.playButton = new Phaser.Button(this, {
            
            x: this.scale.width/2 - 64,
            y: this.scale.height - this.scale.height/5 - this.scale.height/7,
            spritesheet: "play_sheet",
            on: {
                click: () => {
                    
                   this.onButtonClick.play();

                   var tween = this.tweens.addCounter({
                        from: 100,
                        to: 0,
                        duration: 500,
                        onUpdate: () =>
                        {
                            var value = Math.floor(tween.getValue());

                            this.bg.setTint(Phaser.Display.Color.GetColor(value, value, value));
                            this.logo.setTint(Phaser.Display.Color.GetColor(value, value, value));
                            this.brainer_logo.setTint(Phaser.Display.Color.GetColor(value, value, value));
                            this.playButton.sprite.setTint(Phaser.Display.Color.GetColor(value, value, value));
                            this.aboutButton.sprite.setTint(Phaser.Display.Color.GetColor(value, value, value));
                            this.settingsButton.sprite.setTint(Phaser.Display.Color.GetColor(value, value, value));
                            this.zen.setTint(Phaser.Display.Color.GetColor(value, value, value)); 

                        },
                        onComplete: ()=>{   

                            this.music.stop();

                            this.scene.stop('GameTitle');
                            //this.scene.destroy('GameLevels');
                            //this.scene.destroy('GameMenu');
                            //this.scene.add('GameLevels');
                            this.scene.start('GameLevels', {nextLevel:0});

                        }
                    });

                },
                over: () => {
                    
                    this.onButtonOver.play();
                    
                   // console.log("Mouse over!");
                    
                },
                up: () => {
                   // console.log("Released!");
                },
                out: () => {
                  //  console.log("Mouse out!");
                }
            },

            frames: {click: 0, over: 0, up: 0, out: 1}
            
        });
                
        this.aboutButton = new Phaser.Button(this, {
            
            x: this.scale.width/2-64,
            y: this.scale.height - this.scale.height/16 - this.scale.height/18,
            spritesheet: "about_sheet",
            on: {
                click: () => {
                    
                    this.onButtonClick.play();

                    this.playButton.sprite.input.enabled   = false;            
                    this.aboutButton.sprite.input.enabled  = false;            

                    this.showMessageBox();   

                },
                over: () => {
                    
                    this.onButtonOver.play();
                  //  console.log("Mouse over!");
                    
                },
                up: () => {
                  //  console.log("Released!");
                },
                out: () => {
                  //  console.log("Mouse out!");
                }
            },

            frames: {click: 0, over: 0, up: 0, out: 1}
            
        });
        
        this.settingsButton = new Phaser.Button(this, {
            
            x: this.scale.width/2-96,
            y: this.scale.height - this.scale.height/8 - this.scale.height/9,
            spritesheet: "sett_sheet",
            on: {
                click: () => {

                    this.onButtonClick.play();
                    
                    this.playButton.sprite.input.enabled        = false;            
                    this.aboutButton.sprite.input.enabled       = false; 
                    this.settingsButton.sprite.input.enabled    = false;

                    this.showSettingsBox();   

                },
                over: () => {
                    
                    this.onButtonOver.play();
                   // console.log("Mouse over!");
                    
                },
                up: () => {
                //    console.log("Released!");
                },
                out: () => {
                  //  console.log("Mouse out!");
                }
            },

            frames: {click: 0, over: 1, up: 0, out: 0}
            
        });
        
        this.playButton.sprite.setAlpha(0);        
        this.aboutButton.sprite.setAlpha(0);
        this.settingsButton.sprite.setAlpha(0);
//        this.playButton.setInteractive({ useHandCursor: true });
//
//        this.playButton.on('pointerdown', () => {
//            
//           var tween = this.tweens.addCounter({
//                from: 100,
//                to: 0,
//                duration: 500,
//                onUpdate: () =>
//                {
//                    var value = Math.floor(tween.getValue());
//
//                    this.bg.setTint(Phaser.Display.Color.GetColor(value, value, value));
//                    this.logo.setTint(Phaser.Display.Color.GetColor(value, value, value));
//                    this.brainer_logo.setTint(Phaser.Display.Color.GetColor(value, value, value));
//                    this.playButton.setTint(Phaser.Display.Color.GetColor(value, value, value));
//                    this.aboutButton.setTint(Phaser.Display.Color.GetColor(value, value, value));
//                                    
//                },
//                onComplete: ()=>{   
//                    
//                    this.music.stop();
//                                    
//                    this.scene.stop('GameMenu');
//                    //this.scene.destroy('GameLevels');
//                    //this.scene.destroy('GameMenu');
//                    //this.scene.add('GameLevels');
//                    this.scene.start('GameLevels');
//                                        
//                }
//            });
//        
//        });
//        
//        this.aboutButton.setInteractive({ useHandCursor: true });
//        
//        this.aboutButton.on('pointerdown', () => {
//            
//            this.playButton.input.enabled   = false;            
//            this.aboutButton.input.enabled  = false;            
//            
//            this.showMessageBox("HELLO THERE! Put Some Text Here!");    
//        
//        });
                                                
        this.tweens.add({
            
            targets: this.bg,
            alphaTopLeft: { value: 1, duration: 300, ease: 'Power1' },
            alphaTopRight: { value: 1, duration: 300, ease: 'Power1' },
            alphaBottomLeft: { value: 1, duration: 300, ease: 'Power1', },
            alphaBottomRight: { value: 1, duration: 300, ease: 'Power1' },            
            yoyo: false,
            repeat: 0,
            
            onComplete:()=>{    
                
                this.brainer_logo.setAlpha(1);                
               
                this.tweens.add({
                    
                    targets: [this.brainer_logo],
                    x: this.scale.width/2,                 
                    ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
                    duration: 400,
                    repeat: 0, // -1: infinity
                    yoyo: false,
                    onComplete:()=>{

                        this.logo.setAlpha(1);                   
                        this.playButton.sprite.setAlpha(1);  
                        this.aboutButton.sprite.setAlpha(1); 
                        this.settingsButton.sprite.setAlpha(1);
                        this.zen.setAlpha(1);  
                        
                        this.tweens.add({
                            targets: [ this.playButton, this.logo ],
                            x: this.scale.width-this.scale.width/2,
                            duration: 20,
                            ease: 'Sine.easeOut',
                            flipX: false,
                            yoyo: true,
                            repeat: 0,                    
                            delay: function (i, total, target) {
                                return i * 50;
                            }
                        });

                    }
                    
                });
                  
            }

        }); 
        
       this.menuAbout       = false;
       this.menuSettings    = false;
        
       this.scale.on('resize', this.resizeGameTitle, this);     
        
//        this.bg   = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'backround').setOrigin(0);
//        this.logo = this.add.image(this.scale.width/2, this.scale.height/3 , 'logo').setAlpha(0);
//
//        this.playButton = this.add.text(this.scale.width / 2, this.scale.height / 2, 'Play!', { fill: '#FFFFFF' });
//
//        this.playButton.setInteractive({ useHandCursor: true });
//        
//        this.playButton.on('pointerdown', () => {
//            
//            this.scene.stop('GameMenu');
//            //this.scene.destroy('GameLevels');
//            //this.scene.destroy('GameMenu');
//            //this.scene.add('GameLevels');
//            this.scene.start('GameLevels');
//        
//        });
//        
    }
    
    resizeGameTitle (gameSize, baseSize, displaySize, resolution) {
        
        var width   = gameSize.width;
        var height  = gameSize.height;

        this.cameras.resize(width, height);
        
        this.bg.destroy();        
                
        this.playButton.sprite.destroy();
        
        this.aboutButton.sprite.destroy();
        
        this.zen.destroy();
        
        this.bg = this.add.tileSprite(0, 0, width, height, 'backround').setOrigin(0);
        
        this.logo           = this.add.image(width/2, height/3 , 'logo');        
        this.brainer_logo   = this.add.image(width/2, height - height/2, 'brain_logo');        
        this.zen            = this.add.image(width/2, height - height/2 - height/3 - height/40, 'zen');
        
        //this.playButton  = this.add.image(this.scale.width/2, this.scale.height - this.scale.height/4, 'playbutton').setAlpha(0);        
        //this.aboutButton = this.add.image(this.scale.width/2, this.scale.height - this.scale.height/8, 'aboutbutton').setAlpha(0);
        
        this.playButton = new Phaser.Button(this, {
            
            x: width/2 - 64,
            y: height - height/5 - height/7,
            spritesheet: "play_sheet",
            on: {
                click: () => {
                    
                   this.onButtonClick.play();        
//
                   var tween = this.tweens.addCounter({
                        from: 100,
                        to: 0,
                        duration: 500,
                        onUpdate: () =>
                        {
                            var value = Math.floor(tween.getValue());

                            this.bg.setTint(Phaser.Display.Color.GetColor(value, value, value));
                            this.logo.setTint(Phaser.Display.Color.GetColor(value, value, value));
                            this.brainer_logo.setTint(Phaser.Display.Color.GetColor(value, value, value));
                            this.playButton.sprite.setTint(Phaser.Display.Color.GetColor(value, value, value));
                            this.aboutButton.sprite.setTint(Phaser.Display.Color.GetColor(value, value, value));
                            this.settingsButton.sprite.setTint(Phaser.Display.Color.GetColor(value, value, value));
                            this.zen.setTint(Phaser.Display.Color.GetColor(value, value, value)); 

                        },
                        onComplete: ()=>{   

                            this.gmusic.stop();

                            this.scene.stop('GameTitle');
                            //this.scene.destroy('GameLevels');
                            //this.scene.destroy('GameMenu');
                            //this.scene.add('GameLevels');
                            this.scene.start('GameLevels', {nextLevel:0});

                        }
                    });
                    
                },
                over: () => {
                    
                    this.onButtonOver.play();
                  //  console.log("Mouse over!");
                    
                },
                up: () => {
                 //   console.log("Released!");
                },
                out: () => {
                  //  console.log("Mouse out!");
                }
            },

            frames: {click: 0, over: 0, up: 0, out: 1}
            
        });
                
        this.aboutButton = new Phaser.Button(this, {
            
            x: width/2-64,
            y: height - height/16 - height/18,
            spritesheet: "about_sheet",
            on: {
                click: () => {
                    
                    this.onButtonClick.play();

                    this.playButton.sprite.input.enabled        = false;            
                    this.aboutButton.sprite.input.enabled       = false;            
                    this.settingsButton.sprite.input.enabled    = false;    
                    
                    this.showMessageBox();   

                },
                over: () => {
                    
                    this.onButtonOver.play();
                 //   console.log("Mouse over!");
                    
                },
                up: () => {
                  //  console.log("Released!");
                },
                out: () => {
                  //  console.log("Mouse out!");
                }
            },

            frames: {click: 0, over: 0, up: 0, out: 1}
            
        });
        
        this.settingsButton = new Phaser.Button(this, {
            
            x: width/2-96,
            y: height - height/8 - height/9,
            spritesheet: "sett_sheet",
            on: {
                click: () => {

                    this.onButtonClick.play();
                    
                    this.playButton.sprite.input.enabled        = false;            
                    this.aboutButton.sprite.input.enabled       = false; 
                    this.settingsButton.sprite.input.enabled    = false;

                    this.showSettingsBox();   

                },
                over: () => {
                    
                    this.onButtonOver.play();
                //    console.log("Mouse over!");
                    
                },
                up: () => {
                //    console.log("Released!");
                },
                out: () => {
                //    console.log("Mouse out!");
                }
            },

            frames: {click: 0, over: 1, up: 0, out: 0}
            
        });
        
        if(this.menuAbout){
            
           // console.log(this.menuAbout);
            
            this.closeButton.sprite.destroy();
           
            this.menuDialog.clear(true);
        
            this.menuDialog.destroy();
            
            this.textAbout.destroy();
            
            this.menuDialog = undefined;
            
            this.showMessageBox(); 
           
        }
        
        if(this.menuSettings){
            
           // console.log(this.menuAbout);
            
            this.closeButton.sprite.destroy();
               
            this.setDialog.clear(true);    
                
            this.setDialog.destroy();
            
            this.textSound.destroy();
            
            this.setDialog = undefined;
            
            this.showSettingsBox(); 
                   
        }
        
        this.cameras.resize(width, height);
    
    }
    
}
