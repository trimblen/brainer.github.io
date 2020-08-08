
class GameScene extends Phaser.Scene {

    constructor (){

        super ({ key: 'GameScene'});

        var maingroup;
        var panelgroup;

        var score;
        var scoretext;
        var scoreBuffer;
        var scoreLabelTween;
        var rotateTween;
        var sprChanged;

        var timertext;
        var currentTime;
        var mTime;
        var timedEvent;
        var partExplo; 
        var partEmit; 
        var boom;		
		var bg;
        
        var level;        
        var stars;
        var levelscore;                
        var scoreResponse;
        var scoresHelp;        
        var toastMessage; 
        var lastLevel;
        
        var menuButton;        
        var menuGame; 
        
        var menuScores;               
        var menuOpened;   
        var menuDialog;        
        var scoresDialog;        
        var createLabel;
                
        //const COLOR_PRIMARY = 0x4e342e;
        //const COLOR_LIGHT = 0x7b5e57;
        //const COLOR_DARK = 0x260e04;
        
        var settingsButton;
        var menuSettings;
        var textSound;
        var rexSlider;
        var movingSound;
        
        var overlapCollider;
        
        var levDiff;         
        var levSpeed;        
        var baseScoreCount;        
        var baseScoreCoef;
        var levStruct;
        var scoreStuct;
        var levspeedStruct;
        
        var spritesStructure;        
        var menumusic;        
        var clockSound;
        var noticeSound;
        var moveSound;        
        var tadam;        
        var loser;
        var pick;        
        var drop;
        var randomSpr;
        var emitter0;
        var emitter1;
        
        var items_array;       
        var fr_array;
        
        var resStars;        
        var starsStructure;        
        var starBox;        
        var starBoxArray;
        
        var gameOver;         
        var nextLevel;        
        var levStruct;
        
        var closeButton;
        var toMainButton;  
        var textScores;
        var onButtonOver;
        var onButtonClick;        
     
    }
    
    init(data){
        
        //console.log('init', data);
        
        this.level          = data.level;
        this.levelscore     = data.levelscores;
        this.stars          = data.stars;
        this.levDiff        = data.levDiff;
        this.levSpeed       = data.levelSpeed;        
        this.levStruct      = data.levStruct;        
        this.lastLevel      = data.lastLevel;
        this.scoreStrct     = data.scoreStrct;
        this.levSpdStrct    = data.levSpdStrct;
        
        //console.log(data.lastLevel);
        //console.log(this.lastLevel);
        //console.log(this.level);
        //console.log(this.levelscore); 
        //console.log(this.stars);
       //console.log(this.levDiff);
        //console.log(this.levStruct);
        
    }   

