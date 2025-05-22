import { Ken } from "./ken.js";
import { Stage } from "./stage.js";
import { Ryu } from "./ryu.js";
import { FpsCounter } from "./fpsConter.js";
import { STAGE_MID_POINT, STAGE_PADDING, STAGEFLOOR } from "./constants/stage.js";
import { FIGHTER_START_DISTANCE, FighterDirection } from "./constants/fighter.js";
import { registerkeyboardEvent } from "./inputHandler.js";
import { Shadow } from "./shadow.js";
import { StatusBar } from "./overlays/statusBar.js";
import { camera } from "./utils/camera.js";
import { BatteScene } from "./scenes/battleScene.js";
import { SelectScene } from "./scenes/selectPerson.js";
import { chunli } from "./chunli.js";

export class StreetFighterGame {
    constructor() {
        this.Stage = new Stage();
        this.bt = new SelectScene();
        this.context = this.getContext();
        this.isTransitioning = false; // Indicateur pour la transition
        this.transitionStartTime = null; // Temps de début de la transition

        this.fighters = [
            new chunli(STAGE_MID_POINT + STAGE_PADDING + FIGHTER_START_DISTANCE, STAGEFLOOR, FighterDirection.RIGHT, 1),
            new Ryu(STAGE_MID_POINT + STAGE_PADDING - FIGHTER_START_DISTANCE, STAGEFLOOR, FighterDirection.LEFT, 0),
        ];

        this.fighters[0].opponent = this.fighters[1];
        this.fighters[1].opponent = this.fighters[0];

        this.camera = new camera(
            STAGE_MID_POINT + STAGE_PADDING - (this.context.canvas.width / 2),
            16,
            this.fighters
        );

        this.entities = [
            ...this.fighters.map(fighter => new Shadow(fighter)),
            ...this.fighters,
            new FpsCounter(),
            new StatusBar(this.fighters),
        ];

        this.frameTime = {
            previous: 0,
            secondpassed: 0,
        };
    }

    getContext() {
        const canvasEl = document.querySelector('canvas');
        const context = canvasEl.getContext('2d');

        context.imageSmoothingEnabled = false;
        return context;
    }

    update() {
        this.Stage.update(this.frameTime, this.context);
        this.camera.update(this.frameTime, this.context);
        for (const entity of this.entities) {
            entity.update(this.frameTime, this.context, this.camera);
        }
    }

    draw() {
        this.Stage.drawBackground(this.context, this.camera);
        if (this.bt.j1Pret && this.bt.j2Pret && this.map !== 0) {
            for (const entity of this.entities) {
                entity.draw(this.context, this.camera);
            }
            this.Stage.drawForground(this.context, this.camera);
        }
    }

    frame(time) {
        window.requestAnimationFrame(this.frame.bind(this));

        this.frameTime = {
            secondpassed: (time - this.frameTime.previous) / 1000,
            previous: time,
        };

        if (this.bt.vs) {
            if (!this.isTransitioning) {
                // Démarrage de la transition
                this.isTransitioning = true;
                this.transitionStartTime = time;
            } else if (time - this.transitionStartTime >= 5000) {
                // Transition vers BatteScene après 5 secondes
                this.bt.j1Pret = false;
                this.bt = new BatteScene();
                this.isTransitioning = false; // Réinitialiser l'état de transition
            }
        }

        // Pendant la sélection ou la transition, mettre à jour et dessiner la scène actuelle
        this.bt.update(this.frameTime, this.context);
        this.bt.draw(this.context);

        // Si c'est BatteScene, dessiner les entités et mettre à jour la caméra
        /*if (this.bt instanceof BatteScene && this.bt.j1Pret && this.bt.j2Pret && this.map !== 0) {
            this.update();
            this.draw();
        }*/
    }

    handleFormSubmit(event) {
        event.preventDefault();

        const selectedCheckboxes = Array.from(event.target.querySelectorAll('input:checked')).map(checkbox => checkbox.value);
        const options = event.target.querySelector('select');

        this.fighters.forEach(fighter => {
            if (selectedCheckboxes.includes(fighter.name)) {
                fighter.changeState(options.value);
            }
        });
    }

    start() {
        registerkeyboardEvent();
        window.requestAnimationFrame(this.frame.bind(this));
    }
}
