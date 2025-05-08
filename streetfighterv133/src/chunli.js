import { Control } from "./constants/control.js";
import { FIGHTER_HURT_DELAY, FighterAttackStrenght, FighterState, HurtBox, PushBox, SpecialMoveButton, SpecialMoveDirection } from "./constants/fighter.js";
import { Fighter } from "./fighter.js";
import { Fireball } from "./special/fireball.js";
import { kikouken } from "./special/kikouken.js";
export class chunli extends Fighter {
  constructor(x, y, direction, playerId, onAttackHit, entityList) {
    super('CHUNLI', x, y, direction, playerId, onAttackHit);
    this.entityList = entityList
    this.tornadoCooldown = 0;
    this.image = document.querySelector('img[alt="chunli"]');
    this.states[FighterState.SPECIAL_1] = {
      init: this.handleHadoukenInit.bind(this),
      update: this.handleHadoukenState.bind(this),
      shadow: [1.6, 1, -8, 0],
      validFrom: [
        FighterState.IDLE, FighterState.WALK_BACKWARD, FighterState.WALK_FORWARD, FighterState.CROUCH, FighterState.CROUCH_DOWN, FighterState.CROUCH_UP,
      ],
     
    
    
    }
    this.states[FighterState.IDLE].validFrom = [...this.states[FighterState.IDLE].validFrom, FighterState.SPECIAL_1]
    this.frame = new Map([
      ['idle-1', [[[3, 32, 48, 82], [24, 82]], PushBox.IDLE, HurtBox.IDLE]],
      ['idle-2', [[[56, 32, 48, 82], [24, 82]], PushBox.IDLE, HurtBox.IDLE]],
      ['idle-3', [[[108, 32,48, 83], [24, 82]], PushBox.IDLE, HurtBox.IDLE]],
      ['idle-4', [[[160, 32,48, 82], [24, 82]], PushBox.IDLE, HurtBox.IDLE]],



      ['forwards-1', [[[217, 29, 51, 85], [27, 81]], PushBox.IDLE, HurtBox.FORWARD]],
      ['forwards-2', [[[274, 31, 53, 83], [35, 81]], PushBox.IDLE, HurtBox.FORWARD]],
      ['forwards-3', [[[336, 39, 52, 77], [35, 81]], PushBox.IDLE, HurtBox.FORWARD]],
      ['forwards-4', [[[391, 29, 56, 64], [29, 81]], PushBox.IDLE, HurtBox.FORWARD]],
      ['forwards-5', [[[450, 31, 54, 80], [29, 81]], PushBox.IDLE, HurtBox.FORWARD]],


      ['backwards-1', [[[874, 992, 62, 95], [35, 85]], PushBox.IDLE, HurtBox.BACKWARD]],
      ['backwards-2', [[[809, 992, 62, 95], [36, 87]], PushBox.IDLE, HurtBox.BACKWARD]],
      ['backwards-3', [[[744, 992, 62, 95], [36, 88]], PushBox.IDLE, HurtBox.BACKWARD]],
      ['backwards-4', [[[672, 992, 62, 95], [38, 89]], PushBox.IDLE, HurtBox.BACKWARD]],
      ['backwards-5', [[[598, 992, 62, 95], [36, 87]], PushBox.IDLE, HurtBox.BACKWARD]],

      ['jump-1', [[[681, 44, 48, 69], [32, 107]], PushBox.JUMP, HurtBox.JUMP]],
      ['jump-2', [[[731, 16, 37, 98], [25, 103]], PushBox.JUMP, HurtBox.JUMP]],
      ['jump-3', [[[772, 16, 37, 63], [25, 88]], PushBox.JUMP, HurtBox.JUMP]],
      ['jump-4', [[[813, 14, 34, 99], [28, 101]], PushBox.JUMP, HurtBox.JUMP]],
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

      ['jump-land', [[[160, 32,48, 82], [22, 83]], PushBox.IDLE, HurtBox.IDLE]],
      ['crouch-1', [[[627, 30, 46, 84], [27, 81]], PushBox.IDLE, HurtBox.IDLE]],
      ['crouch-2', [[[1311, 43, 47, 69], [25, 66]], PushBox.BEND, HurtBox.BEND]],
      ['crouch-3', [[[1362, 50, 49, 62], [32, 60]], PushBox.CROUCH, HurtBox.CROUCH]],

      ['idle-turn-1', [[[874, 636, 62, 95], [29, 92]], PushBox.IDLE]],
      ['idle-turn-2', [[[800, 620, 62, 110], [30, 94]], PushBox.IDLE]],
      ['idle-turn-3', [[[742, 636, 62, 94], [27, 90]], PushBox.IDLE]],

      ['crouch-turn-1', [[[874, 830, 2, 64], [26, 58]], PushBox.CROUCH]],
      ['crouch-turn-2', [[[808, 830, 64, 64], [27, 58]], PushBox.CROUCH]],
      ['crouch-turn-3', [[[743, 830, 64, 64], [29, 58]], PushBox.CROUCH]],

      ['light-punch-1', [[[3, 141, 63, 85], [10, 88]], PushBox.IDLE, HurtBox.IDLE, [40, -70, 30, 15]]],
      ['light-punch-2', [[[69, 136, 56, 88], [10, 88]], PushBox.IDLE, HurtBox.IDLE]],
      ['light-punch-3', [[[133, 141, 60, 85], [10, 88]], PushBox.IDLE, HurtBox.IDLE]],
      ['med-punch-1', [[[201, 147, 66, 78], [28, 76]], PushBox.IDLE, HurtBox.IDLE]],
      ['med-punch-2', [[[271, 151, 86, 75], [29, 76]], PushBox.IDLE, HurtBox.PUNCH, [17, -60, 60, 14]]],
      ['med-punch-3', [[[365, 145, 62, 78], [24, 76]], PushBox.IDLE, HurtBox.PUNCH]],

      ['heavy-punch-1', [[[436, 144, 63, 79], [30, 82]], PushBox.IDLE, HurtBox.PUNCH]],
      ['heavy-punch-2', [[[505, 147, 79, 79], [30, 82]], PushBox.IDLE, HurtBox.PUNCH, [17, -70, 67, 14]]],
      ['heavy-punch-3', [[[587, 144, 65, 80], [30, 82]], PushBox.IDLE, HurtBox.PUNCH]],

      ['light-kick-1', [[[7, 255, 45, 87], [10, 92]], PushBox.IDLE, [
        [-28, -79, 30, 18], [-41, -79, 42, 38], [-32, -52, 44, 50]
      ]]],
      ['light-kick-2', [[[62, 255, 48, 87], [10, 92]], PushBox.IDLE, [
        [-40, -79, 30, 18], [-57, -79, 42, 38], [-32, -52, 44, 50],
      ]]],
      ['light-kick-3', [[[127, 255, 72, 90], [10, 92]], PushBox.IDLE, [
        [-40, -79, 30, 18], [-57, -79, 42, 38], [-32, -52, 44, 50],
      ], [30, -60, 50, 18]]],

      ['med-kick-1', [[[208, 254, 67, 88], [10, 92]], PushBox.IDLE, [
        [-40, -79, 30, 18], [-57, -79, 42, 38], [-32, -52, 44, 50]
      ], [0, -78, 80, 28]]],

      ['heavy-kick-1', [[[407, 252, 54, 89], [35, 92]], PushBox.IDLE, [
        [-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]
      ]]],
      ['heavy-kick-2', [[[461, 250, 79, 92], [35, 92]], PushBox.IDLE, [
        [12, -90, 34, 34], [-25, -78, 42, 42], [-11, -50, 20, 50]
      ]]],
      ['heavy-kick-3', [[[541, 256, 66, 85], [35, 90]], PushBox.IDLE, [
        [13, -91, 62, 34], [-25, -78, 42, 42], [-11, -50, 20, 30]
      ], [8, -80, 62, 24]]],
      ['heavy-kick-4', [[[611, 260, 51, 81], [35, 88]], PushBox.IDLE, [
        [-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]
      ]]],
     
      ['hit-face-1', [
        [[135, 851, 51, 84], [50, 88]], PushBox.IDLE, [
          [0,0, 0, 0], [0,0, 0, 0], [0,0, 0, 0]
        ]]],
      ['hit-face-2', [
        [[185, 856, 62, 80], [50, 88]], PushBox.IDLE, [
          [-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]
        ]]],
      ['hit-face-3', [
        [[697, 4275, 70, 93], [50, 78]], PushBox.IDLE, [
          [-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]
        ]]],
      ['hit-face-4', [
        [[308, 2150, 83, 93], [56, 901]], PushBox.IDLE,
        [[-57, -80, 20, 20], [-57, -74, 40, 46], [-35, -37, 40, 30]]
      ]],
      ['hit-stomach-1', [
        [[3, 864, 48, 71], [50, 78]], PushBox.IDLE, [
          [-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]
        ]]],
      ['hit-stomach-2', [
        [[55, 867, 55, 68], [50, 78]], PushBox.IDLE, [
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
        [[10, 591, 41, 93], [30, 90]], PushBox.IDLE, [
          [10, -78, 20, 20], [-10, -50, 42, 42], [-11, -50, 42, 50]
        ]]],
      ['special-2', [
        [[53, 592, 64, 88], [30, 90]], PushBox.IDLE, [
          [20, -65, 20, 20], [-10, -50, 42, 42], [-11, -50, 42, 50]
        ]]],
      ['special-3', [
        [[118, 583, 41, 98], [30, 100]], PushBox.IDLE, [
          [25, -75, 20, 20], [-5, -50, 42, 42], [-11, -50, 42, 50]
        ]]],
      ['special-4', [
        [[171, 607, 67, 80], [30, 90]], PushBox.IDLE, [
          [30, -65, 20, 20], [5, -50, 42, 42], [-11, -50, 42, 50]
        ]]],
      ['crouch-punch-1', [[[9,381, 53, 65], [40, 63]], PushBox.CROUCH, HurtBox.CROUCH]],
      ['crouch-punch-2', [[[71, 379,82, 68], [40, 64]], PushBox.CROUCH, HurtBox.CROUCH, [13, -40, 50, 12]]],

      ['chut-1', [[[314,874, 52, 61], [30, 50]]]],
      ['chut-2', [[[368, 866,62, 69], [45, 70]]]],
      ['chut-3', [[[432,869, 58, 66], [30, 65]]]],
      ['monte-1', [[[488,902, 90, 38], [60, 25]], PushBox.IDLE]],
      ['monte-2', [[[579,883,65, 56], [40, 47]], PushBox.IDLE]],
      ['monte-3', [[[647,861, 49, 73], [30, 70]], PushBox.IDLE]],
    
      ['temp', [[[3, 32, 48, 82], [33, 83]],]],

      
      ['crouchtacle-1', [[[398,385, 52, 62], [40, 53]], PushBox.CROUCH, HurtBox.CROUCH]],
      ['crouchtacle-2', [[[454, 390,70, 56], [40, 53]], PushBox.CROUCH, HurtBox.CROUCH,[13, -4, 50, 12]]],
      ['crouchtacle-3', [[[536, 386, 52, 61], [40, 53]], PushBox.CROUCH, HurtBox.CROUCH]],
      
      ['win-1', [[[166, 1002,46, 96], [30, 100]]]],
      ['win-2', [[[219,1001, 38, 96], [30, 95]]]],
      ['win-3', [[[260,966, 55, 116], [30, 140]]]],
      ['win-4', [[[316, 956,51, 98], [30, 150]]]],
      

      ['jump-kick-1', [[[729, 3045,143, 64], [40, 53]], PushBox.CROUCH, HurtBox.CROUCH,[13, -4, 70, 12]]],
      ['jump-kick-2', [[[647, 3045, 80, 64], [40, 53]], PushBox.JUMP, HurtBox.JUMP,]],
    
    
      ['crouch-l-1', [[[222,386, 44, 60], [40, 50]]]],
      ['crouch-l-2', [[[273, 397,69, 51], [40, 50]],PushBox.CROUCH, HurtBox.CROUCH,[13, -4, 50, 12]]],
     
      ['crouch-h-1', [[[591,386, 52, 53], [30, 50]]]],
      ['crouch-h-2', [[[660, 383,80, 64], [20, 60]],PushBox.CROUCH, HurtBox.CROUCH,[25, -50, 50, 30]]],
     
      ['jum-up-p-1', [[[804,362, 39, 85], [30, 80]],PushBox.CROUCH, HurtBox.CROUCH,]],
      ['jum-up-p-2', [[[843, 370,56, 77], [20, 80]],PushBox.CROUCH, HurtBox.CROUCH,[25, -50, 50, 30]]],
      ['jum-up-p-3', [[[900,368, 58, 80], [30, 80]],PushBox.CROUCH, HurtBox.CROUCH,,[25, -50, 50, 30]]],
    
      ['jump-f-1', [[[1061,377, 39, 63], [30, 80]]]],
      ['jump-f-2', [[[1100, 373,55, 74], [20, 80]],PushBox.JUMP, HurtBox.JUMP,[25, -50, 40, 30]]],

      ['jum-up-k-1', [[[1,475, 39, 88], [30, 80]],PushBox.JUMP, HurtBox.JUMP,]],
      ['jum-up-k-2', [[[41,475,56, 87], [20, 80]],PushBox.JUMP, HurtBox.JUMP]],
      ['jum-up-k-3', [[[96,472, 42, 91], [30, 80]],PushBox.JUMP, HurtBox.JUMP,[10, -60, 40, 50]]],


      ['jum-up-k-h-1', [[[240,473, 47, 88], [30, 110]],PushBox.JUMP, HurtBox.JUMP,]],
      ['jum-up-k-h-2', [[[287,473,56, 89], [20, 110]],PushBox.JUMP, HurtBox.JUMP,[20, -60, 40, 50]]],
      ['jum-up-k-h-3', [[[345,469, 69, 73], [30, 125]],PushBox.JUMP, HurtBox.JUMP,[20, -75, 40, 50]]],
      ['jum-up-k-h-4', [[[414,465, 35, 95], [30, 140]],PushBox.JUMP, HurtBox.JUMP]],
      ['jum-up-k-h-5', [[[450,468,69, 90], [55, 150]],PushBox.JUMP, HurtBox.JUMP]],
      ['jum-up-k-h-6', [[[519,468,57, 94], [30, 120]],PushBox.JUMP, HurtBox.JUMP]],


      ['for-jump-f-1', [[[596,378, 53, 66], [30, 80]]]],
      ['for-jump-f-2', [[[632,488,69, 61], [20, 80]],PushBox.JUMP, HurtBox.JUMP,[30, -50, 40, 30]]],



      ['jum-for-k-1', [[[753,474, 41, 88], [30, 80]],PushBox.JUMP, HurtBox.JUMP,]],
      ['jum-for-k-2', [[[794,475,54, 87], [20, 80]],PushBox.JUMP, HurtBox.JUMP,[10, -60, 30, 50]]],
      ['jum-for-k-3', [[[850,470, 41, 92], [30, 80]],PushBox.JUMP, HurtBox.JUMP,]],
      ['jum-for-k-4', [[[892,476, 54, 85], [30, 80]],PushBox.JUMP, HurtBox.JUMP,[10, -70, 30, 50]]],
      ['jum-for-k-5', [[[947,470,39, 92], [20, 80]],PushBox.JUMP, HurtBox.JUMP]],
      ['jum-for-k-6', [[[990,473,54, 90], [20, 80]],PushBox.JUMP, HurtBox.JUMP]],



      ['spe-1', [[[543,594, 66, 94], [30, 90]],PushBox.IDLE, HurtBox.IDLE,[15, -90, 30, 30]]],
      ['spe-2', [[[618,593,79, 97], [20, 90]],PushBox.IDLE, HurtBox.IDLE,[30, -90, 30, 50]]],
      ['spe-3', [[[707,595, 76, 93], [30, 85]],PushBox.IDLE, HurtBox.IDLE,[20, -50, 30, 30]]],
      ['spe-4', [[[797,600, 85, 89], [30, 80]],PushBox.IDLE, HurtBox.IDLE,[30, -40, 30, 40]]],
      ['spe-5', [[[890,601,80, 87], [20, 80]],PushBox.IDLE, HurtBox.IDLE,[34, -62, 30, 30]]],
      ['spe-6', [[[976,593,92, 95], [20, 85]],PushBox.IDLE, HurtBox.IDLE,[42, -50, 30, 40]]],
      ['spe-7', [[[1075,599,65, 88], [20, 80]],PushBox.IDLE, HurtBox.IDLE,[20, -40, 30, 40]]],
    ]);


    /*
    this.frame = new Map([
      ['forwards-1',[[712, 765, 70, 60], [27, 81]]],
      ['forwards-2', [[810, 895, 70, 96], [22, 90]]],
      ['forwards-3', [[712, 895, 75, 93], [61, 76]]],
      ['forwards-4', [[67, 895, 75, 94], [29, 89]]],
      ['forwards-5', [[566, 895, 60, 96], [29, 89]]],
    ]);
  */

    this.animations = {
      [FighterState.IDLE]: [['idle-1', 68], ['idle-2', 68], ['idle-3', 68],  ['idle-1', 68], ['idle-1', 68]],
      [FighterState.WALK_FORWARD]: [ ['forwards-1', 65], ['forwards-2', 65], ['forwards-3', 65],['forwards-4', 65], ['forwards-5', 65], ['forwards-1', 65]],
      [FighterState.WALK_BACKWARD]: [['forwards-1', 65], ['forwards-5', 65], ['forwards-4', 65], ['forwards-3', 65], ['forwards-2', 65], ['forwards-1', 65]],
      [FighterState.JUMP_UP]: [['jump-1', 100], ['jump-2', 100], ['jump-3', 100], ['jump-4', 100], ['jump-4', -1]],
      [FighterState.JUMP_FORWARD]: [['jump-roll-1', 200], ['jump-roll-2', 100], ['jump-roll-3', 100],['jump-roll-4', 100], ['jump-roll-5', 100],['jump-land', 500], ['jump-roll-6', -1]],
      [FighterState.JUMP_BACKWARD]: [['jump-roll-6', 200], ['jump-roll-5', 100],['jump-roll-4', 100], ['jump-roll-3', 100],['jump-roll-2', 100], ['jump-roll-1', -1]],
      [FighterState.JUMP_END]: [['jump-1', 1]],
      [FighterState.CROUCH]: [['crouch-3', 0]],
      [FighterState.JUMP_START]: [['jump-land', 50], ['jump-land', -2]],
      [FighterState.JUMP_LAND]: [['jump-land', 33], ['jump-land', 127], ['jump-land', -2]],
      [FighterState.CROUCH_DOWN]: [['crouch-1', 30], ['crouch-2', 30], ['crouch-3', 30], ['crouch-3', -2]],
      [FighterState.CROUCH_UP]: [['crouch-3', 30], ['crouch-2', 30], ['crouch-1', 30], ['crouch-1', -2]],
      [FighterState.IDLE_TURN]: [['idle-turn-3', 33], ['idle-turn-2', 30], ['idle-turn-1', 30], ['idle-turn-1', 1]],
      [FighterState.CROUCH_TURN]: [['crouch-turn-3', 33], ['crouch-turn-2', 30], ['crouch-turn-1', 30], ['crouch-turn-1', 1]],
      [FighterState.LIGHT_PUNCH]: [['light-punch-1', 100],['light-punch-1', 100], ['light-punch-2', 100], ['light-punch-2',100], ['light-punch-1', -2]],
      [FighterState.MEDIUM_PUNCH]: [
        ['med-punch-1', 16],
        ['med-punch-2', 33],
        ['med-punch-2', 66],
        ['med-punch-3', 50],
        ['med-punch-1', 199],
        ['med-punch-1', -2],
      ],
      [FighterState.HEAVY_PUNCH]: [
        ['heavy-punch-1', 100],
        ['heavy-punch-1', 50],
        ['heavy-punch-2', 50],
        ['heavy-punch-2', 50],
        ['heavy-punch-3', 100],
        ['med-punch-1', -2],
      ],
      [FighterState.LIGHT_Kick]: [['light-kick-1', 75],['light-kick-2', 50], ['light-kick-2', 0],['light-kick-2', 33], ['light-kick-3', 66],['light-kick-3', 66], ['med-punch-1', -2]],
      [FighterState.MEDIUM_Kick]: [['med-punch-1', 82], ['med-kick-1', 100], ['med-kick-1', 199], ['light-kick-1', 116], ['light-kick-1', -2]],
      [FighterState.HEAVY_Kick]: [
        ['heavy-kick-1', 40],
        ['heavy-kick-2', 66],
        ['heavy-kick-3', 133],
        ['heavy-kick-4', 166],
        ['heavy-kick-4', -2],
      
      
      ], [FighterState.HURT_HEAD_LIGHT]: [
        ['hit-face-1', FIGHTER_HURT_DELAY],
        ['hit-face-2', 48],
        ['hit-face-2', -2],

      ],

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

      [FighterState.HURT_BODY_LIGHT]: [
        ['hit-stomach-1', FIGHTER_HURT_DELAY],
        ['hit-stomach-1', 11],
        ['hit-stomach-2', -2]
      ],

      [FighterState.HURT_BODY_MEDIUM]: [
        ['hit-stomach-1', FIGHTER_HURT_DELAY],
        ['hit-stomach-2', 7],
        ['hit-stomach-2', 9],
        ['hit-stomach-2', -2]
      ],

      [FighterState.HURT_BODY_HEAVY]: [
        ['hit-stomach-1', FIGHTER_HURT_DELAY],
        ['hit-stomach-1', 3],
        ['hit-stomach-3', 4],
        ['hit-stomach-1', 4],
        
        ['hit-stomach-1', -2]
      ],
      [FighterState.SPECIAL_1]: [
       ['special-1', 100],
       ['special-2', 100],
        ['special-3', 100],
        ['special-4', 100],
        ['special-1', -2],
      
      ],
      [FighterState.CROUCH_PUNCH]: [['crouch-punch-1', 33], ['crouch-punch-2', 33] ,['crouch-punch-2', 66], ['crouch-punch-1', -2]],
      [FighterState.TORNADE]: [
        ['tornado-1', 50],
        ['tornado-2', 50],
        ['tornado-3', 50],
        ['tornado-4', 50],
        ['tornado-5', 200],
        ['tornado-6', 50],
        ['tornado-6', 50],
        ['tornado-7', 100],
        ['tornado-8', 75],
        ['tornado-9', 50],
        ['tornado-10', 50],
        ['tornado-11', 300],
        ['tornado-11', -2],
      ],
      [FighterState.CHUT1]: [
        
        ['chut-1', 200],
        ['chut-2', 200],
        ['chut-3', 400],
        ['monte-1', 150],
        ['monte-2', 150],
        ['monte-3', 100],
        ['temp', 150],
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
        ['win-2', 100],
        ['win-3', 100],
        ['win-4', 200],
        ['win-3', 100],
        ['win-1', 100],
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
      [FighterState.CROUCH_h_Kick]: [
       ['crouch-h-1', 50],
     
       ['crouch-h-1', 0],
       ['crouch-h-1', 50],
       ['crouch-h-1', 50],
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
       [FighterState.HyakuRestu]: [
        ['spe-1', 100],
        ['spe-2', 100],
        ['spe-3', 100],
        ['spe-4', 100],
        ['spe-5', 100],
        ['spe-6', 100],
        ['spe-7', 100],
        ['spe-7', -2],
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
        SpecialMoveButton.ANY_PUNCH],
      cursor: 0,
    } ,{
      state: FighterState.CROUCH_PUNCH,
      sequence : [
        SpecialMoveDirection.DOWN,
        SpecialMoveButton.ANY_PUNCH],
        cursor : 0.


    },
  
    {
      state: FighterState.CROUCH_L_Kick,
      sequence : [
        SpecialMoveDirection.DOWN,
        SpecialMoveButton.L_Kick],
        cursor : 0,
       
    },{
      state: FighterState.Tacle,
      sequence : [
        SpecialMoveDirection.DOWN,
        SpecialMoveButton.M_Kick],
        cursor : 0,
       
    }
    ,{
      state: FighterState.CROUCH_h_Kick,
      sequence : [
        SpecialMoveDirection.DOWN,
        SpecialMoveButton.H_Kick],
        cursor : 0,
       
    } ,{
      state: FighterState.HyakuRestu,
      sequence : [
        SpecialMoveDirection.BACKWARD,
       SpecialMoveDirection.FORWARD,
        SpecialMoveButton.ANY_KICK],
        cursor : 0,
        couuldown :60,
        


    },
    
   
  ]
    this.gravity = 900;
    this.fireball = { fired: false, strength: Control.MEDIUM_PUNCH }
  }
  handleHadoukenInit(_, strenght) {
    
    this.resetVelocities();

    this.fireball = { fired: false, strength: Control.MEDIUM_PUNCH }
  }
  handleHadoukenState(time) {
    console.log(time)
    if (!this.fireball.fired && this.animationFrame == 3) {
      this.fireball.fired = true;
      this.entityList.addEntity.call(this.entityList, kikouken, this, time, this.fireball.strength);

    }

    if (this.animations[this.cunrentState][this.animationFrame][1] != -2) return;
    this.changeState(FighterState.IDLE)
  }
  
 
}