    preload() {
                        
        //this.load.baseURL = window.location;    
        
        //this.load.scenePlugin('rexuiplugin', 'scripts/rexuiplugin.min.js', 'rexUI', 'rexUI');
        
        this.load.scenePlugin('rexuiplugin', 'assets/plugins/rexuiplugin.min.js', 'rexUI', 'rexUI');
		     
		//this.load.spritesheet('diamonds', '/assets/diamonds32x24x5.png', { frameWidth: 32, frameHeight: 24 });
        
        this.load.spritesheet('diamonds_1'    , '/assets/shapes/primary/sprlv1.png', { frameWidth: 48, frameHeight: 48 });        
        this.load.spritesheet('diamonds_2'    , '/assets/shapes/primary/sprlv2.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('diamonds_3'    , '/assets/shapes/primary/sprlv3.png', { frameWidth: 48, frameHeight: 48 });
        
        this.load.spritesheet('diamonds_sec_1', '/assets/shapes/secondary/sprlv1.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('diamonds_sec_2', '/assets/shapes/secondary/sprlv2.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('diamonds_sec_3', '/assets/shapes/secondary/sprlv3.png', { frameWidth: 48, frameHeight: 48 });
        //this.load.spritesheet('sett_sheet'      , '/assets/settings_sheet.png', { frameWidth: 192, frameHeight: 64 });
        
        this.load.spritesheet('to_stars', '/assets/to_stars.png', { frameWidth: 48, frameHeight: 48 });
        
        this.load.spritesheet('boom', 'assets/explosion_sph.png', { frameWidth: 182, frameHeight: 206, endFrame: 16 });
        
        this.load.image('bg' , 'assets/bg.png');
        
        this.load.image('u_placeh'               , '/assets/upp_placeholder.png');
        this.load.image('s_placeh'               , '/assets/upp_placeholder2.png');
        this.load.spritesheet('ok_sheet'         , '/assets/ok_sheet.png', { frameWidth: 128, frameHeight: 48 });  
        this.load.spritesheet('to_main_sheet'    , '/assets/to_main_sheet.png', { frameWidth: 192, frameHeight: 48 }); 
        this.load.image('playbutton'             , '/assets/button_play.png');
        
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        
        this.load.image('spark', 'assets/particles/blue.png');
        this.load.image('spark1', 'assets/particles/red.png');
         
        this.load.audio('pick1', [
        'assets/audio/pick1.ogg'
        ]);
        
        this.load.audio('clockSound', [
        'assets/audio/clock.ogg'
        ]);
        
        this.load.audio('ingame', [
        'assets/audio/ingame_music.ogg'
        ]);
        
        this.load.audio('notice', [
        'assets/audio/bonus.ogg'
        ]);
        
        this.load.audio('move', [
        'assets/audio/move.ogg'
        ]);
        
        this.load.audio('onbuttonclick', [
        'assets/audio/onbuttonclick.ogg'
        ]);
        
        this.load.audio('onbuttonover', [
        'assets/audio/onbuttonover.ogg'
        ]);
                
        this.load.audio('tadam', [
        'assets/audio/tadam.ogg'
        ]);
        
        this.load.audio('loser', [
        'assets/audio/loser.ogg'
        ]);
        
        this.load.audio('pick', [
        'assets/audio/pick.ogg'
        ]);
        
        this.load.audio('drop', [
        'assets/audio/drop.ogg'
        ]);
        
        this.load.audio('moving', [
        'assets/audio/moving.ogg'
        ]);
                
        //this.sound.pauseOnBlur = false;
	 
    }

    create(){
        
        //console.log(this.scene);
        
        ///particles for explosion effects 
        this.partExplo        = this.add.particles('spark').setDepth(1);           
        
        //console.log(this.scoresDialog);
        this.sound.pauseOnBlur  = false;
        this.menumusic          = this.sound.add('ingame', {volume: localStorage.getItem('volume') == null ? 1 : localStorage.getItem('volume')});        
        this.menumusic.loop     = true;
                
        this.clockSound         = this.sound.add('clockSound', {volume: localStorage.getItem('volume') == null ? 1 : localStorage.getItem('volume')});         
        this.noticeSound        = this.sound.add('notice', {volume: localStorage.getItem('volume') == null ? 1 : localStorage.getItem('volume')});         
        this.moveSound          = this.sound.add('move', {volume: localStorage.getItem('volume') == null ? 1 : localStorage.getItem('volume')}); 
        this.onButtonOver       = this.sound.add('onbuttonover', {volume: localStorage.getItem('volume') == null ? 1 : localStorage.getItem('volume')});
        this.onButtonClick      = this.sound.add('onbuttonclick', {volume: localStorage.getItem('volume') == null ? 1 : localStorage.getItem('volume')});  
        this.tadam              = this.sound.add('tadam', {volume: localStorage.getItem('volume') == null ? 1 : localStorage.getItem('volume')}); 
        this.loser              = this.sound.add('loser', {volume: localStorage.getItem('volume') == null ? 1 : localStorage.getItem('volume')});        
        this.pick               = this.sound.add('pick', {volume: localStorage.getItem('volume') == null ? 1 : localStorage.getItem('volume')});
        this.drop               = this.sound.add('drop', {volume: localStorage.getItem('volume') == null ? 1 : localStorage.getItem('volume')});     
        this.movingSound        = this.sound.add('moving', {volume: localStorage.getItem('volume') == null ? 1 : localStorage.getItem('volume')});   
        
        this.gameOver       = false;
        this.nextLevel      = 0;        
        //this.currSprite     = true;        
        this.scoreResponse  = 0;
        this.randomSpr      = {};
        
        //+
        for(var i=1; i<=3; i++){
        
            var tarray = [];

              for(var s=0; s<=59; s++){
              
                  tarray[s] = s;
              
              }
            
            var shuffled = tarray.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);
   
            this.randomSpr["diamonds_" + i] = shuffled;  
                        
        }
        //-
        
        console.log(this.randomSpr);
                  
        WebFont.load({
            google: {
                families: [ 'Freckle Face', 'Finger Paint', 'Marck Script', 'Cormorant Unicase', 'PlayfairDisplaySC-Bold']
            }            
        });
        
        var cfg = {
            
            key: 'explode',
            frames: this.anims.generateFrameNumbers('boom', { start: 0, end: 16, first: 0 }),
            frameRate: 24
            
        };
        
        this.spritesStructure  = {};
        
        for (var i = 1; i <= 3; i++) {
            
            this.spritesStructure["diamonds_" + i] = "diamonds_sec_"+i;           
            
        }        
                
        this.starsStructure  = {};
        
        for (var i = 1; i <= 3; i++) {
            
            this.starsStructure[i] = false;           
            
        }
                        
        this.anims.create(cfg);        
                
        this.bg = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, "bg").setAlpha(0);
           
        this.bg.setOrigin(0);
        
        this.tweens.add({
            
            targets: this.bg,
            alphaTopLeft: { value: 1, duration: 300, ease: 'Power1' },
            alphaTopRight: { value: 1, duration: 300, ease: 'Power1' },
            alphaBottomLeft: { value: 1, duration: 300, ease: 'Power1', },
            alphaBottomRight: { value: 1, duration: 300, ease: 'Power1' },            
            yoyo: false,
            repeat: 0,
   
        });

        this.starBox = this.add.group({
            frame: [0],
            key: 'to_stars',               
            frameQuantity: 3                

        });
         
        Phaser.Actions.GridAlign(this.starBox.getChildren(), {
            
            width: 10,
            height: 10,
            cellWidth: 48,
            cellHeight: 48,                   
            x: this.scale.width - this.scale.width/2 - 48,
            y: this.scale.height - this.scale.height/2 - this.scale.height/3-this.scale.height/10
           
        });  
        
        this.maingroup = this.physics.add.staticGroup();
        
        var rowLength = shapeOptions.thumbWidth * shapeOptions.columns + shapeOptions.spacing * (shapeOptions.columns - 1);
        var leftMargin = (this.scale.width - rowLength) / 2 + shapeOptions.thumbWidth / 2;
        var colHeight = shapeOptions.thumbHeight * shapeOptions.rows + shapeOptions.spacing * (shapeOptions.rows - 1);
        var topMargin = (this.scale.height - colHeight) / 3 + shapeOptions.thumbHeight / 2;
        
        this.items_array     = new Array();     
        this.fr_array        = new Array();
        
        for(var k = 0; k < 1; k++){
            
            for(var i = 0; i < shapeOptions.columns; i++){
                        
                for(var j = 0; j < shapeOptions.rows; j++){
                    
                    //console.log(this.levDiff);
                    
                    var sprSheet    = this.levDiff > 1 ? Phaser.Math.Between(1, this.levDiff) : 1 ;  
                    
                    //console.log(sprSheet);
                    
                    var thumb       = this.add.image(k * this.scale.width + leftMargin + i * (shapeOptions.thumbWidth + shapeOptions.spacing), topMargin + j * (shapeOptions.thumbHeight + shapeOptions.spacing), "diamonds_" + sprSheet);   
                   
                   // console.log(this.randomSpr["diamonds_"+ sprSheet][0]);
                    
                    var sprFrame    = this.randomSpr["diamonds_" + sprSheet][0];
                    
                    //console.log(sprFrame);          
                                                            
                    thumb.setFrame(sprFrame);    
                    
                    this.randomSpr["diamonds_" + sprSheet].splice(this.randomSpr["diamonds_" + sprSheet].indexOf(sprFrame),1);
                    
                    //this.randomSpr["diamonds_" + sprSheet].delete[sprFrame];
                    
                    this.maingroup.add(thumb);
                    
                    //console.log(thumb);
                    
                    this.fr_array.push(sprSheet);
                    
                    this.items_array.push(sprFrame);

                }
                
            }

        };        

        var generatedIds        = new Array();    
        this.score              = 0;
        this.scoreBuffer        = 0;
        this.scoretext          = this.add.text(10, 5, 'Total score: ' + this.score, { fontFamily: 'Cormorant Unicase', fontSize: 22, color: '#000000' });           
        this.scoreLabelTween    = this.tweens.add({  
            
                                      targets     : this.scoretext,   
                                      scale       : 1.5,
                                      ease        : 'Linear',
                                      duration    : 200,
                                      yoyo        : true,
                                      repeat      : 0,
                                        
                                      onStart     : ()=>{
                                          
//                                            var children = this.panelgroup.getChildren();
//
//                                            for (var i = 0; i < children.length; i++) {
//
//                                                children[i].input.draggable = false;
//
//                                                //console.log(children[i]);
//                                            }   

                                      },       
            
                                      onComplete: ()=>{                                         
                                                        
                                        this.checkStars(this.stars, this.score, this.levelscore, this.level);
                                    }

                                }, this);
        
//        Phaser.Actions.GridAlign(this.maingroup.getChildren(), {
//            width: 10,
//            height: 10,
//            cellWidth: 48,
//            cellHeight: 48,
//            x: this.scale.width/5,
//            y: this.scale.height/5
//        });
//                
        this.panelgroup = this.physics.add.group();
        
        var children = this.maingroup.getChildren();

        for (var i = 0; i < children.length; i++) {
            
            //var x = Phaser.Math.Between(50, 350);
           // var y = Phaser.Math.Between(50, 350);

            //var angle = Phaser.Math.Between(1, 360);

            //children[i].setPosition(x, y);

            //children[i].angle = angle;            
            children[i].alpha = 0.5;     
            
            
            var thumb = this.physics.add.sprite(this.scale.width - this.scale.width/2, this.scale.height - this.scale.height/5, "diamonds_sec_" + this.fr_array[i]);                                    
          
            //console.log(sprFrame);          

            thumb.setFrame(this.items_array[i]);
            
            thumb.checkWorldBounds = true;

            this.panelgroup.add(thumb);
          
        }

        this.maingroup.refresh();

//        this.panelgroup = this.physics.add.group({
//
//            key: 'diamonds_sec',
//            frame: [ 0, 1, 2, 3, 4 ],
//            frameQuantity: 4,
//            checkWorldBounds: true
//         
//        });
////
//        Phaser.Actions.GridAlign(this.panelgroup.getChildren(), {
//            width: 10,
//            height: 10,
//            cellWidth: 48,
//            cellHeight: 48,
//            x: this.scale.width - this.scale.width/2,
//            y: this.scale.height - this.scale.height/5 
//        });

        var children = this.panelgroup.getChildren();

        for (var i = 0; i < children.length; i++) {
            
            var x = Phaser.Math.Between(this.scale.width - this.scale.width/2 - this.scale.width/6, this.scale.width - this.scale.width/7-this.scale.width/5) + Phaser.Math.Between(1,10);
            var y = Phaser.Math.Between(this.scale.height - this.scale.height/4, this.scale.height - this.scale.height/8) + Phaser.Math.Between(1,10);

            var tween = this.tweens.add({
                targets: [ children[i]],
                x: x,
                y: y,
                ease: 'Power1',
                duration: 500,                
                onStart: ()=>{
                
                    this.moveSound.play();
                
                }
                
            });

            //children[i].setPosition(x, y);
        }
        
        //this.panelgroup.refresh();
                        
        this.boom = this.add.sprite(0, 0, 'boom');
		
		this.boom.visible = false;
        
        this.boom.anims.setTimeScale(1.5);
        
        //this.boom.anims.play('explode');
        
        Phaser.Actions.Call(this.panelgroup.getChildren(), function(item){

            //make item interactive
            item.setInteractive({ useHandCursor: true });

            item.on("pointerdown", function (pointer){

               // console.log('You clicked on ' + item.texture.key);
                
                //console.log(gameObject);

            });

            this.input.setDraggable(item);

            this.input.on('dragstart', function (pointer, gameObject) {

                this.pick.play();

                gameObject.setTint(0xff0000);

            }, this);

            this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
                
                gameObject.x = dragX;
                gameObject.y = dragY;

            });

            this.input.on('dragend', function (pointer, gameObject) {

                this.pick.stop();
                
                this.drop.play();
                
                gameObject.clearTint();
                        
                //Phaser.Physics.Arcade.Collider(this.panelgroup,this.maingroup);
                
                //this.overlapCollider = this.physics.add.overlap(this.panelgroup,this.maingroup, this.check, null, this);

            }, this);

        }, this);
   
        this.timertext = this.add.text(10, 40, 'Time: 100', { fontFamily: 'Cormorant Unicase', fontSize: 22, color: '#000000' });

        this.currentTime     = 100;
        this.mTime           = 100;        
        this.timedEvent      = this.time.addEvent({ delay: 800 - this.levSpeed, callback: this.reduceTime, callbackScope: this, loop: true });
            
        this.scale.on('resize', this.resizeGameScene, this);  
                       
        this.toastMessage = this.rexUI.add.toast({
            x: this.scale.width/2,
            y: this.scale.height - this.scale.height/2 - this.scale.height/3,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 20, 0xffffff),
            text: this.add.text(0, 0, '', {
                fontFamily: 'PlayfairDisplaySC-Bold', fontSize: '48px', color:"#000000"
            }),
            space: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
            },
        });
        
        this.toastMessage.show('Level ' + this.level);
        
        this.menuButton   = this.add.text(this.scale.width-125, 5, 'Pause Menu', { fontFamily: 'Cormorant Unicase', fontSize: 22, color: '#000000' });
        
        this.menuButton.setShadow(0, 0, 'rgba(0,0,0,0.5)', 5);   
        
        this.menuButton.setInteractive({ useHandCursor: true });  
        
        this.menuButton.on('pointerdown', () => {
            
            this.onButtonClick.play();
                        
            this.showMessageBox();                           
        
        });
        
        this.menuButton.on('pointerover', () => {
            
            this.onButtonOver.play();
                                   
            this.menuButton.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        
        });
        
        
        this.menuButton.on('pointerout', () => {
            
            this.menuButton.setShadow(0, 0, 'rgba(0,0,0,0.5)', 5);                           
        
        });
            
        this.events.once('shutdown' , this.shutdown, this);
        this.events.once('start'    , this.wake, this); 
        
        this.baseScoreCoef = (this.levelscore*3)/(this.panelgroup.getLength());
        
        this.menumusic.play();
        
        this.resStars = 0; 
        
        this.menuOpened     = false;
        this.menuSettings   = false;
        
        this.getScore(this.level);
        
        //console.log(this.scoreResponse);
         
        this.scoreHelp = this.make.text({
            x: this.scale.width/2,
            y: this.scale.height - this.scale.height/16,
            text: "1 star - " + this.levelscore +" points, 2 stars - " +this.levelscore*2+ " points, 3 stars - " + this.levelscore*3 + " points",
            origin: { x: 0.5, y: 0.5 },
            style: {                
                fontFamily: 'Cormorant Unicase',
                //font: 'bold 25px',
                fontSize: '16px',
                fontStyle: 'bold',
                fill: '#000000',
                wordWrap: { width: this.scale.width/2 }
            }
        });
          
        if(this.game.device.os.desktop){
            
            this.input.keyboard.enabled = true;
           
            this.input.keyboard.on('keydown_ESC', ()=>{
                
                if(!this.menuOpened){
                
                  this.showMessageBox(); 
                   
                }
                
            }, this);
            
            this.input.keyboard.addCapture('ESC');
           
        };
        
        this.overlapCollider = this.physics.add.overlap(this.panelgroup,this.maingroup, this.check, null, this);
               
        //Phaser.Actions.Call(this.starBox.getChildren(), function(item){ console.log(item);});            
          
        //this.input.keyboard.once('keydown_X', () => { this.togglePause(); }, this); //This will work regardless of paused state
        
                
    }
            
    shutdown() {
        
        if (this.score > this.scoreResponse){
            
            this.updateScore(this.score, this.level);
               
        }  
                        
        this.scale.removeAllListeners();
        
        this.overlapCollider.destroy();

        //console.log(this.physics);
        
        //console.log(this.overlapCollider);       
        
        //this.physics.pause();
        
        //this.physics.pause();
        
        //console.log(this.physics.world);
        
    }
    
    showMessageBox(resize = false) {
        
        //just in case the message box already exists
        //destroy it
        
        //console.log(this.menuDialog);
        
        if (this.menuDialog) {
            
            this.menuDialog.destroy();   
            
        }
        
        this.menuOpened = true;
        
        this.menumusic.pause();
        
        //make a group to hold all the elements
        this.menuDialog = this.physics.add.group();
        
        //make the back of the message box
        var back = this.add.tileSprite(this.scale.width - this.scale.width/2, this.scale.height - this.scale.height/2, this.scale.width/2, this.scale.height/2, 'menubg');
        
        back.setAlpha(0);
        
        var placeh = this.add.image(this.scale.width - this.scale.width/2, this.scale.height - this.scale.height/2 - this.scale.height/6, 'u_placeh');
        
        placeh.setAlpha(0);
        
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

                        this.toMainButton.sprite.setTint(Phaser.Display.Color.GetColor(value, value, value));

                    },
                    onComplete: ()=>{   

                        this.closeButton.sprite.destroy();

                        this.toMainButton.sprite.destroy();

                        this.menuOpened = false;

                        this.hideBox();
                        
                        this.menumusic.resume();

                        //console.log("Clicked!");

                    }
                });                    

                },
                over: () => {
                    
                    this.onButtonOver.play();
                    //console.log("Mouse over!");
                                        
                },
                up: () => {
                    //console.log("Released!");
                },
                out: () => {
                    //console.log("Mouse out!");
                }
            },

            frames: {click: 0, over: 1, up: 0, out: 0}
            
        });
        
        this.closeButton.sprite.setAlpha(0);
        
        //console.log(this.closeButton);
          
        //closeButton.setInteractive({ useHandCursor: true });
        
        //make a text field
        
        this.toMainButton = new Phaser.Button(this, {
            
            x: this.scale.width - this.scale.width/2 - 96,
            y: this.scale.height - this.scale.height/2,
            spritesheet: "to_main_sheet",
            on: {
                click: () => {                    
                    
                     var tween = this.tweens.addCounter({
                        from: 100,
                        to: 0,
                        duration: 200,                         
                        onStart: () => {
                                
                            this.onButtonClick.play();

                        }, 
                         
                        onUpdate: () => {
                            
                            var value = Math.floor(tween.getValue());

                            this.bg.setTint(Phaser.Display.Color.GetColor(value, value, value)); 
                            this.starBox.setTint(Phaser.Display.Color.GetColor(value, value, value));
                            this.maingroup.setTint(Phaser.Display.Color.GetColor(value, value, value)); 
                            this.panelgroup.setTint(Phaser.Display.Color.GetColor(value, value, value)); 
                            back.setTint(Phaser.Display.Color.GetColor(value, value, value));

                        },
                        onComplete: ()=>{   

                            this.closeButton.sprite.destroy();

                            this.toMainButton.sprite.destroy();

                            this.hideBox();

                            this.menumusic.stop();

                            this.input.removeAllListeners();

                            this.scene.stop('GameScene');

                            //this.scene.add('GameMenu');

                            this.scene.start('GameTitle');                       

                            //console.log("Clicked!");

                        }
                    });                    
     
                },
                over: () => {
                    
                    this.onButtonOver.play();
                    //console.log("Mouse over!");
                    
                },
                up: () => {
                    //console.log("Released!");
                },
                out: () => {
                    //console.log("Mouse out!");
                }
            },

            frames: {click: 0, over: 1, up: 0, out: 0}
            
        });     
      
            // Basic text wrapping based on width.
