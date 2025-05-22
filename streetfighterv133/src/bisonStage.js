import { FRAME_TIME } from "./constants/game.js";
import { STAGE_MID_POINT, STAGE_PADDING } from "./constants/stage.js";
import { SkewedFLoor } from "./skewedFloor.js";
import { Background } from "./utils/backgroundAnimation.js";
export class BisonStage {
    constructor() {
        this.finis = false;
        this.image = document.querySelector('img[alt="blanka"]');
        this.bas = document.querySelector('img[alt="bas"]');
        this.floor = new SkewedFLoor(this.image, [8, 392, 896, 56])
        this.floor1 = new SkewedFLoor(this.bas, [120, 392, 688, 3])
        this.floor2 = new SkewedFLoor(this.bas, [120, 392, 688, 3])
        this.frames = new Map([
            ['stage-background', [72, 208, 768, 176]],
            ['stage-back', [9, 0,768, 184]],
            ['stage-floor-bottom', [205, 288, 587, 17]],
            ['nuage', [9, 264, 511, 160]],
            ['bollard-small', [223, 313, 54, 33]],
            ['bollard-large', [223, 313, 54, 33]],
            ['barrels', [560, 472, 151, 96]],
            ['cabane', [757, 261, 257, 208]],
            ['arbe', [527, 267, 229, 202]],
            ['pool-haut', [312, 313, 335, 19]],
            ['bas', [120, 392, 688, 3]],
            ['floor', [8, 190, 896, 66]],
        ])
        this.fenetre1 = new Background(
            this.image,
            [
                ['pool-1', [784, 8, 40, 24]],
                ['pool-2', [832, 8, 40, 24]],
               ],
            [['pool-1', 100], ['pool-2', 133],],
        );
        this.fenetre2 = new Background(
            this.image,
            [
                ['mont-1', [880, 8,32, 24]],
                ['mont-2', [920, 8, 32, 24]],
                ['mont-3', [624, 144, 32, 56]]],
            [['mont-1', 216], ['mont-2', 216]],
        );
        this.homme1 = new Background(
            this.image,
            [
                ['homme-1', [789, 40,29, 34 ]],
                ['homme-2', [824, 40, 34, 33]],
                ['homme-3', [863, 40, 34, 33]],
            ],
            [ ['homme-1', 200],['homme-2', 200],['homme-3', 200],],
        );
        this.photo = new Background(
            this.image,
            [
                ['blue-1', [992, 146, 24, 22]],
                ['blue-2', [992, 178, 24, 22]],
                ['blue-3', [992, 210, 24, 22]],
            ],
            [['blue-1', 996], ['blue-2', 133], ['blue-3', 100],
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
        this.fenetre1.update(time)
         this.fenetre2.update(time)
        this.homme1.update(time)
        this.photo.update(time)
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
            x: Math.floor(1 - (camera.position.x / 1.613445)),
            y: Math.floor(-camera.position.y + this.boat.animation[this.boat.animationFrame]),
        }

        this.drawFrame(context, 'wall-right', this.wall.position.x, 17 - camera.position.y)
    }



    drawBoat(context, camera) {

        this.boat.position = {
            x: Math.floor(60 - (camera.position.x / 1.613445)),
            y: Math.floor(-camera.position.y + this.boat.animation[this.boat.animationFrame]),
        }

        this.drawFrame(context, 'stage-back', this.boat.position.x, 8 - camera.position.y)

        
        //this.cheeringWoman.draw(context,this.boat.position.x + 192,this.boat.position.y + 104);
        //this.greenJumpGuy.draw(context,this.boat.position.x + 224,this.boat.position.y + 104);
        //this.blueCoatGuy.draw(context,this.boat.position.x + 288,this.boat.position.y + 96);
        //this.purpleJumperGuy.draw(context,this.boat.position.x + 128,this.boat.position.y + 24);
        //this.brownSuiteGuy.draw(context,this.boat.position.x + 88,this.boat.position.y + 24);
    }

    drawSmallBollard(context, camera) {
        const cmeraXoffset = camera.position.x / 1.54;
        const y = 166 - camera.position.y

    }
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
        this.drawFrame(context, 'nuage', Math.floor(160- (camera.position.x / 1.613445)), -20 - camera.position.y)
        this.drawFrame(context, 'nuage', Math.floor(300- (camera.position.x / 1.613445)), -20 - camera.position.y)
        this.drawFrame(context, 'nuage', Math.floor(160- (camera.position.x / 1.613445)), 8 - camera.position.y)
        this.drawFrame(context, 'nuage', Math.floor(300- (camera.position.x / 1.613445)), 8 - camera.position.y)
        this.drawBoat(context, camera);
       
        
        this.drawFrame(context, 'floor', Math.floor(160- (camera.position.x / 1.613445)), 190 - camera.position.y)
        this.drawFrame(context, 'arbe', Math.floor(350 - (camera.position.x / 1.613445)), 4 - camera.position.y)
        this.drawFrame(context, 'cabane', Math.floor(600 - (camera.position.x / 1.613445)), 0 - camera.position.y)
        //this.drawFrame(context, 'stage-floor-bottom',Math.floor(210 - (camera.position.x / 1.613445)), 177 - camera.position.y )
        //this.drawSmallBollard(context, camera);
        
        //this.drawwall(context, camera)
        
       // this.drawFrame(context, 'pool-haut', Math.floor(320 - (camera.position.x / 1.613445)), 178 - camera.position.y)
       // this.drawFrame(context, 'pool-bas', Math.floor(320 - (camera.position.x / 1.613445)), 194 - camera.position.y)
        this.fenetre1.draw(context,Math.floor(171 - (camera.position.x / 1.613445)), 105 - camera.position.y);
        //this.drawFrame(context, 'toit', Math.floor(100 - (camera.position.x / 1.613445)), 18 - camera.position.y)
       this.fenetre2.draw(context,Math.floor(331 - (camera.position.x / 1.613445)), 105 - camera.position.y);
       this.photo.draw(context,Math.floor(619 - (camera.position.x / 1.613445)), 149 - camera.position.y);
     
       switch(this.homme1.animationFrame){
        case 0:
            this.homme1.draw(context,Math.floor(696- (camera.position.x / 1.613445)), 131 - camera.position.y);
            break;
            case 1:
                this.homme1.draw(context,Math.floor(691- (camera.position.x / 1.613445)), 131 - camera.position.y);
                break;
                case 2:
                    this.homme1.draw(context,Math.floor(691- (camera.position.x / 1.613445)), 131 - camera.position.y);
                    break;
         
           
    }
    }


    drawForground(context, camera) {
        const midpoint = STAGE_MID_POINT + STAGE_PADDING;
        const cameraXOffset = camera.position.x / 0.958
        const y = 200 - camera.position.y


        //this.drawFrame(context, 'bollard-large', Math.floor(midpoint + 147 - cameraXOffset), y);
    }
}




