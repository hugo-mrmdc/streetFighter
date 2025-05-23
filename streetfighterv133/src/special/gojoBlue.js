import { FighterAttackStrenght, FighterHurtBox } from "../constants/fighter.js";
import { FireballCollidedState, FireballState, FireballVellocity } from "../constants/fireball.js";
import { FRAME_TIME } from "../constants/game.js";
import { boxOverlap, getActualBoxDimensions } from "../utils/collisions.js";
import { Fireball } from "./fireball.js";

const frames = new Map([
    ['hadoken-fireball-1-l', [[[601, 1151, 26, 21], [25, 15]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['hadoken-fireball-2-l', [[[629, 1152, 21, 21], [25, 15]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['hadoken-fireball-3-l', [[[655, 1147, 27, 27], [25, 15]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['hadoken-fireball-1', [[[759, 1134, 45, 56], [25, 15]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['hadoken-fireball-2', [[[813, 1133, 46, 52], [25, 15]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['hadoken-fireball-3', [[[869, 1133, 48, 50], [25, 15]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],


    ['hadoken-collide-1', [[[743, 1201, 51, 49], [13, 10]], [0, 0, 0, 0]]],
    ['hadoken-collide-2', [[[798, 1195, 58, 60], [9, 13]], [0, 0, 0, 0]]],
    ['hadoken-collide-3', [[[863, 1195, 64, 60], [21, 14]], [0, 0, 0, 0]]],
])

const animations = {
    [FireballState.Lancer]: [['hadoken-fireball-1-l', 40], ['hadoken-fireball-2-l', 80], ['hadoken-fireball-3-l', 40], ['hadoken-fireball-3-l', -2]],
    [FireballState.ACTIVE]: [['hadoken-fireball-1', 32], ['hadoken-fireball-2', 32], ['hadoken-fireball-3', 16], ['hadoken-fireball-2', 32], ['hadoken-fireball-3', 16],],
    [FireballState.COLLIDED]: [['hadoken-collide-1', 144], ['hadoken-collide-2', 80], ['hadoken-collide-3', 144]],

}

export class GojoBlue extends Fireball {
    touche = true
    image = document.querySelector('img[alt="gojoC"]')
    animationTimer = 0;
    state = FireballState.Lancer;
    constructor(args, entitylist) {
        super(args, entitylist)
    }
    hasCollideWithOpponent(hitbox) {
        const [x, y, width, height] = frames.get(animations[this.state][this.animationFrame][0])[1];
        const actualhitBox = getActualBoxDimensions(this.position, this.direction, { x, y, width, height })
        for (const [, hurtbox] of Object.entries(this.fighter.opponent.boxe.hurt)) {
            const [x, y, width, height] = hurtbox;

            const actualOpponentHurBox = getActualBoxDimensions(
                this.fighter.opponent.position,
                this.fighter.opponent.direction,
                { x, y, width, height },
            );

            if (boxOverlap(hitbox, actualOpponentHurBox)) return FireballCollidedState.OPPONENT;
        }
    }
    hasCollideWithOtherFireball(hitbox) {

        const ostherFireball = this.entitylist.entities.filter((fireball) => fireball instanceof Fireball && fireball != this);
        if (ostherFireball == 0) return;
        for (const fireball of ostherFireball) {
            const [x, y, width, height] = frames.get(animations[fireball.state][fireball.animationFrame][0])[1];
            const otheractualhitBox = getActualBoxDimensions(fireball.position, fireball.direction, { x, y, width, height })
            if (boxOverlap(hitbox, otheractualhitBox)) return FireballCollidedState.FIREBALL;
        }
    }
    hasCollided() {
        const [x, y, width, height] = frames.get(animations[this.state][this.animationFrame][0])[1];
        const actualhitBox = getActualBoxDimensions(this.position, this.direction, { x, y, width, height })
        return this.hasCollideWithOpponent(actualhitBox) ?? this.hasCollideWithOtherFireball(actualhitBox);
    }
    updateMovement(time, camera) {
        if(this.state == FireballState.COLLIDED){

        }else{
            this.velocity = 100;
        }
        if (this.state == FireballState.Lancer) {

        } else {
           
            this.position.x += this.velocity * this.direction * time.secondpassed;
            const isOutOfCameraView =
                this.position.x - camera.position.x > 384 + 56 ||
                this.position.x - camera.position.x < -56;

            if (isOutOfCameraView) {
                this.state = FireballState.COLLIDED; // Set state to COLLIDED (optional visual feedback)
                this.entitylist.removeEntities(this);
                return;
            }
            const hascollided = this.hasCollided()
            if (!hascollided) return;
            this.state = FireballState.COLLIDED;
            this.velocity = 0;
            this.animationFrame = 0;
            this.animationTimer = time.previous + animations[this.state][this.animationFrame][1];
            if (hascollided != FireballCollidedState.OPPONENT) return;
            if(this.touche){

            this.touche = false
            this.fighter.opponent.handleAttackHit(FighterAttackStrenght.HEAVY, FighterHurtBox.HEAD)
            this.entitylist.removeEntities(this);
            }
        }

    }

    updateAnimation(time) {
        if (time.previous < this.animationTimer) return;
        if (animations[this.state][this.animationFrame][1] == -2) {
            this.state = FireballState.ACTIVE;
            this.animationFrame = 0;

        }


        this.animationFrame += 1;

        const animationFrames = animations[this.state];
        if (this.animationFrame >= animations[this.state].length) {
            this.animationFrame = 0;
            if (this.state == FireballState.COLLIDED) {
                this.entitylist.removeEntities(this)

            };

        }

        this.animationTimer = time.previous + animations[this.state][this.animationFrame][1];
    }

    update(time, context, camera) {

        this.updateMovement(time, camera);
        this.updateAnimation(time);
    }
    draw(context, camera) {
        const [frameKey] = animations[this.state][this.animationFrame]
        const [[
            [x, y, width, height], [originX, originY]]] = frames.get(frameKey)
        context.scale(this.direction, 1)
        context.drawImage(
            this.image,
            x,
            y,
            width, height,
            Math.floor((this.position.x - camera.position.x) * this.direction - originX),
            Math.floor(this.position.y - camera.position.y - originY),
            width, height
        );
        context.setTransform(1, 0, 0, 1, 0, 0)

    }
}