//        var textAbout = this.make.text({
//            x: this.scale.width/2,
//            y: this.scale.height - this.scale.height/2,
//            text: "2020(c). Brainer game is the HTML5 Game based on Idiocracy film. Additional thanks to zvukipro.com for provided game resources.",
//            origin: { x: 0.5, y: 0.5 },
//            style: {                
//                fontFamily: 'Cormorant Unicase',
//                //font: 'bold 25px',
//                fontSize: '14px',
//                fontStyle: 'bold',
//                fill: '#000000',
//                wordWrap: { width: this.scale.width/3 }
//            }
//        });
        
        this.toMainButton.sprite.setAlpha(0);
        
        //console.log(textAbout);
        
        //add the elements to the group
        this.menuDialog.add(back);
        //this.menuDialog.add(closeButton);
        //this.menuDialog.add(textAbout);
        //this.menuDialog.add(toMainButton);
        
        this.menuDialog.add(placeh);
      
        //closeButton.once('pointerdown', ()=>{ this.hideBox()}, this);
        
        //console.log(this.closeButton);
        
        this.menuDialog.x = this.scale.width - this.scale.width/2;
        this.menuDialog.y = this.scale.height - this.scale.height/2;
                
        this.timedEvent.paused = true;
        
        //console.log(this.timedEvent);
        
        var children = this.panelgroup.getChildren();

        for (var i = 0; i < children.length; i++) {
            
            children[i].input.draggable = false;
            
            //console.log(children[i]);
        }   
        
        this.menuButton.input.enabled = false;
        
