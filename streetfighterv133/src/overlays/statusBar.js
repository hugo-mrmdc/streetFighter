import { HEALTH_CRITICAL_HIT_POINTS, HEALTH_DAMAGE_COlOR, HEALTH_MAX_HIT_POINTS, KO_ANIMATION, KO_FLASH_DELAY, TIME_DELAY, TIME_FLASH_DELAY, TIME_FRAME_KEYS } from "../constants/battle.js";
import { FPS } from "../constants/game.js";
import { gameState } from "../state/gameState.js";


export class StatusBar {
    constructor(fighters) {
        this.image = document.querySelector('img[alt="misc"]');
        this.image2 = document.querySelector('img[alt="gojoC"]');
        this.time = 99;
        this.timeTimer = 0
        this.timeFlashTimer = 0;
        this.useFlashFrames = false;
        this.fighters = fighters;
        this.joueurMort = false
        this.healthBars = [{
            timer: 0,
            hitPoints: HEALTH_MAX_HIT_POINTS,
        }, {
            timer: 0,
            hitPoints: HEALTH_MAX_HIT_POINTS,
        }]
        this.showContinue = false; // Initialement, le bouton "Continuer" est caché
        this.continueClickable = false; // État cliquable du bouton "Continuer"
        this.continueTimer = 0; // Timer pour gérer le délai

        this.koFrame = 0;
        this.koAnimationTimer = 0;
        this.gameOverScale = 0.1; // Échelle initiale (très petit)
        this.gameOverTimer = 0; // Timer pour l'animation
        this.gameOverPosition = { x: 200, y: 120 }; // Position initiale
        this.gameOverMaxScale = 2; // Taille finale
        this.gameOverGrowing = true; // État d'animation
        this.frames = new Map([
            ['healt-bar', [16, 18, 145, 11]],
            ['ko-white', [161, 16, 32, 14]],
            ['ko-red', [161, 1, 32, 14]],
            ['time-0', [16, 32, 14, 16]],
            ['time-1', [32, 32, 14, 16]],
            ['time-2', [48, 32, 14, 16]],
            ['time-3', [64, 32, 14, 16]],
            ['time-4', [80, 32, 14, 16]],
            ['time-5', [96, 32, 14, 16]],
            ['time-6', [112, 32, 14, 16]],
            ['time-7', [128, 32, 14, 16]],
            ['time-8', [144, 32, 14, 16]],
            ['time-9', [160, 32, 14, 16]],

            ['time-flash-0', [16, 192, 14, 16]],
            ['time-flash-1', [32, 192, 14, 16]],
            ['time-flash-2', [48, 192, 14, 16]],
            ['time-flash-3', [64, 192, 14, 16]],
            ['time-flash-4', [80, 192, 14, 16]],
            ['time-flash-5', [96, 192, 14, 16]],
            ['time-flash-6', [112, 192, 14, 16]],
            ['time-flash-7', [128, 192, 14, 16]],
            ['time-flash-8', [144, 192, 14, 16]],
            ['time-flash-9', [160, 192, 14, 16]],
            ['score-0', [17, 101, 10, 10]],
            ['score-1', [29, 101, 10, 10]],
            ['score-2', [41, 101, 10, 10]],
            ['score-3', [53, 101, 10, 10]],
            ['score-4', [65, 101, 10, 10]],
            ['score-5', [77, 101, 10, 10]],
            ['score-6', [89, 101, 10, 10]],
            ['score-7', [101, 101, 10, 10]],
            ['score-8', [113, 101, 10, 10]],
            ['score-9', [125, 101, 10, 10]],

            ['score-@', [17, 113, 10, 10]],
            ['score-A', [29, 113, 11, 10]],
            ['score-B', [41, 113, 10, 10]],
            ['score-C', [53, 113, 10, 10]],
            ['score-D', [65, 113, 10, 10]],
            ['score-E', [77, 113, 10, 10]],
            ['score-F', [89, 113, 10, 10]],
            ['score-G', [101, 113, 10, 10]],
            ['score-H', [113, 113, 10, 10]],
            ['score-I', [125, 113, 9, 10]],
            ['score-J', [136, 113, 10, 10]],
            ['score-K', [149, 113, 10, 10]],
            ['score-L', [161, 113, 10, 10]],
            ['score-M', [173, 113, 10, 10]],
            ['score-N', [185, 113, 10, 10]],
            ['score-0', [197, 113, 10, 10]],
            ['score-P', [17, 125, 10, 10]],
            ['score-Q', [29, 125, 10, 10]],
            ['score-R', [41, 125, 10, 10]],
            ['score-S', [53, 125, 10, 10]],
            ['score-T', [65, 125, 10, 10]],
            ['score-U', [77, 125, 10, 10]],
            ['score-V', [89, 125, 10, 10]],
            ['score-W', [101, 125, 10, 10]],
            ['score-X', [113, 125, 10, 10]],
            ['score-Y', [125, 125, 10, 10]],
            ['score-Z', [77, 125, 10, 10]],

            ['score-P', [17, 125, 10, 10]],
            ['tag-gojo', [392, 19, 157, 67]],
            ['tag-ken', [128, 56, 30, 9]],
            ['tag-ryu', [16, 56, 30, 9]],
            ['tag-chunli', [165, 53, 66, 11]],
            ['tag-honda', [238, 55, 66, 12]],
            ['tag-blanka', [53, 53, 59, 14]],
            ['game-over', [364, 71, 120, 16]],
            ['continue', [384, 40, 97, 16]],
            ['tag-yuta', [16, 56, 30, 9]],
            ['tag-geto', [16, 56, 30, 9]],
            []
        ])
    }

