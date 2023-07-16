

class Level1Scene extends Phaser.Scene {


    constructor(){
        super({key: 'level1Scene'})
    }
    

    init(data){
        this.cameras.main.setBackgroundColor('#ffffff')
    }
    
    preload(){
        console.log('level1 Scene is working')

        this.load.image('background', '../assets/Forest-BG2.jfif');
        this.load.image('dungeon_tiles', '../assets/tilemap_packed.png');
        this.load.tilemapTiledJSON('map', '../json/tilesLayer.json');
        this.load.image('homeIcon', '../assets/homeIcon.png');
        this.load.image('restartIcon', '../assets/restartIcon.png');


        let player=this.load.spritesheet('player','assets/player.png',
        {
            frameWidth:126.41,
            frameHeight:152})

        this.load.audio('gameMusic','../assets/sounds/gameSound.mp3')
    }

    create(data){

    const background = this.add.image(0, 0, 'background').setOrigin(0, 0);
    background.setScale(this.game.config.width / background.width, this.game.config.height / background.height);



    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('tilemap_packed', 'dungeon_tiles');
    const Layer = map.createLayer('Tile Layer 1', tileset, 0, 0);
    const tilesLayer= map.createLayer("tileslayer",tileset,0,0);

    // Calculate the position to center the tileset
    const centerX = (this.game.config.width - map.widthInPixels) / 2;
    const centerY = (this.game.config.height - map.heightInPixels) / 2;

    // Move the tileset layer to the center
    Layer.setPosition(centerX, centerY);
    tilesLayer.setPosition(centerX,centerY);

    this.input.keyboard.enabled=true;   
    let player=this.player=this.physics.add.sprite(390,540,'player');
    this.player.scale=0.17;
    this.player.depth=1;
    this.anims.create({
        key:'right',
        frames:this.anims.generateFrameNumbers("player",{start:0,end:3}),
        frameRate:8,
        repeat:-1
    });
    this.anims.create({
        key:'left',
        frames:this.anims.generateFrameNumbers("player",{start:4,end:7}),
        frameRate:8,
        repeat:-1
    });
    this.anims.create({
        key:'up',
        frames:this.anims.generateFrameNumbers("player",{start:8,end:11}),
        frameRate:8,
        repeat:-1
    });
    this.anims.create({
        key:'down',
        frames:this.anims.generateFrameNumbers("player",{start:12,end:15}),
        frameRate:8,
        repeat:-1
    });
    this.anims.create({
        key:'thrust',
        frames:this.anims.generateFrameNumbers("player"),
        frameRate:8,
        repeat:-1
    });    

    this.cursors = this.input.keyboard.createCursorKeys();    
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(player,tilesLayer);
    tilesLayer.setCollisionBetween(0,41);
    
    this.home_icon =this.add.sprite(0,0,'homeIcon')
    this.home_icon.setScale(0.07)
    this.home_icon.x = 780
    this.home_icon.y = 580
    this.home_icon.setInteractive({useHandCursor: true})
    this.home_icon.on('pointerdown',() => this.homeIcon())

    this.restart_icon =this.add.sprite(0,0,'restartIcon')
    this.restart_icon.setScale(0.07)
    this.restart_icon.x = 745
    this.restart_icon.y = 580
    this.restart_icon.setInteractive({useHandCursor: true})
    this.restart_icon.on('pointerdown',() => this.restartIcon())

    //volume off
    this.mic_off_image =this.add.sprite(0,0,'micOff')
    this.mic_off_image.setScale(0.07)
    this.mic_off_image.x = 23
    this.mic_off_image.y = 577
    this.mic_off_image.setInteractive({useHandCursor: true})
    this.mic_off_image.on('pointerdown',() => this.volumeButton())
    this.mic_off_image.setVisible(false) 

    //volume on
    this.mic_on_image =this.add.sprite(0,0,'micOn')
    this.mic_on_image.setScale(0.07)
    this.mic_on_image.x = 23
    this.mic_on_image.y = 577
    this.mic_on_image.setInteractive({useHandCursor: true})
    this.mic_on_image.on('pointerdown',() => this.volumeButton())
    this.volume_on = true   

    this.game_music = this.sound.add('gameMusic')
    this.game_music.play({loop:true})
    }

    update(){
        this.player.setVelocity(0);
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-60);
            this.player.anims.play('left', true);
        } 
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(60);
            this.player.anims.play('right', true);
        }
        else if (this.cursors.up.isDown) {
            this.player.setVelocityY(-60);
            this.player.anims.play('up', true);
        }
        else if (this.cursors.down.isDown) {
            this.player.setVelocityY(60);
            this.player.anims.play('down', true);
        } 
        else {
            this.player.anims.stop();
        }
    }

    volumeButton(){
    if(this.volume_on == true)
    {
        this.game_music.stop()
        this.volume_on = false
        this.mic_off_image.setVisible(true)
        this.mic_on_image.setVisible(false)
    }
    else
    {
        this.game_music.play()
        this.volume_on = true
        this.mic_off_image.setVisible(false)
        this.mic_on_image.setVisible(true)
    }
    }

    restartIcon(){
        this.scene.start('level1Scene')
        this.game_music.stop()
    }

    homeIcon(){

        this.scene.setVisible(false)
        this.scene.start('menuScene')
        this.game_music.stop()
    }

}

export default Level1Scene