//        if(!resize){
//          
//            this.noticeSound.play();
//            
//        }
        
        this.tweens.add({
            
            targets: back,
            alphaTopLeft: { value: 0.9, duration: 200, ease: 'Power1' },
            alphaTopRight: { value: 0.9, duration: 200, ease: 'Power1' },
            alphaBottomLeft: { value: 0.9, duration: 200, ease: 'Power1', },
            alphaBottomRight: { value: 0.9, duration: 200, ease: 'Power1' },            
            yoyo: false,
            repeat: 0,
            
            onComplete: ()=>{   

                placeh.setAlpha(1); 

                this.closeButton.sprite.setAlpha(1);
                
                this.toMainButton.sprite.setAlpha(1);
                                
            }
            
        });               
                
    }
    
    showScoresBox(starsCount, resize = false) {
       
          //just in case the message box already exists
        //destroy it
         
        //console.log(this.scoresDialog);
    
        if (this.gameOver) {
            
            if(!resize){
               
                 return; 
               
            }              
                           
            //this.menuDialog.clear(true);     
                      
        }
                   
        this.gameOver = true;
        
        this.menumusic.pause();
        
        //make a group to hold all the elements
        this.scoresDialog = this.physics.add.group();
        
        //make the back of the message box
        var back = this.add.tileSprite(this.scale.width - this.scale.width/2, this.scale.height - this.scale.height/2, this.scale.width/2, this.scale.height/2, 'menubg');
        
        back.setAlpha(0);
        
        var placeh = this.add.image(this.scale.width - this.scale.width/2, this.scale.height - this.scale.height/2 - this.scale.height/6, 's_placeh');
        
        placeh.setAlpha(0);
        
        //make the close button
        //var closeButton = this.add.image(this.scale.width - this.scale.width/2, this.scale.height - this.scale.height/3, 'button_ok');
        
        this.closeButton = new Phaser.Button(this, {
            
            x: this.scale.width - this.scale.width/2 - 64,
            y: this.scale.height - this.scale.height/3,
            spritesheet: "ok_sheet",
            on: {
                click: () => {
                                        
                    var tween = this.tweens.addCounter({
                        from: 100,
                        to: 0,
                        duration: 200,                         
                        onStart: () => {
                                
                            this.onButtonClick.play();

                        }, 
                         
                        onUpdate: () => {
                            
                            var value = Math.floor(tween.getValue());

                            this.bg.setTint(Phaser.Display.Color.GetColor(value, value, value)); 
                            this.starBox.setTint(Phaser.Display.Color.GetColor(value, value, value));
                            this.maingroup.setTint(Phaser.Display.Color.GetColor(value, value, value)); 
                            this.panelgroup.setTint(Phaser.Display.Color.GetColor(value, value, value)); 
                            back.setTint(Phaser.Display.Color.GetColor(value, value, value));

                        },
                        onComplete: ()=>{   

                            this.closeButton.sprite.destroy();

                            //toMainButton.sprite.destroy();

                            this.hideScoresBox();

                            this.menumusic.stop();

                            this.input.removeAllListeners();

                            //this.scene.add('GameMenu');
                            
                            if (starsCount===3){
                                                            
                               this.scene.stop('GameScene');                              
                            
                               if(this.level!== this.lastLevel) {
                                   
                                    this.scene.restart({ 
                                        
                                                level           : this.level+1,
                                                stars           : this.stars,
                                                levelscores     : this.scoreStrct[this.level+1],
                                                levelSpeed      : this.levSpdStrct[this.level+1],
                                                levDiff         : this.getDifficultyLevel(this.lastLevel+1/2, this.level+1),
                                                levStruct       : this.levStruct,
                                                lastLevel       : this.lastLevel,
                                                scoreStrct      : this.scoreStrct,
                                                levSpdStrct     : this.levSpdStrct
                                      }); 
                                   
                               }else{
                                   
                                   this.scene.start('GameLevels', {nextLevel:this.nextLevel});
                                   
                               }
                                                               
                            } else{
                                                                
                                this.scene.stop('GameScene');
                              
                                this.scene.start('GameLevels', {nextLevel:this.nextLevel});
                                
                            }
                   
                        }
                        
                    });    
           
                },
                over: () => {
                    
                    this.onButtonOver.play();
                    //console.log("Mouse over!");
                    
                },
                up: () => {
                   // console.log("Released!");
                },
                out: () => {
                    //console.log("Mouse out!");
                }
            },

            frames: {click: 0, over: 1, up: 0, out: 0}
            
        });
              
        //console.log(this.closeButton);
        
        this.closeButton.sprite.setAlpha(0);
          
        //closeButton.setInteractive({ useHandCursor: true });
        
        //make a text field
        
//        var toMainButton = new Phaser.Button(this, {
//            
//            x: this.scale.width - this.scale.width/2,
//            y: this.scale.height - this.scale.height/2,
//            spritesheet: "to_main_sheet",
//            on: {
//                click: () => {
//
//                    closeButton.sprite.destroy();
//                    
//                    toMainButton.sprite.destroy();
//
//                    this.hideScoresBox();
//                    
//                    this.input.removeAllListeners();
//
//                    this.scene.stop('GameScene');
//
//                    //this.scene.add('GameMenu');
//
//                    this.scene.start('GameMenu');                       
//
//                    console.log("Clicked!");
//
//                },
//                over: () => {
//                    console.log("Mouse over!");
//                },
//                up: () => {
//                    console.log("Released!");
//                },
//                out: () => {
//                    console.log("Mouse out!");
//                }
//            },
//
//            frames: {click: 0, over: 1, up: 0, out: 0}
//            
//        });     
      
      //       Basic text wrapping based on width.
         
        var textScore = ""; 
         
        if (starsCount===3){
            
           textScore = "You have succesfully completed "+ this.level + " level!"; 
            
           if (this.score> this.scoreResponse && this.scoreResponse > 0){
            
              textScore = textScore + "\nYou have established a new record. \nYour score is: " + this.score;
               
           }  
            
           if (this.level ===this.lastLevel){
             
               textScore = "You are a winner!!! \nYour score is: " + this.score;
               
           } 
            
           if(!resize){
              
                this.tadam.play();
                
           }
                      
        } else{
            
           if(!resize){   
               
                this.menumusic.stop();
                          
                this.loser.play();
              
           }
                  
           textScore = "You have loosed this level!";
            
        }
                                                   
       //console.log(text13);
        
       //console.log(this.scoreResponse);
//        
//       if(this.scoreResponse.hasOwnProperty('scores')){
//           
//           lastScoreThisLevel = this.scoreResponse['scores'];
//
//       }
        
         
       //this.updateScore(this.score, user_id, this.level,ajax_script_path);
        
       //console.log(getScoreArray);    
         
        this.textScores = this.make.text({
            x: this.scale.width/2,
            y: this.scale.height - this.scale.height/2,
            text: textScore,
            origin: { x: 0.5, y: 0.5 },
            style: {                
                fontFamily: 'Cormorant Unicase',
                //font: 'bold 25px',
                fontSize: '18px',
                fontStyle: 'bold',
                fill: '#000000',
                wordWrap: { width: this.scale.width/3 }
            }
        });
        
        //this.textScores.setAlpha(0);
        
        //console.log(textAbout);
        
        //add the elements to the group
        this.scoresDialog.add(back);
        //this.menuDialog.add(closeButton);
        this.scoresDialog.add(this.textScores);
        //this.menuDialog.add(toMainButton);
        
        this.scoresDialog.add(placeh);
      
        //closeButton.once('pointerdown', ()=>{ this.hideBox()}, this);
        
       // console.log(this.closeButton);
        
        this.scoresDialog.x = this.scale.width - this.scale.width/2;
        this.scoresDialog.y = this.scale.height - this.scale.height/2;
         
        //closeButton.sprite.x = closeButton.sprite.width;
         
       // console.log(this.timedEvent);
        
        var children = this.panelgroup.getChildren();

        for (var i = 0; i < children.length; i++) {
            
            children[i].input.draggable = false;
            
            //console.log(children[i]);
        }   
        
        this.tweens.add({
            
            targets: back,
            alphaTopLeft: { value: 0.9, duration: 200, ease: 'Power1' },
            alphaTopRight: { value: 0.9, duration: 200, ease: 'Power1' },
            alphaBottomLeft: { value: 0.9, duration: 200, ease: 'Power1', },
            alphaBottomRight: { value: 0.9, duration: 200, ease: 'Power1' },            
            yoyo: false,
            repeat: 0,
            
            onComplete: ()=>{   

                placeh.setAlpha(1); 

                this.closeButton.sprite.setAlpha(1);
                
                if(this.textScores){
                  
                    this.textScores.destroy();
                    
                }
                
                this.textScores = this.make.text({
                    x: this.scale.width/2,
                    y: this.scale.height - this.scale.height/2,
                    text: textScore,
                    origin: { x: 0.5, y: 0.5 },
                    style: {                
                        fontFamily: 'Cormorant Unicase',
                        //font: 'bold 25px',
                        fontSize: '18px',
                        fontStyle: 'bold',
                        fill: '#000000',
                        wordWrap: { width: this.scale.width/3 }
                    }
                });
                
                if (starsCount===3){
             
                   if(!resize){

                        this.tadam.play();

                   }

                } else{

                   if(!resize){            

                        this.loser.play();

                   }

                }
  
            }
            
        });        
        
        this.menuButton.input.enabled = false;  
        
        this.timedEvent.paused = true;
        
        if(!resize){
          
            this.noticeSound.play();
         
            this.cameras.main.flash(1000, 1.0, 1.0, 1.0, false); 
            
        }
                 
    }

    showInfoBox(text) {
        //just in case the message box already exists
        //destroy it
        if (this.scoresDialog) {
            this.scoresDialog.destroy();
        }
        //make a group to hold all the elements
        this.scoresDialog = this.physics.add.group();
        //make the back of the message box
        var back = this.add.sprite(0, 0, '11');
        //make the close button
        var closeButton = this.add.image(0, 0, 'playbutton');
        //make a text field
        var text1 = this.add.text(0, 0, text);
        //set the textfeild to wrap if the text is too long
        text1.wordWrap = true;
        //make the width of the wrap 90% of the width 
        //of the message box
        text1.wordWrapWidth = w * .9;
        //
        //
        //set the width and height passed
        //in the parameters
        back.width = w;
        back.height = h;
        //
        //
        //
        //add the elements to the group
        this.scoresDialog.add(back);
        this.scoresDialog.add(closeButton);
        this.scoresDialog.add(text1);
        //
        //set the close button
        //in the center horizontally
        //and near the bottom of the box vertically
        closeButton.x = back.width / 2 - closeButton.width / 2;
        closeButton.y = back.height - closeButton.height;
        //enable the button for input
        closeButton.setInteractive({ useHandCursor: true });
        //add a listener to destroy the box when the button is pressed
        closeButton.once('pointerdown', ()=>{ this.hideBox()}, this);
        
        //console.log(closeButton);
        //
        //
        //set the message box in the center of the screen
        this.scoresDialog.x = this.scale.width / 2 - this.scoresDialog.width / 2;
        this.scoresDialog.y = this.scale.height / 2 - this.scoresDialog.height / 2;
        //
        //set the text in the middle of the message box
        text1.x = back.width / 2 - text1.width / 2;
        text1.y = back.height / 2 - text1.height / 2;
        //make a state reference to the messsage box
           
        //console.log(this.timedEvent);
        
        this.timedEvent.paused = true;
        
        console.log(this.timedEvent);
        
        var children = this.panelgroup.getChildren();

        for (var i = 0; i < children.length; i++) {
            
            children[i].input.draggable = false;
            
           // console.log(children[i]);
            
        }     
        
        
    }    
    
    hideBox() {
        
        //destroy the box when the button is pressed
        
        var children = this.panelgroup.getChildren();

        for (var i = 0; i < children.length; i++) {
            
            this.input.setDraggable(children[i]);
            
           // console.log(children[i]);
         
        }        
        
        this.timedEvent.paused = false;
        
        this.menuDialog.clear(true)
        
        this.menuDialog.destroy();
         
        this.menuButton.input.enabled = true;
        
    }
    
    
    hideScoresBox() {
        
        //destroy the box when the button is pressed
        
        var children = this.panelgroup.getChildren();

        for (var i = 0; i < children.length; i++) {
            
            this.input.setDraggable(children[i]);
            
           // console.log(children[i]);
         
        }        
        
        this.timedEvent.paused = false;
        
        this.scoresDialog.clear(true)
        
        this.scoresDialog.destroy();
        
        //console.log(this.scoresDialog);
        
        this.menuButton.input.enabled = true;
         
    }
    
    
    wake() {
        
        this.events.once('update', this.update, this);          
                      
        this.scale.on('resize', this.resizeGameScene, this);  
                
        //this.physics.resume();   
        
        //console.log('wake' + this.scene.key);
        
        this.maingroup = this.physics.add.staticGroup();
        
        this.partExplo       = this.add.particles('spark').setDepth(1); 
        
        this.items_array     = new Array();     
        this.fr_array        = new Array();
        
        var rowLength   = shapeOptions.thumbWidth * shapeOptions.columns + shapeOptions.spacing * (shapeOptions.columns - 1);
        var leftMargin  = (this.scale.width - rowLength) / 2 + shapeOptions.thumbWidth / 2;
        var colHeight   = shapeOptions.thumbHeight * shapeOptions.rows + shapeOptions.spacing * (shapeOptions.rows - 1);
        var topMargin   = (this.scale.height - colHeight) / 3 + shapeOptions.thumbHeight / 2;
        
        this.randomSpr = {};
        
        //+
        for(var i=1; i<=3; i++){
        
            var tarray = [];

              for(var s=0; s<=59; s++){
              
                  tarray[s] = s;
              
              }
            
            var shuffled = tarray.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);
   
            this.randomSpr["diamonds_" + i] = shuffled;  
                        
        }
        //-

        for(var k = 0; k < 1; k++){

            for(var i = 0; i < shapeOptions.columns; i++){

                for(var j = 0; j < shapeOptions.rows; j++){

                    //console.log(this.levDiff);
                    
                    var sprSheet    = this.levDiff > 1 ? Phaser.Math.Between(1, this.levDiff) : 1 ;   
                    
                    //console.log(sprSheet);
                    
                    var thumb       = this.add.image(k * this.scale.width + leftMargin + i * (shapeOptions.thumbWidth + shapeOptions.spacing), topMargin + j * (shapeOptions.thumbHeight + shapeOptions.spacing), "diamonds_" + sprSheet);                                         
                    
                    console.log(this.randomSpr["diamonds_"+ sprSheet][0]);
                    
                    var sprFrame    = this.randomSpr["diamonds_"+ sprSheet][0];
                    
                    //console.log(sprFrame);          
                             
                    this.randomSpr["diamonds_" + sprSheet].splice(this.randomSpr["diamonds_" + sprSheet].indexOf(sprFrame),1);
                    
                    //console.log(sprFrame);
                                            
                    thumb.setFrame(sprFrame);
                    
                    //this.framesStructure[sprSheet] = sprFrame; 

                    this.maingroup.add(thumb);
                    
                    this.fr_array.push(sprSheet);
                    
                    this.items_array.push(sprFrame);
                    
                }

            }

        };        
