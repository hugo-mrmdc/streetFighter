

import { Control } from './constants/control.js';
import { FighterDirection, FighterState, FighterAttackType, FighterAttackStrenght, FighterAttacksBaseData, FighterHurtBox, hurtStateValidFrom } from './constants/fighter.js';

import { STAGEFLOOR } from './constants/stage.js';
import * as control from './inputHandler.js';
import { gameState } from './state/gameState.js';
import { boxOverlap, getActualBoxDimensions, rectOverlap } from './utils/collisions.js';
import { hasSpecialMoveBeenExecuted } from './utils/controlHistory.js';
export class Fighter {
    constructor(name, x, y, direction, playerId, onAttackHit) {
        this.name = name;
        this.playerId = playerId;
        this.opponent;
        this.red = false
        this.blue = false
        this.start = true
        this.exetension = false
        this.frame = new Map();
        this.position = { x, y };
        this.velocity = { x: 0, y: 0 };
        this.initialVelociy = {};
        this.direction = direction
        this.gravity = 0;
        this.attackStruck = false;
        this.animationFrame = 0;
        this.animationTimer = 0;
        this.animations = {};
        this.auSol = false
        this.slideVelocity = 0;
        this.slideFriction = 0;
        this.gameOver = false
        this.onAttackHit = onAttackHit;
        this.invulnerable = false
        this.wallJump = true
        this.attackENLAIRE = true
        this.camera = undefined;
        this.oldAnimationFrame = 0
        this.boxe = {
            push: { x: 0, y: 0, width: 0, height: 0 },

            hit: { x: 0, y: 0, width: 0, height: 0 },
            hurt: {
                [FighterHurtBox.HEAD]: [0, 0, 0, 0],
                [FighterHurtBox.BODY]: [0, 0, 0, 0],
                [FighterHurtBox.FEET]: [0, 0, 0, 0],

            },
        }
        this.image = new Image();
        this.states = {
            [FighterState.IDLE]: {
                init: this.handleIdleInit.bind(this),
                update: this.handleIdleState.bind(this),
                validFrom: [undefined, FighterState.IDLE,
                    FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD,
                    FighterState.JUMP_UP, FighterState.JUMP_FORWARD, FighterState.JUMP_BACKWARD,
                    FighterState.CROUCH_UP, FighterState.JUMP_LAND,
                    FighterState.IDLE_TURN, FighterState.LIGHT_PUNCH,
                    FighterState.MEDIUM_PUNCH, FighterState.HEAVY_PUNCH, FighterState.LIGHT_Kick,
                    FighterState.MEDIUM_Kick, FighterState.HEAVY_Kick, FighterState.JUMP_END, FighterState.HURT_HEAD_LIGHT, FighterState.HURT_HEAD_MEDIUM,
                    FighterState.HURT_HEAD_HEAVY, FighterState.HURT_BODY_MEDIUM, FighterState.HURT_BODY_LIGHT, FighterState.HURT_BODY_HEAVY,
                    FighterState.SPECIAL_1, FighterState.CROUCH_PUNCH,
                    FighterState.TORNADE, FighterState.Tacle, FighterState.CHUT1,
                    FighterState.JUMKICK, FighterState.JUMPWALL, FighterState.HyakuRestu, FighterState.Red, FighterState.SmachPunch, FighterState.AirRed, FighterState.Purple, FighterState.Enter,FighterState.Expansion],
            },
            [FighterState.WALK_FORWARD]: {
                init: this.handleMoveInit.bind(this),
                update: this.handleWalkForwardState.bind(this),
                validFrom: [FighterState.IDLE, FighterState.WALK_BACKWARD, FighterState.JUMPWALL, FighterState.SmachPunch],
            },
            [FighterState.WALK_BACKWARD]: {
                init: this.handleMoveInit.bind(this),
                update: this.handleWalkBacwardState.bind(this),
                validFrom: [FighterState.IDLE, FighterState.WALK_FORWARD, FighterState.JUMPWALL],
            },
            [FighterState.JUMP_START]: {
                init: this.handleJumpStartInit.bind(this),
                update: this.handleJumpStartState.bind(this),
                validFrom: [FighterState.IDLE, FighterState.JUMP_LAND,
                FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD, FighterState.AirRed],
            },
            [FighterState.JUMP_LAND]: {
                init: this.handleJumpLandInit.bind(this),
                update: this.handleJumpLandState.bind(this),
                validFrom: [FighterState.JUMP_UP, FighterState.JUMP_FORWARD,
                FighterState.JUMP_BACKWARD, FighterState.JUMP_END, FighterState.TORNADE,
                FighterState.JUMKICK, FighterState.JUMPWALL, FighterState.JUMP_PUNCH,
                FighterState.FOR_JUMP_PUNCH, FighterState.JUMP_h_KICK
                    , FighterState.FOR_JUMP_KICK, FighterState.FOR_JUMP_h_KICK, FighterState.JUMP_h_PUNCH, FighterState.FOR_JUMP_h_PUNCH, FighterState.AirRed],
            },
            [FighterState.JUMP_UP]: {
                init: this.handleJumpInit.bind(this),
                update: this.handleJumpState.bind(this),
                validFrom: [FighterState.IDLE, FighterState.JUMP_START, FighterState.TORNADE, FighterState.JUMPWALL, FighterState.JUMP_PUNCH, FighterState.JUMKICK, FighterState.JUMP_h_KICK, FighterState.JUMP_h_PUNCH, FighterState.FOR_JUMP_h_KICK, FighterState.AirRed],
            },
            [FighterState.JUMP_FORWARD]: {
                init: this.handleJumpInit.bind(this),
                update: this.handleJumpState.bind(this),
                validFrom: [FighterState.JUMP_START, FighterState.JUMPWALL, FighterState.FOR_JUMP_PUNCH, FighterState.FOR_JUMP_KICK, FighterState.FOR_JUMP_h_KICK, FighterState.FOR_JUMP_h_PUNCH, FighterState.AirRed],
            },
            [FighterState.JUMP_BACKWARD]: {
                init: this.handleJumpInit.bind(this),
                update: this.handleJumpState.bind(this),
                validFrom: [FighterState.JUMP_START, FighterState.JUMPWALL],
            },
            [FighterState.CROUCH]: {
                init: () => { },
                update: this.handleCrouchState.bind(this),
                validFrom: [FighterState.CROUCH_DOWN, FighterState.CROUCH_TURN, FighterState.SPECIAL_1, FighterState.CROUCH_PUNCH, FighterState.Tacle, FighterState.HURT_HEAD_LIGHT, FighterState.HURT_HEAD_MEDIUM,
                FighterState.HURT_HEAD_HEAVY, FighterState.HURT_BODY_MEDIUM, FighterState.HURT_BODY_LIGHT, FighterState.HURT_BODY_HEAVY, FighterState.CROUCH_L_Kick, FighterState.CROUCH_h_Kick, FighterState.CROUCH_M_PUNCH, FighterState.CROUCH_h_PUNCH, FighterState.Red],
            },
            [FighterState.CROUCH_DOWN]: {
                init: () => { },
                update: this.handleCrouchDownState.bind(this),
                validFrom: [FighterState.IDLE, FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD, FighterState.SPECIAL_1, FighterState.Tacle],
            },
            [FighterState.CROUCH_UP]: {
                init: () => { },
                update: this.handleCrouchUpState.bind(this),
                validFrom: [FighterState.CROUCH],
            },
            [FighterState.JUMP_END]: {
                init: () => { },
                update: this.handleJumpState.bind(this),
                validFrom: [FighterState.JUMP_BACKWARD, FighterState.JUMP_UP, FighterState.JUMP_FORWARD, FighterState.JUMKICK,
                FighterState.JUMP_PUNCH, FighterState.FOR_JUMP_PUNCH, FighterState.JUMP_h_PUNCH,
                FighterState.JUMKICK, FighterState.JUMP_h_KICK, FighterState.JUMP_h_PUNCH, FighterState.FOR_JUMP_h_KICK, FighterState.FOR_JUMP_PUNCH, FighterState.FOR_JUMP_KICK, FighterState.FOR_JUMP_h_KICK, FighterState.FOR_JUMP_h_PUNCH],
            },
            [FighterState.LIGHT_PUNCH]: {
                attackType: FighterAttackType.PUNCH,
                attackStrenght: FighterAttackStrenght.LIGHT,
                init: this.handleStandartLightAttackInit.bind(this),
                update: this.handleStandartLightAttackState.bind(this),
                validFrom: [FighterState.IDLE, FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD],
            },
            [FighterState.MEDIUM_PUNCH]: {
                attackType: FighterAttackType.PUNCH,
                attackStrenght: FighterAttackStrenght.MEDIUM,
                init: this.handleStandartMedAttackInit.bind(this),
                update: this.handleStandartMedAttackState.bind(this),
                validFrom: [FighterState.IDLE, FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD],
            },
            [FighterState.HEAVY_PUNCH]: {
                attackType: FighterAttackType.PUNCH,
                attackStrenght: FighterAttackStrenght.HEAVY,
                init: this.handleStandartHeavyAttackInit.bind(this),
                update: this.handleStandartMedAttackState.bind(this),
                validFrom: [FighterState.IDLE, FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD],
            },
            [FighterState.LIGHT_Kick]: {
                attackType: FighterAttackType.KICK,
                attackStrenght: FighterAttackStrenght.LIGHT,
                init: this.handleStandartLightAttackInit.bind(this),
                update: this.handleStandartLightkickState.bind(this),
                validFrom: [FighterState.IDLE, FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD],
            },
            [FighterState.MEDIUM_Kick]: {
                attackType: FighterAttackType.KICK,
                attackStrenght: FighterAttackStrenght.MEDIUM,
                init: this.handleStandartMedAttackInit.bind(this),
                update: this.handleStandartMedkickState.bind(this),
                validFrom: [FighterState.IDLE, FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD],
            },
            [FighterState.HEAVY_Kick]: {
                attackType: FighterAttackType.KICK,
                attackStrenght: FighterAttackStrenght.HEAVY,
                init: this.handleStandartHeavyAttackInit.bind(this),
                update: this.handleStandartMedkickState.bind(this),
                validFrom: [FighterState.IDLE, FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD],
            },
            [FighterState.HURT_HEAD_LIGHT]: {
                init: this.handleHurtIni.bind(this),
                update: this.handleHurtState.bind(this),
                validFrom: hurtStateValidFrom,
            },
            [FighterState.HURT_HEAD_MEDIUM]: {
                init: this.handleHurtIni.bind(this),
                update: this.handleHurtState.bind(this),
                validFrom: hurtStateValidFrom,
            },
            [FighterState.HURT_HEAD_HEAVY]: {
                init: this.handleHurtIni.bind(this),
                update: this.handleHurtState.bind(this),
                validFrom: hurtStateValidFrom,
            },
            [FighterState.HURT_BODY_LIGHT]: {
                init: this.handleHurtIni.bind(this),
                update: this.handleHurtState.bind(this),
                validFrom: hurtStateValidFrom,
            },
            [FighterState.HURT_BODY_MEDIUM]: {
                init: this.handleHurtIni.bind(this),
                update: this.handleHurtState.bind(this),
                validFrom: hurtStateValidFrom,
            },
            [FighterState.HURT_BODY_HEAVY]: {
                init: this.handleHurtIni.bind(this),
                update: this.handleHurtState.bind(this),
                validFrom: hurtStateValidFrom,
            },
            [FighterState.CROUCH_PUNCH]: {
                attackType: FighterAttackType.PUNCH,
                attackStrenght: FighterAttackStrenght.LIGHT,
                init: this.handleStandartLightAttackInit.bind(this),
                update: this.handleStandartcrouchAttackState.bind(this),
                validFrom: [FighterState.IDLE, FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD, FighterState.CROUCH],
            },
            [FighterState.TORNADE]: {

                attackType: FighterAttackType.PUNCH,
                attackStrenght: FighterAttackStrenght.LIGHT,
                init: () => this.handleStandarttornadoAttackInit.bind(this),
                update: this.handleStandartTornadoAttackState.bind(this),
                validFrom: [FighterState.IDLE, FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD, FighterState.JUMP_LAND, FighterState.JUMP_UP],
            },
            [FighterState.Tacle]: {
                type: "chut",
                attackType: FighterAttackType.KICK,
                attackStrenght: FighterAttackStrenght.LIGHT,
                init: this.handleStandartLightAttackInit.bind(this),
                update: this.handleStandartTacleAttackState.bind(this),
                validFrom: [FighterState.IDLE, FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD, FighterState.CROUCH],
            },
            [FighterState.CHUT1]: {


                init: this.handleIdleInit.bind(this),
                update: this.handleStandartChut1AttackState.bind(this),
                validFrom: hurtStateValidFrom,
            },
            [FighterState.JUMPWALL]: {


                init: () => { },
                update: this.handleStandartWallJumpState.bind(this),
                validFrom: [FighterState.JUMP_UP, FighterState.JUMP_BACKWARD, FighterState.JUMP_END, FighterState.TORNADE, FighterState.JUMKICK, FighterState.JUMPWALL, FighterState.JUMP_PUNCH, FighterState.FOR_JUMP_PUNCH, FighterState.JUMP_h_KICK],
            },
            [FighterState.DOWN]: {


                init: () => { },
                update: this.handleDown.bind(this),
                validFrom: hurtStateValidFrom,
            },
            [FighterState.ko]: {


                init: () => { },
                update: () => { },
                validFrom: hurtStateValidFrom,
            },
            [FighterState.WIN]: {


                init: () => { },
                update: () => { this.position.y = STAGEFLOOR; },
                validFrom: hurtStateValidFrom,
            },
            [FighterState.JUMKICK]: {

                attackType: FighterAttackType.KICK,
                attackStrenght: FighterAttackStrenght.MEDIUM,
                init: () => {

                },
                update: this.handleJumpState.bind(this),
                validFrom: [FighterState.IDLE, FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD, FighterState.JUMP_UP, FighterState.JUMP_START, FighterState.JUMP_LAND, FighterState.JUMP_END],
            }, [FighterState.CROUCH_L_Kick]: {

                attackType: FighterAttackType.KICK,
                attackStrenght: FighterAttackStrenght.LIGHT,
                init: () => { },
                update: this.handleStandartCrouchLKickState.bind(this),
                validFrom: [FighterState.IDLE, FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD, FighterState.CROUCH],
            },
            [FighterState.CROUCH_h_Kick]: {

                attackType: FighterAttackType.KICK,
                attackStrenght: FighterAttackStrenght.HEAVY,
                init: () => { },
                update: this.handleStandartCrouchHKickState.bind(this),
                validFrom: [FighterState.IDLE, FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD, FighterState.CROUCH],
            },
            [FighterState.JUMP_PUNCH]: {

                attackType: FighterAttackType.PUNCH,
                attackStrenght: FighterAttackStrenght.MEDIUM,
                init: () => { },
                update: this.handleJumpState.bind(this),
                validFrom: [FighterState.IDLE, FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD, FighterState.JUMP_UP, FighterState.JUMP_START, FighterState.JUMP_LAND, FighterState.JUMP_END],
            },
            [FighterState.FOR_JUMP_PUNCH]: {

                attackType: FighterAttackType.PUNCH,
                attackStrenght: FighterAttackStrenght.MEDIUM,
                init: () => { },
                update: this.handleJumpState.bind(this),
                validFrom: [FighterState.IDLE, FighterState.WALK_FORWARD, , FighterState.JUMP_FORWARD, FighterState.JUMP_START, FighterState.JUMP_END],
            },
            [FighterState.JUMP_h_KICK]: {

                attackType: FighterAttackType.KICK,
                attackStrenght: FighterAttackStrenght.HEAVY,
                init: () => {

                },
                update: this.handleJumpState.bind(this),
                validFrom: [FighterState.IDLE, FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD, FighterState.JUMP_UP, FighterState.JUMP_START, FighterState.JUMP_LAND, FighterState.JUMP_END],
            },
            [FighterState.FOR_JUMP_KICK]: {

                attackType: FighterAttackType.PUNCH,
                attackStrenght: FighterAttackStrenght.MEDIUM,
                init: () => { },
                update: this.handleJumpState.bind(this),
                validFrom: [FighterState.IDLE, FighterState.WALK_FORWARD, , FighterState.JUMP_FORWARD, FighterState.JUMP_START, FighterState.JUMP_END],
            },
            [FighterState.FOR_JUMP_h_KICK]: {

                attackType: FighterAttackType.PUNCH,
                attackStrenght: FighterAttackStrenght.MEDIUM,
                init: () => { },
                update: this.handleJumpState.bind(this),
                validFrom: [FighterState.IDLE, FighterState.WALK_FORWARD, FighterState.JUMP_FORWARD, FighterState.JUMP_START, FighterState.JUMP_UP, FighterState.JUMP_END],
            },
            [FighterState.HyakuRestu]: {

                attackType: FighterAttackType.KICK,
                attackStrenght: FighterAttackStrenght.LIGHT,
                init: () => { this.velocity.x = 150 },
                update: this.handleStandartHyakuRestuAttackState.bind(this),
                validFrom: [FighterState.IDLE, FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD],
            },
            [FighterState.CROUCH_M_PUNCH]: {

                attackType: FighterAttackType.PUNCH,
                attackStrenght: FighterAttackStrenght.MEDIUM,
                init: () => { },
                update: this.handleStandartCROUCHMAttackState.bind(this),
                validFrom: [FighterState.IDLE, FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD, FighterState.CROUCH],
            },
            [FighterState.CROUCH_h_PUNCH]: {

                attackType: FighterAttackType.PUNCH,
                attackStrenght: FighterAttackStrenght.HEAVY,
                init: () => { },
                update: this.handleStandartCROUCHhAttackState.bind(this),
                validFrom: [FighterState.IDLE, FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD, FighterState.CROUCH],
            },
            [FighterState.JUMP_h_PUNCH]: {

                attackType: FighterAttackType.PUNCH,
                attackStrenght: FighterAttackStrenght.HEAVY,
                init: () => {

                },
                update: this.handleJumpState.bind(this),
                validFrom: [FighterState.IDLE, FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD, FighterState.JUMP_UP, FighterState.JUMP_START, FighterState.JUMP_LAND, FighterState.JUMP_END],
            },
            [FighterState.FOR_JUMP_h_PUNCH]: {

                attackType: FighterAttackType.PUNCH,
                attackStrenght: FighterAttackStrenght.HEAVY,
                init: () => {

                },
                update: this.handleJumpState.bind(this),
                validFrom: [FighterState.IDLE, FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD, FighterState.JUMP_FORWARD, FighterState.JUMP_START, FighterState.JUMP_LAND, FighterState.JUMP_END],
            },



        }
        this.changeState(FighterState.IDLE)
    }

