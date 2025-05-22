import { FighterAttackStrenght, FighterHurtBox, FighterState } from "../constants/fighter.js";
import { FireballCollidedState, FireballState } from "../constants/fireball.js";
import { FRAME_TIME } from "../constants/game.js";
import { boxOverlap, getActualBoxDimensions } from "../utils/collisions.js";
import { obj } from "./obj.js";

const frames = new Map([
    ['start-1', [[[0, 5097, 184, 155], [80, 30]], [-15, -13, 30, 24], [0, 0, 0, 0]]],
    ['start-2', [[[0, 5677, 178, 94], [80, -10]], [-15, -13, 30, 24], [0, 0, 0, 0]]],
    ['start-3', [[[0, 7872, 184, 215], [80, 70]], [-15, -13, 30, 24], [0, 0, 0, 0]]],
    ['start-4', [[[0, 8090, 174, 216], [40, 30]], [-15, -13, 30, 24], [0, 0, 0, 0]]],

    ['slash-1', [[[0, 0, 341, 123], [-20, 90]], [-15, -13, 30, 24], [0, 0, 0, 0]]],
    ['slash-2', [[[0, 235, 340, 226], [-20, 60]], [-15, -13, 30, 24], [0, 0, 0, 0]]],
    ['slash-3', [[[0, 476, 341, 217], [-20, 50]], [-15, -13, 30, 24], [0, 0, 0, 0]]],
    ['slash-4', [[[0, 707, 340, 222], [-20, 50]], [-15, -13, 30, 24], [0, 0, 0, 0]]],
    ['slash-5', [[[0, 943, 340, 212], [-20, 50]], [-15, -13, 30, 24], [0, 0, 0, 0]]],
    ['slash-6', [[[0, 1177, 341, 207], [-20, 50]], [-15, -13, 30, 24], [0, 0, 0, 0]]],
    ['slash-7', [[[0, 1416, 338, 204], [-20, 50]], [-15, -13, 30, 24], [0, 0, 0, 0]]],
    ['slash-8', [[[0, 1642, 340, 211], [-20, 50]], [-15, -13, 30, 24], [0, 0, 0, 0]]],
    ['slash-9', [[[0, 2131, 340, 185], [-20, 50]], [-15, -13, 30, 24], [0, 0, 0, 0]]],


    ['idle-1', [[[0, 6, 123, 88], [60, 50]], [-15, -13, 30, 24], [0, 0, 0, 0]]],
    ['idle-2', [[[0, 100, 123, 88], [60, 46]], [-15, -13, 30, 24], [0, 0, 0, 0]]],
    ['idle-3', [[[0, 204, 123, 88], [60, 49]], [-15, -13, 30, 24], [0, 0, 0, 0]]],
    ['idle-4', [[[0, 309, 124, 88], [60, 45]], [-15, -13, 30, 24], [0, 0, 0, 0]]],
    ['attack-1', [[[0, 2431, 132, 111], [70, 70]], [70, -20, 80, 60], [70, -20, 90, 60]]],
    ['attack-2', [[[0, 2548, 150, 86], [60, 50]], [70, -20, 80, 60], [70, -20, 90, 60]]],
    ['attack-3', [[[0, 2654, 104, 88], [80, 50]], [70, -20, 80, 60], [70, -20, 90, 60]]],
    ['attack-4', [[[0, 309, 124, 85], [60, 50]], [70, -20, 80, 60], [70, -20, 90, 60]]],

    ['end-1', [[[0, 1201, 97, 86], [60, 50]], [-15, -13, 30, 24], [0, 0, 0, 0]]],
    ['end-2', [[[0, 1291, 96, 86], [60, 50]], [-15, -13, 30, 24], [0, 0, 0, 0]]],
    ['end-3', [[[0, 1384, 97, 83], [60, 50]], [-15, -13, 30, 24], [0, 0, 0, 0]]],
    ['end-4', [[[0, 1474, 96, 85], [60, 50]], [-15, -13, 30, 24], [0, 0, 0, 0]]],
    ['end-5', [[[0, 1566, 99, 84], [60, 50]], [-15, -13, 30, 24], [0, 0, 0, 0]]],
    ['end-6', [[[0, 1656, 96, 87], [60, 50]], [-15, -13, 30, 24], [0, 0, 0, 0]]],
    ['end-7', [[[0, 1747, 99, 88], [60, 50]], [-15, -13, 30, 24], [0, 0, 0, 0]]],

    ['ult-1', [[[3, 907, 103, 86], [97, 50]], [-15, -13, 30, 24], [0, 0, 0, 0]]],
    ['ult-2', [[[3, 907, 103, 86], [98, 51]], [-15, -13, 30, 24], [0, 0, 0, 0]]],



    ['ult-3', [[[0, 4289, 118, 86], [70, 42]], [-15, -13, 30, 24], [0, 0, 0, 0]]],
    ['ult-4', [[[0, 4394, 103, 85], [70, 50]], [-15, -13, 30, 24], [0, 0, 0, 0]]],
    ['ult-5', [[[0, 4504, 126, 84], [70, 47]], [-15, -13, 30, 24], [0, 0, 0, 0]]],
    ['ult-6', [[[0, 4612, 130, 95], [98, 55]], [-15, -13, 30, 24], [0, 0, 0, 0]]],
    ['ult-7', [[[0, 3978, 120, 83], [70, 50]], [-15, -13, 30, 24], [0, 0, 0, 0]]],
   
]);

