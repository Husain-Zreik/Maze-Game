

class MenuScene extends Phaser.Scene {

    constructor(){
        super({key: 'menuScene'})
        this.menu_scene_image = null
        this.menu_scene_title = null
        this.menu_scene_title_style = {
            fontFamily: 'poppens',
            fontSize: '60px',
            fontWeight: "bold",
            color: '#ffffff',
            align: 'center'
        }
    }

    init(data){
        this.cameras.main.setBackgroundColor('#000000')
    }

    preload(){
        console.log('menu Scene is working')
        
        this.load.image('menuSceneBg','../assets/menuBg.jpg')
        this.load.image('startButton','../assets/startButton.jpeg')
        this.load.image('tutorialButton','../assets/tutorialButton.jpeg')
        this.load.image('micOn','../assets/micOn.png')
        this.load.image('micOff','../assets/micOff.png')
        this.load.image('textBg','../assets/textBg.png')

        this.load.audio('menuMusic','../assets/sounds/menuSound.mp3')
    }

    create(data){
        
        this.menu_scene_image =this.add.sprite(0,0,'menuSceneBg')
        this.menu_scene_image.setScale(0.762)
        this.menu_scene_image.x = 800/2
        this.menu_scene_image.y = 600/2

        this.title_bg = this.add.sprite(0,0,'textBg')
        this.title_bg.setScale(0.5)
        this.title_bg.x = 680
        this.title_bg.y = 515

        this.menu_scene_title = this.add.text(595,490, "MAZE", this.menu_scene_title_style)

        
        this.start_button= this.add.sprite(0,0,'startButton')
        this.start_button.setScale(0.762)
        this.start_button.x = 130
        this.start_button.y = 240
        this.start_button.setInteractive({useHandCursor: true})
        this.start_button.on('pointerdown',() => this.clickStartButton())
        
        
        this.tutorial_button= this.add.sprite(0,0,'tutorialButton')
        this.tutorial_button.setScale(0.762)
        this.tutorial_button.x = 145
        this.tutorial_button.y = 330
        this.tutorial_button.setInteractive({useHandCursor: true})
        this.tutorial_button.on('pointerdown',() => this.clickTutorialButton())

        this.menu_music = this.sound.add('menuMusic')
        this.menu_music.play({loop:true})
        
        this.mic_off_image =this.add.sprite(0,0,'micOff')
        this.mic_off_image.setScale(0.1)
        this.mic_off_image.x = 23
        this.mic_off_image.y = 577
        this.mic_off_image.setInteractive({useHandCursor: true})
        this.mic_off_image.on('pointerdown',() => this.volumeButton())
        this.mic_off_image.setVisible(false)


        this.mic_on_image =this.add.sprite(0,0,'micOn')
        this.mic_on_image.setScale(0.1)
        this.mic_on_image.x = 23
        this.mic_on_image.y = 577
        this.mic_on_image.setInteractive({useHandCursor: true})
        this.mic_on_image.on('pointerdown',() => this.volumeButton())
        this.volume_on = true

    }

    update (time,delta){
    }
    
    volumeButton(){
        if(this.volume_on == true)
        {
            this.menu_music.stop()
            this.volume_on = false
            this.mic_off_image.setVisible(true)
            this.mic_on_image.setVisible(false)
        }
        else
        {
            this.menu_music.play()
            this.volume_on = true
            this.mic_off_image.setVisible(false)
            this.mic_on_image.setVisible(true)
        }
    }
    clickStartButton(){
        this.menu_music.stop()
        this.scene.start('level1Scene')
    }
    clickTutorialButton(){
        this.menu_music.stop()
        this.scene.start('tutorialScene')
    }


}

export default MenuScene