import { Control } from '../constants/control.js';
import * as control from '../inputHandler.js';

export class SelectScene {
    constructor() {
        this.image = document.querySelector('img[alt="select"]');
        this.image2 = document.querySelector('img[alt="vs"]');
        this.posi1 = { x: 0, y: 0 };
        this.posi2 = { x: 0, y: 0 };
        this.grid = [
            ['ryu', 'honda', 'blanka', 'guil'],
            ['ken', 'chun', 'zan', 'dha'],
        ];
        this.perso = new Map([
            ['ryu', [127, 140]],
            ['honda', [160, 140]],
            ['blanka', [191, 140]],
            ['guil', [223, 140]],
            ['ken', [127, 171]],
            ['chun', [160, 171]],
            ['zan', [191, 171]],
            ['dha', [223, 171]],
        ]);
        this.frames = new Map([
            ['map', [30, 429, 384, 224]],
            ['p1', [148, 96, 33, 37]],
            ['p2', [186, 96, 32, 36]],
            ['ryu', [14, 151, 97, 117]],
            ['honda', [121, 151, 97, 117]],
            ['blanka', [225, 151, 97, 117]],
            ['guil', [330, 151, 97, 117]],
            ['ken', [14, 277, 97, 117]],
            ['chun', [121, 277, 97, 117]],
            ['zan', [225, 277, 97, 117]],
            ['dha', [330, 277, 97, 117]],

            ['usa', [149, 63, 31, 24]],
            ['japan', [109, 63, 31, 24]],
            ['china', [186, 63, 33, 24]],
            ['brazil', [225, 63, 31, 24]],
            ['russie', [265, 63, 31, 24]],
            ['india', [305, 63, 31, 24]],
            ['usa2', [149, 29, 31, 24]],
            ['japan2', [109, 29, 31, 24]],
            ['china2', [186, 29, 33, 24]],
            ['brazil2', [225, 29, 31, 24]],
            ['russie2', [265, 29, 31, 24]],
            ['india2', [305, 29, 31, 24]],
            ['select-p1', [115, 109, 29, 15]],
            ['select-p2', [295, 109, 31, 15]],

            ['vs-back', [1, 1, 384, 224]],
            ['vs', [128, 383, 127, 68]],
            ['vs-ryu', [386, 139, 128, 127]],
            ['vs-honda', [515, 139, 128, 127]],
            ['vs-blanka', [644, 139, 128, 127]],
            ['vs-guil', [773, 139, 128, 127]],
            ['vs-ken', [386, 267, 128, 127]],
            ['vs-chun', [515, 267, 128, 127]],
            ['vs-zan', [644, 267, 128, 127]],
            ['vs-dha', [773, 267, 128, 127]],

            ['vs-nom-ryu', [386, 36, 128, 16]],
            ['vs-nom-honda', [515, 36, 128, 16]],
            ['vs-nom-blanka', [386, 53, 128, 16]],
            ['vs-nom-guil', [515, 53, 128, 16]],
            ['vs-nom-ken', [386, 70, 128, 16]],
            ['vs-nom-chun', [515, 70, 128, 16]],
            ['vs-nom-zan', [386, 87, 128, 16]],
            ['vs-nom-dha', [515, 87, 128, 16]],
        ]);
        this.selectedCharacter1 = 'ryu';
        this.selectedCharacter2 = 'ken';
        this.lastInputTime1 = 0;
        this.lastInputTime2 = 0;
        this.inputCooldown = 200;
        this.inputCooldown2 = 200;
        this.j1Pret = false;
        this.j2Pret = false;
        this.map = 0
        this.transitionStartTime = null; // Temps de début de la transition vers VS
        this.transitionDelay = 2000; // Temps d'attente avant de passer à VS (en millisecondes)
        this.vs = false

    }