    drawFrame(context, frameKey, x, y, direction = 1) {
        const [sourceX, sourceY, sourceWidth, sourceHeight] = this.frames.get(frameKey);
        context.scale(direction, 1)
        context.drawImage(
            this.image
            , sourceX, sourceY, sourceWidth, sourceHeight,
            x * direction, y, sourceWidth, sourceHeight,
        );
        context.setTransform(1, 0, 0, 1, 0, 0);


    }
    drawFram2(context, frameKey, x, y, direction = 1) {
        const [sourceX, sourceY, sourceWidth, sourceHeight] = this.frames.get(frameKey);
        context.scale(direction, 1)
        context.drawImage(
            this.image2
            , sourceX, sourceY, sourceWidth, sourceHeight,
            x * direction, y, sourceWidth * 0.5, sourceHeight * 0.2,
        );
        context.setTransform(1, 0, 0, 1, 0, 0);


    }
    updateGameOver(time) {
        if (!this.joueurMort) return;

        if (!this.showContinue && time.previous > this.continueTimer + 3000) {
            this.showContinue = true;
            this.continueClickable = true;
        }
    }

    updateTime(time) {
        if (time.previous > this.timeTimer + TIME_DELAY) {
            this.time -= 1;
            this.timeTimer = time.previous;
        }
        if (this.time < 15 && this.time > -1 && time.previous > this.timeFlashTimer + TIME_FLASH_DELAY) {
            this.useFlashFrames = !this.useFlashFrames;
            this.timeFlashTimer = time.previous;
        }
    }
    
    updateTime(time) {
        if (time.previous > this.timeTimer + TIME_DELAY) {
            this.time -= 1;
            this.timeTimer = time.previous;
        }
        if (this.time < 15 && this.time > -1 && time.previous > this.timeFlashTimer + TIME_FLASH_DELAY) {
            this.useFlashFrames = !this.useFlashFrames;
            this.timeFlashTimer = time.previous
        }
    }
    updateHealthBars(time) {
        for (const index in this.healthBars) {
            if (this.healthBars[index].hitPoints <= gameState.fighters[index].hitPoints) continue;
            this.healthBars[index].hitPoints = Math.max(0, this.healthBars[index].hitPoints - (time.secondpassed * FPS))
            if (this.healthBars[index].hitPoints <= 0) {
                this.joueurMort = true
            }
        }
    }
    updateKoIcon(time) {
        if (this.healthBars.every((healthBar) => healthBar.hitPoints > HEALTH_CRITICAL_HIT_POINTS)) return;
        if (time.previous < this.koAnimationTimer + KO_FLASH_DELAY[this.koFrame]) return;
        this.koFrame = 1 - this.koFrame;
        this.koAnimationTimer = time.previous;
    }
    

