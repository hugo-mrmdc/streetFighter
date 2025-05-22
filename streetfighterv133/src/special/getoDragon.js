import { FighterAttackStrenght, FighterHurtBox } from "../constants/fighter.js";
import { FireballCollidedState, FireballState, FireballVellocity } from "../constants/fireball.js";
import { FRAME_TIME } from "../constants/game.js";
import { boxOverlap, getActualBoxDimensions } from "../utils/collisions.js";
import { Fireball } from "./fireball.js";

const frames = new Map([
    ['create-0', [[[0,0,0,0], [206, -7]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['create-1', [[[2316, 3176, 80, 46], [-67, -7]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['create-2', [[[2990, 3174, 59, 130], [-67, 7]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['create-3', [[[5680, 3161, 62, 81], [-72, 63]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['create-4', [[[6330, 3147, 106, 108], [210, 115]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['create-5', [[[7006, 3149, 104, 101], [198, 109]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['create-6', [[[7672, 3152, 105, 93], [198, 109]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['create-7', [[[8326, 3167, 143, 70], [198, 89]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['create-8', [[[9014, 3160, 113, 79], [198, 89]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['create-9', [[[9691, 3172, 101, 54], [198, 89]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['create-10', [[[9691, 3172, 101, 54], [0, 90]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],


    ['hadoken-fireball-1', [[[10331, 3177, 165, 43], [20, 40]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['hadoken-fireball-2', [[[4954, 3177, 171, 40], [50, 30]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['hadoken-fireball-3', [[[4282, 3175, 172, 46], [50, 30]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['hadoken-fireball-4', [[[3609, 3181, 170, 38], [50, 30]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],




    ['hadoken-collide-1', [[[271, 1311, 19, 22], [13, 10]], [0, 0, 0, 0]]],
    ['hadoken-collide-2', [[[291, 1309, 18, 25], [9, 13]], [0, 0, 0, 0]]],
    ['hadoken-collide-3', [[[311, 1307, 17, 30], [21, 14]], [0, 0, 0, 0]]],
])

const animations = {
    [FireballState.Lancer]: [['create-1', 1], ['create-0', 0], ['create-1', 100], ['create-2', 150], ['create-3', 150], ['create-4', 100], ['create-5', 200], ['create-6', 200], ['create-7', 200], ['create-8', 200], ['create-9', 200], ['create-10', 300], ['create-3', -2]],
    [FireballState.ACTIVE]: [['hadoken-fireball-1', 100],['hadoken-fireball-1', 100], ['hadoken-fireball-2', 100], ['hadoken-fireball-3', 100], ['hadoken-fireball-4', 100],['hadoken-fireball-1', 100],['hadoken-fireball-1', 100], ['hadoken-fireball-2', 100], ['hadoken-fireball-3', 100],],
    [FireballState.COLLIDED]: [['hadoken-collide-1', 144], ['hadoken-collide-2', 80], ['hadoken-collide-3', 144]],

}
export class GetoDragon extends Fireball {
    touche = true
    image = document.querySelector('img[alt="geto"]')
    animationTimer = 0;
    direction = this.fighter.direction
    state = FireballState.Lancer;
    constructor(args, entitylist) {
        super(args, entitylist)
        
        this.direction = this.fighter.opponent.direction

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
      
        if (this.state == FireballState.COLLIDED) {

        } else {
            this.velocity = 300;
        }
        if (this.state == FireballState.Lancer) {

        } else {

           this.position.x += this.velocity * this.fighter.direction * time.secondpassed;
            const isOutOfCameraView =
                this.position.x - camera.position.x > 384 + 56 ||
                this.position.x - camera.position.x < -56;

            if (isOutOfCameraView) {
               // this.state = FireballState.COLLIDED; // Set state to COLLIDED (optional visual feedback)
                this.entitylist.removeEntities(this);
                return;
            }
            const hascollided = this.hasCollided()
            if (!hascollided) return;
           
            this.velocity = 0;
            this.animationFrame = 0;
            this.animationTimer = time.previous + animations[this.state][this.animationFrame][1];
            if (hascollided != FireballCollidedState.OPPONENT) return;
            if (this.touche) {

                this.touche = false
                
                this.fighter.opponent.handleAttackHit(FighterAttackStrenght.Purple, FighterHurtBox.HEAD)
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
        this.direction = this.fighter.opponent.direction
        this.updateMovement(time, camera);
        this.updateAnimation(time);
    }
    draw(context, camera) {
     
        this.direction = this.fighter.opponent.direction

        if (this.animationFrame >= 1 && this.state == FireballState.Lancer) {

            this.direction = this.fighter.opponent.direction

        }
        if (this.animationFrame >= 5 && this.state == FireballState.Lancer) {

            this.direction = this.fighter.direction

        }
        if(this.animationFrame >= 11 && this.state == FireballState.Lancer){
           
            this.direction = this.fighter.opponent.direction
          
      }
        
        const [frameKey] = animations[this.state][this.animationFrame];
        const [
            [
                [x, y, width, height], [originX, originY]
            ], hitbox, hurtbox
        ] = frames.get(frameKey);
        context.scale(this.direction, 1)
            context.drawImage(
                this.image,
                x,
                y,
                width, height,
                Math.floor((this.position.x - camera.position.x) * this.direction - originX),
                Math.floor(this.position.y - camera.position.y - originY),
                width * 2, height * 2
            );
            context.setTransform(1, 0, 0, 1, 0, 0)
            context.setTransform(1, 0, 0, 1, 0, 0);
    
            // Dessiner la hitbox
            const [hitX, hitY, hitWidth, hitHeight] = hitbox;
            const actualHitBox = getActualBoxDimensions(this.position, this.direction, {
                x: hitX,
                y: hitY,
                width: hitWidth,
                height: hitHeight,
            });
        
            context.fillStyle = "rgba(255, 0, 0, 0.5)"; // Rouge semi-transparent
            context.fillRect(
                Math.floor(actualHitBox.x - camera.position.x),
                Math.floor(actualHitBox.y - camera.position.y),
                actualHitBox.width,
                actualHitBox.height
            );
        
            // Dessiner la hurtbox
            const [hurtX, hurtY, hurtWidth, hurtHeight] = hurtbox;
            const actualHurtBox = getActualBoxDimensions(this.position, this.direction, {
                x: hurtX,
                y: hurtY,
                width: hurtWidth,
                height: hurtHeight,
            });
        
            context.fillStyle = "rgba(0, 0, 255, 0.5)"; // Bleu semi-transparent
            context.fillRect(
                Math.floor(actualHurtBox.x - camera.position.x),
                Math.floor(actualHurtBox.y - camera.position.y),
                actualHurtBox.width,
                actualHurtBox.height
            );
        
    }
}