    hasCollidedwithOpponent = () => rectOverlap(
        this.position.x + this.boxe.push.x, this.position.y + this.boxe.push.y,
        this.boxe.push.width, this.boxe.push.height,
        this.opponent.position.x + this.opponent.boxe.push.x,
        this.opponent.position.y + this.opponent.boxe.push.y,
        this.opponent.boxe.push.width, this.opponent.boxe.push.height,
    );


    resetVelocities() {
        this.velocity.x = 0;
        this.velocity.y = 0;
    }
    resetSlide(transfert = false) {
        if (transfert) {
            this.opponent.slideVelocity = this.slideVelocity;
            this.opponent.slideFriction = this.slideFriction;
        }
        this.slideFriction = 0;
        this.slideVelocity = 0;
    }    //getDirection = () => this.position.x >= this.opponent.position.x ? FighterDirection.LEFT : FighterDirection.RIGHT;
    getDirection() {
        if (this.position.x + this.boxe.push.x + this.boxe.push.width <= this.opponent.position.x + this.boxe.push.x) {
            return FighterDirection.RIGHT
        } else if (this.position.x + this.boxe.push.x >= this.opponent.position.x + this.opponent.boxe.push.x + this.opponent.boxe.push.width) {
            return FighterDirection.LEFT
        }
        return this.direction
    }