//
//      Phaser.Actions.GridAlign(this.maingroup.getChildren(), {
//            width: 10,
//            height: 10,
//            cellWidth: 48,
//            cellHeight: 48,
//            x: this.scale.width/5,
//            y: this.scale.height/5
//        });
        
        this.panelgroup = this.physics.add.group();
        
        var children = this.maingroup.getChildren();

        for (var i = 0; i < children.length; i++) {
            
            //var x = Phaser.Math.Between(50, 350);
           // var y = Phaser.Math.Between(50, 350);

            var angle = Phaser.Math.Between(1, 180);

            //children[i].setPosition(x, y);

            children[i].angle = angle;
            
            children[i].alpha = 0.5;
            
            var thumb = this.physics.add.sprite(this.scale.width - this.scale.width/2, this.scale.height - this.scale.height/5, "diamonds_sec_" + this.fr_array[i]);                                    
          
            //console.log(sprFrame);          

            thumb.setFrame(this.items_array[i]);
            
            thumb.checkWorldBounds = true;

            this.panelgroup.add(thumb);

        }

        this.maingroup.refresh();

//        this.panelgroup = this.physics.add.group({
//
//            key: 'diamonds_sec',
//            frame: [ 0, 1, 2, 3, 4 ],
//            frameQuantity: 4,
//            checkWorldBounds: true
//
//        });
//
//        Phaser.Actions.GridAlign(this.panelgroup.getChildren(), {
//            width: 10,
//            height: 10,
//            cellWidth: 48,
//            cellHeight: 48,
//            x: this.scale.width - this.scale.width/2,
//            y: this.scale.height - this.scale.height/5 
//        });

        var children = this.panelgroup.getChildren();

        for (var i = 0; i < children.length; i++) {
            
            var x = Phaser.Math.Between(this.scale.width - this.scale.width/2 - this.scale.width/6, this.scale.width - this.scale.width/7-this.scale.width/5) + Phaser.Math.Between(1,10);
            var y = Phaser.Math.Between(this.scale.height - this.scale.height/4, this.scale.height - this.scale.height/8) + Phaser.Math.Between(1,10);

            var tween = this.tweens.add({
                targets: [ children[i]],
                x: x,
                y: y,
                ease: 'Power1',
                duration: 500,
                onStart: ()=>{
                
                    this.moveSound.play();
                
                }
                
            });

            //children[i].setPosition(x, y);
        }
        
        if(this.game.device.os.desktop){
           
            this.input.keyboard.enabled = true;
            
            this.input.keyboard.on('keydown_ESC', ()=>{
                
                if(!this.menuOpened){
                
                  this.showMessageBox(); 
                   
                }
                
            }, this);
            
            this.input.keyboard.addCapture('ESC');
           
        };
                                    
    }
		    
    resizeGameScene (gameSize, baseSize, displaySize, resolution) {
        
        var width   = gameSize.width;
        var height  = gameSize.height;
                           
        this.cameras.resize(width, height);
        
        this.bg.destroy();
        
        this.scoretext.destroy();
        
        this.timertext.destroy();
        
        this.menuButton.destroy();   
        
        this.scoreHelp.destroy();
        
        this.partExplo.destroy();
        
        //this.scoreLabelTween.destroy();
                
        this.bg = this.add.tileSprite(0, 0, width, height, "bg");
        
        this.bg.setOrigin(0);
        
        this.starBoxArray   = new Array();        
        var stChildren      = this.starBox.getChildren();
        
        for (var i = 0; i < stChildren.length; i++) {                   
            
            this.starBoxArray.push(stChildren[i].frame.name);
            
        }  
                
        this.scoretext          = this.add.text(10, 5, 'Total score: ' + this.score, { fontFamily: 'Cormorant Unicase', fontSize: 22, color: '#000000' }); 
        this.scoreLabelTween    = this.tweens.add({   
                                      targets     : this.scoretext,     
                                      scale       : 1.5,
                                      ease        : 'Linear',
                                      duration    : 200,
                                      yoyo        : true,
                                      repeat      : 0,
            
                                      onStart     : ()=>{
                                          
                                            var children = this.panelgroup.getChildren();

                                            for (var i = 0; i < children.length; i++) {

                                                children[i].input.draggable = false;

                                                //console.log(children[i]);
                                            }   

                                      },       
            
                                      onComplete: ()=>{  
                                       
                                            var children = this.panelgroup.getChildren();

                                            for (var i = 0; i < children.length; i++) {

                                                this.input.setDraggable(children[i]);

                                               // console.log(children[i]);

                                            }                                            
                                                        
                                        this.checkStars(this.stars, this.score, this.levelscore, this.level);
                                    }  
                            
                                });
        
        this.timertext          = this.add.text(10, 40, 'Time:' + this.currentTime, { fontFamily: 'Cormorant Unicase', fontSize: 22, color: '#000000' });                
        this.menuButton         = this.add.text(width-125, 5, 'Pause Menu', { fontFamily: 'Cormorant Unicase', fontSize: 22, color: '#000000' });
        
        this.menuButton.setShadow(0, 0, 'rgba(0,0,0,0.5)', 5);   
        
        this.menuButton.setInteractive({ useHandCursor: true });  
        
        this.menuButton.on('pointerdown', () => {
            
            this.onButtonClick.play();
                        
            this.showMessageBox(true);                           
        
        });
        
        this.menuButton.on('pointerover', () => {
            
            this.onButtonOver.play();
           
            this.menuButton.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
        
        });
        
        
        this.menuButton.on('pointerout', () => {
            
            this.menuButton.setShadow(0, 0, 'rgba(0,0,0,0.5)', 5);                           
        
        });            
        
        this.items_array     = new Array();        
        var angles_array     = new Array();
        this.fr_array        = new Array();        
        
        var pn_items    = new Array();
        var pn_fr       = new Array();
        
        var children = this.maingroup.getChildren();

        for (var i = 0; i < children.length; i++) {                   
            
            this.items_array.push(children[i].frame.name);
            
            angles_array.push(children[i].angle);   
            
            this.fr_array.push(children[i].texture.key);
            
        }
                        
        var children_pn = this.panelgroup.getChildren();

        for (var i = 0; i < children_pn.length; i++) {                   
            
            pn_items.push(children_pn[i].frame.name);
                 
            pn_fr.push(children_pn[i].texture.key);
            
        }
                
        this.maingroup.clear(true);
                      
//        this.maingroup = this.physics.add.staticGroup({
//            key: 'diamonds',
//            frame: [ 0, 1, 2, 3, 4 ],
//            frameQuantity: 4,
//            immovable: true
//
//        });

/*            Phaser.Actions.GridAlign(this.maingroup.getChildren(), {
                width: 10,
                height: 10,
                cellWidth: 48,
                cellHeight: 48,
                x: width/5,
                y: height/5
            });*/
        
        this.maingroup = this.physics.add.staticGroup();
        
        var rowLength = shapeOptions.thumbWidth * shapeOptions.columns + shapeOptions.spacing * (shapeOptions.columns - 1);
        var leftMargin = (this.scale.width - rowLength) / 2 + shapeOptions.thumbWidth / 2;
        var colHeight = shapeOptions.thumbHeight * shapeOptions.rows + shapeOptions.spacing * (shapeOptions.rows - 1);
        var topMargin = (this.scale.height - colHeight) / 3 + shapeOptions.thumbHeight / 2;
        
        for(var k = 0; k < 1; k++){
            
            for(var i = 0; i < shapeOptions.columns; i++){
                
                for(var j = 0; j < shapeOptions.rows; j++){
                        
                    //console.log(this.levDiff);
                    
                    var sprSheet    = this.levDiff > 1 ? Phaser.Math.Between(1, this.levDiff) : 1;  
                    
                    //console.log(sprSheet);
                    
                    var thumb       = this.add.image(k * this.scale.width + leftMargin + i * (shapeOptions.thumbWidth + shapeOptions.spacing), topMargin + j * (shapeOptions.thumbHeight + shapeOptions.spacing), "diamonds_" + sprSheet);                                         
                    var sprFrame    = Phaser.Math.Between(0, 59);
                    
                    //console.log(sprFrame);
                                            
                    thumb.setFrame(sprFrame);
                    
                    //this.framesStructure[sprSheet] = sprFrame; 

                    this.maingroup.add(thumb);                    

                }
                
            }

        };  
        
        this.panelgroup.clear(true);
                        
        var children = this.maingroup.getChildren();

        for (var i = 0; i < children.length; i++) {           
                    
            children[i].angle = angles_array[i];
            
            children[i].alpha = 0.5;
            
            children[i].setTexture(this.fr_array[i]);
            
            children[i].setFrame(this.items_array[i]);
            
            var thumb = this.physics.add.sprite(this.scale.width - this.scale.width/2, this.scale.height - this.scale.height/5, pn_fr[i]);                                    
          
            //console.log(sprFrame);          

            thumb.setFrame(pn_items[i]);
            
            thumb.checkWorldBounds = true;

            this.panelgroup.add(thumb); 
                         
        } 
              
//        this.panelgroup = this.physics.add.group({
//
//            key: 'diamonds_sec',
//            frame: [ 0, 1, 2, 3, 4 ],
//            frameQuantity: 4,
//            checkWorldBounds: true
//
//        });
//        
//        Phaser.Actions.GridAlign(this.panelgroup.getChildren(), {
//            width: 10,
//            height: 10,
//            cellWidth: 48,
//            cellHeight: 48,
//            x: this.scale.width - this.scale.width/2,
//            y: this.scale.height - this.scale.height/5 
//        });
                
        var children = this.panelgroup.getChildren();

        for (var i = 0; i < children.length; i++) {           
                  
            children[i].setFrame(this.items_array[i]);
            
            var x = Phaser.Math.Between(this.scale.width - this.scale.width/2 - this.scale.width/6, this.scale.width - this.scale.width/7-this.scale.width/5) + Phaser.Math.Between(1,10);
            var y = Phaser.Math.Between(this.scale.height - this.scale.height/4, this.scale.height - this.scale.height/8) + Phaser.Math.Between(1,10);

            var tween = this.tweens.add({
                targets: [ children[i]],
                x: x,
                y: y,
                ease: 'Power1',
                duration: 500,
                onStart: ()=>{
                
                    this.moveSound.play();
                
                }
            });
                         
        } 
        
        this.starBox.clear(true);
        
        this.starBox = this.add.group({
            frame: [0],
            key: 'to_stars',               
            frameQuantity: 3                

        });
        
        Phaser.Actions.GridAlign(this.starBox.getChildren(), {
            
            width: 10,
            height: 10,
            cellWidth: 48,
            cellHeight: 48,                   
            x: this.scale.width - this.scale.width/2 - 48,
            y: this.scale.height - this.scale.height/2 - this.scale.height/3-this.scale.height/10
           
        });  
        
        stChildren  = this.starBox.getChildren();
        
        for (var i = 0; i < stChildren.length; i++) {                   
            
            stChildren[i].setFrame(this.starBoxArray[i]);
            
        }  
             
        this.boom.destroy();
           
        this.boom = this.add.sprite(0, 0, 'boom');
		
		this.boom.visible = false;
        
        this.boom.anims.setTimeScale(1.5);
        
        this.maingroup.refresh();

        Phaser.Actions.Call(this.panelgroup.getChildren(), function(item){

            //make item interactive
            item.setInteractive({ useHandCursor: true });

            item.on("pointerdown", function (pointer){

               // console.log('You clicked on ' + item.texture.key);

            });

            this.input.setDraggable(item);

            this.input.on('dragstart', function (pointer, gameObject) {

                 //console.log(sprt);

                this.pick.play();

                gameObject.setTint(0xff0000);

            }, this);

            this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

                gameObject.x = dragX;
                gameObject.y = dragY;

            });

            this.input.on('dragend', function (pointer, gameObject) {

                this.pick.stop();
                
                this.drop.play();
                
                gameObject.clearTint();

            }, this);

        }, this);
        
        this.toastMessage.destroy;
        
        this.toastMessage = this.rexUI.add.toast({
            x: width/2,
            y: height - height/2 - height/3,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 20, 0xffffff),
            text: this.add.text(0, 0, '', {
                fontFamily: 'PlayfairDisplaySC-Bold', fontSize: '48px', color:"#000000"
            }),
            space: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
            },
        });
        
        this.partExplo = this.add.particles('spark').setDepth(1);
        
        if(this.menuOpened){
         
            this.closeButton.sprite.destroy();
                    
            this.toMainButton.sprite.destroy();
            
            this.menuDialog.clear(true);
        
            this.menuDialog.destroy();
            
            this.showMessageBox(true);
           
        }

        if(this.gameOver){
            
            this.closeButton.sprite.destroy();
              
            this.scoresDialog.clear(true);
        
            this.scoresDialog.destroy();
            
            this.showScoresBox(this.resStars, true);            
            
        }   
        
        this.scoreHelp = this.make.text({
            x: width/2,
            y: height - height/16,
            text: "1 star - " + this.levelscore +" points, 2 stars - " +this.levelscore*2+ " points, 3 stars - " + this.levelscore*3 + " points",
            origin: { x: 0.5, y: 0.5 },
            style: {                
                fontFamily: 'Cormorant Unicase',
                //font: 'bold 25px',
                fontSize: '16px',
                fontStyle: 'bold',
                fill: '#000000',
                wordWrap: { width: width/2 }
            }
        });
        
        this.cameras.resize(width, height);
        
        this.overlapCollider = this.physics.add.overlap(this.panelgroup,this.maingroup, this.check, null, this);
        
        //this.overlapCollider = this.physics.add.overlap(this.panelgroup,this.maingroup, this.check, null, this);
        
