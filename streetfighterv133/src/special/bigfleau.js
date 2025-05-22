import { FighterAttackStrenght, FighterHurtBox, FighterState } from "../constants/fighter.js";
import { FireballCollidedState, FireballState } from "../constants/fireball.js";
import { FRAME_TIME } from "../constants/game.js";
import { boxOverlap, getActualBoxDimensions } from "../utils/collisions.js";
import { obj } from "./obj.js";

const frames = new Map([
   
    ['create-1', [[[2842, 2412, 350, 50], [-67,-60]], [0,0,0,0], [100,100,100,100]]],
    ['create-2', [[[3522, 2397, 345, 70], [-67, -46]], [0,0,0,0], [100,100,100,100]]],
    ['create-3', [[[5535, 2380, 347, 105], [-67, -33]], [0,0,0,0], [100,100,100,100]]],
    ['create-4', [[[6212, 2377, 343, 108], [-67, -25]], [0,0,0,0], [100,100,100,100]]],
    ['create-5', [[[6892, 2362, 335, 148], [-67, -10]], [0,0,0,0], [100,100,100,100]]],
    ['create-6', [[[7555, 2352, 345, 170], [-67, 0]], [0,0,0,0], [100,100,100,100]]],
    ['create-7', [[[8267, 2362, 283, 150], [-67, -5]], [0,0,0,0], [100,100,100,100]]],
    ['create-8', [[[8942, 2330, 265, 205], [-120, 20]], [140, 30, 100, 50], [100,100,100,100]]],
    ['create-9', [[[9610, 2347, 260, 168], [-120, 5]], [140, 30, 100, 50], [100,100,100,100]]],
    ['create-10', [[[10282, 2352, 268, 165], [-120, -5]], [140, 30, 100, 50], [100,100,100,100]]],


    ['hadoken-fireball-1', [[[10331, 3177, 165, 43], [20, 40]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['hadoken-fireball-2', [[[4954, 3177, 171, 40], [50, 30]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['hadoken-fireball-3', [[[4282, 3175, 172, 46], [50, 30]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['hadoken-fireball-4', [[[3609, 3181, 170, 38], [50, 30]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],




    ['hadoken-collide-1', [[[271, 1311, 19, 22], [13, 10]], [0, 0, 0, 0]]],
    ['hadoken-collide-2', [[[291, 1309, 18, 25], [9, 13]], [0, 0, 0, 0]]],
    ['hadoken-collide-3', [[[311, 1307, 17, 30], [21, 14]], [0, 0, 0, 0]]],
])

const animations = {
    [FireballState.Lancer]: [['create-1', 1], ['create-1', 100], ['create-2', 150], ['create-3', 150], ['create-4', 100], ['create-5', 200], ['create-6', 200], ['create-7', 200], ['create-8', 200], ['create-9', 200], ['create-10', 200], ['create-3', -2]],
    [FireballState.ACTIVE]: [['hadoken-fireball-1', 100],['hadoken-fireball-1', 100], ['hadoken-fireball-2', 100], ['hadoken-fireball-3', 100], ['hadoken-fireball-4', 100],['hadoken-fireball-1', 100],['hadoken-fireball-1', 100], ['hadoken-fireball-2', 100], ['hadoken-fireball-3', 100],],
    [FireballState.COLLIDED]: [['hadoken-collide-1', 144], ['hadoken-collide-2', 80], ['hadoken-collide-3', 144]],

}

export class BigFleau extends obj {
    image = document.querySelector('img[alt="geto"]');
    image2 = document.querySelector('img[alt="geto"]');
    animationTimer = 0;
    animationFrame = 0;
    animationFrame2 = 0;
    animationTimer2 = 0;
    state = FireballState.Lancer;
   
    touched = false;
    timerId = null;
    attack = false;
    die = false

    constructor(args, entitylist) {
        super(args, entitylist);
       
    }

    
    hasCollideWithOpponent(hitbox) {
        for (const [, hurtbox] of Object.entries(this.fighter.opponent.boxe.hurt)) {
            const actualOpponentHurBox = getActualBoxDimensions(
                this.fighter.opponent.position,
                this.fighter.opponent.direction,
                {
                    x: hurtbox[0],
                    y: hurtbox[1],
                    width: hurtbox[2],
                    height: hurtbox[3],
                }
            );

            if (boxOverlap(hitbox, actualOpponentHurBox)) {
                return FireballCollidedState.OPPONENT;
            }
        }
        return null;
    }

    hasCollided() {
        const [hitX, hitY, hitWidth, hitHeight] = frames.get(animations[this.state][this.animationFrame][0])[1];
        const actualHitBox = getActualBoxDimensions(this.position, this.direction, {
            x: hitX,
            y: hitY,
            width: hitWidth,
            height: hitHeight,
        });

        return this.hasCollideWithOpponent(actualHitBox);
    }

    updateMovement(time, camera) {
        if (this.fighter.direction === -1) {
            this.position.x = this.fighter.position.x + 50;
        } else {
            this.position.x = this.fighter.position.x - 50;
        }
        this.position.y = this.fighter.position.y - 60;

        const hasCollided = this.hasCollided();
        if (!hasCollided) return;

        if (!this.touched) {
            this.touched = true;
            this.fighter.opponent.handleAttackHit(FighterAttackStrenght.MEDIUM, FighterHurtBox.HEAD);
              
        }
    }

    updateAnimation(time) {
        if (time.previous < this.animationTimer) return;
       
               this.animationFrame += 1;
              
               if (this.animationFrame >= animations[this.state].length) {
                   this.animationFrame = 0;
                   this.entitylist.removeEntities(this);
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
        // Récupération des informations du cadre actuel
        let scaleFactor = 1.4;
        if (this.state === FireballState.Lancer) {
            scaleFactor = 0.7;
        }
    
        const [frameKey] = animations[this.state][this.animationFrame];
        const [
            [
                [x, y, width, height], [originX, originY]
            ], hitbox, hurtbox
        ] = frames.get(frameKey);
    
        // Dessin du sprite principal
        context.scale(this.fighter.direction, 1);
        context.drawImage(
            this.image,
            x,
            y,
            width, height,
            Math.floor((this.position.x - camera.position.x) * this.fighter.direction - originX),
            Math.floor(this.position.y - camera.position.y - originY),
            width * 0.5, height * 0.5
        );
    
        // Réinitialiser la transformation du contexte
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





// Réinitialiser la transformation du contexte