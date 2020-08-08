var gameOptions = {
    colors: ["0xffffff","0xFAF9DB","0xD5BF8D","0xE9AFA5","0x69A5E8"],
    columns: 3,
    rows: 4,
    thumbWidth: 60,
    thumbHeight: 60,
    spacing: 20,
    backgroundColor: "#fefcd6",
    localStorageName: "levelselect"
}

var shapeOptions = {
    columns: 6,
    rows: 4,
    thumbWidth: 48,
    thumbHeight: 48,
    spacing: 10    
}

var config = {
    type: Phaser.AUTO,    
    backgroundColor: 0x222222,
    parent: 'canvas',
    scale: {
        mode: Phaser.Scale.RESIZE,       
        width: '100%',
        height: '100%',
        min: {
            width: 320,
            height: 600
        },
        max: {
            width: 1600,
            height: 1200
        }
    }, 
    physics: {
        default: 'arcade',
        arcade: {
            gravity: 0
        }
    },   
    scene: [GameMenu, GameTitle, GameLevels, GameScene]

};

