class GameMenu extends Phaser.Scene {

    constructor () {
        
        super({ key: 'GameMenu' });
        
        var playButton;        
        var bg;
        var arrowDown;
                
    }

    preload () {

        //this.load.baseURL = window.location;  
        
        this.load.image('backround', 'assets/bg.png');
        
        this.load.script('webfont' , 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        
        this.load.spritesheet('clicktoplay' , 'assets/clicktoplay_sheet.png', { frameWidth: 192, frameHeight: 64 }); 
        
        this.load.spritesheet('arrow_down', 'assets/arrow_down.png', { frameWidth: 40, frameHeight: 80, endFrame: 5 });
               
    }

    create () {	
                   
        this.bg = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'backround').setOrigin(0).setAlpha(0);
                          
        WebFont.load({
            google: {
                families: [ 'Freckle Face', 'Finger Paint', 'Marck Script', 'Cormorant Unicase' ]
            }            
        });
        
        var cfg = {
            
            key: 'arrow',
            frames: this.anims.generateFrameNumbers('arrow_down', { start: 0, end: 5, first: 0 }),
            frameRate: 14,
            repeat: -1
            
        };
        
        this.anims.create(cfg);  
        
        this.arrowDown          = this.add.sprite(this.scale.width/2, this.scale.width - this.scale.width/2 - this.scale.width/4, 'arrow_down');		
		this.arrowDown.visible  = false;
        
        this.playButton = new Phaser.Button(this, {
            
            x: this.scale.width/2   - 96,
            y: this.scale.height/2  - 64,
            spritesheet: "clicktoplay",
            on: {
                click: () => {
                    
                   this.arrowDown.destroy();
                    
                   var tween = this.tweens.addCounter({
                        from: 100,
                        to: 0,
                        duration: 200,
                        onStart: () => {
      
                        },
                        onUpdate: () =>  {
                            
                            var value = Math.floor(tween.getValue());

                            this.bg.setTint(Phaser.Display.Color.GetColor(value, value, value));
                            this.playButton.sprite.setTint(Phaser.Display.Color.GetColor(value, value, value));

                        },
                        onComplete: ()=>{   
                            
                            this.scene.stop('GameMenu');
                            this.scene.start('GameTitle');

                        }
                    });

                },
                over: () => {
                   // console.log("Mouse over!");                    
                },
                up: () => {
                   // console.log("Released!");
                },
                out: () => {
                   // console.log("Mouse out!");
                }
            },

            frames: {click: 0, over: 0, up: 0, out: 1}
            
        });
                
        this.playButton.sprite.setAlpha(0);        

        this.tweens.add({
            
            targets: this.bg,
            alphaTopLeft: { value: 1, duration: 300, ease: 'Power1' },
            alphaTopRight: { value: 1, duration: 300, ease: 'Power1' },
            alphaBottomLeft: { value: 1, duration: 300, ease: 'Power1', },
            alphaBottomRight: { value: 1, duration: 300, ease: 'Power1' },            
            yoyo: false,
            repeat: 0,
            
            onComplete:()=>{    
                          
                this.playButton.sprite.setAlpha(1);  
                
                this.arrowDown.visible = true;
                
                this.arrowDown.anims.play('arrow');
                  
            }

        });
      
        this.scale.on('resize', this.resizeGameClick, this); 

        this.events.once('shutdown' , this.shutdown, this);
        this.events.once('start'    , this.wake, this);
    
    }
           
    shutdown() {
        
     // console.log('shutdown' + this.scene.key);        
             
      this.scale.removeAllListeners();
        
    }
    
    wake() { }
    
    resizeGameClick (gameSize, baseSize, displaySize, resolution) {
        
        var width   = gameSize.width;
        var height  = gameSize.height;

        this.cameras.resize(width, height);
        
        this.bg.destroy();        
                
        this.playButton.sprite.destroy();        
              
        this.bg = this.add.tileSprite(0, 0, width, height, 'backround').setOrigin(0);
        
        this.playButton = new Phaser.Button(this, {

            x: this.scale.width/2 - 96,
            y: this.scale.height/2 - 64,
            spritesheet: "clicktoplay",
            on: {
                click: () => {

                   var tween = this.tweens.addCounter({
                        from: 100,
                        to: 0,
                        duration: 200,
                        onStart: () => {

                        },
                        onUpdate: () =>  {

                            var value = Math.floor(tween.getValue());

                            this.bg.setTint(Phaser.Display.Color.GetColor(value, value, value));
                            this.playButton.sprite.setTint(Phaser.Display.Color.GetColor(value, value, value));

                        },
                        onComplete: ()=>{   

                            this.scene.stop('GameStart');
                            this.scene.start('GameTitle');

                        }
                    });

                },
                over: () => {
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
        
        this.arrowDown.destroy();
           
        this.arrowDown  = this.add.sprite(width/2, width - width/2 - width/4, 'arrow_down');
        
        this.arrowDown.anims.play('arrow');
        
        this.cameras.resize(width, height)
    
    }
    
}
