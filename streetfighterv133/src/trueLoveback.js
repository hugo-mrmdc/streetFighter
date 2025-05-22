import { FRAME_TIME } from "./constants/game.js";
import { STAGE_MID_POINT, STAGE_PADDING } from "./constants/stage.js";
import { SkewedFLoor } from "./skewedFloor.js";
import { Background } from "./utils/backgroundAnimation.js";
import { StartExpansion } from "./utils/startExpansion.js";
export class TrueloveBg {
    timerId = null;
    white = false
    timerId2 = null
    constructor() {
        this.finis = false;
        this.image = document.querySelector('img[alt="truelove"]');
        this.image2 = document.querySelector('img[alt="gojoC"]');
        this.floor = new SkewedFLoor(this.image, [8, 392, 896, 56])
        this.floor1 = new SkewedFLoor(this.bas, [120, 392, 688, 3])
        this.floor2 = new SkewedFLoor(this.bas, [120, 392, 688, 3])
        this.frames = new Map([
            ['black-1', [0, 25658, 296, 226]],


        ])

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
        let scalex = 1;
        let scale = 0.5;
        this.top = new Background(
            this.image,
            [
                ['top-1', [0, 10, 640, 480]],
                ['top-2', [0, 500, 640, 480]],
                ['top-3', [0, 990, 640, 480]],
                ['top-4', [0, 1480, 640, 480]],
                ['top-5', [0, 1970, 640, 480]],
                ['top-6', [0, 2460, 640, 480]],
                ['top-7', [0, 2950, 640, 480]],
                ['top-8', [0, 3440, 640, 480]],
                ['top-9', [0, 3930, 640, 480]],
                ['top-10', [0, 4420, 640, 480]],
                ['top-11', [0, 4910, 640, 480]],
                ['top-12', [0, 5400, 640, 480]],
                ['top-13', [0, 5890, 640, 480]],
                ['top-14', [0, 6380, 640, 480]],
                ['top-15', [0, 6870, 640, 480]],
                ['top-16', [0, 7360, 640, 480]],
                ['top-17', [0, 7850, 640, 480]],
                ['top-18', [0, 8340, 640, 480]],
                ['top-19', [0, 8830, 640, 480]],
                ['top-20', [0, 9320, 640, 480]],
                ['top-21', [0, 9810, 640, 480]],
                ['top-22', [0, 10300, 640, 480]],
                ['top-23', [0, 10790, 640, 480]],
                ['top-24', [0, 11280, 640, 480]],
                ['top-25', [0, 11770, 640, 480]],
                ['top-26', [0, 12260, 640, 480]],
                ['top-27', [0, 12750, 640, 480]],
                ['top-28', [0, 13240, 640, 480]],
                ['top-29', [0, 13730, 640, 480]],
                ['top-30', [0, 14220, 640, 480]],
                ['top-31', [0, 14710, 640, 480]],
                ['top-32', [0, 15200, 640, 480]],

            ],
            [['top-1', 133], ['top-3', 133],
            ['top-4', 133], ['top-5', 133], ['top-6', 133], ['top-7', 133],
            ['top-8', 133], ['top-9', 133], ['top-10', 133], ['top-11', 133],
            ['top-12', 133], ['top-14', 133], ['top-15', 133],
            ['top-16', 133], ['top-17', 133], ['top-18', 133], ['top-19', 133],
            ['top-20', 133], ['top-21', 133], ['top-22', 133],
            ['top-23', 133],
            ['top-26', 133], ['top-27', 133], ['top-29', 133],
            ['top-30', 133], ['top-31', 133], ['top-32', 133], ['top-29', 133],
            ],
            0,
            scalex,
            scale
        );
        this.start = new StartExpansion(
            this.image2,
            [
                ['infini-1', [42, 1497, 294, 165]],
                ['infini-2', [345, 1497, 294, 165]],
                ['infini-3', [649, 1497, 294, 165]],
                ['infini-4', [171, 1700, 294, 166]],
                ['infini-5', [519, 1700, 294, 165]],
                ['infini-6', [171, 1905, 294, 166]],
                ['infini-7', [46, 2110, 294, 166]],
                ['infini-8', [349, 2110, 294, 166]],

                ['infini-9', [46, 2293, 294, 166]],
                ['infini-10', [649, 2109, 294, 167]],
            ],
            [['infini-9', 100], ['infini-9', 50], ['infini-9', 50], ['infini-9', 50], ['infini-9', 50], ['infini-9', 150], ['infini-9', 150], ['infini-9', 150], ['infini-9', 150], ['infini-9', 150]

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
        this.startTimer();
        this.startTimer2()
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
    startTimer() {
        // Si un timer est déjà en cours, le réinitialiser
        if (this.timerId) {
            clearTimeout(this.timerId);
        }

      
        setTimeout(() => {
            this.white = true;
            this.timerId = null;
           
        }, 7400);

    }
    startTimer2() {
        // Si un timer est déjà en cours, le réinitialiser
        if (this.timerId2) {
            clearTimeout(this.timerId2);
        }

      
        setTimeout(() => {
          this.finis = true;
           
        }, 11000);

    }

    update(time) {

        this.updateBoat(time);
        if (this.white) {
            this.start.update(time)
        }



        this.top.update(time)
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
    drawFrame2(context, frameKey, x, y, scalex, scaley) {
        const [sourceX, sourceY, sourceWidth, sourceHeight] = this.frames.get(frameKey);

        context.drawImage(
            this.image
            , sourceX, sourceY, sourceWidth, sourceHeight,
            x, y, sourceWidth * scalex, sourceHeight * scaley,
        );


    }

    drawwall(context, camera) {
        this.wall.position = {
            x: Math.floor(150 - (camera.position.x / 1.1)),
            y: Math.floor(-camera.position.y + this.boat.animation[this.boat.animationFrame]),
        }

        this.drawFrame(context, 'wall-right', this.wall.position.x, 17 - camera.position.y)
    }



    drawBoat(context, camera) {

        this.boat.position = {
            x: Math.floor(180 - (camera.position.x / 1)),
            y: Math.floor(-camera.position.y + this.boat.animation[this.boat.animationFrame]),
        }
        this.drawFrame2(context, 'black-1', this.boat.position.x, -100 - camera.position.y, 7, 10)

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
        //sthis.drawFrame(context, 'bas', Math.floor(150 - (camera.position.x / 1.613445)), 230 - camera.position.y)

        this.drawBoat(context, camera)





        //this.drawFrame(context, 'floor', Math.floor(30 - (camera.position.x / 1.613445)), 190 - camera.position.y)
        //this.drawFrame(context, 'stage-floor-bottom',
        //  Math.floor(210 - (camera.position.x / 1.613445)), 177 - camera.position.y
        //)
        //this.drawSmallBollard(context, camera);
        //this.drawFrame(context, 'barrels', Math.floor(872 - camera.position.x), 120)
        //this.drawwall(context, camera)

        //this.drawFrame(context, 'pool-haut', Math.floor(320 - (camera.position.x / 1.613445)), 178 - camera.position.y)
        //this.drawFrame(context, 'pool-bas', Math.floor(320 - (camera.position.x / 1.613445)), 194 - camera.position.y)
        this.top.draw(context, Math.floor(150 - (camera.position.x / 1.613445)), -0 - camera.position.y);
        if (this.white) {
            this.start.draw(context, Math.floor(100 - (camera.position.x / 1.613445)), 30 - camera.position.y, 10, 1.3);
        }
        //this.drawFrame(context, 'toit', Math.floor(100 - (camera.position.x / 1.613445)), 18 - camera.position.y)
        //this.montagne.draw(context,Math.floor(331 - (camera.position.x / 1.613445)), 73 - camera.position.y);


    }


    drawForground(context, camera) {
        const midpoint = STAGE_MID_POINT + STAGE_PADDING;
        const cameraXOffset = camera.position.x / 0.958
        const y = 200 - camera.position.y


        //this.drawFrame(context, 'bollard-large', Math.floor(midpoint + 147 - cameraXOffset), y);
    }
}