    getBox(frameKey) {
        const [,
            [pushx = 0, pushy = 0, pushwidth = 0, pushheight = 0] = [],
            [head = [0, 0, 0, 0], body = [0, 0, 0, 0], feet = [0, 0, 0, 0]] = [],
            [hitx = 0, hity = 0, hitwidth = 0, hitheight = 0] = [],
        ] = this.frame.get(frameKey);
        return {
            push: { x: pushx, y: pushy, width: pushwidth, height: pushheight },
            hurt: { [FighterHurtBox.HEAD]: head, [FighterHurtBox.BODY]: body, [FighterHurtBox.FEET]: feet },
            hit: { x: hitx, y: hity, width: hitwidth, height: hitheight }
        };
    }
    getHitState(attackStrenght, hitLocation) {

        switch (attackStrenght) {
            case FighterAttackStrenght.LIGHT:
                if (hitLocation == FighterHurtBox.HEAD) return FighterState.HURT_HEAD_LIGHT;
                return FighterState.HURT_BODY_LIGHT;
            case FighterAttackStrenght.MEDIUM:
                if (hitLocation == FighterHurtBox.HEAD) return FighterState.HURT_HEAD_MEDIUM;
                return FighterState.HURT_BODY_MEDIUM;
            case FighterAttackStrenght.HEAVY:
                if (hitLocation == FighterHurtBox.HEAD) return FighterState.HURT_HEAD_HEAVY;
                return FighterState.HURT_BODY_HEAVY;
            case FighterAttackStrenght.Purple:
                if (hitLocation == FighterHurtBox.HEAD) return FighterState.CHUT1;
                return FighterState.CHUT1;

        }
    }