//        this.bg.setSize(width, height);
//        
//        this.logo.setPosition(width/2, height / 3);       

    }
	
    reduceTime (){
         
        this.currentTime--;
        
        var mChildren = this.maingroup.getChildren();
        
        //Phaser.Actions.Shuffle(this.maingroup.getChildren());
        
        var angle = Phaser.Math.Between(0,360);
        
        //console.log(angle);
        
        mChildren[Phaser.Math.Between(0, this.maingroup.getLength()-1)].angle += angle;
                    
        this.clockSound.play();
        
        //this.cameras.resize(this.scale.width, this.scale.height);
        
        //console.log(this.clockSound);

        if (this.currentTime === 0) {

            this.timertext.setText('Time: END');
                        
            //  Stop the timer
            this.timedEvent.remove();   
            
            this.showScoresBox(this.resStars);            
            
        }

    }

    getRandomInRange(min, max) {
        
        return Math.floor(Math.random() * (max - min + 1)) + min;
        
    }
    
    incrementScore() {

        this.score              += 1;   
        this.scoretext.setText("Total score: " + this.score);      

    }
    
    createScoreAnimation(x, y, message, score){

        //Create a new label for the score
        var scoreAnimation = this.add.text(x, y, message, {fontFamily: 'PlayfairDisplaySC-Bold', fontSize: '32px', fill: "#000000",  stroke: "#ffffff", strokeThickness: 45}); 
        //scoreAnimation.anchor.setTo(0.5, 0);
        //scoreAnimation.align = 'center';

        //Tween this score label to the total score label
        //var scoreTween = this.add.tween(scoreAnimation).to({x:this.game.world.centerX, y: 50}, this.scale.width, Phaser.Easing.Exponential.In, true);
        
        //When the animation finishes, destroy this score label, trigger the total score labels animation and add the score
        var scoreTween = this.tweens.add({
                        targets: scoreAnimation,
                        x: 10,
                        y: 10,
                        ease: 'Power1',
                        duration: 650,
                        onComplete: ()=>{
                
                            scoreAnimation.destroy();            
                            this.scoreLabelTween.play();
                            this.scoreBuffer += score;
                
                        }
                                                
                    }, this);

        //When the animation finishes, destroy this score label, trigger the total score labels animation and add the score
//        scoreTween.onComplete.add(function(){
            
//            scoreAnimation.destroy();            
//                  this.scoreLabelTween.start();
//            this.scoreBuffer += score;
            
//        }, this);
        
    }
    
    check(spr1,spr2){  
        
        if (spr1.isTinted){
            
            return;
            
        }
        
        if(this.gameOver){
           
            return;
           
        }
        
        if (this.spritesStructure[spr2.texture.key] == spr1.texture.key) {
                            
            if(spr1.frame.name == spr2.frame.name){

                //spr1.x = spr2.x;
                //spr1.y = spr2.y;

                var x = spr2.x;
                var y = spr2.y;        

                this.boom.x = x;
                this.boom.y = y;
                                       
                //console.log(this.boom.anims.isPlaying);
                                  
                if(this.rotateTween){             

                    //console.log(this.boom);   
                    
                    //console.log(this.rotateTween);
                    
                    return;
                    
                }
                                               
                this.rotateTween = this.tweens.add({
                    
                    x: spr2.x,
                    y: spr2.y,
                    targets: spr1,
                    angle: spr2.angle,
                    ease: 'Power1',
                    duration: 250,
                    repeat:0,
                    onStart: ()=>{
                                                 
                                            
                        this.timedEvent.paused = true;
                            
                        var children = this.panelgroup.getChildren();

                        for (var i = 0; i < children.length; i++) {

                            children[i].input.draggable = false;

                            //console.log(children[i]);
                        }                         
                        
                    },
                    
                    Update:()=>{
                      
                        this.movingSound.play();
                        
                    },
                    
                    onComplete:()=>{
                        
                        if(!this.rotateTween){     
                            
                           this.partEmit.on = false;

                            //console.log(this.boom);   

                            //console.log(this.rotateTween);

                            return;

                        }
                        
                                                
                        this.partEmit  = this.partExplo.createEmitter({lifespan: 500, maxParticles:100, on:false});

                        this.partEmit.setPosition(spr2.x, spr2.y);
                        this.partEmit.setSpeed(200);
                        this.partEmit.setBlendMode(Phaser.BlendModes.SCREEN);  
                        
                        var partNumber = 0;  
                        
                        this.partEmit.onParticleEmit((particle)=>{
                            
                            //console.log(particle);                            
                            partNumber += 1;
                            
                            if(partNumber===1){
                               
                                if(spr1){      
                                    
                                    var spr1id = spr2.frame.name;                                    
                                    var sprtex = spr2.texture.key;
                                    
                                    this.randomSpr[sprtex].push(spr1id);
                                
                                    spr1.destroy();
                                    
                                    var shuffled                                = this.randomSpr[sprtex].map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);                                    
                                    this.randomSpr[sprtex]                      = shuffled;
                                    var sprSheetChange                          = this.levDiff > 1 ? Phaser.Math.Between(1, this.levDiff) : 1;                                    
                                    var shuffledChange                          = this.randomSpr["diamonds_"+ sprSheetChange].map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]); 
                                    this.randomSpr["diamonds_"+ sprSheetChange] = shuffledChange;
                                    var frameid                                 = this.randomSpr["diamonds_"+ sprSheetChange][Phaser.Math.Between(0,5)];
                                                           
                                    this.randomSpr["diamonds_" + sprSheetChange].splice(this.randomSpr["diamonds_" + sprSheetChange].indexOf(frameid),1);

                                    spr2.setTexture("diamonds_" + sprSheetChange);

                                    spr2.setFrame(frameid);   

                                    var newspr = this.physics.add.sprite(Phaser.Math.Between(this.scale.width - this.scale.width/4, this.scale.width - this.scale.width/7), Phaser.Math.Between(this.scale.height - this.scale.height/4, this.scale.height - this.scale.height/5), 'diamonds_sec_'+sprSheetChange, frameid);

                                    newspr.checkWorldBounds = true;

                                    newspr.setInteractive({ useHandCursor: true });

                                    this.input.setDraggable(newspr);

                                    this.panelgroup.add(newspr);           

                                    var children = this.panelgroup.getChildren();

                                    for (var i = 0; i < children.length; i++) {

                                        var x = Phaser.Math.Between(this.scale.width - this.scale.width/2 - this.scale.width/6, this.scale.width - this.scale.width/7-this.scale.width/5) + Phaser.Math.Between(1,10);
                                        var y = Phaser.Math.Between(this.scale.height - this.scale.height/4, this.scale.height - this.scale.height/8) + Phaser.Math.Between(1,10);

                                        var tween = this.tweens.add({
                                            targets: [children[i]],
                                            x: x,
                                            y: y,
                                            ease: 'Power1',
                                            duration: 400,
                                            onStart: ()=>{

                                             this.moveSound.play();

                                            }

                                        });

                                        //children[i].setPosition(x, y);
                                    }

                                    var curScore = Phaser.Math.Between(this.level + 1, this.level + 1 + Phaser.Math.Between(1,10));

                                    this.createScoreAnimation(spr2.x, spr2.y, '+'+curScore, curScore);

                                    this.currentTime = Phaser.Math.MaxAdd(this.currentTime, Phaser.Math.Between(1,5), this.mTime);  

                                    var music = this.sound.add('pick1', {volume: localStorage.getItem('volume') == null ? 1 : localStorage.getItem('volume')});

                                    music.play();   

                                    //console.log(this.boom);


                                }
         
                            }
                     
                        }, this);
                                                                     
                        
                        this.partEmit.onParticleDeath((particle)=>{
                            
                            this.rotateTween = undefined;  
                            
                        }, this);
                                                                                
                        this.partEmit.explode(80, spr2.x, spr2.y);

//                        if (!this.boom.visible){this.boom.visible = true;}
//
//                        this.boom.anims.play('explode'); 
//                          
//                        this.boom.on('animationstart', ()=>{                            
// 
//  
// 
//                        });
//
//                        this.boom.once('animationupdate', ()=>{
//                            
//                            spr1.destroy();
//                            
//                            var sprSheetChange    = this.levDiff > 1 ? Phaser.Math.Between(1, this.levDiff) : 1 ;               
//                            var frameid           = Phaser.Math.Between(0, 59);
//    
//                            spr2.setTexture("diamonds_" + sprSheetChange);
//
//                            spr2.setFrame(frameid);   
//
//                            var newspr = this.physics.add.sprite(Phaser.Math.Between(this.scale.width - this.scale.width/4, this.scale.width - this.scale.width/7), Phaser.Math.Between(this.scale.height - this.scale.height/4, this.scale.height - this.scale.height/5), 'diamonds_sec_'+sprSheetChange, frameid);
//
//                            newspr.checkWorldBounds = true;
//
//                            newspr.setInteractive({ useHandCursor: true });
//
//                            this.input.setDraggable(newspr);
//
//                            this.panelgroup.add(newspr);           
//
//                            var children = this.panelgroup.getChildren();
//
//                            for (var i = 0; i < children.length; i++) {
//
//                                var x = Phaser.Math.Between(this.scale.width - this.scale.width/2 - this.scale.width/6, this.scale.width - this.scale.width/7-this.scale.width/5) + Phaser.Math.Between(1,10);
//                                var y = Phaser.Math.Between(this.scale.height - this.scale.height/4, this.scale.height - this.scale.height/8) + Phaser.Math.Between(1,10);
//
//                                var tween = this.tweens.add({
//                                    targets: [children[i]],
//                                    x: x,
//                                    y: y,
//                                    ease: 'Power1',
//                                    duration: 400,
//                                    onStart: ()=>{
//
//                                     this.moveSound.play();
//
//                                    }
//
//                                });
//
//                                //children[i].setPosition(x, y);
//                            }
//
//                            var curScore = Phaser.Math.Between(this.level + 1, this.level + 1 + Phaser.Math.Between(1,10));
//
//                            this.createScoreAnimation(spr2.x, spr2.y, '+'+curScore, curScore);
//
//                            this.currentTime = Phaser.Math.MaxAdd(this.currentTime, Phaser.Math.Between(1,5), this.mTime);  
//
//                            var music = this.sound.add('pick1', {volume: localStorage.getItem('volume') == null ? 1 : localStorage.getItem('volume')});
//
//                            music.play();   
//                            
//                            //console.log(this.boom);
//                            
//                            this.timedEvent.paused = false;
//
//                        });
//                        
//                        
//                        this.boom.on('animationcomplete', ()=>{
//                            
//                            this.rotateTween = undefined;
//      
//                            var children = this.panelgroup.getChildren();
//
//                            for (var i = 0; i < children.length; i++) {
//
//                                this.input.setDraggable(children[i]);
//
//                            };    
// 
//                        });
                      
                
                    }   
                    
                 }, this); 
                                    
                //var ce 

                //console.log(this.score);

            } else {

                //console.log(spr1.frame.name);

                //console.log(spr2.frame.name);

            }
                        
            //this.overlapCollider.destroy();
        }
        
        //this.currSprite = false;

    }
    
    getDifficultyLevel(levelsCount, currLevel){
    
        var diffLevel       = 1;                        
        var levPerDiffLevel = levelsCount/3;
        var levComp         = levPerDiffLevel;  
       
        //console.log(currLevel);
        
       // console.log(levPerDiffLevel);
        
        //console.log(levelsCount);
        
        for (var i=1;i < 2; i++){        
            
          if(currLevel>=levComp && currLevel<=levelsCount){
            
              diffLevel = diffLevel + 1;
             
          } 
            
          levComp = levComp + levPerDiffLevel;    
        
        }                
                        
          return diffLevel;
        
    }
    
    checkStars(stars, score, levelscore, level){
        
        //console.log(this.resStars);
        
        if(this.resStars === 3){
            
            return;
            
        }        
        
        var curLevelPage = this.levStruct[level];        
        var newLevelPage = this.levStruct[level+1];
        
        if (this.score >= this.levelscore){
            
            if (this.starsStructure[1]!==true){
                
                //this.noticeSound.play();
                
                var starChildren = this.starBox.getChildren();
                
                //console.log(this.score);
            
                stars[level] = Math.max(stars[level], 1);

                //console.log("yes!");

                localStorage.setItem(gameOptions.localStorageName, stars.toString());

                this.resStars +=1;

                this.starsStructure[1] = true;
                
                starChildren[0].setFrame(1);
                
                this.toastMessage.show('Excelent!!!');
                        
                //this.cameras.main.shake(200);    
                
                this.showArchieveEffects(1);
                
            };
                                
        }
    
        if (this.score >= this.levelscore*2){ 
            
           //this.noticeSound.play();
            
            var starChildren = this.starBox.getChildren();
                    
            if (this.starsStructure[2]!==true){
                                            
                //console.log(this.score);

                stars[level] = Math.max(stars[level], 2);  

                localStorage.setItem(gameOptions.localStorageName, stars.toString());

                this.resStars +=1;

                this.starsStructure[2] = true;
                
                starChildren[1].setFrame(1);
                
                this.toastMessage.show('Very nice!!!');
                  
                //this.cameras.main.shake(300);  
                
                this.showArchieveEffects(2);
                
            };
            
        }
        
        if (this.score >= this.levelscore*3) {
            
            //this.noticeSound.play();
            
            if (this.starsStructure[3]!==true){
                
                var starChildren = this.starBox.getChildren();
               
                //console.log(this.score);
            
                stars[level] = Math.max(stars[level], 3);

                if(stars[level + 1] != undefined && stars[level + 1] == -1){

                    stars[level + 1] = 0;
                    
                    //var newLevelPage   = this.levStruct[level + 1];

                }   
                    
                localStorage.setItem(gameOptions.localStorageName, stars.toString());

                this.resStars +=1;

                this.starsStructure[3] = true; 
                
                starChildren[2].setFrame(1);
                
                this.toastMessage.show('Great!!!');
                
                this.showArchieveEffects(3);
                   
                //this.cameras.main.shake(400);               
                
            };
                        
        }
        
        //console.log(newLevelPage);
        
        //console.log(curLevelPage);
        
        if(newLevelPage>curLevelPage){

            this.nextLevel = newLevelPage; 

        }else{

            this.nextLevel = curLevelPage; 
        }
        
//        ///////---        
//        if(this.cameras.main.shake.isRunning){
//          
//            this.timedEvent.paused = true; 
//           
//        }else{
//            
//            this.timedEvent.paused = false;
//            
//        }        
//        ///////---
        
                                             
        var children = this.panelgroup.getChildren();

        for (var i = 0; i < children.length; i++) {

            this.input.setDraggable(children[i]);

           // console.log(children[i]);

        }           
        
        if(!this.menuOpened){
         
            this.timedEvent.paused = false;  
            
        }
                               
        if(this.resStars === 3){
            
            var children = this.panelgroup.getChildren();

            for (var i = 0; i < children.length; i++) {

                children[i].input.draggable = false;

                //console.log(children[i]);
            }   

            //console.log(stars[level]);
                    
            this.showScoresBox(this.resStars);
            
        }         
        //console.log(this.levelscore);
        
        //console.log(resStars);
        
        //console.log(this.resStars);
              
    }
    
    updateScore(user_score,  user_level){
     
        localStorage.setItem('lev_'+user_level,user_score);
     
    }
    
    getScore(user_level){
        
        this.scoreResponse = localStorage.getItem('lev_'+user_level) == null ? 0 : localStorage.getItem('lev_'+user_level);
    }
    
    showArchieveEffects(numstars){
        
        this.noticeSound.play();
        
        var minParts    = 0;
        var maxParts    = 0;
        this.emitter0   = undefined;
        this.emitter1   = undefined;
        
        if (numstars == 1){
            
            minParts = Phaser.Math.Between(1,25);
            maxParts = Phaser.Math.Between(100,150);
            
        };
        
        if(numstars == 2){
            
            minParts = Phaser.Math.Between(25,50);
            maxParts = Phaser.Math.Between(150,200);
            
        };
                  
        if (numstars == 3){
            
            minParts = Phaser.Math.Between(100,150);
            maxParts = Phaser.Math.Between(200,350);          
            
        };             
        
        this.emitter0 = this.add.particles('spark').createEmitter({
            x: this.scale.width/2,
            y: this.scale.height/2,
            speed: { min: -800, max: 800 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.5, end: 0 },
            blendMode: 'SCREEN',
            //active: false,
            maxParticles:maxParts,
            quantity: minParts,
            lifespan: 1200,
            gravityY: 800
        });

        this.emitter1 = this.add.particles('spark1').createEmitter({
            x: this.scale.width/2,
            y: this.scale.height/2,
            speed: { min: -800, max: 800 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.3, end: 0 },
            blendMode: 'SCREEN',
            maxParticles: maxParts,
            quantity: minParts,
            //active: false,
            lifespan: 1200,
            gravityY: 800
        });
        
    }

    update() {
                              
        if(this.scoreBuffer > 0){
            
            this.incrementScore();
            
            this.scoreBuffer--;
            
        }        

        if (this.currentTime === 0){
            
            this.showScoresBox(this.resStars);
            
            //this.updateScore(this.score, user_id, 0,ajax_script_path);
            
            return;
            
        }
        
        this.timertext.setText('Time: ' + this.currentTime);
        
        //console.log(this.currSprite);
        
        //if(this.currSprite){
           
        //this.overlapCollider = this.physics.add.overlap(this.panelgroup,this.maingroup, this.check, null, this);
            
      //  }
             
       //console.log(this.overlapCollider);    
                              
        //if (this.currentTime !== 0) {
          
           // this.getScore(user_id, 0,ajax_script_path);
            
        //}      
                 
    }

}