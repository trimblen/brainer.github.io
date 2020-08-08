class GameLevels extends Phaser.Scene {
        
    constructor () {
        
        super({ key: 'GameLevels' });
		
		var itemGroup;
        
        var pageText;
        
        var scoresStructure;        
        var levSpeedStructure;     
        var currLevel;
        
        var music;
        var onButtonClick;
        
        var levelsToPage;        
        var unlockedLevel;
   		
        //console.log(this.scene.key);
        
    }
    
    init(data){
        
     //   console.log('init', data);
        
        this.unlockedLevel  = data.nextLevel;
        
       // console.log(this.unlockedLevel);
//        this.levelscore = data.levelscores;
//        this.stars      = data.stars;
//        this.levDiff    = data.levDiff;
//        this.levSpeed   = data.levelSpeed;
//        
//        //console.log(this);
//        console.log(this.level);
//        console.log(this.levelscore); 
//        console.log(this.stars);
//        console.log(this.levDiff);
//        console.log(this.levSpeed);
        
    }   

    preload () {
        
        //this.load.baseURL = window.location;
        
        this.load.spritesheet("levelthumb", "assets/levelthumb.png", {
            frameWidth: 60,
            frameHeight: 60
        });
               
        this.load.image("levelpages", "assets/levelpages.png");
        this.load.image('transp'    , 'assets/bg.png');
        
        this.load.script('webfont'  , 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        
        this.load.audio('menu_m', [
        'assets/audio/menutitle.ogg'
        ]);
        
        this.load.audio('onbuttonclick', [
        'assets/audio/onbuttonclick.ogg'
        ]);
        
    }

    create(){
        
        WebFont.load({
            google: {
                families: [ 'Freckle Face', 'Arial' ,'Finger Paint', 'Marck Script', 'Cormorant Unicase', 'PlayfairDisplaySC-Bold' ]
            }            
        });

        this.stars              = [];
        this.stars[0]           = 0;
        this.canMove            = true;        
        this.itemGroup          = this.physics.add.group();
        this.scoresStructure    = {};
        this.levSpeedStructure  = {};
        this.levelsToPage       = {};        
        this.onButtonClick      = this.sound.add('onbuttonclick', {volume: localStorage.getItem('volume') == null ? 1 : localStorage.getItem('volume')});

        for(var l = 1; l < gameOptions.columns * gameOptions.rows * gameOptions.colors.length; l++){

            this.stars[l] = -1;

        }

        this.savedData  = localStorage.getItem(gameOptions.localStorageName) == null ? this.stars.toString() : localStorage.getItem(gameOptions.localStorageName);
        this.stars      = this.savedData.split(",");
        
        this.scrollingMap = this.add.tileSprite(0, 0, gameOptions.colors.length * this.scale.width, this.scale.height, "transp");
        this.scrollingMap.setInteractive();
        this.input.setDraggable(this.scrollingMap);
        this.scrollingMap.setOrigin(0);
        this.scrollingMap.setAlpha(0);
        
        this.tweens.add({
            
            targets: this.scrollingMap,
            alphaTopLeft: { value: 1, duration: 200, ease: 'Power1' },
            alphaTopRight: { value: 1, duration: 200, ease: 'Power1' },
            alphaBottomLeft: { value: 1, duration: 200, ease: 'Power1', },
            alphaBottomRight: { value: 1, duration: 200, ease: 'Power1' },            
            yoyo: false,
            repeat: 0,
            
            onComplete:()=>{
                
                this.pageText   = this.add.text(this.scale.width / 2, 16, "Swipe to select level page (1 / " + gameOptions.colors.length + ")", { fontFamily: 'Cormorant Unicase', fontSize: 22, color: '#000000' });
                
                this.pageText.setShadow(0, 0, 'rgba(0,0,0,0.5)', 5); 

                this.pageText.setOrigin(0.5);
                this.currentPage = 0;
                this.pageSelectors = [];

                var rowLength = gameOptions.thumbWidth * gameOptions.columns + gameOptions.spacing * (gameOptions.columns - 1);
                var leftMargin = (this.scale.width - rowLength) / 2 + gameOptions.thumbWidth / 2;
                var colHeight = gameOptions.thumbHeight * gameOptions.rows + gameOptions.spacing * (gameOptions.rows - 1);
                var topMargin = (this.scale.height - colHeight) / 2 + gameOptions.thumbHeight / 2;
                for(var k = 0; k < gameOptions.colors.length; k++){
                    for(var i = 0; i < gameOptions.columns; i++){
                        for(var j = 0; j < gameOptions.rows; j++){
                            var thumb = this.add.image(k * this.scale.width + leftMargin + i * (gameOptions.thumbWidth + gameOptions.spacing), topMargin + j * (gameOptions.thumbHeight + gameOptions.spacing), "levelthumb");                            
                            thumb.setTint(gameOptions.colors[k]);
                            thumb.levelNumber = k * (gameOptions.rows * gameOptions.columns) + j * gameOptions.columns + i;
                            thumb.setFrame(parseInt(this.stars[thumb.levelNumber]) + 1);
                            
                            this.currLevel                                        = thumb.levelNumber+1; 
                            this.scoresStructure[this.currLevel-1]                = Math.round(10*this.currLevel*(this.currLevel+10)/20); //getting required score per level   
                            this.levSpeedStructure[this.currLevel-1]              = 10*this.currLevel; //getting required level speed per level                             
                            this.levelsToPage[this.currLevel-1]                   = k; //getting page from level
                            
                            this.itemGroup.add(thumb);
                            var levelText = this.add.text(thumb.x, thumb.y - 12, thumb.levelNumber, {
                                font: "24px PlayfairDisplaySC-Bold",
                                fill: "#000000"
                            });
                            
                            levelText.setOrigin(0.5);
                            this.itemGroup.add(levelText);                
                            
                            this.tweens.add({
                                targets: thumb,
                                scaleX: 1,
                                scaleY: 1,
                                angle: 360,
                                _ease: 'Sine.easeInOut',
                                ease: 'Power2',
                                duration: 350,
                                delay: i * 5,
                                repeat: 0,
                                yoyo: false,
                                hold: 1,
                              
                                //repeatDelay: 1000
                            });

                        }
                    }
                    this.pageSelectors[k] = this.add.sprite(this.scale.width / 2 + (k - Math.floor(gameOptions.colors.length / 2) + 0.5 * (1 - gameOptions.colors.length % 2)) * 40, this.scale.height - 40, "levelpages");
                    this.pageSelectors[k].setInteractive();
                    this.pageSelectors[k].on("pointerdown", function(){
                        if(this.scene.canMove){
                            var difference = this.pageIndex - this.scene.currentPage;
                            this.scene.changePage(difference);
                            this.scene.canMove = false;
                        }
                    });
                    this.pageSelectors[k].pageIndex = k;
                    this.pageSelectors[k].tint = gameOptions.colors[k];
                    if(k == this.currentPage){
                        this.pageSelectors[k].scaleY = 1;
                    }
                    else{
                        this.pageSelectors[k].scaleY = 0.5;
                    }
                }
                this.input.on("dragstart", function(pointer, gameObject){
                    gameObject.startPosition = gameObject.x;
                    gameObject.currentPosition = gameObject.x;
                });
                this.input.on("drag", function(pointer, gameObject, dragX, dragY){
                    if(dragX <= 10 && dragX >= -gameObject.width + this.scale.width - 10){
                        gameObject.x = dragX;
                        var delta = gameObject.x - gameObject.currentPosition;
                        gameObject.currentPosition = dragX;
                        this.itemGroup.children.iterate(function(item){
                            item.x += delta;
                        });
                    }
                }, this);
                this.input.on("dragend", function(pointer, gameObject){
                    this.canMove = false;
                    var delta = gameObject.startPosition - gameObject.x;
                    if(delta == 0){
                        this.canMove = true;
                        this.itemGroup.children.iterate(function(item){
                            if(item.texture.key == "levelthumb"){
                                var boundingBox = item.getBounds();
                                if(Phaser.Geom.Rectangle.Contains(boundingBox, pointer.x, pointer.y) && item.frame.name > 0){
                                      
                                    this.music.stop();
                                    
                                    this.onButtonClick.play(); 
                                    
                                    this.scene.stop('GameLevels');

                                    //this.scene.add('GameScene');

                                    this.scene.run('GameScene', {

                                        level           : item.levelNumber,
                                        stars           : this.stars,
                                        levelscores     : this.scoresStructure[item.levelNumber],
                                        levelSpeed      : this.levSpeedStructure[item.levelNumber],
                                        levDiff         : this.getDifficultyLevel(this.itemGroup.getLength()/2, item.levelNumber+1),
                                        levStruct       : this.levelsToPage,
                                        lastLevel       : (this.itemGroup.getLength()/2)-1,
                                        scoreStrct      : this.scoresStructure,
                                        levSpdStrct     : this.levSpeedStructure
  
                                    });

                                }
                            }
                        }, this);
                    }
                    if(delta > this.scale.width / 8){
                        this.changePage(1);
                    }
                    else{
                        if(delta < -this.scale.width / 8){
                            this.changePage(-1);
                        }
                        else{
                            this.changePage(0);
                        }
                    }
                }, this);
                
                if (this.unlockedLevel > 0){
                    
                   // console.log(this.unlockedLevel);
                  
                    this.changePage(this.unlockedLevel);
                    
                }
                                            
            }

        });       
        
       
        this.scale.on('resize', this.resizeGameMenu, this);  
      
        this.sound.pauseOnBlur = false;

        this.music = this.sound.add('menu_m', {volume: localStorage.getItem('volume') == null ? 1 : localStorage.getItem('volume')});

        this.music.play();
        
        this.events.once('shutdown'     , this.shutdown, this);
        this.events.once('start'        , this.wake, this);          
                
        //console.log(this.levelsToPage);
         
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
        
    shutdown() {
        
        //this.physics.shutdown();
        
        this.scale.removeAllListeners(); 
         
    }
    
    wake(){
                
      this.scale.on('resize', this.resizeGameMenu, this);
     // console.log('wake' + this.scene.key);
        
                
//      if (this.unlockedLevel > 0) {
//            
//            //console.log(this.unlockedLevel);
//                
//            var newPage = this.levelsToPage[this.unlockedLevel];
//          
//            //var difference = this.scene.currentPage - newPage;
//                    
//            console.log(newPage);
//            
//            //console.log(newPage);
//            
////            for (let i = this.unlockedLevel; i <= this.unlockedLevel; i++) {
////                
////                 console.log(this.unlockedLevel[i]);
////                
////            }
////            
////            console.log(this.levelsToPage);
////            
////            //for (var i = 1; i <= newPage; i++ ) {
////                
//                if(this.scene.canMove){
//                
//                    var difference = this.scene.currentPage - newPage;
//                    
//                    console.log(difference);
//                    
//                    //console.log(difference);
//                    
//                    this.scene.changePage(difference);
//                    this.scene.canMove = false;
//                
//                }    
////                
//            //}
                                         
//        }
                   
    }
        
    resizeGameMenu (gameSize, baseSize, displaySize, resolution) {
        
        var width   = gameSize.width;
        var height  = gameSize.height;                
        
        this.cameras.resize(width, height); 
        
        this.scrollingMap.destroy;        
        this.itemGroup.clear(true);
        this.pageText.destroy();
        
        this.scrollingMap = this.add.tileSprite(0, 0, gameOptions.colors.length * width, height, "transp");
        
        this.scrollingMap.setInteractive();
        
        this.input.setDraggable(this.scrollingMap);
        
        this.scrollingMap.setOrigin(0);       
        
        this.pageText   = this.add.text(width / 2, 16, "Swipe to select level page (1 / " + gameOptions.colors.length + ")", { fontFamily: 'Cormorant Unicase', fontSize: 22, color: '#000000' });
        
        this.pageText.setShadow(0, 0, 'rgba(0,0,0,0.5)', 5); 

        this.pageText.setOrigin(0.5);
        
        //this.itemGroup.clear(true);
        //this.canMove    = true;
        
        //console.log(this.pageSelectors);
        
        this.currentPage  = 0;
                   
        //console.log(this.pageSelectors);
        
        var rowLength   = gameOptions.thumbWidth * gameOptions.columns + gameOptions.spacing * (gameOptions.columns - 1);
        var leftMargin  = (width - rowLength) / 2 + gameOptions.thumbWidth / 2;
        var colHeight   = gameOptions.thumbHeight * gameOptions.rows + gameOptions.spacing * (gameOptions.rows - 1);
        var topMargin   = (height - colHeight) / 2 + gameOptions.thumbHeight / 2;
        
        var children = this.itemGroup.getChildren();
        
        for(var k = 0; k < gameOptions.colors.length; k++){
            
            for(var i = 0; i < gameOptions.columns; i++){
                
                for(var j = 0; j < gameOptions.rows; j++){         
                    
                    var thumb = this.add.image(k * this.scale.width + leftMargin + i * (gameOptions.thumbWidth + gameOptions.spacing), topMargin + j * (gameOptions.thumbHeight + gameOptions.spacing), "levelthumb");
                    thumb.setTint(gameOptions.colors[k]);
                    thumb.levelNumber = k * (gameOptions.rows * gameOptions.columns) + j * gameOptions.columns + i;
                    thumb.setFrame(parseInt(this.stars[thumb.levelNumber]) + 1);
                    this.itemGroup.add(thumb);
                    var levelText = this.add.text(thumb.x, thumb.y - 12, thumb.levelNumber, { fontFamily: 'PlayfairDisplaySC-Bold', fontSize: 24, color: '#000000' });
                    levelText.setOrigin(0.5);
                    this.itemGroup.add(levelText);
                    
                }
                
            }
            
            this.pageSelectors[k].destroy();
            
            this.pageSelectors[k] = this.add.sprite(width / 2 + (k - Math.floor(gameOptions.colors.length / 2) + 0.5 * (1 - gameOptions.colors.length % 2)) * 40, height - 40, "levelpages");
            this.pageSelectors[k].setInteractive();
            this.pageSelectors[k].on("pointerdown", function(){
                if(this.scene.canMove){
                    var difference = this.pageIndex - this.scene.currentPage;
                    this.scene.changePage(difference);
                    this.scene.canMove = false;
                }
            });
            this.pageSelectors[k].pageIndex = k;
            this.pageSelectors[k].tint = gameOptions.colors[k];
            if(k == this.currentPage){
                this.pageSelectors[k].scaleY = 1;
            }
            else{
                this.pageSelectors[k].scaleY = 0.5;
            }
            
        }
        
        this.cameras.resize(width, height);
        
        //console.log(this.pageSelectors);
        
        //this.itemGroup.setPosition(width/2, height/2);
        
        //this.itemGroup.refresh();
        
        //this.changePageManually(3);
        
        //this.cameras.resize(width, height);
	
    }
    
    changePage(page){
        this.currentPage += page;
        for(var k = 0; k < gameOptions.colors.length; k++){
            if(k == this.currentPage){
                this.pageSelectors[k].scaleY = 1;
            }
            else{
                this.pageSelectors[k].scaleY = 0.5;
            }
        }
        this.pageText.text = "Swipe to select level page (" + (this.currentPage + 1).toString() + " / " + gameOptions.colors.length + ")";
        var currentPosition = this.scrollingMap.x;
        this.tweens.add({
            targets: this.scrollingMap,
            x: this.currentPage * -this.scale.width,
            duration: 300,
            ease: "Cubic.easeOut",
            callbackScope: this,
            onUpdate: function(tween, target){
                var delta = target.x - currentPosition;
                currentPosition = target.x;
                this.itemGroup.children.iterate(function(item){
                    item.x += delta;
                });
            },
            onComplete: function(){
                this.canMove = true;
            }
        });
    }
        
}