    changeState(newState, args) {
        console.log(this.cunrentState)
        console.log(newState)
        if (newState === this.cunrentState || !this.states[newState].validFrom.includes(this.cunrentState)) return;
        this.cunrentState = newState;

        this.animationFrame = 0;
        this.states[this.cunrentState].init(args);
    }
    handleDown() {
        if (this.animationFrame < 1) return

        if (!this.animations[this.cunrentState][this.animationFrame][1] == -2) return;
        this.changeState(FighterState.ko)
    }
    //methode init
    handleIdleInit() {
        this.position.y = STAGEFLOOR
        this.attackENLAIRE = true
        this.wallJump = true
        this.resetVelocities();
        this.attackStruck = false;
        this.auSol = false
    }
    handleJumpInit() {
        this.velocity.y = this.initialVelociy.jump;
        this.handleMoveInit();
    }
    handleMoveInit() {
        this.velocity.x = this.initialVelociy.x[this.cunrentState] ?? 0;
    }
    handleJumpStartInit() {
        this.handleIdleInit();
    }
    handleJumpLandInit() {
        this.handleIdleInit();
    }
    handleStandartLightAttackInit() {
        this.resetVelocities();
    }
    handleStandartMedAttackInit() {
        this.resetVelocities();
    }
    handleStandartHeavyAttackInit() {
        this.resetVelocities();
    }
    handleHurtIni() {
        this.resetVelocities()
    }

    handleStandarttornadoAttackInit() {

        this.velocity.x = 300;
    }
    //keyboard
    handleIdleState(time) {

        for (let index = 0; index < gameState.fighters.length; index++) {
            if (gameState.fighters[index].hitPoints <= 0) {
                if (index != this.playerId) {
                    this.changeState(FighterState.DOWN)
                    this.opponent.changeState(FighterState.WIN)
                } else {
                    this.opponent.changeState(FighterState.DOWN)
                    this.changeState(FighterState.WIN)
                }
            }

        }
        if (this.animationFrame == 2) {
            this.invulnerable = false
        }


        this.auSol = false
        if (control.isUp(this.playerId, this.direction)) {
            this.changeState(FighterState.JUMP_START)
        } else if (control.isDown(this.playerId, this.direction)) {
            this.changeState(FighterState.CROUCH_DOWN)
        } else if (control.isBackward(this.playerId, this.direction)) {
            this.changeState(FighterState.WALK_BACKWARD)
        } else if (control.isForward(this.playerId, this.direction)) {
            this.changeState(FighterState.WALK_FORWARD)
        } else if (control.isLightPunch(this.playerId, Control.LIGHT_PUNCH)) {
            this.changeState(FighterState.LIGHT_PUNCH, time)
        } else if (control.isMediumPunch(this.playerId, Control.MEDIUM_PUNCH)) {
            this.changeState(FighterState.MEDIUM_PUNCH)
        } else if (control.isHeavyPunch(this.playerId, Control.HEAVY_PUNCH)) {
            this.changeState(FighterState.HEAVY_PUNCH)
        } else if (control.isLightkick(this.playerId, Control.LIGHT_Kick)) {
            this.changeState(FighterState.LIGHT_Kick)
        } else if (control.isMediumkick(this.playerId, Control.MEDIUM_Kick)) {
            this.changeState(FighterState.MEDIUM_Kick)
        } else if (control.isHeavykick(this.playerId, Control.HEAVY_Kick)) {
            this.changeState(FighterState.HEAVY_Kick)
        }


    }
    handleWalkForwardState() {
        if (!control.isForward(this.playerId, this.direction)) this.changeState(FighterState.IDLE)
        if (control.isUp(this.playerId, this.direction)) this.changeState(FighterState.JUMP_START)
        if (control.isDown(this.playerId, this.direction)) this.changeState(FighterState.CROUCH_DOWN)

    }
    handleWalkBacwardState() {
        if (!control.isBackward(this.playerId, this.direction)) this.changeState(FighterState.IDLE)
        if (control.isUp(this.playerId, this.direction)) this.changeState(FighterState.JUMP_START)
        if (control.isDown(this.playerId, this.direction)) this.changeState(FighterState.CROUCH_DOWN)
        if (control.isLightPunch(this.playerId, Control.LIGHT_PUNCH)) {
            this.changeState(FighterState.LIGHT_PUNCH)
        } else if (control.isMediumPunch(this.playerId, Control.MEDIUM_PUNCH)) {
            this.changeState(FighterState.MEDIUM_PUNCH)
        } else if (control.isHeavyPunch(this.playerId, Control.HEAVY_PUNCH)) {
            this.changeState(FighterState.HEAVY_PUNCH)
        } else if (control.isLightkick(this.playerId, Control.LIGHT_Kick)) {
            this.changeState(FighterState.LIGHT_Kick)
        } else if (control.isMediumkick(this.playerId, Control.MEDIUM_Kick)) {
            this.changeState(FighterState.MEDIUM_Kick)
        } else if (control.isHeavykick(this.playerId, Control.HEAVY_Kick)) {
            this.changeState(FighterState.HEAVY_Kick)
        }

    }
    handleCrouchState() {
        this.handleIdleInit();
        if (!control.isDown(this.playerId, this.direction)) this.changeState(FighterState.CROUCH_UP)

    }