const animations = {
    [FireballState.Lancer]: [['start-4', 200], ['start-3', 200], ['start-2', 200], ['start-1', 200], ['start-1', 100], ['start-4', 100]],
    [FireballState.Idle]: [['idle-1', 100], ['idle-2', 100], ['idle-3', 100], ['idle-4', 100]],
    [FireballState.Attack1]: [['attack-1', 100], ['attack-1', 100], ['attack-2', 100], ['attack-3', 100], ['attack-4', 100], ['attack-4', 100]],
    [FireballState.COLLIDED]: [['end-1', 100], ['end-1', 100], ['end-2', 100], ['end-3', 100], ['end-4', 100], ['end-5', 100], ['end-6', 100], ['end-7', 100]],
    [FireballState.Slash1]: [['slash-1', 100], ['slash-2', 100], ['slash-3', 100], ['slash-4', 100], ['slash-5', 100], ['slash-6', 100], ['slash-7', 100], ['slash-8', 100], ['slash-9', 100], ['slash-9', 100]],
    [FireballState.UltStart]: [['ult-1', 100],['ult-2', 100],['ult-1', 300],['ult-2', 300],['ult-1', 300],['ult-2', 300],['ult-1', 300],['ult-2', 100]],
    [FireballState.Ult]: [['ult-3', 100],['ult-3', 150], ['ult-4', 500], ['ult-5', 150], ['ult-6', 500], ['ult-7', 10000],['ult-7', 50], ['ult-7', 1]],
};

export class Rika extends obj {
    image = document.querySelector('img[alt="rika"]');
    image2 = document.querySelector('img[alt="rikaS"]');
    animationTimer = 0;
    animationFrame = 0;
    animationFrame2 = 0;
    animationTimer2 = 0;
    state = FireballState.Lancer;
    slashState = FireballState.Slash1
    touched = false;
    timerId = null;
    attack = false;
    die = false

    constructor(args, entitylist) {
        super(args, entitylist);
        this.startTimer(); // Démarrer le timer à la création de l'objet
    }

