import { HitSplash } from "./hitsplash.js";

export class LightHitSplash extends HitSplash {
    constructor(args,entitylist) {
        super(args,entitylist);
        this.frames = [
            //playyer1
            [[14, 16, 9, 10], [6, 7]],
            [[34, 15, 13, 11], [7, 7]],
            [[55, 15, 13, 11], [7, 7]],
            [[75, 10, 20, 19], [11, 11]],
            //Player2
            [[160, 16, 9, 10], [6, 7]],
            [[178, 15, 13, 11], [7, 7]],
            [[199, 15, 13, 11], [7, 7]],
            [[219, 10, 20, 19], [11, 11]]
        ];

    }
    update(time) {
        super.update(time);
    }
    draw(context, camera) {
        super.draw(context,camera);
    }
}