    handleStandartWallJumpState(time) {

        this.position.y = 170




        if (control.isForward(this.playerId, this.direction)) {

            this.changeState(FighterState.JUMP_FORWARD);
            this.wallJump = false
        }
        if (control.isDown(this.playerId, this.direction)) {

            this.changeState(FighterState.JUMP_LAND);
            this.wallJump = false
        }

        if (this.position.y > STAGEFLOOR) {
            this.position.y = STAGEFLOOR;
            this.changeState(FighterState.JUMP_LAND)
        }



    }

    //methode state
    handleJumpState(time) {
        if (this.name === "GOJO") {
            if (this.cunrentState == FighterState.JUMP_FORWARD || this.cunrentState == FighterState.JUMP_END || this.cunrentState == FighterState.JUMP_START) {


            }
        }
        if (this.name === "BLANKA") {
            if (this.cunrentState == FighterState.JUMP_UP || this.cunrentState == FighterState.JUMP_END) {
                if (control.isLightPunch(this.playerId)) {
                    //this.velocity.y = -300
                    this.attackENLAIRE = false
                    this.changeState(FighterState.JUMP_PUNCH)
                }
                if (control.isMediumPunch(this.playerId)) {
                    //this.attackENLAIRE = false
                    this.changeState(FighterState.JUMP_PUNCH)
                }
                if (control.isHeavyPunch(this.playerId)) {
                    this.attackENLAIRE = false
                    this.changeState(FighterState.JUMP_h_PUNCH)
                }
                if (control.isLightkick(this.playerId)) {

                    this.attackENLAIRE = false
                    this.changeState(FighterState.JUMKICK)
                }
                if (control.isMediumkick(this.playerId)) {
                    this.attackENLAIRE = false
                    this.changeState(FighterState.JUMKICK)
                }
                if (control.isHeavykick(this.playerId)) {
                    this.attackENLAIRE = false
                    this.changeState(FighterState.FOR_JUMP_h_KICK)
                }

            }
            if (this.cunrentState == FighterState.JUMP_FORWARD || this.cunrentState == FighterState.JUMP_END) {
                if (control.isHeavyPunch(this.playerId)) {
                    if (this.velocity.y > -300) {
                        //this.velocity.y = -300

                    }
                    this.attackENLAIRE = false
                    this.changeState(FighterState.FOR_JUMP_h_PUNCH)
                }

                if (control.isHeavykick(this.playerId)) {
                    if (this.velocity.y > -300) {
                        //this.velocity.y = -300
                    }


                    this.attackENLAIRE = false
                    this.changeState(FighterState.FOR_JUMP_h_KICK)
                }
            }
        }
        if (this.name === "HONDA") {
            if (this.cunrentState == FighterState.JUMP_UP || this.cunrentState == FighterState.JUMP_END) {
                if (control.isLightPunch(this.playerId)) {
                    //this.velocity.y = -300
                    this.attackENLAIRE = false
                    this.changeState(FighterState.JUMP_PUNCH)
                }
                if (control.isMediumPunch(this.playerId)) {
                    //this.attackENLAIRE = false
                    this.changeState(FighterState.JUMP_PUNCH)
                }
                if (control.isHeavyPunch(this.playerId)) {
                    this.attackENLAIRE = false
                    this.changeState(FighterState.JUMP_h_PUNCH)
                }
                if (control.isLightkick(this.playerId)) {

                    this.attackENLAIRE = false
                    this.changeState(FighterState.JUMKICK)
                }
                if (control.isMediumkick(this.playerId)) {
                    this.attackENLAIRE = false
                    this.changeState(FighterState.JUMKICK)
                }
                if (control.isHeavykick(this.playerId)) {
                    this.attackENLAIRE = false
                    this.changeState(FighterState.JUMKICK)
                }

            }
            if (this.cunrentState == FighterState.JUMP_FORWARD || this.cunrentState == FighterState.JUMP_END) {
                if (control.isLightPunch(this.playerId)) {
                    if (this.velocity.y > -300) {
                        //this.velocity.y = -300

                    }
                    this.attackENLAIRE = false
                    this.changeState(FighterState.FOR_JUMP_PUNCH)
                }

                if (control.isMediumPunch(this.playerId)) {
                    if (this.velocity.y > -300) {
                        //this.velocity.y = -300
                    }


                    this.attackENLAIRE = false
                    this.changeState(FighterState.FOR_JUMP_PUNCH)
                }
                if (control.isLightkick(this.playerId)) {
                    if (this.velocity.y > -300) {
                        //this.velocity.y = -300
                    }


                    this.attackENLAIRE = false
                    this.changeState(FighterState.FOR_JUMP_KICK)
                }
            }
        }
        if (this.name === "CHUNLI") {
            if (this.cunrentState == FighterState.JUMP_UP || this.cunrentState == FighterState.JUMP_END) {
                if (control.isLightPunch(this.playerId)) {
                    //this.velocity.y = -300
                    this.attackENLAIRE = false
                    this.changeState(FighterState.JUMP_PUNCH)
                }
                if (control.isMediumPunch(this.playerId)) {
                    //this.attackENLAIRE = false
                    this.changeState(FighterState.JUMP_PUNCH)
                }
                if (control.isHeavyPunch(this.playerId)) {
                    this.attackENLAIRE = false
                    1
                }
                if (control.isLightkick(this.playerId)) {

                    this.attackENLAIRE = false
                    this.changeState(FighterState.JUMKICK)
                }
                if (control.isMediumkick(this.playerId)) {
                    this.attackENLAIRE = false
                    this.changeState(FighterState.JUMKICK)
                }
                if (control.isHeavykick(this.playerId)) {
                    this.attackENLAIRE = false
                    this.changeState(FighterState.JUMP_h_KICK)
                }

            }
            if (this.cunrentState == FighterState.JUMP_FORWARD || this.cunrentState == FighterState.JUMP_END) {
                if (control.isLightPunch(this.playerId)) {
                    if (this.velocity.y > -300) {
                        //this.velocity.y = -300
                    }


                    this.attackENLAIRE = false
                    this.changeState(FighterState.FOR_JUMP_PUNCH)
                }
                if (control.isMediumPunch(this.playerId)) {
                    if (this.velocity.y > -300) {
                        // this.velocity.y = -300
                    }
                    this.attackENLAIRE = false
                    this.changeState(FighterState.FOR_JUMP_PUNCH)
                }
                if (control.isHeavyPunch(this.playerId)) {
                    if (this.velocity.y > -300) {
                        //this.velocity.y = -300

                    }
                    this.attackENLAIRE = false
                    this.changeState(FighterState.FOR_JUMP_PUNCH)
                }
                if (control.isLightkick(this.playerId)) {
                    if (this.velocity.y > -300) {
                        //this.velocity.y = -300
                    }


                    this.attackENLAIRE = false
                    this.changeState(FighterState.FOR_JUMP_KICK)
                }

                if (control.isMediumkick(this.playerId)) {
                    if (this.velocity.y > -300) {
                        // this.velocity.y = -300
                    }
                    this.attackENLAIRE = false
                    this.changeState(FighterState.FOR_JUMP_KICK)
                }
                if (control.isHeavykick(this.playerId)) {
                    if (this.velocity.y > -300) {
                        //this.velocity.y = -300
                    }


                    this.attackENLAIRE = false
                    this.changeState(FighterState.FOR_JUMP_h_KICK)
                }
            }

            if (this.wallJump) {
                if (this.attackENLAIRE) {
                    if (this.position.x > 960 && this.animationFrame >= 3) {

                        this.changeState(FighterState.JUMPWALL)

                    }
                    if (this.position.x < 310 && this.animationFrame >= 3) {
                        this.changeState(FighterState.JUMPWALL)
                    }
                }
            }
        }
        if (this.animations[this.cunrentState][this.animationFrame][1] === -1) {
            this.changeState(FighterState.JUMP_END);
        }
        this.velocity.y += this.gravity * time.secondpassed;
        if (this.position.y > STAGEFLOOR) {
            this.position.y = STAGEFLOOR;
            this.changeState(FighterState.JUMP_LAND);
        }




        if (this.animations[this.cunrentState][this.animationFrame][1] === -1) {
            this.changeState(FighterState.JUMP_END);
        }
    }