    update(time) {
        this.updateGameOver(time)
        this.updateTime(time);
        this.updateHealthBars(time)
        this.updateKoIcon(time);
    }
    drawHealBars(context) {
        this.drawFrame(context, 'healt-bar', 31, 20)
        this.drawFrame(context, KO_ANIMATION[this.koFrame], 176, 18 - this.koFrame)
        this.drawFrame(context, 'healt-bar', 353, 20, -1)

        context.fillStyle = HEALTH_DAMAGE_COlOR;
        context.beginPath();
        context.fillRect(
            32, 21,
            HEALTH_MAX_HIT_POINTS - Math.floor(this.healthBars[1].hitPoints), 9,

        );
        context.fillRect(
            208 + Math.floor(this.healthBars[0].hitPoints), 21,
            HEALTH_MAX_HIT_POINTS - Math.floor(this.healthBars[0].hitPoints), 9,

        );

    }
    drawNameTags(context) {
        const [{ name: name1 }, { name: name2 }] = this.fighters
        if(name1 == "GOJO"){
            this.drawFrame2(context, `tag-${name1.toLowerCase()}`, 32, 33)
        }else{
            this.drawFrame(context, `tag-${name1.toLowerCase()}`, 32, 33)
        }
        if(name2 == "GOJO"){
            this.drawFram2(context, `tag-${name2.toLowerCase()}`, 300, 33)
        }else{
            this.drawFrame(context, `tag-${name2.toLowerCase()}`, 300, 33)
        }
       
       
    }
    drawTime(context) {
        const timeString = String(Math.max(this.time, 0)).padStart(2, '00');
        const flashFrame = TIME_FRAME_KEYS[Number(this.useFlashFrames)]
        this.drawFrame(context, `${flashFrame}-${timeString.charAt(0)}`, 178, 33)
        this.drawFrame(context, `${flashFrame}-${timeString.charAt(1)}`, 194, 33)
    }
    drawScore(context, score, x) {
        const strValue = String(score);
        const buffer = ((6 * 12) - strValue.length * 12);
        for (let i = 0; i < strValue.length; i++) {

            this.drawFrame(context, `score-${strValue[i]}`, x + buffer + i * 12, 1)
        }
    }

    drawScoreName(context, name, x) {
        for (const index in name) {
            this.drawFrame(context, `score-${name.charAt(index)}`, x + index * 12, 1)
        }
    }
    drawGameOver(context) {
        if (!this.joueurMort) return;

        if (this.gameOverScale < this.gameOverMaxScale && this.gameOverGrowing) {
            this.gameOverScale += 0.10;
        } else {
            this.gameOverGrowing = false;
        }

        const [sourceX, sourceY, sourceWidth, sourceHeight] = this.frames.get('game-over');
        const width = sourceWidth * this.gameOverScale;
        const height = sourceHeight * this.gameOverScale;
        const X = this.gameOverPosition.x - width / 2;
        const Y = this.gameOverPosition.y - height / 2;

        context.drawImage(this.image, sourceX, sourceY, sourceWidth, sourceHeight, X, Y, width, height);

        if (this.showContinue) {
            const [continueX, continueY, continueWidth, continueHeight] = this.frames.get('continue');
            context.drawImage(this.image, continueX, continueY, continueWidth, continueHeight, 150, 160, continueWidth, continueHeight);
        }
    }

    handleClick(x, y) {
        if (this.continueClickable && x >= 150 && x <= 247 && y >= 160 && y <= 176) {
            console.log("Continuer cliqué !");
            this.resetGame();
        }
    }

    resetGame() {
        this.joueurMort = false;
        this.showContinue = false;
        this.continueClickable = false;
        this.time = 99;
        this.healthBars = [
            { timer: 0, hitPoints: HEALTH_MAX_HIT_POINTS },
            { timer: 0, hitPoints: HEALTH_MAX_HIT_POINTS },
        ];
    }
    

    handleClick(x, y) {
        if (this.continueClickable) {
            // Vérifiez si le clic est dans la zone du bouton
            const buttonX = 150, buttonY = 160;
            const buttonWidth = 97, buttonHeight = 16;
    
            if (x >= buttonX && x <= buttonX + buttonWidth &&
                y >= buttonY && y <= buttonY + buttonHeight) {
                console.log("Continuer cliqué !");
                this.resetGame(); // Réinitialisez le jeu ou effectuez l'action souhaitée
            }
        }
    }
    
    resetGame() {
        // Réinitialisez les états ici
        this.joueurMort = false;
        this.showContinue = false;
        this.continueClickable = false;
        this.time = 99;
        this.healthBars = [
            { timer: 0, hitPoints: HEALTH_MAX_HIT_POINTS },
            { timer: 0, hitPoints: HEALTH_MAX_HIT_POINTS },
        ];
    }


    drawScores(context) {
        this.drawScoreName(context, 'P1', 4)

        this.drawScoreName(context, 'ANT', 133)
        this.drawScoreName(context, 'P2', 269)

        if (this.joueurMort) {
            this.drawGameOver(context, 100)
        }
        //this.drawFrame(context, 'score-2', 269, 1)
        //this.drawFrame(context, 'score-P', 281,1)
        this.drawScore(context, gameState.fighters[1].score, 45)
        this.drawScore(context, gameState.fighters[0].score, 309)
        this.drawScore(context, 50000, 177)
    }

    draw(context) {
        this.drawScores(context);
        this.drawHealBars(context);
        this.drawNameTags(context)
        this.drawTime(context);

    }
}