    startTimer() {
        // Si un timer est déjà en cours, le réinitialiser
        if (this.timerId) {
            clearTimeout(this.timerId);
        }

        // Démarrer un nouveau timer
        this.timerId = setTimeout(() => {
            this.state = FireballState.COLLIDED
            this.timerId = null; // Réinitialiser l'ID une fois terminé
        }, 1000000); // 10 secondes
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
            this.fighter.opponent.handleAttackHit(FighterAttackStrenght.LIGHT, FighterHurtBox.HEAD);
        }
    }

    updateAnimation(time) {
        if(this.fighter.rika == false && this.die == false){
            this.state = FireballState.COLLIDED
            this.die = true
            this.entitylist.removeEntities(this)
            this.animationFrame = 0;
        }
        const animationFrames = animations[this.state];
      
        if (this.state === FireballState.Lancer && this.animationFrame === animationFrames.length - 1) {
            this.state = FireballState.Idle;
            this.animationFrame = 0;
            this.animationTimer = time.previous;
            return;
        }
        if(this.fighter.ult && this.state != FireballState.UltStart){
            this.state = FireballState.UltStart
            this.animationFrame = 0;
            this.animationTimer = time.previous;
        }


        if (this.state === FireballState.Idle && this.fighter.attack) {
            this.state = FireballState.Attack1;

            this.animationFrame = 0;
            this.animationTimer = time.previous;
            this.touched = false;
            return;
        }
        if (this.state == FireballState.Attack1) {
            if (this.animationFrame == 2) {
                this.attack = true;
            }
        }

        if (time.previous >= this.animationTimer) {
            this.animationFrame++;
            if (this.animationFrame >= animationFrames.length) {
                this.animationFrame = 0;
                if (this.state == FireballState.COLLIDED) {
                    this.entitylist.removeEntities(this)

                };
                if (this.state === FireballState.Attack1) {
                    this.state = FireballState.Idle;
                }
                if (this.state === FireballState.UltStart) {
                    this.state = FireballState.Ult;
                }
            }
            this.animationTimer = time.previous + animationFrames[this.animationFrame][1];
        }
        let animationFrames2 = animations[this.slashState];

        if (time.previous >= this.animationTimer2) {
            this.animationFrame2++;
            if (this.animationFrame2 >= animationFrames.length) {
                this.animationFrame2 = 0;
                this.attack = false;
            }
            this.animationTimer2 = time.previous + animationFrames2[this.animationFrame2][1];
        }

    }

    update(time, context, camera) {
        this.updateMovement(time, camera);
        this.updateAnimation(time);
    }

  /*  draw(context, camera) {
        const [frameKey] = animations[this.state][this.animationFrame];
        const [
            [[x, y, width, height], [originX, originY]],
        ] = frames.get(frameKey);

        let scaleFactor = 1.4;
        if (this.state === FireballState.Lancer) {

            scaleFactor = 0.7;
        }
       

        context.scale(this.fighter.direction, 1);
        context.drawImage(
            this.image,
            x,
            y,
            width,
            height,
            Math.floor((this.position.x - camera.position.x) * this.fighter.direction - originX),
            Math.floor(this.position.y - camera.position.y - originY),
            width * scaleFactor,
            height * scaleFactor,
        );
        

      

        
        context.setTransform(1, 0, 0, 1, 0, 0);
    }*/
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
            width * scaleFactor, height *scaleFactor
        );
    
        // Dessiner la hitbox en vert
        const [hitX, hitY, hitWidth, hitHeight] = hitbox;
        const actualHitBox = getActualBoxDimensions(this.position, this.fighter.direction, { x: hitX, y: hitY, width: hitWidth, height: hitHeight });
        context.beginPath();
        context.strokeStyle = '#55FF55AA'; // Couleur verte semi-transparente
        context.fillStyle = '#55FF5544';  // Remplissage vert clair
        context.fillRect(
            Math.floor((actualHitBox.x - camera.position.x)),
            Math.floor((actualHitBox.y - camera.position.y)),
            actualHitBox.width,
            actualHitBox.height
        );
        context.stroke();
    
        // Dessiner la hurtbox en rouge
        const [hurtX, hurtY, hurtWidth, hurtHeight] = hurtbox;
        const actualHurtBox = getActualBoxDimensions(this.position, this.fighter.direction, { x: hurtX, y: hurtY, width: hurtWidth, height: hurtHeight });
        context.beginPath();
        context.strokeStyle = '#FF5555AA'; // Couleur rouge semi-transparente
        context.fillStyle = '#FF555544';  // Remplissage rouge clair
        context.fillRect(
            Math.floor((actualHurtBox.x - camera.position.x)),
            Math.floor((actualHurtBox.y - camera.position.y)),
            actualHurtBox.width,
            actualHurtBox.height
        );
        context.stroke();
        if (this.attack) {
            const [frameKey] = animations[this.slashState][this.animationFrame2];
            const [
                [[x, y, width, height], [originX, originY]],
            ] = frames.get(frameKey);
            context.scale(this.fighter.direction, 1);
            context.drawImage(
                this.image2,
                x,
                y,
                width,
                height,
                Math.floor((this.position.x - camera.position.x) * this.fighter.direction - originX),
                Math.floor(this.position.y - camera.position.y - originY),
                width * 0.5,
                height * 0.5,
            );
        }
        // Réinitialiser la transformation du contexte
        context.setTransform(1, 0, 0, 1, 0, 0);
    }
    
}





// Réinitialiser la transformation du contexte