    handleCrouchDownState() {
        this.handleIdleInit();
        if (this.animations[this.cunrentState][this.animationFrame][1] == -2) {
            this.changeState(FighterState.CROUCH);
        }
        if (!control.isDown(this.playerId)) {
            this.cunrentState = FighterState.CROUCH_UP
            this.animationFrame = this.animations[FighterState.CROUCH_UP][this.animationFrame].length
                - this.animationFrame;
        }

    }
    handleCrouchUpState() {
        if (this.animations[this.cunrentState][this.animationFrame][1] == -2) {
            this.changeState(FighterState.IDLE);
        }

    }

    handleJumpStartState() {

        if (this.animations[this.cunrentState][this.animationFrame][1] === -2) {
            if (control.isBackward(this.playerId, this.direction)) {
                this.changeState(FighterState.JUMP_BACKWARD);
            } else if (control.isForward(this.playerId, this.direction)) {
                this.changeState(FighterState.JUMP_FORWARD);
            } else {
                this.changeState(FighterState.JUMP_UP);
            }
        }
    }

    handleJumpLandState() {

        if (this.animationFrame < 1) return;

        let newState = FighterState.IDLE;
        if (!control.isIDle(this.playerId)) {
            if (control.isUp(this.playerId)) {
                newState = FighterState.JUMP_START;
            }
        } else if (this.animations[this.cunrentState][this.animationFrame][1] != -2) {
            return;
        }


        this.changeState(newState);
    }
    handleStandartLightAttackState() {

        if (this.animationFrame < 3) return
        if (control.isLightPunch(this.playerId)) this.animationFrame = 0;
        if (!this.animations[this.cunrentState][this.animationFrame][1] == -2) return;
        this.changeState(FighterState.IDLE)
    }
    handleStandartCrouchHKickState() {
        if (this.animationFrame < 5) return

        if (!this.animations[this.cunrentState][this.animationFrame][1] == -2) return;
        this.changeState(FighterState.CROUCH)
    }
    handleStandartCrouchLKickState() {
        if (this.animationFrame < 3) return
        if (!this.animations[this.cunrentState][this.animationFrame][1] == -2) return;
        this.changeState(FighterState.CROUCH)
    }
    handleStandartcrouchAttackState() {
        if (this.animationFrame < 3) return
        if (control.isLightPunch(this.playerId)) this.animationFrame = 0;
        if (!this.animations[this.cunrentState][this.animationFrame][1] == -2) return;
        this.changeState(FighterState.CROUCH)
    }
    handleStandartTacleAttackState() {
        if (this.animationFrame < 2) return

        if (!this.animations[this.cunrentState][this.animationFrame][1] == -2) return;
        this.changeState(FighterState.CROUCH)
    }
    handleStandartCROUCHMAttackState() {
        if (this.animationFrame < 4) return

        if (!this.animations[this.cunrentState][this.animationFrame][1] == -2) return;
        this.changeState(FighterState.CROUCH)
    }
    handleStandartCROUCHhAttackState() {
        if (this.animationFrame < 3) return

        if (!this.animations[this.cunrentState][this.animationFrame][1] == -2) return;
        this.changeState(FighterState.CROUCH)
    }

