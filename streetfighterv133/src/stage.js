import { FRAME_TIME } from "./constants/game.js";
import { STAGE_MID_POINT, STAGE_PADDING } from "./constants/stage.js";
import { SkewedFLoor } from "./skewedFloor.js";
import { Background } from "./utils/backgroundAnimation.js";
export class Stage {
    constructor() {

        this.image = document.querySelector('img[alt="stage"]');
        this.floor = new SkewedFLoor(this.image, [8, 392, 896, 56])
        this.frames = new Map([
            ['stage-background', [72, 208, 768, 176]],
            ['stage-boat', [8, 16, 521, 180]],
            ['stage-floor-bottom', [8, 448, 896, 16]],

            ['bollard-small', [800, 184, 21, 16]],
            ['bollard-large', [760, 176, 31, 24]],
            ['barrels', [560, 472, 151, 96]],
        ])
        this.baldMan = new Background(
            this.image,
            [
                ['bald-man-1', [552, 8, 40, 64]],
                ['bald-man-2', [552, 72, 40, 64]],
                ['bald-man-3', [552, 136, 40, 64]]],
            [['bald-man-1', 100], ['bald-man-2', 133], ['bald-man-3', 665], ['bald-man-2', 133]],
        );
        this.cheeringWoman = new Background(
            this.image,
            [
                ['woman-1', [624, 16, 32, 56]],
                ['woman-2', [624, 80, 32, 56]],
                ['woman-3', [624, 144, 32, 56]]],
            [['woman-1', 216], ['woman-2', 216], ['woman-3', 216], ['woman-2', 216]],
        );
        this.greenJumpGuy = new Background(
            this.image,
            [
                ['green-1', [664, 16, 32, 56]],
                ['green-2', [664, 80, 32, 56]],
            ],
            [['green-1', 664], ['green-2', 498], ['green-1', 133], ['green-2', 133]],
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
    }
    updateBoat(time) {
        if (time.previous >= this.boat.animationTimer + this.boat.animationDelay * FRAME_TIME) {
            this.boat.animationTimer = time.previous
            this.boat.animationFrame += 1;
            this.boat.animationDelay = 22 + (Math.random() * 16 - 8);
        }
        if (this.boat.animationFrame >= this.boat.animation.length) {
            this.boat.animationFrame = 0;
        }
    }


    update(time) {
        this.flag.update(time)
        this.updateBoat(time);
        this.baldMan.update(time)
        this.cheeringWoman.update(time)
        this.greenJumpGuy.update(time)
        this.blueCoatGuy.update(time)
        this.purpleJumperGuy.update(time)
        this.brownSuiteGuy.update(time);
        
    }
    drawFrame(context, frameKey, x, y) {
        const [sourceX, sourceY, sourceWidth, sourceHeight] = this.frames.get(frameKey);

        context.drawImage(
            this.image
            , sourceX, sourceY, sourceWidth, sourceHeight,
            x, y, sourceWidth, sourceHeight,
        );


    }
    drawSkyOcean(context,camera){
        const backgroundX = Math.floor(16 - (camera.position.x / 2.157303))
        this.drawFrame(context, 'stage-background',backgroundX, -camera.position.y)
        this.flag.draw(context,backgroundX + 560,16 - camera.position.y)
    }
    drawBoat(context, camera) {
        this.boat.position = {
            x: Math.floor(150 - (camera.position.x / 1.613445)),
            y: Math.floor(-camera.position.y + this.boat.animation[this.boat.animationFrame]),
        }
        this.drawFrame(context, 'stage-boat', this.boat.position.x, this.boat.position.y)
        this.baldMan.draw(context,this.boat.position.x + 128,this.boat.position.y + 96);
        this.cheeringWoman.draw(context,this.boat.position.x + 192,this.boat.position.y + 104);
        this.greenJumpGuy.draw(context,this.boat.position.x + 224,this.boat.position.y + 104);
        this.blueCoatGuy.draw(context,this.boat.position.x + 288,this.boat.position.y + 96);
        this.purpleJumperGuy.draw(context,this.boat.position.x + 128,this.boat.position.y + 24);
        this.brownSuiteGuy.draw(context,this.boat.position.x + 88,this.boat.position.y + 24);
    }

    drawSmallBollard(context,camera){
        const cmeraXoffset = camera.position.x / 1.54;
        const y = 166 - camera.position.y

        this.drawFrame(context,'bollard-small',Math.floor(468 - 92 -cmeraXoffset), y)
        this.drawFrame(context,'bollard-small',Math.floor(468 + 92 -cmeraXoffset), y)
    }
    drawFloor(context,camera){
        this.floor.draw(context,camera,176);
        this.drawFrame(context, 'stage-floor-bottom', 
            STAGE_PADDING -camera.position.x * 1.1 ,232 - camera.position.y
        )
            
    }

    drawBackground(context, camera) {
        this.drawSkyOcean(context,camera);
        this.drawBoat(context, camera);
        this.drawFloor(context,camera)
        this.drawSmallBollard(context,camera);
        this.drawFrame(context,'barrels',Math.floor(872 -camera.position.x),120 - camera.position.y)
    }


    drawForground(context,camera){
      const midpoint = STAGE_MID_POINT + STAGE_PADDING;
      const cameraXOffset = camera.position.x / 0.958
      const y = 200 - camera.position.y

      this.drawFrame(context, 'bollard-large', Math.floor(midpoint -147 - cameraXOffset),y);
      this.drawFrame(context, 'bollard-large', Math.floor(midpoint +147 - cameraXOffset),y);
    }
}




