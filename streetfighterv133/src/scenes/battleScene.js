import { avionStage } from "../avionStage.js";
import { BisonStage } from "../bisonStage.js";
import { BLANKA } from "../blanka.js";
import { chunli } from "../chunli.js";
import { FIGHTER_HURT_DELAY, FIGHTER_START_DISTANCE, FighterAttacksBaseData, FighterAttackStrenght, FighterDirection } from "../constants/fighter.js";
import { FRAME_TIME } from "../constants/game.js";
import { STAGE_MID_POINT, STAGE_PADDING, STAGEFLOOR } from "../constants/stage.js";
import { HeavyHitSplash } from "../decals/heavyHitSplash.js";
import { LightHitSplash } from "../decals/lightHitSplash.js";
import { MediumHitSplash } from "../decals/mediumHitSplash.js";
import { FpsCounter } from "../fpsConter.js";
import { Gojo } from "../gojo.js";
import { Guile } from "../guile.js";
import { HONDA } from "../honda.js";
import { HondaStage } from "../hondaStage.js";
import { Infini } from "../infini.js";
import { Ken } from "../ken.js";
import { StatusBar } from "../overlays/statusBar.js";
import { Ryu } from "../ryu.js";
import { Shadow } from "../shadow.js";
import { Stage } from "../stage.js";
import { gameState } from "../state/gameState.js";
import { camera } from "../utils/camera.js";
import { pollControl } from "../utils/controlHistory.js";
import { entitieslist } from "../utils/entityList.js";
import { Yuta } from "../yuta.js";

export class BatteScene {
    fighters = [];
    camera = undefined;
    shadow = [];

    hurtTimer = undefined;
    constructor() {
        this.stage = new BisonStage();
        this.entities = new entitieslist();
        this.entitieslist = this.entities;
        this.gameover = false
        this.fighters = [

            new Yuta(STAGE_MID_POINT + STAGE_PADDING - FIGHTER_START_DISTANCE, STAGEFLOOR, FighterDirection.LEFT, 0, this.handleAttackHit.bind(this), this.entities),
            new Guile(STAGE_MID_POINT + STAGE_PADDING + FIGHTER_START_DISTANCE, STAGEFLOOR, FighterDirection.RIGHT, 1, this.handleAttackHit.bind(this), this.entities),
        ]
        this.overlays = [
            new StatusBar(this.fighters),
            new FpsCounter(),
        ]
        this.fighters[0].opponent = this.fighters[1];
        this.fighters[1].opponent = this.fighters[0];
        this.camera = new camera(STAGE_MID_POINT + STAGE_PADDING - 192, 16, this.fighters);
        this.shadows = this.fighters.map(fighter => new Shadow(fighter))
    }
    getHitSplashClass(strenght) {
        switch (strenght) {
            case FighterAttackStrenght.LIGHT:
                return LightHitSplash;
            case FighterAttackStrenght.MEDIUM:
                return MediumHitSplash;
            case FighterAttackStrenght.HEAVY:
                return HeavyHitSplash;
            case FighterAttackStrenght.VERY_LIGHT:
                return LightHitSplash;
            default:
                throw new Error('unknowm strenght')
        }
    }

    addEntity(Entityclass, ...args) {
        this.entities.push(new Entityclass(...args, this.removeEntities.bind(this)))
    }
    removeEntities(entity) {
        this.entities = this.entities.filter((thisEntity) => thisEntity !== entity)
    }

    handleAttackHit(time, playerId, opponentId, position, strenght) {
        if (this.fighters[playerId].attackStruck) {
            return;
        }
        this.hurtTimer = time.previous + (FIGHTER_HURT_DELAY * FRAME_TIME)
        this.entities.addEntity(this.getHitSplashClass(strenght), position.x, position.y, playerId)
    }
    updateFighters(time, context) {
        for (const fighter of this.fighters) {
            pollControl(time, fighter.playerId, fighter.direction);
            if (time.previous < this.fighters) return;
            fighter.update(time, context, this.camera)
            if(fighter.exetension){
                this.stage = new Infini();
                fighter.exetension = false
            }
        }
    }
    updateShadows(time, context) {
        for (const shadowe of this.shadows) {
            shadowe.update(time, context, this.camera)
        }
    }
    updateEntities(time, context) {
        for (const fighter of this.entities) {

            fighter.update(time, context, this.camera)
            console.log(fighter);
        }
    }
    updateOverlays(time, context) {
        for (const over of this.overlays) {
            over.update(time, context, this.camera)
        }
    }
    update(time, context) {



        this.updateFighters(time, context);
        this.updateShadows(time, context)
        this.stage.update(time, context);
        this.entities.updateEntities(time, context, this.camera)

        this.camera.update(time, context)
        this.updateOverlays(time, context)
        this.entitieslist.ENT = this.entities;
    }
    drawFighters(context) {
        for (const fighter of this.fighters) {
            fighter.draw(context, this.camera)
        }
    }
    drawShadows(context) {
        for (const shadow of this.shadows) {
            shadow.draw(context, this.camera)
        }
    }
    drawEntities(context) {
        for (const fighter of this.entities) {
            fighter.draw(context, this.camera)
        }
    }
    drawOverlays(context) {
        for (const over of this.overlays) {
            over.draw(context, this.camera)
        }
    }
    draw(context) {
     
        this.stage.drawBackground(context, this.camera);
        this.drawShadows(context)
        this.drawFighters(context);
        this.entities.drawEntities(context, this.camera)
        this.stage.drawForground(context, this.camera)
        this.drawOverlays(context)
    }

}