    handleStandartTornadoAttackState(time) {
        this.velocity.x = 300;
        this.position.y = STAGEFLOOR;
        if (this.animationFrame == 8 && this.attackStruck == false) {
            this.attackStruck = true
        }
        if (this.animationFrame == 6) {
            this.attackStruck = false
        }

        if (this.animationFrame < 10) return
        if (control.isLightPunch(this.playerId)) this.animationFrame = 0;
        if (!this.animations[this.cunrentState][this.animationFrame][1] == -2) return;
        this.changeState(FighterState.IDLE)

    }
    handleStandartMedAttackState() {

        if (this.animationFrame < 5) return
        if (control.isMediumPunch(this.playerId)) this.animationFrame = 0;
        if (!this.animations[this.cunrentState][this.animationFrame][1] == -2) return;
        this.changeState(FighterState.IDLE)
    }
    handleStandartLightkickState() {

        if (this.animationFrame < 5) return
        if (control.isLightkick(this.playerId)) this.animationFrame = 0;
        if (!this.animations[this.cunrentState][this.animationFrame][1] == -2) return;
        this.changeState(FighterState.IDLE)
    }
    handleStandartChut1AttackState() {
        this.auSol = true
        if (this.animationFrame < 7) return
        if (!this.animations[this.cunrentState][this.animationFrame][1] == -2) return;
        this.auSol = false
        this.changeState(FighterState.IDLE)


    }
    handleStandartMedkickState() {


        if (this.animationFrame < 4) return
        if (!this.animations[this.cunrentState][this.animationFrame][1] == -2) return;
        this.changeState(FighterState.IDLE)
    }
    handleHurtState() {

        if (this.animations[this.cunrentState][this.animationFrame][1] === -2) {
            this.idleMod(); // Transition back to idle state
        }
    }
    chut() {

        gameState.fighters[this.opponent.playerId].score += FighterAttacksBaseData[FighterAttackStrenght.LIGHT].score
        gameState.fighters[this.playerId].hitPoints -= FighterAttacksBaseData[FighterAttackStrenght.LIGHT].damage
        this.opponent.changeState(FighterState.CHUT1)
        const { velocity, friction } = FighterAttacksBaseData[FighterAttackStrenght.HEAVY].slide
        this.opponent.slideVelocity = velocity
        this.opponent.slideFriction = friction
        this.attackStruck = true
        this.opponent.invulnerable = true
    }
    handleAttackHit(attackStrenght, hitLocatio) {
        if (this.opponent.cunrentState == FighterState.HyakuRestu) {
            gameState.fighters[this.playerId].score += FighterAttacksBaseData[attackStrenght].score
            gameState.fighters[this.opponent.playerId].hitPoints -= 5
        } else {
            gameState.fighters[this.playerId].score += FighterAttacksBaseData[attackStrenght].score
            gameState.fighters[this.opponent.playerId].hitPoints -= FighterAttacksBaseData[attackStrenght].damage
        }

        const newState = this.getHitState(attackStrenght, hitLocatio)

        const { velocity, friction } = FighterAttacksBaseData[attackStrenght].slide
        this.slideVelocity = velocity
        this.slideFriction = friction
        this.attackStruck = true

        this.changeState(newState)
    }
    handleStandartHyakuRestuAttackState(time) {
        this.velocity.x = 100;
        if (this.animationFrame > this.oldAnimationFrame) {
            this.attackStruck = false
        }

        this.oldAnimationFrame = this.animationFrame
        if (this.animationFrame < 6) return
        if (!this.animations[this.cunrentState][this.animationFrame][1] == -2) return;
        this.changeState(FighterState.IDLE)

    }

    idleMod() {

        this.changeState(FighterState.IDLE)
    }
    updateStageConstraints(time, context, camera) {
        // const width = 32

        if (this.position.x > camera.position.x + context.canvas.width - this.boxe.push.width) {

            this.position.x = camera.position.x + context.canvas.width - this.boxe.push.width;
            this.resetSlide(true);
        }
        if (this.position.x < camera.position.x + this.boxe.push.width) {

            this.position.x = camera.position.x + this.boxe.push.width;
            this.resetSlide(true);
        }

        if (this.hasCollidedwithOpponent()) {
            if (this.position.x <= this.opponent.position.x) {
                this.position.x = Math.max(
                    (this.opponent.position.x + this.opponent.boxe.push.x) - (this.boxe.push.x + this.boxe.push.width),
                    camera.position.x + this.boxe.push.width,
                );
                if ([FighterState.IDLE, FighterState.CROUCH, FighterState.JUMP_UP, FighterState.JUMP_FORWARD, FighterState.JUMP_BACKWARD].includes(this.opponent.cunrentState)) {
                    this.opponent.position.x += 66 * time.secondpassed;
                }
            }
            if (this.position.x >= this.opponent.position.x) {



                if ([FighterState.IDLE, FighterState.CROUCH, FighterState.JUMP_UP, FighterState.JUMP_FORWARD, FighterState.JUMP_BACKWARD].includes(this.opponent.cunrentState)) {
                    if (control.isLeft(this.playerId)) {
                        this.velocity.x = 100;
                        if ([FighterState.JUMP_FORWARD, FighterState.JUMP_BACKWARD].includes(this.opponent.cunrentState)) {
                            this.velocity.x = 100;
                        }
                    }


                    this.opponent.position.x -= 66 * time.secondpassed;

                }

            }
        }
    }

