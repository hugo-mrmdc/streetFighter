import { FighterAttackStrenght, FighterHurtBox } from "../constants/fighter.js";
import { FireballCollidedState, FireballState, FireballVellocity } from "../constants/fireball.js";
import { FRAME_TIME } from "../constants/game.js";
import { boxOverlap, getActualBoxDimensions } from "../utils/collisions.js";
import { Fireball } from "./fireball.js";

const frames = new Map([
    ['start-1', [[[0, 2945, 320, 147], [70, 40]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['start-2', [[[0, 5687, 320, 156], [70, 45]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['start-3', [[[0, 8428, 320, 160], [70, 50]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['start-4', [[[0, 11185, 320, 165], [70, 50]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['start-5', [[[0, 12175, 320, 165], [70, 55]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['start-6', [[[0, 12428, 320, 162], [70, 55]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['start-7', [[[0, 12672, 320, 175], [70, 55]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['start-8', [[[0, 12922, 320, 178], [70, 55]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['start-9', [[[0, 13177, 320, 161], [70, 55]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['start-10', [[[0, 3182, 320, 160], [70, 55]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['start-11', [[[0, 3430, 320, 170], [70, 55]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['start-12', [[[0, 3677, 320, 171], [70, 55]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['start-13', [[[0, 3923, 320, 180], [70, 55]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['start-14', [[[0, 4173, 320, 174], [70, 55]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['start-15', [[[0, 4423, 320, 177], [70, 55]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['start-16', [[[0, 4667, 320, 185], [70, 55]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['start-17', [[[0, 4923, 320, 182], [70, 55]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['start-18', [[[0, 5167, 320, 188], [70, 55]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['start-19', [[[0, 5420, 320, 185], [70, 55]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['start-20', [[[0, 5923, 320, 187], [70, 55]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['start-21', [[[0, 6170, 320, 185], [70, 55]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['start-22', [[[0, 6422, 320, 186], [70, 55]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['start-23', [[[0, 6672, 320, 185], [70, 55]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['start-24', [[[0, 6923, 320, 180], [70, 55]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['start-25', [[[0, 7167, 320, 186], [70, 55]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['start-26', [[[0, 7420, 320, 187], [70, 55]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['start-27', [[[0, 7672, 320, 180], [70, 55]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['start-28', [[[0, 7905, 320, 203], [70, 60]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['start-29', [[[0, 8148, 320, 215], [70, 60]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['start-30', [[[0, 8655, 320, 205], [70, 60]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],

    ['boule-1', [[[0, 8, 104, 97], [70, 30]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['boule-2', [[[0, 109, 130, 122], [70, 35]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['boule-3', [[[0, 237, 162, 159], [70, 43]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    ['boule-4', [[[0, 0, 0, 0], [-80, 50]], [-15, -13, 30, 24], [-28, -20, 56, 38]]],
    
    ['mid-1', [[[0, 18442, 320, 130], [170, 46]], [0,0,0,0], [-28, -20, 56, 38]]],
    ['mid-2', [[[0, 21195, 320, 122], [170, 45]], [0,0,0,0], [-28, -20, 56, 38]]],
    ['mid-3', [[[0, 22192, 320, 143], [170, 47]], [0,0,0,0], [-28, -20, 56, 38]]],
    ['mid-4', [[[0, 22427, 320, 148], [170, 50]], [-15, -30, 1000, 100], [-28, -20, 56, 38]]],
    ['mid-5', [[[0, 22682, 320, 158], [170, 54]], [-15, -30, 1000, 100], [-28, -20, 56, 38]]],
    ['mid-6', [[[0, 22927, 320, 163], [170, 54]], [-15, -30, 1000, 100], [-28, -20, 56, 38]]],
    ['mid-7', [[[0, 23165, 320, 190], [170, 54]], [-15, -30, 1000, 100], [-28, -20, 56, 38]]],
    ['mid-8', [[[0, 13423, 320, 182], [170, 54]], [-15, -30, 1000, 100], [-28, -20, 56, 38]]],
    ['mid-9', [[[0, 13662, 320, 201], [170, 58]], [-15, -30, 1000, 100], [-28, -20, 56, 38]]],
    ['mid-10', [[[0, 13902, 320, 223], [170, 65]], [-15, -30, 1000, 100], [-28, -20, 56, 38]]],
    ['mid-11', [[[0, 14142, 320, 235], [170, 66]], [-15, -30, 1000, 100], [-28, -20, 56, 38]]],
    ['mid-12', [[[0, 14390, 320, 238], [170, 64]], [-15, -30, 1000, 100], [-28, -20, 56, 38]]],
    ['mid-13', [[[0, 14638, 320, 242], [170, 64]], [-15, -30, 1000, 100], [-28, -20, 56, 38]]],
    ['mid-14', [[[0, 14887, 320, 248], [170, 64]], [-15, -30, 1000, 100], [-28, -20, 56, 38]]],
    ['mid-15', [[[0, 15155, 320, 210], [170, 64]], [-15, -30, 1000, 100], [-28, -20, 56, 38]]],
    ['mid-16', [[[0, 15398, 320, 235], [170, 64]], [-15, -30, 1000, 100], [-28, -20, 56, 38]]],
    ['mid-17', [[[0, 15892, 320, 243], [170, 64]], [-15, -30, 1000, 100], [-28, -20, 56, 38]]],
    ['mid-18', [[[0, 16152, 320, 226], [170, 64]], [-15, -30, 1000, 100], [-28, -20, 56, 38]]],
    ['mid-19', [[[0, 16397, 320, 231], [170, 64]], [-15, -30, 1000, 100], [-28, -20, 56, 38]]],
    ['mid-20', [[[0, 16643, 320, 240], [170, 64]], [-15, -30, 1000, 100], [-28, -20, 56, 38]]],
    ['mid-21', [[[0, 16902, 320, 223], [170, 64]], [-15, -30, 1000, 100], [-28, -20, 56, 38]]],
    ['mid-22', [[[0, 17150, 320, 228], [170, 64]], [-15, -30, 1000, 100], [-28, -20, 56, 38]]],
    ['mid-23', [[[0, 17402, 320, 220], [170, 64]], [-15, -30, 1000, 100], [-28, -20, 56, 38]]],
    ['mid-24', [[[0, 17653, 320, 217], [170, 64]], [-15, -30, 1000, 100], [-28, -20, 56, 38]]],
   


    ['hadoken-collide-1', [[[271, 1311, 19, 22], [13, 10]], [0, 0, 0, 0]]],
    ['hadoken-collide-2', [[[291, 1309, 18, 25], [9, 13]], [0, 0, 0, 0]]],
    ['hadoken-collide-3', [[[311, 1307, 17, 30], [21, 14]], [0, 0, 0, 0]]],
])

const animations = {
    [FireballState.UltStart]: [
        ['boule-1', 50],
        ['boule-4', 5000],
        ['boule-1', 200],
        ['boule-2', 200],
        ['boule-3', 200],
        ['boule-4', 100],
        ['boule-4', 50],
        ['boule-4', 10],
    ],
    [FireballState.ACTIVE]: [
        ['start-1', 50],
        ['start-1', 50],
        ['start-2', 50],
        ['start-3', 50],
        ['start-4', 50],
        ['start-5', 50],
        ['start-6', 50],
        ['start-7', 50],
        ['start-9', 50],
        ['start-10', 50],
        ['start-11', 50],
        ['start-12', 50],
        ['start-13', 50],
        ['start-14', 50],
        ['start-15', 50],
        ['start-16', 50],
        ['start-17', 50],
        ['start-19', 50],
        ['start-16', 50],
        ['start-17', 50],
        ['start-19', 50],
        ['start-20', 50],
        ['start-21', 50],
        ['start-22', 50],
        ['start-23', 50],
        ['start-24', 50],
        ['start-25', 50],
        ['start-26', 50],
        ['start-27', 50],
        ['start-28', 50],
        ['start-29', 50],
        ['start-30', 50]
    ],
    [FireballState.Ult]: [
        ['mid-1', 10000],
        ['boule-4', 1000],
        ['mid-1', 50],
        ['mid-2', 50],
        ['mid-3', 50],
        ['mid-4', 50],
        ['mid-5', 50],
        ['mid-6', 50],
        ['mid-7', 50],
        ['mid-8', 50],
        ['mid-9', 50],
        ['mid-10', 50],
        ['mid-11', 50],
        ['mid-12', 50],
        ['mid-13', 50],
        ['mid-14', 50],
        ['mid-15', 50],
        ['mid-16', 50],
        ['mid-17', 50],
        ['mid-18', 50],
        ['mid-15', 50],
        ['mid-16', 50],
        ['mid-21', 50],
        
        ['mid-22', 50],
        ['mid-23', 50],
        ['mid-24', 50],
        ['mid-22', 50],
        ['mid-23', 50],
        ['mid-24', 50],
        ['mid-22', 50],
        ['mid-23', 50],
        ['mid-24', 50],
        ['mid-22', 50],
        ['mid-23', 50],
        ['mid-24', 50],
        ['mid-22', 50],
        ['mid-23', 50],
        ['mid-24', 50],
        ['mid-22', 50],
        ['mid-23', 50],
        ['mid-24', 50],
       /* ['mid-25', 59],
        ['mid-26', 50],
        ['mid-27', 50],
        ['mid-28', 50],
        ['mid-29', 50],
        ['mid-10', 50],*/
    ],

    [FireballState.COLLIDED]: [['hadoken-collide-1', 144], ['hadoken-collide-2', 80], ['hadoken-collide-3', 144]],

}

export class TrueLove extends Fireball {
    image = document.querySelector('img[alt="rikaL"]')
    animationTimer = 0;
    animationFrame2 = 0;
    animationTimer2 = 0;
    startMid = false
    touched = false
    touched2 = false
    touched3 = false
    touche4 = false
    touche5 = false
    state = FireballState.UltStart;
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
      
       
        if (this.state == FireballState.COLLIDED) {

        } else {
            this.velocity = 0;
        }
        this.position.x += this.velocity * this.direction * time.secondpassed;
        const isOutOfCameraView =
            this.position.x - camera.position.x > 384 + 56 ||
            this.position.x - camera.position.x < -56;

        if (isOutOfCameraView) {
          
            this.state = FireballState.COLLIDED
            return;
        }
        if (animations[this.state][this.animationFrame][1] == -2) {
            
            this.state = FireballState.COLLIDED
            return;
        }
        const hasCollided = this.hasCollided();
        if (!hasCollided) {
            this.touched = false; // Réinitialise uniquement si aucune collision n'est détectée
            return;
        }
    
        if (hasCollided !== FireballCollidedState.OPPONENT) return;
        if(this.animationFrame == 5){
            this.touched2 = false
        }
     
        // Contrôle de l'exécution unique sur une frame
        if (!this.touched ) {
            this.touched = true; // Empêche les appels multiples
            this.touched4 = true
            this.touched2 = true
            this.touched3 = true
            this.fighter.opponent.handleAttackHit(FighterAttackStrenght.LIGHT, FighterHurtBox.HEAD);
            console.log("Collision détectée et dégâts infligés !");
        }
        if (!this.touched2 ) {
            this.touched2 = true
            this.fighter.opponent.handleAttackHit(FighterAttackStrenght.LIGHT, FighterHurtBox.HEAD);
            console.log("Collision détectée et dégâts infligés !");
        }
       
        

    }

    updateAnimation(time) {
        // Log pour vérifier les comportements
        
        if(this.state == FireballState.Ult){
          
            
        }
        // Gestion de l'état ACTIF
        if (this.state === FireballState.ACTIVE) {
            if (this.animationFrame === 7) {
                this.startMid = true;
            }
        }
    
        // Gestion de l'animation principale
        if (time.previous >= this.animationTimer) {
            this.animationFrame += 1;
    
            const animationFrames = animations[this.state];
    
            // Réinitialisation des cadres si on atteint la fin de l'animation
            if (this.animationFrame >= animationFrames.length) {
                this.animationFrame = 0;
                if(this.state === FireballState.Ult){
                     this.entitylist.removeEntities(this);
                     this.fighter.rika = false
                     this.fighter.cutscene = false
                }
                if (this.state === FireballState.ACTIVE) {
                    this.state = FireballState.Ult;
                
                }
                // Transition des états
                if (this.state === FireballState.UltStart) {
                    this.state = FireballState.ACTIVE;
                   
                }
                
            }
    
            // Mise à jour du prochain délai
            const nextFrameDuration = animationFrames[this.animationFrame][1];
            this.animationTimer = time.previous + nextFrameDuration;
    
            // Log les infos actuelles
          
        }
    
        // Gestion de l'animation secondaire
        const animationFrames2 = animations[FireballState.Ult];
        if (time.previous >= this.animationTimer2) {
            this.animationFrame2++;
    
            // Réinitialisation des cadres secondaires
            if (this.animationFrame2 >= animationFrames2.length) {
                this.animationFrame2 = 0;
                this.attack = false;
              
            }
    
            // Mise à jour du prochain délai pour animationTimer2
            const nextFrameDuration2 = animationFrames2[this.animationFrame2][1];
            this.animationTimer2 = time.previous + nextFrameDuration2;
    
        }
    }
    


    update(time, context, camera) {

        this.updateMovement(time, camera);
        this.updateAnimation(time);
    }
    draw(context, camera) {
       
       
        let scalex = 1;
        let scaley = 0.5
        let dist = 0;
        if(this.state == FireballState.UltStart){
            scalex = 0.6
        }
        if(this.state == FireballState.Ult){
            scalex = 3
            dist = 100
        }
        if(this.state == FireballState.ACTIVE){
            let scalex = 1.2;
            
        }
       
       const [frameKey] = animations[this.state][this.animationFrame]
        const [[
            [x, y, width, height], [originX, originY]]] = frames.get(frameKey)
        context.scale(this.direction, 1)
        context.drawImage(
            this.image,
            x,
            y,
            width, height,
            Math.floor((this.position.x - camera.position.x) * this.direction - originX - dist ),
            Math.floor(this.position.y - camera.position.y - originY),
            width * scalex, height * scaley
        );
        
        context.setTransform(1, 0, 0, 1, 0, 0)

    }
}