    drawFrame(context, frameKey, x, y, direction = 1) {
        const [sourceX, sourceY, sourceWidth, sourceHeight] = this.frames.get(frameKey);
    
        // Sauvegarder le contexte avant de transformer
        context.save();
    
        // Appliquer la mise à l'échelle pour inversion
        context.scale(direction, 1);
    
        // Calculer la position ajustée pour inversion (si direction = -1)
        const adjustedX = direction === -1 ? -(x + sourceWidth) : x;
    
        // Dessiner l'image
        context.drawImage(
            this.image,
            sourceX, sourceY, sourceWidth, sourceHeight,
            adjustedX, y, sourceWidth, sourceHeight
        );
    
        // Restaurer le contexte pour éviter d'affecter les autres dessins
        context.restore();
    }
    drawFrame2(context, frameKey, x, y, direction = 1) {
        const [sourceX, sourceY, sourceWidth, sourceHeight] = this.frames.get(frameKey);
    
        // Sauvegarder le contexte avant de transformer
        context.save();
    
        // Appliquer la mise à l'échelle pour inversion
        context.scale(direction, 1);
    
        // Calculer la position ajustée pour inversion (si direction = -1)
        const adjustedX = direction === -1 ? -(x + sourceWidth) : x;
    
        // Dessiner l'image
        context.drawImage(
            this.image2,
            sourceX, sourceY, sourceWidth, sourceHeight,
            adjustedX, y, sourceWidth, sourceHeight
        );
    
        // Restaurer le contexte pour éviter d'affecter les autres dessins
        context.restore();
    }
    
    drawVs(context) {
        // Dessiner le fond "vs-back"
        this.drawFrame2(context, 'vs-back', 0, 0);
    
        // Dessiner le premier personnage (direction normale)
        this.drawFrame2(context, `vs-${this.selectedCharacter1}`, 16, 17, 1);
    
        // Dessiner le deuxième personnage (inversé horizontalement)
        this.drawFrame2(context, `vs-${this.selectedCharacter2}`, 240, 17, -1);
       
        this.drawFrame2(context, `vs-nom-${this.selectedCharacter1}`, 16, 150, 1);
    
        // Dessiner le deuxième personnage (inversé horizontalement)
        this.drawFrame2(context, `vs-nom-${this.selectedCharacter2}`, 240, 150,1);
        this.vs = true;
    }
    
    

    drawCharacter1(context) {
        if (!this.selectedCharacter1) return;

        const [x, y] = this.perso.get(this.selectedCharacter1); // Coordonnées du personnage
        const [sourceX, sourceY, sourceWidth, sourceHeight] = this.frames.get('p1');

        context.drawImage(
            this.image,
            sourceX, sourceY, sourceWidth, sourceHeight,
            x, y, sourceWidth, sourceHeight
        );
        if (this.j2Pret) {
            this.drawFrame(context, 'select-p1', 30, 90);
        }
        this.drawFrame(context, this.selectedCharacter1, 0, 105);

    }

    drawCharacter2(context) {
        if (!this.selectedCharacter2) return;

        const [x, y] = this.perso.get(this.selectedCharacter2); // Coordonnées du personnage
        const [sourceX, sourceY, sourceWidth, sourceHeight] = this.frames.get('p2');

        context.drawImage(
            this.image,
            sourceX, sourceY, sourceWidth, sourceHeight,
            x, y, sourceWidth, sourceHeight
        );
        if (this.j1Pret) {
            this.drawFrame(context, 'select-p2', 320, 90,);
        }
        this.drawFrame(context, this.selectedCharacter2, 287, 105);
    }
    drawDrapeau(context) {
        // Si la transition est en cours (déterminée par transitionStartTime), affichez les drapeaux spécifiques
        if (this.transitionStartTime) {
            const timeElapsed = Date.now() - this.transitionStartTime;
    
            // Ajoutez une logique pour rendre les drapeaux légèrement différents pendant la transition
            if (timeElapsed < this.transitionDelay) {
                switch (this.map) {
                    case 1:
                        this.drawFrame(context, 'usa2', 280, 30);
                        this.drawFrame(context, 'japan2', 200, 40);
                        this.drawFrame(context, 'brazil2', 280, 90);
                        this.drawFrame(context, 'india', 115, 70);
                        this.drawFrame(context, 'china2', 140, 40);
                        this.drawFrame(context, 'russie2', 90, 40);
                        break;
                    case 2:
                        this.drawFrame(context, 'usa2', 280, 30);
                        this.drawFrame(context, 'japan2', 200, 40);
                        this.drawFrame(context, 'brazil', 280, 90);
                        this.drawFrame(context, 'india2', 115, 70);
                        this.drawFrame(context, 'china2', 140, 40);
                        this.drawFrame(context, 'russie2', 90, 40);
                        break;
                    case 3:
                        this.drawFrame(context, 'usa', 280, 30);
                        this.drawFrame(context, 'japan2', 200, 40);
                        this.drawFrame(context, 'brazil2', 280, 90);
                        this.drawFrame(context, 'india2', 115, 70);
                        this.drawFrame(context, 'china2', 140, 40);
                        this.drawFrame(context, 'russie2', 90, 40);
                        break;
                    default:
                        break;
                }
                return
            }
        }
    
        // Affichage des drapeaux en fonction de la carte sélectionnée
        if (this.map === 0) {
            this.drawFrame(context, 'usa', 280, 30);
            this.drawFrame(context, 'japan', 200, 40);
            this.drawFrame(context, 'brazil', 280, 90);
            this.drawFrame(context, 'india', 115, 70);
            this.drawFrame(context, 'china', 140, 40);
            this.drawFrame(context, 'russie', 90, 40);
        } else {
            
        }
    }
    
    

