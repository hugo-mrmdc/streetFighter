import { avionStage } from "../avionStage.js";
import { BaseBleu } from "../baseBleu.js";
import { BisonStage } from "../bisonStage.js";
import { BLANKA } from "../blanka.js";
import { chunli } from "../chunli.js";
import { FIGHTER_HURT_DELAY, FIGHTER_START_DISTANCE, FighterAttacksBaseData, FighterAttackStrenght, FighterDirection } from "../constants/fighter.js";
import { FRAME_TIME } from "../constants/game.js";
import { STAGE_MID_POINT, STAGE_PADDING, STAGEFLOOR } from "../constants/stage.js";
import { HeavyHitSplash } from "../decals/heavyHitSplash.js";
import { LightHitSplash } from "../decals/lightHitSplash.js";
import { MediumHitSplash } from "../decals/mediumHitSplash.js";
import { Fighter } from "../fighter.js";
import { FpsCounter } from "../fpsConter.js";
import { Geto } from "../geto.js";
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
import { TrueloveBg } from "../trueLoveback.js";
import { camera } from "../utils/camera.js";
import { pollControl } from "../utils/controlHistory.js";
import { entitieslist } from "../utils/entityList.js";
import { Yuta } from "../yuta.js";
import { Control } from '../constants/control.js';
import * as control from '../inputHandler.js';

export class BatteScene {
    fighters = [];
    camera = undefined;
    shadow = [];

