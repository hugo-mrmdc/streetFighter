import { FRAME_TIME } from "./constants/game.js";
import { STAGE_MID_POINT, STAGE_PADDING } from "./constants/stage.js";
import { SkewedFLoor } from "./skewedFloor.js";
import { Background } from "./utils/backgroundAnimation.js";
export class avionStage {
    constructor() {

        this.image = document.querySelector('img[alt="avion"]');
        this.bas = document.querySelector('img[alt="bas"]');
        this.floor = new SkewedFLoor(this.image, [8, 392, 896, 56])
        this.floor1 = new SkewedFLoor(this.bas, [120, 392, 688, 3])
        this.floor2 = new SkewedFLoor(this.bas, [120, 392, 688, 3])
        this.frames = new Map([
            ['stage-background', [261, 753,250, 254]],
            ['stage-back', [0, 753, 512, 255]],
            ['stage-floor-bottom', [205, 288, 587, 17]],
           
            ['avion', [0, 224, 510, 254]],
            ['bollard-large', [223, 313, 54, 33]],
            ['barrels', [560, 472, 151, 96]],
            ['homme', [1, 489, 510, 255]],
            ['nuage', [251, 489, 259, 83]],
            ['box', [0, 752, 510, 76]],
            ['sol-1', [399, 383, 112, 96]],
            ['pool-haut', [312, 313, 335, 19]],
            ['bas', [120, 392, 688, 3]],
            ['floor', [2, 225, 508, 252]],
        ])
        this.hommFemme = new Background(
            this.image,
            [
                ['home-femme-1', [120, 1072,48, 80]],
                ['home-femme-2', [176, 1072, 48, 80]],
                ['home-femme-3', [588, 448, 284, 18]]],
            [['home-femme-1', 1000], ['home-femme-2', 200],]
        );
        this.homme2 = new Background(
            this.image,
            [
                ['homme-main-1', [8,1080, 48, 72]],
                ['homme-main-2', [64, 1080, 48, 72]],
                ['homme-main-3', [624, 144, 32, 56]]],
            [['homme-main-1', 216], ['homme-main-2', 216]],
        );
        this.homme = new Background(
            this.image,
            [
                ['homme-1', [689, 64, 95, 103]],
                ['homme-2', [790, 64, 67, 103]],
                ['homme-3', [554, 184, 76, 105]],
            ],
            [ ['homme-2', 200],['homme-1', 200],['homme-2', 1000],],
        );
        this.blueCoatGuy = new Background(
            this.image,
            [
                ['blue-1', [704, 16, 48, 56]],
                ['blue-2', [704, 80, 48, 56]],
                ['blue-3', [704, 144, 48, 56]],
            ],
            [['blue-1', 996], ['blue-2', 133], ['blue-3', 100],
            ['blue-2', 133], ['blue-1', 249], ['blue-2', 133],
            ['blue-3', 100], ['blue-2', 133],
            ],
        );
        this.purpleJumperGuy = new Background(
            this.image,
            [
                ['purple-1', [808, 24, 48, 32]],
                ['purple-2', [808, 72, 48, 32]],
                ['purple-3', [808, 120, 48, 32]],
            ],
            [['purple-1', 1992], ['purple-2', 166], ['purple-3', 166],
            ['purple-2', 166], ['purple-1', 166], ['purple-2', 166],
            ['purple-3', 166], ['purple-2', 166], ['purple-3', 166],
            ['purple-2', 166],
            ],
        );
        this.brownSuiteGuy = new Background(
            this.image,
            [
                ['brwon-1', [760, 16, 40, 40]],
                ['brwon-2', [760, 64, 40, 40]],
                ['brwon-3', [760, 112, 40, 40]],
            ],
            [['brwon-1', 996], ['brwon-2', 133], ['brwon-3', 100],
            ['brwon-2', 133],
            ],
        );
        this.flag = new Background(
            this.image,
            [
                ['flag-1', [848, 312, 40, 32]],
                ['flag-2', [848, 264, 40, 32]],
                ['flag-3', [848, 216, 40, 32]],
            ],
            [['flag-1', 133], ['flag-2', 133], ['flag-3', 133],

            ],
        );
        this.boat = {
            position: { x: 0, y: 0 },
            animationFrame: 0,
            animationTimer: 0,
            animationDelay: 22,
            animation: [0, -1, -2, -3, -4, -3, -2, -1],
        }
        this.wall = {
            position: { x: 0, y: 0 },

        }
    }
    updateBoat(time) {
        /*if (time.previous >= this.boat.animationTimer + this.boat.animationDelay * FRAME_TIME) {
            this.boat.animationTimer = time.previous
            this.boat.animationFrame += 1;
            this.boat.animationDelay = 22 + (Math.random() * 16 - 8);
        }*/
        if (this.boat.animationFrame >= this.boat.animation.length) {
            this.boat.animationFrame = 0;
        }
    }


