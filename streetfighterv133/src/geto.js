import { Control } from "./constants/control.js";
import { FIGHTER_HURT_DELAY, FighterAttackStrenght, FighterAttackType, FighterState, HurtBox, PushBox, SpecialMoveButton, SpecialMoveDirection } from "./constants/fighter.js";
import { STAGEFLOOR } from "./constants/stage.js";
import { Fighter } from "./fighter.js";
import { BigFleau } from "./special/bigfleau.js";
import { Fireball } from "./special/fireball.js";
import { GetoDragon } from "./special/getoDragon.js";
import { GetoSpirite1 } from "./special/getoSpirite1.js";
import { GojoBlue } from "./special/gojoBlue.js";
import { GojoPurple } from "./special/gojoPurple.js";
import { GojoRed } from "./special/gojoRed.js";
import { kikouken } from "./special/kikouken.js";
import { milePatte } from "./special/milePatte.js";
import { SmashPunch } from "./special/smashpunch.js";
export class Geto extends Fighter {
  timerId = null;
  constructor(x, y, direction, playerId, onAttackHit, entityList) {
    super('GETO', x, y, direction, playerId, onAttackHit);
    this.entityList = entityList

    this.image = document.querySelector('img[alt="geto"]');
    this.imageCurse = document.querySelector('img[alt="gojoC"]');
    this.states[FighterState.SPECIAL_1] = {
      init: this.handleHadoukenInit.bind(this),
      update: this.handleHadoukenState.bind(this),
      shadow: [1.6, 1, -8, 0],
      validFrom: [
        FighterState.IDLE, FighterState.WALK_BACKWARD, FighterState.WALK_FORWARD, FighterState.CROUCH, FighterState.CROUCH_DOWN, FighterState.CROUCH_UP,
      ],



    }
    this.states[FighterState.Red] = {
      init: this.handleRedInit.bind(this),
      update: this.handleRedState.bind(this),
      validFrom: [
        FighterState.IDLE, FighterState.WALK_BACKWARD, FighterState.WALK_FORWARD, FighterState.CROUCH, FighterState.CROUCH_DOWN, FighterState.CROUCH_UP,
      ],



    },
    
      this.states[FighterState.SmachPunch] = {
        attackType: FighterAttackType.PUNCH,
        attackStrenght: FighterAttackStrenght.HEAVY,
        init: this.handleSmachInit.bind(this),
        update: this.handleSmachState.bind(this),
        validFrom: [
          FighterState.IDLE, FighterState.WALK_BACKWARD, FighterState.WALK_FORWARD, FighterState.CROUCH, FighterState.CROUCH_DOWN, FighterState.CROUCH_UP,
        ],



      },
      this.states[FighterState.AirRed] = {
        attackType: FighterAttackType.PUNCH,
        attackStrenght: FighterAttackStrenght.MEDIUM,
        init: this.handleAirRedInit.bind(this),
        update: this.handleAirRedState.bind(this),
        validFrom: [
          FighterState.IDLE, FighterState.WALK_BACKWARD, FighterState.WALK_FORWARD, FighterState.CROUCH, FighterState.CROUCH_DOWN, FighterState.CROUCH_UP, FighterState.JUMP_FORWARD, FighterState.JUMP_START, FighterState.JUMP_UP, FighterState.JUMP_END
        ],



      }
    this.states[FighterState.Purple] = {
      init: this.handleHadoukenInit.bind(this),
      update: this.handlePurpleState.bind(this),
      shadow: [1.6, 1, -8, 0],
      validFrom: [
        FighterState.IDLE, FighterState.WALK_BACKWARD, FighterState.WALK_FORWARD, FighterState.CROUCH, FighterState.CROUCH_DOWN, FighterState.CROUCH_UP,
      ],



    }
    this.states[FighterState.Enter] = {
      init: this.handleEnterInit.bind(this),
      update: this.handleEnterState.bind(this),
      validFrom: [
        FighterState.IDLE, FighterState.WALK_BACKWARD, FighterState.WALK_FORWARD, FighterState.CROUCH, FighterState.CROUCH_DOWN, FighterState.CROUCH_UP,
      ],



    }
    this.states[FighterState.Expansion] = {
      init: this.handleExpensionInit.bind(this),
      update: this.handleExpensionState.bind(this),
      validFrom: [
        FighterState.IDLE, FighterState.WALK_BACKWARD, FighterState.WALK_FORWARD, FighterState.CROUCH, FighterState.CROUCH_DOWN, FighterState.CROUCH_UP,
      ],



    }
    this.states[FighterState.TORNADE] = {
        attackType: FighterAttackType.PUNCH,
        attackStrenght: FighterAttackStrenght.HEAVY,
        init: () => { this.velocity.x = 300 },
        update: this.handleStandartTornadoAttackState.bind(this),
        validFrom: [FighterState.IDLE, FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD, FighterState.CROUCH, FighterState.CROUCH_DOWN, FighterState.CROUCH_UP],
    }
    this.states[FighterState.BigFleau] = {
      init:this.handleStandartBigFleauInit.bind(this),
      update: this.handleStandartBigFleauState.bind(this),
      validFrom: [FighterState.IDLE, FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD, FighterState.CROUCH, FighterState.CROUCH_DOWN, FighterState.CROUCH_UP],
  }
   
   
    this.states[FighterState.IDLE].validFrom = [...this.states[FighterState.IDLE].validFrom, FighterState.SPECIAL_1]
    this.frame = new Map([
      ['idle-1', [[[990, 98, 37, 61], [33, 87]], PushBox.IDLE, HurtBox.IDLE]],
      ['idle-2', [[[1660, 99, 35, 60], [36, 85]], PushBox.IDLE, HurtBox.IDLE]],
      ['idle-3', [[[317, 97, 39, 62], [36, 88]], PushBox.IDLE, HurtBox.IDLE]],
      ['idle-4', [[[101, 390, 30, 62], [26.1, 80]], PushBox.IDLE, HurtBox.IDLE]],



      ['forwards-1', [[[15101, 352, 38, 64], [27, 90]], PushBox.IDLE, HurtBox.FORWARD]],
      ['forwards-2', [[[15774, 351, 35, 65], [30, 93]], PushBox.IDLE, HurtBox.FORWARD]],
      ['forwards-3', [[[16450, 351, 27, 65], [25, 93]], PushBox.IDLE, HurtBox.FORWARD]],
      ['forwards-4', [[[17121, 351, 28, 64], [22, 93]], PushBox.IDLE, HurtBox.FORWARD]],
      ['forwards-5', [[[17791, 353, 33, 62], [25, 88]], PushBox.IDLE, HurtBox.FORWARD]],


      ['backwards-1', [[[874, 992, 62, 95], [35, 85]], PushBox.IDLE, HurtBox.BACKWARD]],
      ['backwards-2', [[[809, 992, 62, 95], [36, 87]], PushBox.IDLE, HurtBox.BACKWARD]],
      ['backwards-3', [[[744, 992, 62, 95], [36, 88]], PushBox.IDLE, HurtBox.BACKWARD]],
      ['backwards-4', [[[672, 992, 62, 95], [38, 89]], PushBox.IDLE, HurtBox.BACKWARD]],
      ['backwards-5', [[[598, 992, 62, 95], [36, 87]], PushBox.IDLE, HurtBox.BACKWARD]],

      ['jump-1', [[[5020, 862, 38, 67], [32, 107]], PushBox.JUMP, HurtBox.JUMP]],
      ['jump-2', [[[5690, 864, 42, 61], [25, 103]], PushBox.JUMP, HurtBox.JUMP]],
      ['jump-3', [[[98, 712, 45, 69], [25, 88]], PushBox.JUMP, HurtBox.JUMP]],
      ['jump-4', [[[148, 707, 34, 76], [28, 101]], PushBox.JUMP, HurtBox.JUMP]],
      ['jump-5', [[[614, 44, 62, 96], [25, 106]], PushBox.JUMP, HurtBox.JUMP]],
      ['jump-6', [[[549, 44, 62, 112], [31, 113]], PushBox.JUMP, HurtBox.JUMP]],
      ['wall-jump-1', [[[1128, 143, 46, 64], [48, 113]], PushBox.JUMP, HurtBox.JUMP]],

      ['jump-roll-1', [[[907, 13, 36, 99], [25, 106]], PushBox.JUMP, [
        [-11, -106, 24, 16], [-26, -90, 40, 42], [-26, -31, 40, 32]
      ]]],
      ['jump-roll-2', [[[946, 19, 58, 79], [22, 90]], PushBox.JUMP, [
        [-17, -90, 24, 16], [-14, -91, 40, 42], [-22, -66, 38, 18]
      ]]],
      ['jump-roll-3', [[[1008, 22, 71, 85], [22, 76]], PushBox.JUMP, [
        [22, -54, 24, 16], [-14, -81, 40, 42], [-22, -66, 38, 18]
      ]]],
      ['jump-roll-4', [[[1121, 19, 70, 94], [22, 76]], PushBox.JUMP, [
        [22, -54, 24, 16], [-14, -81, 40, 42], [-22, -66, 38, 18]
      ]]],

      ['jump-roll-5', [[[1191, 19, 77, 74], [22, 76]], PushBox.JUMP, [
        [-72, -56, 24, 16], [-40, -77, 52, 40], [-14, -82, 48, 34]

      ]]],

      ['jump-roll-6', [[[1268, 13, 34, 101], [22, 76]], PushBox.JUMP, [[-55, -100, 24, 16], [-48, -87, 44, 38], [-22, -66, 38, 18]]]],

      ['jump-land', [[[4, 391, 29, 66], [22, 83]], PushBox.IDLE, HurtBox.IDLE]],
      ['crouch-1', [[[316, 1129, 41, 46], [27, 55]], PushBox.IDLE, HurtBox.IDLE]],
      ['crouch-2', [[[8374, 1127, 50, 50], [27, 57]], PushBox.BEND, [
        [10, -50, 24, 18],
        [-13, -32, 44, 24],
        [-13, -8, 44, 24]
      ]]],
      ['crouch-3', [[[9053, 1124, 37, 55], [32, 75]], PushBox.CROUCH, HurtBox.CROUCH]],

      ['idle-turn-1', [[[874, 636, 62, 95], [29, 92]], PushBox.IDLE]],
      ['idle-turn-2', [[[800, 620, 62, 110], [30, 94]], PushBox.IDLE]],
      ['idle-turn-3', [[[742, 636, 62, 94], [27, 90]], PushBox.IDLE]],

      ['crouch-turn-1', [[[874, 830, 2, 64], [26, 58]], PushBox.CROUCH]],
      ['crouch-turn-2', [[[808, 830, 64, 64], [27, 58]], PushBox.CROUCH]],
      ['crouch-turn-3', [[[743, 830, 64, 64], [29, 58]], PushBox.CROUCH]],

      ['light-punch-1', [[[16444, 97, 40, 60], [35, 88]], PushBox.IDLE, HurtBox.IDLE]],
      ['light-punch-2', [[[17108, 97, 55, 61], [50, 88]], PushBox.IDLE, HurtBox.IDLE, [30, -80, 80, 50]]],
      ['light-punch-3', [[[17769, 93, 77, 69], [30, 94]], PushBox.IDLE, HurtBox.IDLE, [40, -55, 30, 50]]],
      ['light-punch-4', [[[18437, 95, 84, 65], [30, 94]], PushBox.IDLE, HurtBox.IDLE, [40, -55, 30, 50]]],
      ['light-punch-5', [[[19108, 95, 89, 64], [30, 94]], PushBox.IDLE, HurtBox.IDLE, [30, -80, 80, 50]]],
      ['light-punch-6', [[[19790, 95, 67, 64], [10, 75]], PushBox.IDLE, HurtBox.IDLE, [30, -80, 80, 50]]],
      ['light-punch-7', [[[20456, 95, 80, 64], [10, 75]], PushBox.IDLE, HurtBox.IDLE, [30, -80, 80, 50]]],

      ['light-punch-1-', [[[13073, 334, 63, 99], [35, 150]], PushBox.IDLE, HurtBox.IDLE, [0, -150, 40, 60]]],
      ['light-punch-2-', [[[13749, 334, 55, 96], [30, 149]], PushBox.IDLE, HurtBox.IDLE, [0, -150, 40, 60]]],
      ['light-punch-3-', [[[14413, 350, 66, 67], [50, 93]], PushBox.IDLE, HurtBox.IDLE, [10, -80, 70, 90]]],
      ['light-punch-4-', [[[178, 1044, 47, 59], [10, 75]], PushBox.IDLE, HurtBox.IDLE]],
      ['light-punch-5-', [[[178, 1044, 47, 59], [10, 75]], PushBox.IDLE, HurtBox.IDLE, [30, -80, 70, 14]]],
      ['med-punch-1', [[[7034, 5987, 41, 58], [40, 83]], PushBox.IDLE, HurtBox.IDLE]],
      ['med-punch-2', [[[7696, 5990, 63, 54], [29, 76]], PushBox.IDLE, HurtBox.PUNCH]],
      ['med-punch-3', [[[8369, 5989, 62, 54], [24, 76]], PushBox.IDLE, HurtBox.PUNCH, [30, -60, 50, 14]]],
      ['med-punch-4', [[[148, 1127, 56, 57], [24, 72]], PushBox.IDLE, HurtBox.PUNCH, [17, -45, 50, 10]]],
      ['med-punch-5', [[[204, 1125, 55, 58], [24, 75]], PushBox.IDLE, HurtBox.PUNCH, [17, -45, 50, 10]]],
      ['heavy-punch-1', [[[436, 144, 63, 79], [30, 82]], PushBox.IDLE, HurtBox.PUNCH]],
      ['heavy-punch-2', [[[505, 147, 79, 79], [30, 82]], PushBox.IDLE, HurtBox.PUNCH, [17, -70, 67, 14]]],
      ['heavy-punch-3', [[[587, 144, 65, 80], [30, 82]], PushBox.IDLE, HurtBox.PUNCH]],

      ['light-kick-1', [[[13082, 865, 43, 62], [50, 92]], PushBox.IDLE, [
        [-28, -79, 30, 18], [-41, -79, 42, 38], [-32, -52, 44, 50]
      ]]],
      ['light-kick-2', [[[13749, 863, 52, 65], [30, 94]], PushBox.IDLE, [
        [-40, -79, 30, 18], [-57, -79, 42, 38], [-32, -52, 44, 50],
      ], [30, -80, 20, 50]]],
      ['light-kick-3', [[[14426, 865, 43, 63], [30, 92]], PushBox.IDLE, [
        [-40, -79, 30, 18], [-57, -79, 42, 38], [-32, -52, 44, 50],
      ], [30, -80, 30, 50]]],
      ['light-kick-4', [[[498, 372, 47, 90], [30, 10]], PushBox.IDLE, [
        [-40, -79, 30, 18], [-57, -79, 42, 38], [-32, -52, 44, 50],
      ], [30, -60, 50, 18]]],

      ['med-kick-1', [[[15776, 862, 29, 66], [25, 95]], PushBox.IDLE, [
        [-40, -79, 30, 18], [-57, -79, 42, 38], [-32, -52, 44, 50]
      ]]],

      ['heavy-kick-1', [[[16433, 866, 60, 59], [40, 85]], PushBox.IDLE, [
        [-20, -75, 20, 20], [-25, -78, 42, 42], [-11, -50, 20, 50]
      ]]],
      ['heavy-kick-2', [[[17105, 866, 60, 58], [35, 83]], PushBox.IDLE, [
        [-20, -75, 20, 20], [-25, -78, 42, 42], [-11, -50, 20, 50]
      ], [8, -74, 62, 24]]],
      ['heavy-kick-3', [[[166, 1201, 56, 58], [35, 75]], PushBox.IDLE, [
        [-20, -75, 20, 20], [-25, -78, 42, 42], [-11, -50, 20, 50]
      ], [8, -67, 40, 24]]],
      ['heavy-kick-4', [[[225, 1199, 38, 61], [35, 75]], PushBox.IDLE, [
        [-20, -75, 20, 20], [-25, -78, 42, 42], [-11, -50, 20, 50]
      ]]],

      ['hit-face-1', [
        [[13077, 7010, 53, 63], [50, 75]], PushBox.IDLE, [
          [-41, -68, 20, 20], [-25, -50, 42, 50], [0,0,0,0]
        ]]],
      ['hit-face-2', [
        [[13749, 7010, 54, 64], [50, 75]], PushBox.IDLE, [
          [-41, -68, 20, 20], [-25, -50, 42, 50], [0,0,0,0]
        ]]],
      ['hit-face-3', [
        [[92, 874, 44, 63], [50, 75]], PushBox.IDLE, [
          [-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]
        ]]],
      ['hit-face-4', [
        [[308, 2150, 83, 93], [56, 901]], PushBox.IDLE,
        [[-57, -80, 20, 20], [-57, -74, 40, 46], [-35, -37, 40, 30]]
      ]],
      ['hit-stomach-1', [
        [[17117, 7004, 40, 67], [30, 78]], PushBox.IDLE, [
          [-10, -68, 20, 20], [-20, -50, 30, 42], [0,0,0,0]
        ]]],
      ['hit-stomach-2', [
        [[17110, 7268, 51, 58], [50, 78]], PushBox.IDLE, [
          [-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]
        ]]],

      ['stun-1', [
        [[858, 4452, 71, 96], [50, 78]], PushBox.IDLE, [
          [-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]
        ]]],
      ['stun-2', [
        [[777, 4453, 74, 95], [50, 78]], PushBox.IDLE, [
          [-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]
        ]]],
      ['stun-3', [
        [[684, 4457, 86, 91], [40, 78]], PushBox.IDLE, [
          [-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]
        ]]],

      //hadouken
      ['special-1', [
        [[5, 1362, 34, 66], [30, 80]], PushBox.IDLE, [
          [10, -78, 20, 20], [-10, -50, 42, 42], [-11, -50, 42, 50]
        ]]],
      ['special-2', [
        [[44, 1363, 46, 65], [30, 80]], PushBox.IDLE, [
          [20, -65, 20, 20], [-10, -50, 42, 42], [-11, -50, 42, 50]
        ]]],
      ['special-3', [
        [[94, 1363, 42, 64], [30, 80]], PushBox.IDLE, [
          [25, -75, 20, 20], [-5, -50, 42, 42], [-11, -50, 42, 50]
        ]]],
      ['special-4', [
        [[140, 1362, 41, 65], [30, 80]], PushBox.IDLE, [
          [30, -65, 20, 20], [5, -50, 42, 42], [-11, -50, 42, 50]
        ]]],
      ['crouch-punch-1', [[[9, 381, 53, 65], [40, 63]], PushBox.CROUCH, HurtBox.CROUCH]],
      ['crouch-punch-2', [[[71, 379, 82, 68], [40, 64]], PushBox.CROUCH, HurtBox.CROUCH, [13, -40, 50, 12]]],

      ['chut-1', [[[6360, 4195, 47, 58], [30, 80]]]],
      ['chut-2', [[[9039, 4200, 61, 47], [50, 55]]]],
      ['chut-3', [[[15083, 4200, 73, 46], [70, 35]]]],
      ['monte-1', [[[967, 4457, 72, 46], [60, 38]], PushBox.IDLE]],
      ['monte-2', [[[1644, 4453, 70, 53], [70, 65]], PushBox.IDLE]],
      ['monte-3', [[[2329, 4453, 51, 54], [35, 70]], PushBox.IDLE]],

      ['temp', [[[4, 391, 29, 66], [33, 83]],]],


      ['crouchtacle-1', [[[398, 385, 52, 62], [40, 53]], PushBox.CROUCH, HurtBox.CROUCH]],
      ['crouchtacle-2', [[[454, 390, 70, 56], [40, 53]], PushBox.CROUCH, HurtBox.CROUCH, [13, -4, 50, 12]]],
      ['crouchtacle-3', [[[536, 386, 52, 61], [40, 53]], PushBox.CROUCH, HurtBox.CROUCH]],

      ['win-1', [[[3681, 7775, 29, 65], [26, 95]]]],
      ['win-2', [[[31, 305, 31, 65], [30, 87]]]],
      ['win-3', [[[66, 305, 31, 65], [27, 87]]]],
      ['win-4', [[[99, 305, 31, 65], [27, 87]]]],


      ['jump-kick-1', [[[729, 3045, 143, 64], [40, 53]], PushBox.CROUCH, HurtBox.CROUCH, [13, -4, 70, 12]]],
      ['jump-kick-2', [[[647, 3045, 80, 64], [40, 53]], PushBox.JUMP, HurtBox.JUMP,]],


      ['crouch-l-1', [[[222, 386, 44, 60], [40, 50]]]],
      ['crouch-l-2', [[[273, 397, 69, 51], [40, 50]], PushBox.CROUCH, HurtBox.CROUCH, [13, -4, 50, 12]]],

      ['crouch-h-1', [[[591, 386, 52, 53], [30, 50]]]],
      ['crouch-h-2', [[[372, 1294, 54, 31], [40, 30]], PushBox.CROUCH, HurtBox.CROUCH, [25, -20, 50, 20]]],

      ['jum-up-p-1', [[[804, 362, 39, 85], [30, 80]], PushBox.CROUCH, HurtBox.CROUCH,]],
      ['jum-up-p-2', [[[843, 370, 56, 77], [20, 80]], PushBox.CROUCH, HurtBox.CROUCH, [25, -50, 50, 30]]],
      ['jum-up-p-3', [[[900, 368, 58, 80], [30, 80]], PushBox.CROUCH, HurtBox.CROUCH, , [25, -50, 50, 30]]],

      ['jump-f-1', [[[1061, 377, 39, 63], [30, 80]]]],
      ['jump-f-2', [[[1100, 373, 55, 74], [20, 80]], PushBox.JUMP, HurtBox.JUMP, [25, -50, 40, 30]]],

      ['jum-up-k-1', [[[1, 475, 39, 88], [30, 80]], PushBox.JUMP, HurtBox.JUMP,]],
      ['jum-up-k-2', [[[41, 475, 56, 87], [20, 80]], PushBox.JUMP, HurtBox.JUMP]],
      ['jum-up-k-3', [[[96, 472, 42, 91], [30, 80]], PushBox.JUMP, HurtBox.JUMP, [10, -60, 40, 50]]],


      ['jum-up-k-h-1', [[[240, 473, 47, 88], [30, 110]], PushBox.JUMP, HurtBox.JUMP,]],
      ['jum-up-k-h-2', [[[287, 473, 56, 89], [20, 110]], PushBox.JUMP, HurtBox.JUMP, [20, -60, 40, 50]]],
      ['jum-up-k-h-3', [[[345, 469, 69, 73], [30, 125]], PushBox.JUMP, HurtBox.JUMP, [20, -75, 40, 50]]],
      ['jum-up-k-h-4', [[[414, 465, 35, 95], [30, 140]], PushBox.JUMP, HurtBox.JUMP]],
      ['jum-up-k-h-5', [[[450, 468, 69, 90], [55, 150]], PushBox.JUMP, HurtBox.JUMP]],
      ['jum-up-k-h-6', [[[519, 468, 57, 94], [30, 120]], PushBox.JUMP, HurtBox.JUMP]],


      ['for-jump-f-1', [[[9050, 6243, 40, 57], [30, 80]]]],
      ['for-jump-f-2', [[[9708, 6243, 72, 54], [20, 80]], PushBox.JUMP, HurtBox.JUMP, [50, -50, 40, 30]]],



      ['jum-for-k-1', [[[244, 1283, 28, 52], [30, 80]], PushBox.JUMP, HurtBox.JUMP,]],
      ['jum-for-k-2', [[[278, 1283, 36, 50], [20, 80]], PushBox.JUMP, HurtBox.JUMP, [10, -60, 30, 50]]],
      ['jum-for-k-3', [[[319, 1283, 48, 43], [30, 80]], PushBox.JUMP, HurtBox.JUMP,]],
      ['jum-for-k-4', [[[373, 1283, 52, 46], [30, 80]], PushBox.JUMP, HurtBox.JUMP, [10, -70, 30, 50]]],
      ['jum-for-k-5', [[[436, 1281, 52, 43], [20, 80]], PushBox.JUMP, HurtBox.JUMP]],
      ['jum-for-k-6', [[[990, 473, 54, 90], [20, 80]], PushBox.JUMP, HurtBox.JUMP]],



      ['spe-1', [[[543, 594, 66, 94], [30, 90]], PushBox.IDLE, HurtBox.IDLE, [15, -90, 30, 30]]],
      ['spe-2', [[[618, 593, 79, 97], [20, 90]], PushBox.IDLE, HurtBox.IDLE, [30, -90, 30, 50]]],
      ['spe-3', [[[707, 595, 76, 93], [30, 85]], PushBox.IDLE, HurtBox.IDLE, [20, -50, 30, 30]]],
      ['spe-4', [[[797, 600, 85, 89], [30, 80]], PushBox.IDLE, HurtBox.IDLE, [30, -40, 30, 40]]],
      ['spe-5', [[[890, 601, 80, 87], [20, 80]], PushBox.IDLE, HurtBox.IDLE, [34, -62, 30, 30]]],
      ['spe-6', [[[976, 593, 92, 95], [20, 85]], PushBox.IDLE, HurtBox.IDLE, [42, -50, 30, 40]]],
      ['spe-7', [[[1075, 599, 65, 88], [20, 80]], PushBox.IDLE, HurtBox.IDLE, [20, -40, 30, 40]]],

      ['red-1', [[[5, 1279, 30, 65], [30, 85]], PushBox.IDLE, HurtBox.IDLE]],
      ['red-2', [[[43, 1279, 29, 65], [20, 85]], PushBox.IDLE, HurtBox.IDLE]],
      ['red-3', [[[78, 1280, 31, 63], [30, 85]], PushBox.IDLE, HurtBox.IDLE]],
      ['red-4', [[[117, 1283, 46, 60], [30, 80]], PushBox.IDLE, HurtBox.IDLE]],
      ['red-5', [[[167, 1286, 51, 60], [30, 75]], PushBox.IDLE, HurtBox.IDLE]],

      ['inv-1', [[[13752, 5981, 47, 68], [30, 85]], PushBox.IDLE, HurtBox.IDLE]],

      ['purple-1', [[[4, 1558, 51, 54], [30, 75]], PushBox.IDLE, HurtBox.IDLE]],
      ['purple-2', [[[62, 1558, 52, 55], [20, 75]], PushBox.IDLE, HurtBox.IDLE]],
      ['purple-3', [[[123, 1555, 50, 58], [30, 75]], PushBox.IDLE, HurtBox.IDLE]],
      ['purple-4', [[[182, 1555, 51, 58], [30, 75]], PushBox.IDLE, HurtBox.IDLE]],
      ['purple-5', [[[242, 1555, 52, 59], [30, 75]], PushBox.IDLE, HurtBox.IDLE]],
      ['purple-6', [[[302, 1555, 52, 57], [30, 75]], PushBox.IDLE, HurtBox.IDLE]],

      ['extension-1', [[[3, 1450, 32, 65], [30, 85]], PushBox.IDLE, HurtBox.IDLE]],
      ['extension-2', [[[43, 1449, 38, 66], [30, 85]], PushBox.IDLE, HurtBox.IDLE]],
      ['extension-3', [[[86, 1449, 30, 65], [25, 85]], PushBox.IDLE, HurtBox.IDLE]],
      ['extension-4', [[[130, 1449, 40, 66], [30, 87]], PushBox.IDLE, HurtBox.IDLE]],

      
      ['inv-2', [[[3003, 5470, 41, 67], [30, 95]], PushBox.IDLE, HurtBox.IDLE]],
      ['inv-3', [[[3676, 5470, 39, 67], [30, 95]], PushBox.IDLE, HurtBox.IDLE]],
      ['inv-4', [[[5016, 1372, 46, 68], [27, 87]], PushBox.IDLE, HurtBox.IDLE]],
      ['inv-5', [[[5680, 1373, 60, 67], [33, 85]], PushBox.IDLE, HurtBox.IDLE]],
      ['rai-1', [[[13711, 6741, 139, 79], [130, 120]], PushBox.IDLE, [
        [-15, -90, 24, 16],
        [-35, -74, 40, 42],
        [0,0,0,0]
    ], [-50, -70, 100, 60]]],
      ['rai-2', [[[14380, 6741, 139, 83], [130, 117]], PushBox.IDLE,[
        [-15, -90, 24, 16],
        [-35, -74, 40, 42],
        [0,0,0,0]
    ], [-50, -70, 100, 60]]],
      ['rai-3', [[[15053, 6750, 131, 73], [130, 117]], PushBox.IDLE, [
        [-15, -90, 24, 16],
        [-35, -74, 40, 42],
        [0,0,0,0]
    ], [-50, -70, 100, 60]]],
      ['rai-4', [[[15724, 6752, 134, 67], [130, 117]], PushBox.IDLE, [
        [-15, -90, 24, 16],
        [-35, -74, 40, 42],
        [0,0,0,0]
    ], [-50, -70, 100, 60]]],
      ['rai-5', [[[16394, 6750, 139, 72], [130, 117]], PushBox.IDLE, [
        [-15, -90, 24, 16],
        [-35, -74, 40, 42],
        [0,0,0,0]
    ], [-50, -70, 100, 60]]],
      ['rai-6', [[[17068, 6751, 139, 70], [130, 117]], PushBox.IDLE, [
        [-15, -90, 24, 16],
        [-35, -74, 40, 42],
        [0,0,0,0]
    ], [-50, -70, 100, 60]]],
      ['rai-7', [[[1075, 599, 65, 88], [20, 80]], PushBox.IDLE, HurtBox.IDLE, [20, -40, 30, 40]]],


      ['enter-1', [[[7, 218, 31, 66], [26, 85]], PushBox.IDLE, [
        [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]
      ]]],
      ['enter-2', [[[41, 217, 27, 66], [26.1, 85]], PushBox.IDLE, [
        [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]
      ]]],
      ['enter-3', [[[75, 218, 32, 66], [26, 85]], PushBox.IDLE, [
        [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]
      ]]],
      ['enter-4', [[[113, 219, 43, 65], [45, 85]], PushBox.IDLE, [
        [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]
      ]]],
      ['enter-5', [[[161, 218, 29, 66], [26, 85]], PushBox.IDLE, [
        [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]
      ]]],
    ]);


    /*
    this.frame = new Map([
      ['forwards-1',[[712, 765, 70, 60], [27, 81]]],
      ['forwards-2', [[810, 895, 70, 96], [22, 90]]],
      ['forwards-3', [[712, 895, 75, 93], [61, 76]]],
      ['forwards-4', [[67, 895, 75, 94], [29, 89]]],
      ['forwards-5', [[566, 895, 60, 96], [29, 89]]],
    ]);6
  */

    this.animations = {
      [FighterState.IDLE]: [['idle-1', 100], ['idle-2', 100], ['idle-3', 100], ['idle-3', 50], ['idle-1', 100]],
      [FighterState.WALK_FORWARD]: [['forwards-1', 65], ['forwards-2', 65], ['forwards-3', 65], ['forwards-4', 65], ['forwards-5', 65], ['forwards-1', 65]],
      [FighterState.WALK_BACKWARD]: [['forwards-1', 65], ['forwards-5', 65], ['forwards-4', 65], ['forwards-3', 65], ['forwards-2', 65], ['forwards-1', 65]],
      [FighterState.JUMP_UP]: [['jump-1', 100], ['jump-2', 100], ['jump-2', 100], ['jump-2', 100], ['jump-2', -1]],
      [FighterState.JUMP_FORWARD]: [['jump-1', 100], ['jump-2', 100], ['jump-2', 100], ['jump-2', 100], ['jump-roll-6', -1]],
      [FighterState.JUMP_BACKWARD]: [['jump-1', 100], ['jump-2', 100], ['jump-2', 100], ['jump-2', 100],['jump-roll-6', -1]],
      [FighterState.JUMP_END]: [['jump-1', 1]],
      [FighterState.CROUCH]: [['crouch-2', 0]],
      [FighterState.JUMP_START]: [['jump-1', 50], ['jump-1', -2]],
      [FighterState.JUMP_LAND]: [['idle-2', 33], ['idle-2', 127], ['idle-2', -2]],
      [FighterState.CROUCH_DOWN]: [['crouch-2', 30], ['crouch-2', 30], ['crouch-2', 30], ['crouch-2', -2]],
      [FighterState.CROUCH_UP]: [['crouch-3', 30], ['crouch-2', 30], ['crouch-2', 30], ['crouch-1', -2]],
      [FighterState.IDLE_TURN]: [['idle-turn-3', 33], ['idle-turn-2', 30], ['idle-turn-1', 30], ['idle-turn-1', 1]],
      [FighterState.CROUCH_TURN]: [['crouch-turn-3', 33], ['crouch-turn-2', 30], ['crouch-turn-1', 30], ['crouch-turn-1', 1]],
      [FighterState.LIGHT_PUNCH]: [['light-punch-1-', 100], ['light-punch-2-', 200], ['light-punch-3-', 100], ['light-punch-3-', 80], ['light-punch-1', -2]],
      [FighterState.MEDIUM_PUNCH]: [
        ['med-punch-1', 16],
        ['med-punch-2', 33],
        ['med-punch-2', 66],
        ['med-punch-3', 50],
        ['med-punch-3', 100],
        ['med-punch-1', -2],
      ],
      [FighterState.HEAVY_PUNCH]: [
        ['light-punch-1', 200],
        ['light-punch-1', 100],
        ['light-punch-2', 100],
        ['light-punch-3', 100],
        ['light-punch-1-', 100],
        ['light-punch-1-', 100],

        ['light-punch-1', -2],
      ],
      [FighterState.LIGHT_Kick]: [
        ['light-kick-1', 100],
        ['light-kick-1', 30],
        ['light-kick-2', 100],
        ['light-kick-2', 33],
        ['light-kick-3', 66],
        ['light-kick-3', 66],
        ['light-punch-1', -2]
      ],
      [FighterState.MEDIUM_Kick]: [['med-kick-1', 100], ['heavy-kick-1', 100], ['heavy-kick-2', 100], ['heavy-kick-2', 116], ['heavy-kick-1', -2]],
      [FighterState.HEAVY_Kick]: [
        ['med-kick-1', 100], ['heavy-kick-1', 100], ['heavy-kick-2', 100], ['heavy-kick-2', 116], ['heavy-kick-1', -2]

      ], [FighterState.HURT_HEAD_LIGHT]: [
        ['hit-face-1', FIGHTER_HURT_DELAY],
        ['hit-face-2', 65],
        ['hit-face-2', -2],

      ],
      [FighterState.SmachPunch]: [['inv-1-', 80], ['inv-1', 80], ['inv-1', 400],['light-punch-1', -2]],

      [FighterState.HURT_HEAD_MEDIUM]: [
        ['hit-face-1', FIGHTER_HURT_DELAY],
        ['hit-face-2', 48],
        ['hit-face-2', 64],
        ['hit-face-3', -2],
      ],

      [FighterState.HURT_HEAD_HEAVY]: [
        ['hit-face-1', FIGHTER_HURT_DELAY],
        ['hit-face-2', 112],
        ['hit-face-2', 112],
        ['hit-face-1', 64],

        ['hit-face-1', -2],
      ],
      [FighterState.AirRed]: [
        ['jum-for-k-1', FIGHTER_HURT_DELAY],
        ['jum-for-k-2', 112],
        ['jum-for-k-3', 112],
        ['jum-for-k-4', 500],

        ['jum-for-k-1', -1],
      ],


      [FighterState.HURT_BODY_LIGHT]: [
        ['hit-stomach-1', FIGHTER_HURT_DELAY],
        ['hit-stomach-1', 3],
        ['hit-stomach-2', -2]
      ],

      [FighterState.HURT_BODY_MEDIUM]: [
        ['hit-stomach-1', FIGHTER_HURT_DELAY],
        ['hit-stomach-2', 7],
        ['hit-stomach-2', 9],
        ['hit-stomach-2', -2]
      ],

      [FighterState.HURT_BODY_HEAVY]: [
        ['hit-face-1', FIGHTER_HURT_DELAY],
        ['hit-face-1', 3],
        ['hit-face-2', 4],
        ['hit-face-1', 4],

        ['hit-face-1', -2]
      ],
      [FighterState.SPECIAL_1]: [
        ['inv-2', 100],
        ['inv-2', 100],
        ['inv-3', 100],
        ['inv-3', 1500],
        ['special-1', -2],

      ],
      [FighterState.Enter]: [
        ['enter-1', 300],
        ['enter-2', 300],
        ['enter-3', 300],
        ['enter-4', 300],
        ['enter-5', 300],
        ['enter-1', -2],

      ],
      [FighterState.Expansion]: [
        ['extension-1', 300],
        ['extension-2', 300],
        ['extension-3', 300],
        ['extension-4', 5000],
        ['extension-1', -2],

      ],
      [FighterState.CROUCH_PUNCH]: [['crouch-punch-1', 33], ['crouch-punch-2', 33], ['crouch-punch-2', 66], ['crouch-punch-1', -2]],
      [FighterState.TORNADE]: [
        ['rai-1', 100],
        ['rai-2', 100],
        ['rai-3', 100],
        ['rai-4', 100],
        ['rai-5', 100],
        ['rai-6', 50],
        ['rai-1', 100],
        ['rai-2', 100],
        ['rai-3', 100],
        ['rai-4', 100],
        ['rai-5', 100],
        ['rai-6', 50],
        ['rai-6', 50],
        ['tornado-11', -2],
      ],
      [FighterState.CHUT1]: [

        ['chut-1', 150],
        ['chut-2', 150],
        ['chut-3', 150],
        ['monte-1', 400],
        ['monte-2', 200],
        ['monte-3', 100],
        ['monte-3', 150],
        ['temp', -2],
      ],
      [FighterState.DOWN]: [

        ['chut-1', 200],
        ['chut-2', 200],
        ['chut-3', 500],
        ['chut-3', -2],
      ],
      [FighterState.ko]: [

        ['monte-1', 200],


      ],
      [FighterState.Tacle]: [
        ['crouchtacle-1', 150],
        ['crouchtacle-2', 150],
        ['crouchtacle-3', 150],
        ['crouchtacle-3', -2],
      ],
      [FighterState.WIN]: [

        ['win-1', 50],
        ['win-1', 100],
        ['win-1', 100],
        ['win-1', 200],
        ['win-1', 100],
        ['win-1', 100],
      ],
      [FighterState.BigFleau]: [

        ['inv-1', 1400],
       
        ['inv-1', -2],
      
      ],
      //special 
      [FighterState.JUMPWALL]: [


        ['wall-jump-1', 200],


      ],
      [FighterState.CROUCH_L_Kick]: [


        ['crouch-l-1', 100],
        ['crouch-l-1', 50],
        ['crouch-l-2', 128],
        ['crouch-l-1', -2],

      ],
      [FighterState.Red]: [


        ['red-1', 100],
        ['red-2', 50],
        ['red-3', 128],
        ['red-4', 128],
        ['red-5', 128],
        ['red-1', -2],

      ],
      [FighterState.Purple]: [


        ['inv-4', 200],
        ['inv-5', 300],
        ['purple-1', -2],

      ],
      [FighterState.CROUCH_h_Kick]: [
        ['crouch-h-2', 0],

        ['crouch-h-2', 0],
        ['crouch-h-2', 50],
        ['crouch-h-2', 50],
        ['crouch-h-2', 128],
        ['crouch-h-1', -2],

      ],
      [FighterState.JUMP_PUNCH]: [
        ['jum-up-p-1', 150],
        ['jum-up-p-2', 128],
        ['jum-up-p-3', 128],
        ['jum-up-p-3', -1],
      ],
      [FighterState.FOR_JUMP_PUNCH]: [
        ['jump-f-1', 150],
        ['jump-f-2', 300],
        ['jump-f-1', -1],
      ],
      [FighterState.JUMKICK]: [
        ['jum-up-k-1', 100],
        ['jum-up-k-2', 100],
        ['jum-up-k-3', 300],

        ['jump-f-1', -1],
      ],
      [FighterState.JUMP_h_KICK]: [
        ['jum-up-k-h-1', 100],
        ['jum-up-k-h-2', 100],
        ['jum-up-k-h-3', 100],
        ['jum-up-k-h-4', 100],
        ['jum-up-k-h-5', 100],
        ['jum-up-k-h-6', 100],
        ['jum-up-k-h-6', -1],
      ],
      [FighterState.FOR_JUMP_KICK]: [
        ['for-jump-f-1', 150],
        ['for-jump-f-2', 300],
        ['for-jump-f-1', -1],
      ],
      [FighterState.FOR_JUMP_h_KICK]: [
        ['jum-for-k-1', 50
        ],
        ['jum-for-k-2', 150],
        ['jum-for-k-3', 150],
        ['jum-for-k-4', 150],
        ['jum-for-k-5', 150],
        ['jum-for-k-6', 150],
        ['jum-for-k-1', -1],
      ],
     


    }
    this.initialVelociy = {
      x: {
        [FighterState.WALK_FORWARD]: 200,
        [FighterState.WALK_BACKWARD]: -150,
        [FighterState.JUMP_FORWARD]: 170,
        [FighterState.JUMP_BACKWARD]: -200,
      },
      jump: -420,
    }
    this.specialMove = [{
      state: FighterState.SPECIAL_1,
      sequence: [
        SpecialMoveDirection.DOWN,
        SpecialMoveDirection.FORWARD,
        SpecialMoveButton.M_PUNCH],
      cursor: 0,
    }, {
      state: FighterState.TORNADE,
      sequence: [
        SpecialMoveDirection.DOWN,
        SpecialMoveDirection.BACKWARD,
        SpecialMoveButton.ANY_PUNCH],
      cursor: 0,
    },
    /*{
      state: FighterState.Expansion,
      sequence: [
        SpecialMoveDirection.BACKWARD,
        SpecialMoveDirection.FORWARD,
        SpecialMoveButton.ANY_PUNCH],
      cursor: 0,
      couuldown: 60,



    },*/
    {
      state: FighterState.BigFleau,
      sequence: [
        SpecialMoveDirection.BACKWARD,
        SpecialMoveDirection.FORWARD,
        SpecialMoveButton.H_Kick],
      cursor: 0,
      couuldown: 60,



    },
    {
      state: FighterState.SmachPunch,
      sequence: [
        SpecialMoveDirection.FORWARD,
        SpecialMoveButton.H_PUNCH],
      cursor: 0,
    },
  {
      state: FighterState.Purple,
      sequence: [
        SpecialMoveDirection.BACKWARD,
        SpecialMoveDirection.FORWARD,
        SpecialMoveButton.ANY_KICK],
      cursor: 0,
      couuldown: 60,



    },
    {
      state: FighterState.FOR_JUMP_KICK ,
      sequence: [
        SpecialMoveDirection.UP,
        SpecialMoveButton.L_Kick],
      cursor: 0,
    },
    



    ]
    this.gravity = 900;
    this.fireball = { fired: false, strength: Control.MEDIUM_PUNCH }

  }
  handleRedInit(_, strenght) {
    this.resetVelocities();

    this.fireball = { fired: false, strength: Control.MEDIUM_PUNCH }
  }
  handleRedState(time) {
    if (!this.fireball.fired && this.animationFrame == 3) {
      this.fireball.fired = true;
      this.entityList.addEntity.call(this.entityList, GojoRed, this, time, this.fireball.strength);
      this.red = true
    }

    if (this.animations[this.cunrentState][this.animationFrame][1] != -2) return;
    this.changeState(FighterState.IDLE)
  }
  startTimer() {
    // Si un timer est déjà en cours, le réinitialiser
    if (this.timerId) {
      clearTimeout(this.timerId);
    }

    // Démarrer un nouveau timer
    this.timerId = setTimeout(() => {
      this.opponent.ult = false;
      this.timerId = null; // Réinitialiser l'ID une fois terminé
    }, 6000); // 10 secondes
  }
  handleHadoukenInit(_, strenght) {

    this.resetVelocities();

    this.fireball = { fired: false, strength: Control.MEDIUM_PUNCH }
  }
  handleHadoukenState(time) {

    if (!this.fireball.fired && this.animationFrame == 3) {
      this.fireball.fired = true;
      this.entityList.addEntity.call(this.entityList, GetoDragon, this, time, this.fireball.strength);
      this.blue = true
    }

    if (this.animations[this.cunrentState][this.animationFrame][1] != -2) return;
    this.changeState(FighterState.IDLE)
  }
  handleSmachInit() {
    this.resetVelocities();

    this.fireball = { fired: false, strength: Control.MEDIUM_PUNCH }
  }
  handleSmachState(time) {
    if (!this.fireball.fired) {
      this.fireball.fired = true;
      this.entityList.addEntity.call(this.entityList, GetoSpirite1, this, time, this.fireball.strength);

    }

    if (this.animations[this.cunrentState][this.animationFrame][1] != -2) return;
    this.changeState(FighterState.IDLE)
  }
  handleAirRedInit() {

  }
  handleAirRedState(time) {
    this.velocity.x = 300;
    this.velocity.y = 100;
    if (this.position.y > STAGEFLOOR) {
      this.position.y = STAGEFLOOR;
      this.changeState(FighterState.JUMP_LAND);
    }

    if (this.animationFrame < 4) return

    if (!this.animations[this.cunrentState][this.animationFrame][1] == -1) return;
    this.changeState(FighterState.JUMP_LAND)
  }
  handlePurpleState(time) {
  
      if (!this.fireball.fired ) {
        this.fireball.fired = true;
        this.entityList.addEntity.call(this.entityList, milePatte, this, time, this.fireball.strength);

      }
    


    if (this.animations[this.cunrentState][this.animationFrame][1] != -2) return;
    this.changeState(FighterState.IDLE)
  }
  handleEnterInit() {

  }
  handleEnterState(time) {
    this.direction = -this.opponent.direction;
    if (this.animationFrame < 4) return
    if (this.animations[this.cunrentState][this.animationFrame][1] != -2) return;
    this.changeState(FighterState.IDLE)
  }
  handleExpensionInit() {
    this.resetVelocities();

  }
  handleExpensionState(time) {
    if (this.animationFrame == 2) {
      this.exetension = true
      this.opponent.ult = true;
      this.startTimer()
    }
    if (this.animationFrame == 3) {
      this.exetension = false
    }


    if (this.animationFrame < 4) return
    if (this.animations[this.cunrentState][this.animationFrame][1] != -2) return;
    this.changeState(FighterState.IDLE)
  }
  handleStandartBigFleauInit(){
    this.resetVelocities();

    this.fireball = { fired: false, strength: Control.MEDIUM_PUNCH }
  }
   handleStandartTornadoAttackState(time) {
          
          this.velocity.x = 200;
          this.position.y = STAGEFLOOR;
        
          
  
          if (this.animationFrame < 12) return
          if (!this.animations[this.cunrentState][this.animationFrame][1] == -2) return;
          this.changeState(FighterState.IDLE)
  
      }
      handleStandartBigFleauState(time){
       
          if (!this.fireball.fired ) {
            this.fireball.fired = true;
            this.entityList.addEntity.call(this.entityList, BigFleau, this, time, this.fireball.strength);
    
          }
       
    
          if (this.animationFrame < 0) return
        if (this.animations[this.cunrentState][this.animationFrame][1] != -2) return;
        this.changeState(FighterState.IDLE)
      }

}