    hurtTimer = undefined;
    constructor(char1,char2) {
        this.stage = new HondaStage();
        this.entities = new entitieslist();
        this.entitieslist = this.entities;
        this.gameover = false
        this.gomenu = false
        this.f1;
        this.f2;
        switch(char1){
            case "ken":
                this.f1 = new Ken(STAGE_MID_POINT + STAGE_PADDING - FIGHTER_START_DISTANCE, STAGEFLOOR, FighterDirection.LEFT, 0, this.handleAttackHit.bind(this), this.entities);
                break;
                case "ryu":
                    this.f1 = new Ryu(STAGE_MID_POINT + STAGE_PADDING - FIGHTER_START_DISTANCE, STAGEFLOOR, FighterDirection.LEFT, 0, this.handleAttackHit.bind(this), this.entities);
                break; 

                case "honda":
                    this.f1 = new HONDA(STAGE_MID_POINT + STAGE_PADDING - FIGHTER_START_DISTANCE, STAGEFLOOR, FighterDirection.LEFT, 0, this.handleAttackHit.bind(this), this.entities);
                break;
                case "guil":
                    this.f1 = new Guile(STAGE_MID_POINT + STAGE_PADDING - FIGHTER_START_DISTANCE, STAGEFLOOR, FighterDirection.LEFT, 0, this.handleAttackHit.bind(this), this.entities);
                break;
                case "blanka":
                    this.f1 = new BLANKA(STAGE_MID_POINT + STAGE_PADDING - FIGHTER_START_DISTANCE, STAGEFLOOR, FighterDirection.LEFT, 0, this.handleAttackHit.bind(this), this.entities);
                break;
                case "chun":
                    this.f1 = new chunli(STAGE_MID_POINT + STAGE_PADDING - FIGHTER_START_DISTANCE, STAGEFLOOR, FighterDirection.LEFT, 0, this.handleAttackHit.bind(this), this.entities);
                break;
                case "gojo":
                    this.f1 = new Gojo(STAGE_MID_POINT + STAGE_PADDING - FIGHTER_START_DISTANCE, STAGEFLOOR, FighterDirection.LEFT, 0, this.handleAttackHit.bind(this), this.entities);
                break;
                case "geto":
                    this.f1 = new Geto(STAGE_MID_POINT + STAGE_PADDING - FIGHTER_START_DISTANCE, STAGEFLOOR, FighterDirection.LEFT, 0, this.handleAttackHit.bind(this), this.entities);
                break;
                case "yuta":
                    this.f1 = new Yuta(STAGE_MID_POINT + STAGE_PADDING - FIGHTER_START_DISTANCE, STAGEFLOOR, FighterDirection.LEFT, 0, this.handleAttackHit.bind(this), this.entities);
                break;
                
        }
        switch(char2){
            case "ken":
                this.f2 = new Ken(STAGE_MID_POINT + STAGE_PADDING + FIGHTER_START_DISTANCE, STAGEFLOOR, FighterDirection.RIGHT, 1, this.handleAttackHit.bind(this), this.entities);
                break;
                case "ryu":
                    this.f2 = new Ryu(STAGE_MID_POINT + STAGE_PADDING + FIGHTER_START_DISTANCE, STAGEFLOOR, FighterDirection.RIGHT, 1, this.handleAttackHit.bind(this), this.entities);
                break; 
                case "guil":
                    this.f2 = new Guile(STAGE_MID_POINT + STAGE_PADDING + FIGHTER_START_DISTANCE, STAGEFLOOR, FighterDirection.RIGHT, 1, this.handleAttackHit.bind(this), this.entities);
                break;
                case "honda":
                    this.f2 = new HONDA(STAGE_MID_POINT + STAGE_PADDING + FIGHTER_START_DISTANCE, STAGEFLOOR, FighterDirection.RIGHT, 1, this.handleAttackHit.bind(this), this.entities);
                break;
                case "blanka":
                    this.f2 = new BLANKA(STAGE_MID_POINT + STAGE_PADDING + FIGHTER_START_DISTANCE, STAGEFLOOR, FighterDirection.RIGHT, 1, this.handleAttackHit.bind(this), this.entities);
                break;
                case "chun":
                    this.f2 = new chunli(STAGE_MID_POINT + STAGE_PADDING + FIGHTER_START_DISTANCE, STAGEFLOOR, FighterDirection.RIGHT, 1, this.handleAttackHit.bind(this), this.entities);
                break;
                case "gojo":
                    this.f2 = new Gojo(STAGE_MID_POINT + STAGE_PADDING + FIGHTER_START_DISTANCE, STAGEFLOOR, FighterDirection.RIGHT, 1, this.handleAttackHit.bind(this), this.entities);
                break;
                case "geto":
                    this.f2 = new Geto(STAGE_MID_POINT + STAGE_PADDING + FIGHTER_START_DISTANCE, STAGEFLOOR, FighterDirection.RIGHT, 1, this.handleAttackHit.bind(this), this.entities);
                break;
                case "yuta":
                    this.f2 = new Yuta(STAGE_MID_POINT + STAGE_PADDING + FIGHTER_START_DISTANCE, STAGEFLOOR, FighterDirection.RIGHT, 1, this.handleAttackHit.bind(this), this.entities);
                break;
                
        }
        this.fighters = [

            this.f1,
           this.f2,
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

            if (fighter.exetension) {
                if (fighter.name == "GOJO") {
                    this.stage = new Infini();
                } else {
                    this.stage = new TrueloveBg();

                }

                fighter.exetension = false
            }
            fighter.update(time, context, this.camera)
        }
        if(this.stage.finis){
            this.stage = new HondaStage();
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

        if (control.ispret(0, Control.PRET)) {
           this.gomenu = true;
        }
        if (control.ispret(1, Control.PRET)) {
            this.gomenu = true;
         }

        this.updateFighters(time, context);
        this.updateShadows(time, context)
        this.stage.update(time, context);
        this.entities.updateEntities(time, context, this.camera)

        this.camera.update(time, context)
        this.updateOverlays(time, context)
        this.entitieslist.ENT = this.entities;
    }
    drawFighters(context) {
        let jsp = true
        for (const fighter of this.fighters) {


           
                if (fighter.cutscene) {

                } else {
                    fighter.draw(context, this.camera)
                }

            


        }

    }

    drawShadows(context) {
        let i = 0;
        for (const shadow of this.shadows) {
            if(this.fighters[i].cutscene){

            }else{
                shadow.draw(context, this.camera)
            }
            i++;
         
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
        this.entities.drawEntities(context, this.camera)
        this.drawFighters(context);

        this.stage.drawForground(context, this.camera)
        this.drawOverlays(context)
    }

}