    updatechoix1() {
        const currentTime = Date.now();
        if (control.ispret(0, Control.PRET)) {
            if (this.j2Pret) {
                this.j2Pret = false;
            } else {
                this.j2Pret = true
            }
        }
        if (this.j2Pret) return;
        if (currentTime - this.lastInputTime1 < this.inputCooldown) return;

        if (control.isUp(0, this.direction)) {
            this.posi1.y = Math.max(0, this.posi1.y - 1);
        }
        if (control.isDown(0, this.direction)) {
            this.posi1.y = Math.min(this.grid.length - 1, this.posi1.y + 1);
        }
        if (control.isLeft(0, this.direction)) {
            this.posi1.x = Math.max(0, this.posi1.x - 1);
        }
        if (control.isRight(0, this.direction)) {
            this.posi1.x = Math.min(this.grid[this.posi1.y].length - 1, this.posi1.x + 1);
        }


        this.selectedCharacter1 = this.grid[this.posi1.y][this.posi1.x];


        this.lastInputTime1 = currentTime;
    }

    updatechoix2() {


        const currentTime = Date.now();
        if (control.ispret(1, Control.PRET)) {
            if (this.j1Pret) {
                this.j1Pret = false;
            } else {
                this.j1Pret = true
            }
        }

        if (this.j1Pret) return;
        if (currentTime - this.lastInputTime2 < this.inputCooldown2) return;

        if (control.isUp(1, this.direction)) {
            this.posi2.y = Math.max(0, this.posi2.y - 1);
        }
        if (control.isDown(1, this.direction)) {
            this.posi2.y = Math.min(this.grid.length - 1, this.posi2.y + 1);
        }
        if (control.isLeft(1, this.direction)) {
            this.posi2.x = Math.max(0, this.posi2.x - 1);
        }
        if (control.isRight(1, this.direction)) {
            this.posi2.x = Math.min(this.grid[this.posi2.y].length - 1, this.posi2.x + 1);
        }

        this.selectedCharacter2 = this.grid[this.posi2.y][this.posi2.x];

        this.lastInputTime2 = currentTime;
    }

    update(time, context) {
        if (this.j1Pret && this.j2Pret) {
            if (!this.transitionStartTime) {
                this.transitionStartTime = Date.now(); // Début du délai
            }
            
            // Vérifiez si le délai est écoulé avant de passer à la scène VS
           
                if (this.map === 0) {
                    this.map = Math.floor(Math.random() * 3) + 1;
                }
            
        } else {
            this.transitionStartTime = null; // Réinitialisez le temps si un joueur annule
        }
        
        this.updatechoix1(); // Met à jour la sélection du joueur 1
        this.updatechoix2(); // Met à jour la sélection du joueur 2
    }
    

    drawMap(context) {

        this.drawFrame(context, 'map', 0, 0);
    }

    draw(context) {
        if (this.j1Pret && this.j2Pret && this.transitionStartTime) {
            const timeElapsed = Date.now() - this.transitionStartTime;
    
            if (timeElapsed >= this.transitionDelay) {
                // Afficher l'écran VS
                this.drawVs(context);
                return;
            } else {
                // Effet transitoire avant la scène "VS"
                this.drawMap(context);
                this.drawCharacter1(context);
                this.drawCharacter2(context);
                this.drawDrapeau(context);
            }
        } else {
            // État par défaut (aucune transition en cours)
            this.drawMap(context);
            this.drawCharacter1(context);
            this.drawCharacter2(context);
            this.drawDrapeau(context);
        }
    }
    
    
}