    update(time) {
        this.flag.update(time)
        this.updateBoat(time);
        this.hommFemme.update(time)
         this.homme2.update(time)
        //this.homme.update(time)
        //this.blueCoatGuy.update(time)
        //this.purpleJumperGuy.update(time)
        //this.brownSuiteGuy.update(time);

    }
    drawFrame(context, frameKey, x, y) {
        const [sourceX, sourceY, sourceWidth, sourceHeight] = this.frames.get(frameKey);

        context.drawImage(
            this.image
            , sourceX, sourceY, sourceWidth, sourceHeight,
            x, y, sourceWidth, sourceHeight,
        );


    }

    drawwall(context, camera) {
        this.wall.position = {
            x: Math.floor(150 - (camera.position.x / 1.613445)),
            y: Math.floor(-camera.position.y + this.boat.animation[this.boat.animationFrame]),
        }

        this.drawFrame(context, 'wall-right', this.wall.position.x, 17 - camera.position.y)
    }



    drawBoat(context, camera) {

        this.boat.position = {
            x: Math.floor(160 - (camera.position.x / 1.613445)),
            y: Math.floor(-camera.position.y + this.boat.animation[this.boat.animationFrame]),
        }

        this.drawFrame(context, 'stage-back', this.boat.position.x, 58 - camera.position.y)

        
        //this.cheeringWoman.draw(context,this.boat.position.x + 192,this.boat.position.y + 104);
        //this.greenJumpGuy.draw(context,this.boat.position.x + 224,this.boat.position.y + 104);
        //this.blueCoatGuy.draw(context,this.boat.position.x + 288,this.boat.position.y + 96);
        //this.purpleJumperGuy.draw(context,this.boat.position.x + 128,this.boat.position.y + 24);
        //this.brownSuiteGuy.draw(context,this.boat.position.x + 88,this.boat.position.y + 24);
    }

    drawSmallBollard(context, camera) {
        const cmeraXoffset = camera.position.x / 1.54;
        const y = 166 - camera.position.y

    w}
    drawFloor(context, camera) {
        this.floor.draw(context, camera, 193)


    }
    drawbas(context, frameKey, x, y) {
        const [sourceX, sourceY, sourceWidth, sourceHeight] = this.frames.get(frameKey);

        context.drawImage(
            this.bas
            , sourceX, sourceY, sourceWidth, sourceHeight,
            x, y, sourceWidth, sourceHeight,
        );
    }

    drawBackground(context, camera) {
        this.drawFrame(context, 'bas', Math.floor(100 - (camera.position.x / 1.613445)), 230 - camera.position.y)
        this.drawFrame(context, 'box', Math.floor(250 - camera.position.x),0)
        this.drawFrame(context, 'box', Math.floor(600 - camera.position.x),0)
    
        this.drawBoat(context, camera);
        this.drawFrame(context, 'nuage', Math.floor(564 - camera.position.x/ 1.613445),18 -camera.position.y)
        this.drawFrame(context, 'avion', Math.floor(110 - camera.position.x/ 1.613445), 18 - camera.position.y)
        this.drawFrame(context, 'homme', Math.floor(110 - (camera.position.x / 1.613445)), 18 - camera.position.y)
       
       //this.drawFrame(context, 'floor', Math.floor(30 - (camera.position.x / 1.613445)), 180 - camera.position.y)
     
        
       
        this.drawFrame(context, 'stage-background', Math.floor(600 - camera.position.x / 1.613445), 57 - camera.position.y)
        this.drawFrame(context, 'sol-1', Math.floor(600 - camera.position.x / 1.613445), 177 - camera.position.y)
        this.drawFrame(context, 'sol-1', Math.floor(670 - camera.position.x / 1.613445), 177 - camera.position.y)
        //this.drawwall(context, camera)
       

        this.homme2.draw(context,Math.floor(302 - (camera.position.x / 1.613445)), 130 - camera.position.y);
        this.hommFemme.draw(context,Math.floor(437 - (camera.position.x / 1.613445)), 123 - camera.position.y);
       
       
        
    }


    drawForground(context, camera) {
        const midpoint = STAGE_MID_POINT + STAGE_PADDING;
        const cameraXOffset = camera.position.x / 0.958
        const y = 200 - camera.position.y


        //this.drawFrame(context, 'bollard-large', Math.floor(midpoint + 147 - cameraXOffset), y);
    }
}




