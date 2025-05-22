import { FighterAttackStrenght, FighterHurtBox } from "../constants/fighter.js";
import { FireballCollidedState, FireballState, FireballVellocity } from "../constants/fireball.js";
import { FRAME_TIME } from "../constants/game.js";
import { boxOverlap, getActualBoxDimensions } from "../utils/collisions.js";
import { Fireball } from "./fireball.js";

const frames = new Map([
    ['hadoken-fireball-1', [[[14403, 5998, 88, 36], [60, -40]], [0,0,0,0], [-28, -20, 56, 38]]],
    ['hadoken-fireball-2', [[[15076, 5987, 88, 55], [60, -15]], [0,0,0,0], [-28, -20, 56, 38]]],
    ['hadoken-fireball-3', [[[15748, 5981, 88, 68], [60, 0]], [0,0,0,0], [-28, -20, 56, 38]]],
    ['hadoken-fireball-4', [[[16420, 5975, 87, 81], [60, 15]], [0,0,0,0], [-28, -20, 56, 38]]],
    ['hadoken-fireball-5', [[[17092, 5976, 87, 80], [60, 15]], [0,0,0,0], [-28, -20, 56, 38]]],
    ['hadoken-fireball-6', [[[17759, 5976, 100, 80], [60, 15]], [0,0,0,0], [-28, -20, 70, 38]]],
    ['hadoken-fireball-7', [[[18429, 5975, 100, 82], [60, 15]], [-15, -13, 80, 50], [-15, -13, 80, 38]]],

    ['hadoken-collide-1', [[[271, 1311, 19, 22], [13, 10]], [0, 0, 0, 0]]],
    ['hadoken-collide-2', [[[291, 1309, 18, 25], [9, 13]], [0, 0, 0, 0]]],
    ['hadoken-collide-3', [[[311, 1307, 17, 30], [21, 14]], [0, 0, 0, 0]]],
]);

const animations = {
    [FireballState.ACTIVE]: [['hadoken-fireball-1', 100],['hadoken-fireball-1', 100], ['hadoken-fireball-2', 100], ['hadoken-fireball-3', 100], ['hadoken-fireball-4', 100], ['hadoken-fireball-5', 100], ['hadoken-fireball-6', 100], ['hadoken-fireball-7', 200], ['hadoken-fireball-3', -2]],
    [FireballState.COLLIDED]: [['hadoken-collide-1', 144], ['hadoken-collide-2', 80], ['hadoken-collide-3', 144]],

}

export class GetoSpirite1 extends Fireball {
    image = document.querySelector('img[alt="geto"]')
    animationTimer = 0;
    state = FireballState.ACTIVE;
    touche = true
    touched = false;
    constructor(args,entitylist) {
       super(args,entitylist)
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
    hasCollideWithOtherFireball(hitbox){
      
        const ostherFireball = this.entitylist.entities.filter((fireball) => fireball instanceof Fireball && fireball != this); 
        if(ostherFireball == 0)return;
        for(const fireball of ostherFireball){
            const [x, y, width, height] = frames.get(animations[fireball.state][fireball.animationFrame][0])[1];
            const otheractualhitBox = getActualBoxDimensions(fireball.position, fireball.direction, { x, y, width, height })
            if(boxOverlap(hitbox,otheractualhitBox)) return FireballCollidedState.FIREBALL;
        }
    }
    hasCollided(){
        const [x, y, width, height] = frames.get(animations[this.state][this.animationFrame][0])[1];
        const actualhitBox = getActualBoxDimensions(this.position, this.direction, { x, y, width, height })
        return this.hasCollideWithOpponent(actualhitBox) ?? this.hasCollideWithOtherFireball(actualhitBox);
    }
    updateMovement(time, camera) {
        console.log(animations[this.state][this.animationFrame][1]);
        if(this.state == FireballState.COLLIDED){

        }else{
            this.velocity = 0;
        }
        this.position.x += this.velocity * this.direction * time.secondpassed;
        const isOutOfCameraView =
            this.position.x - camera.position.x > 384 + 56 ||
            this.position.x - camera.position.x < -56;

        if (isOutOfCameraView) {
            this.entitylist.removeEntities(this);
            this.state = FireballState.COLLIDED
            return;
        }
        if (animations[this.state][this.animationFrame][1] == -2){
            this.entitylist.removeEntities(this);
            this.state = FireballState.COLLIDED
            return;
        }
        const hascollided = this.hasCollided()
        if(!hascollided)return;
       
        
        
        if(hascollided != FireballCollidedState.OPPONENT)return;
        if (!this.touched) {
            this.touched = true;
            this.fighter.opponent.handleAttackHit(FighterAttackStrenght.MEDIUM, FighterHurtBox.HEAD);
        }
       
    }

    updateAnimation(time) {
        if (time.previous < this.animationTimer) return;

        this.animationFrame += 1;
        const animationFrames = animations[this.state];
        if (this.animationFrame >= animations[this.state].length) {
            this.animationFrame = 0;
          
            if(this.state == FireballState.COLLIDED){this.entitylist.removeEntities(this)
               
            };
        
        }

        this.animationTimer = time.previous + animations[this.state][this.animationFrame][1];
    }

    update(time, context, camera) {

        this.updateMovement(time, camera);
        this.updateAnimation(time);
    }
    draw(context, camera) {
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
            width * 1.2, height * 1.2
        );
        
        context.setTransform(1, 0, 0, 1, 0, 0)

    }
}