    updateAnimation(time) {

        const animation = this.animations[this.cunrentState];
        const [, frameDeley] = animation[this.animationFrame];

        if (time.previous <= this.animationTimer + frameDeley) return;
        this.animationTimer = time.previous;
        this.animationFrame++;

        if (this.animationFrame >= animation.length) {
            this.animationFrame = 0; // Reset to the first frame or handle differently
        }

        if (frameDeley > 0) {
            this.boxe = this.getBox(animation[this.animationFrame][0]);
        }
    }
    updateAttackBoxCollided(time) {
        if (this.opponent.invulnerable == true) return
        if (!this.states[this.cunrentState].attackType || this.attackStruck) return;

        if (this.opponent.auSol == false) {
            const { attackStrenght, attackType } = this.states[this.cunrentState]

            const actualHitnox = getActualBoxDimensions(this.position, this.direction, this.boxe.hit);


            for (const [hurtlocation, hurtbox] of Object.entries(this.opponent.boxe.hurt)) {
                const [x, y, width, height] = hurtbox;

                const actualOpponentHurBox = getActualBoxDimensions(
                    this.opponent.position,
                    this.opponent.direction,
                    { x, y, width, height },
                );



                if (boxOverlap(actualHitnox, actualOpponentHurBox)) {
                    const strenght = this.states[this.cunrentState].attackStrenght;
                    const hitPosition = {
                        x: (actualHitnox.x + (actualHitnox.width / 2) + actualOpponentHurBox.x + (actualOpponentHurBox.width / 2)) / 2,
                        y: (actualHitnox.y + (actualHitnox.height / 2) + actualOpponentHurBox.y + (actualOpponentHurBox.height / 2)) / 2,
                    }

                    hitPosition.x -= 4 - Math.random() * 8
                    hitPosition.y -= 4 - Math.random() * 8

                    this.onAttackHit(time, this.playerId, this.opponent.playerId, hitPosition, strenght)
                    if (this.states[this.cunrentState].type) {

                        this.chut()
                        return
                    }
                    console.log(hurtlocation)
                    this.opponent.handleAttackHit(attackStrenght, hurtlocation)

                    this.attackStruck = true
                    return;
                }
            }
        }
    }
    updateSlide(time) {

        if (this.slideVelocity >= 0) return;
        this.slideVelocity += this.slideFriction * time.secondpassed
        if (this.slideVelocity < 0) {
            return;
        }
        this.resetSlide();


    }

    updatePosition(time) {
        this.position.x += ((this.velocity.x + this.slideVelocity) * this.direction) * time.secondpassed
        this.position.y += this.velocity.y * time.secondpassed;
    }
    updateSpecialMoves(time) {
        for (const specialMove of this.specialMove) {
            const resultArgs = hasSpecialMoveBeenExecuted(specialMove, this.playerId, time)
            if (resultArgs) this.changeState(specialMove.state, time, resultArgs)
        }
    }

    update(time, context, camera) {

        this.camera = camera


        if ([FighterState.IDLE, FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD, FighterState.CROUCH, FighterState.CROUCH_DOWN].includes(this.cunrentState)) {
            this.direction = this.getDirection();
        }


        this.states[this.cunrentState].update(time, context)
        this.updateSpecialMoves(time)
        this.updateSlide(time);
        this.updatePosition(time);
        this.updateAnimation(time);
        this.updateStageConstraints(time, context, camera);
        this.updateAttackBoxCollided(time);
    }

    drawDebugBox(context, camera, dimensions, baseColor) {
        if (!Array.isArray(dimensions)) return;
        const [x = 0, y = 0, width = 0, height = 0] = dimensions
        context.beginPath();
        context.strokeStyle = baseColor + 'AA';
        context.fillStyle = baseColor + '44';
        context.fillRect(
            Math.floor(this.position.x + (x * this.direction) - camera.position.x) + 0.5,
            Math.floor(this.position.y + y - camera.position.y) + 0.5,
            width * this.direction,
            height,
        )
        context.rect(
            Math.floor(this.position.x + (x * this.direction) - camera.position.x) + 0.5,
            Math.floor(this.position.y + y - camera.position.y) + 0.5,
            width * this.direction,
            height,
        );
        context.stroke();
    }

    drawDebug(context, camera) {
        const [frameKey] = this.animations[this.cunrentState][this.animationFrame];
        const boxe = this.getBox(frameKey);

        this.drawDebugBox(context, camera, Object.values(boxe.push), '#55FF55')

        for (const hurtbox of Object.values(boxe.hurt)) {
            this.drawDebugBox(context, camera, hurtbox, '#7777FF')
        }
        this.drawDebugBox(context, camera, Object.values(boxe.hit), '#FF0000')
        context.lineWidth = 1;
        context.beginPath();
        context.strokeStyle = 'white';
        context.moveTo(
            Math.floor(this.position.x - camera.position.x) - 4,
            Math.floor(this.position.y - camera.position.y) - 0.5)
        context.lineTo(
            Math.floor(this.position.x - camera.position.x) + 5,
            Math.floor(this.position.y - camera.position.y - 0.5))
        context.moveTo(
            Math.floor(this.position.x - camera.position.x) + 0.5,
            Math.floor(this.position.y - camera.position.y) - 5)
        context.lineTo(
            Math.floor(this.position.x - camera.position.x) + 0.5,
            Math.floor(this.position.y - camera.position.y) + 5)
        context.stroke()
    }

    draw(context, camera) {
        const [frameKey] = this.animations[this.cunrentState][this.animationFrame];
        const [[
            [x, y, width, height], [originX, originY]]] = this.frame.get(frameKey);
        let scaleFactor = 1;
        if (this.name == "CHUNLI") {
            scaleFactor = 1.25;
            if (this.cunrentState == FighterState.HyakuRestu) {
                scaleFactor = 1.1;
            }
            if (this.cunrentState == FighterState.WIN) {
                scaleFactor = 1.2;
            }
        }
        if (this.name == "GOJO") {
            scaleFactor = 1.55;
        }
        if (this.name == "YUTA") {
            scaleFactor = 1.70;
            if (this.cunrentState == FighterState.CROUCH) {
                scaleFactor = 1.5;
            }
        }

        context.scale(this.direction, 1);
        context.drawImage(
            this.image,
            x,
            y,
            width, height,
            Math.floor((this.position.x - camera.position.x) * this.direction) - originX,
            Math.floor(this.position.y - camera.position.y) - originY,
            width * scaleFactor, // Largeur agrandie
            height * scaleFactor // Hauteur agrandie
        );
        context.setTransform(1, 0, 0, 1, 0, 0);

        this.drawDebug(context, camera)
    }

}