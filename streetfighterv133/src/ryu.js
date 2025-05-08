
import { Control } from "./constants/control.js";
import { FIGHTER_HURT_DELAY, FighterState, HurtBox, PushBox, SpecialMoveButton, SpecialMoveDirection } from "./constants/fighter.js";
import { Fighter } from "./fighter.js";
import { Fireball } from "./special/fireball.js";

export class Ryu extends Fighter {
  constructor(x, y, direction, playerid, onAttackHit, entityList) {
    super('RYU', x, y, direction, playerid, onAttackHit);
    this.entityList = entityList;
    this.image = document.querySelector('img[alt="ryu"]');
    this.states[FighterState.SPECIAL_1] = {
     
      init: this.handleHadoukenInit.bind(this),
      update: this.handleHadoukenState.bind(this),
      shadow: [1.6, 1, -5, 0],
      validFrom: [
        FighterState.IDLE, FighterState.WALK_BACKWARD, FighterState.WALK_FORWARD, FighterState.CROUCH, FighterState.CROUCH_DOWN, FighterState.CROUCH_UP,
      ],
    }
    this.states[FighterState.IDLE].validFrom = [...this.states[FighterState.IDLE].validFrom, FighterState.SPECIAL_1]

    this.frame = new Map([
      ['idle-1', [[[6, 5, 64, 102], [33, 83]], PushBox.IDLE, HurtBox.IDLE]],
      ['idle-2', [[[70, 7, 64, 99], [33, 83]], PushBox.IDLE, HurtBox.IDLE]],
      ['idle-3', [[[138, 11, 67, 94], [33, 83]], PushBox.IDLE, HurtBox.IDLE]],
      ['idle-4', [[[207, 7, 62, 99], [33, 83]], PushBox.IDLE, HurtBox.IDLE]],
      ['idle-5', [[[275, 7, 60, 97], [33, 83]], PushBox.IDLE, HurtBox.IDLE]],


      ['forwards-1', [[[8, 127, 60, 96], [27, 80]], PushBox.IDLE, HurtBox.FORWARD]],
      ['forwards-2', [[[74, 128, 66, 94], [35, 80]], PushBox.IDLE, HurtBox.FORWARD]],
      ['forwards-3', [[[150, 127, 67, 94], [35, 89]], PushBox.IDLE, HurtBox.FORWARD]],
      ['forwards-4', [[[224, 128, 73, 94], [29, 89]], PushBox.IDLE, HurtBox.FORWARD]],
      ['forwards-5', [[[302, 126, 63, 94], [29, 89]], PushBox.IDLE, HurtBox.FORWARD]],
      ['forwards-6', [[[367, 123, 58, 95], [29, 89]], PushBox.IDLE, HurtBox.FORWARD]],


      ['backwards-1', [[[426, 122, 65, 94], [35, 80]], PushBox.IDLE, HurtBox.BACKWARD]],
      ['backwards-2', [[[492, 122, 62, 93], [36, 87]], PushBox.IDLE, HurtBox.BACKWARD]],
      ['backwards-3', [[[557, 122, 63, 96], [36, 88]], PushBox.IDLE, HurtBox.BACKWARD]],
      ['backwards-4', [[[627, 122, 64, 93], [38, 87]], PushBox.IDLE, HurtBox.BACKWARD]],
      ['backwards-5', [[[699, 122, 68, 95], [36, 87]], PushBox.IDLE, HurtBox.BACKWARD]],
      ['backwards-6', [[[772, 124, 69, 95], [36, 87]], PushBox.IDLE, HurtBox.BACKWARD]],

      ['jump-1', [[[64, 240, 64, 111], [35, 85]], PushBox.JUMP, HurtBox.jump]],
      ['jump-2', [[[130, 231, 61, 115], [36, 87]], PushBox.JUMP, HurtBox.jump]],
      ['jump-3', [[[193, 230, 60, 121], [36, 88]], PushBox.JUMP, HurtBox.jump]],
      ['jump-4', [[[251, 220, 55, 98], [38, 89]], PushBox.JUMP, HurtBox.jump]],
      ['jump-5', [[[314, 231, 50, 106], [36, 87]], PushBox.JUMP, HurtBox.jump]],
      ['jump-6', [[[372, 242, 60, 115], [36, 87]], PushBox.JUMP, HurtBox.jump]],

      ['jump-roll-1', [[[440, 256, 64, 91], [25, 106]], PushBox.JUMP, [
        [-11, -106, 24, 16], [-26, -90, 40, 42], [-26, -31, 40, 32]
      ]]],
      ['jump-roll-2', [[[506, 255, 108, 73], [22, 90]], PushBox.JUMP, [
        [-17, -90, 24, 16], [-14, -91, 40, 42], [-22, -66, 38, 18]
      ]]],
      ['jump-roll-3', [[[616, 237, 58, 96], [61, 76]], PushBox.JUMP, [
        [22, -54, 24, 16], [-14, -81, 40, 42], [-22, -66, 38, 18]
      ]]],
      ['jump-roll-5', [[[801, 248, 77, 104], [71, 81]], PushBox.JUMP, [
        [-72, -56, 24, 16], [-40, -77, 52, 40], [-14, -82, 48, 34]
      ]]],
      ['jump-roll-6', [[[877, 259, 67, 123], [32, 107]], PushBox.JUMP, [
        [-55, -100, 24, 16], [-48, -87, 44, 38], [-22, -66, 38, 18]
      ]]],

      ['jump-land', [[[6, 264, 56, 91], [29, 83]], PushBox.IDLE, HurtBox.IDLE]],

      ['crouch-1', [[[550, 17, 57, 88], [40, 81]], PushBox.IDLE, HurtBox.IDLE]],
      ['crouch-2', [[[608, 29, 61, 78], [40, 66]], PushBox.BEND, HurtBox.BEND]],
      ['crouch-3', [[[675, 37, 66, 73], [40, 53]], PushBox.CROUCH, HurtBox.CROUCH]],

      ['idle-turn-1', [[[354, 4, 59, 101], [29, 92]], PushBox.IDLE]],
      ['idle-turn-2', [[[406, 2, 68, 103], [30, 94]], PushBox.IDLE]],
      ['idle-turn-3', [[[483, 6, 61, 101], [27, 90]], PushBox.IDLE]],

      ['crouch-turn-1', [[[746, 42, 64, 69], [26, 58]], PushBox.CROUCH]],
      ['crouch-turn-2', [[[814, 43, 61, 66], [27, 58]], PushBox.CROUCH]],
      ['crouch-turn-3', [[[874, 45, 57, 66], [29, 58]], PushBox.CROUCH]],

      ['light-punch-1', [[[5, 360, 70, 101], [32, 88]], PushBox.IDLE, HurtBox.IDLE]],
      ['light-punch-2', [[[93, 359, 100, 99], [32, 88]], PushBox.IDLE, HurtBox.IDLE, [14, -70, 50,10]]],

      ['med-punch-1', [[[6, 466, 60, 94], [26, 82]], PushBox.IDLE, HurtBox.IDLE]],
      ['med-punch-2', [[[86, 465, 74, 95], [27, 82]], PushBox.IDLE, HurtBox.PUNCH]],
      ['med-punch-3', [[[174, 465, 108, 94], [29, 82]], PushBox.IDLE, HurtBox.PUNCH, [17, -70, 68, 14]]],

      ['heavy-punch-3', [[[174, 465, 108, 94], [29, 82]], PushBox.IDLE, HurtBox.PUNCH, [10, -70, 76, 14]]],

      ['crouch-punch-1', [[[245, 582, 68, 66], [40, 53]], PushBox.CROUCH, HurtBox.CROUCH]],
      ['crouch-punch-2', [[[316, 582, 71, 71], [40, 53]], PushBox.CROUCH, HurtBox.CROUCH]],
      ['crouch-punch-3', [[[387, 582, 103, 72], [40, 53]], PushBox.CROUCH, HurtBox.CROUCH, [13, -40, 50, 12]]],

      ['light-kick-1', [[[87, 923, 66, 92], [45, 78]], PushBox.IDLE, [
        [-28, -79, 30, 18], [-41, -79, 42, 38], [-32, -52, 44, 50]
      ]]],
      ['light-kick-2', [[[162, 922, 114, 94], [45, 78]], PushBox.IDLE, [
        [-40, -79, 30, 18], [-57, -79, 42, 38], [-32, -52, 44, 50]
      ], [6, -86, 66, 28]]],

      ['med-kick-1', [[[162, 922, 114, 94], [50, 79]], PushBox.IDLE, [
        [-40, -79, 30, 18], [-57, -79, 42, 38], [-32, -52, 44, 50]
      ], [-15, -78, 80, 28]]],

      ['heavy-kick-1', [[[5, 1196, 61, 90], [50, 87]], PushBox.IDLE, [
        [-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]
      ]]],
      ['heavy-kick-2', [[[72, 1192, 94, 94], [50, 78]], PushBox.IDLE, [
        [12, -90, 34, 34], [-25, -78, 42, 42], [-11, -50, 42, 50]
      ], [10, -80, 40, 32]]],
      ['heavy-kick-3', [[[176, 1191, 120, 94], [50, 78]], PushBox.IDLE, [
        [13, -91, 62, 34], [-25, -78, 42, 42], [-11, -50, 42, 50]
      ], [10, -80, 62, 24]]],
      ['heavy-kick-4', [[[306, 1208, 101, 77], [50, 78]], PushBox.IDLE, [
        [-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]
      ]]],
      ['heavy-kick-5', [[[418, 1204, 64, 81], [50, 78]], PushBox.IDLE, [
        [-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]
      ]]],

      ['hit-face-1', [
        [[311, 2151, 80, 92], [50, 78]], PushBox.IDLE, [
          [-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]
        ]]],
      ['hit-face-2', [
        [[236, 2151, 72, 92], [50, 78]], PushBox.IDLE, [
          [-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]
        ]]],
      ['hit-face-3', [
        [[165, 2149, 70, 97], [50, 78]], PushBox.IDLE, [
          [-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]
        ]]],

      ['hit-stomach-1', [
        [[388, 2146, 74, 99], [50, 78]], PushBox.IDLE, [
          [-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]
        ]]],
      ['hit-stomach-2', [
        [[464, 2156, 76, 91], [50, 78]], PushBox.IDLE, [
          [-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]
        ]]],
      ['hit-stomach-3', [
        [[541, 2161, 75, 88], [50, 78]], PushBox.IDLE, [
          [-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]
        ]]],

      ['hit-stomach-4', [
        [[4, 2042, 81, 94], [50, 691]], PushBox.IDLE,
        [[-28, -67, 40, 18], [-41, -59, 38, 30], [-26, -42, 42, 34]]
      ]],
      ['stun-1', [
        [[4, 2042, 81, 94], [50, 78]], PushBox.IDLE, [
          [-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]
        ]]],
      ['stun-2', [
        [[89, 2041, 72, 95], [50, 78]], PushBox.IDLE, [
          [-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]
        ]]],
      ['stun-3', [
        [[166, 2040, 78, 99], [50, 78]], PushBox.IDLE, [
          [-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]
        ]]],
      //hadouken
      ['special-1', [
        [[13, 1413, 80, 99], [50, 80]], PushBox.IDLE, [
          [10, -78, 20, 20], [-10, -50, 42, 42], [-11, -50, 42, 50]
        ]]],
      ['special-2', [
        [[108, 1418, 93, 92], [50, 80]], PushBox.IDLE, [
          [20, -65, 20, 20], [-10, -50, 42, 42], [-11, -50, 42, 50]
        ]]],
      ['special-3', [
        [[205, 1417, 100, 94], [40, 65]], PushBox.IDLE, [
          [25, -75, 20, 20], [-5, -50, 42, 42], [-11, -50, 42, 50]
        ]]],
      ['special-4', [
        [[309, 1426, 111, 85], [40, 65]], PushBox.IDLE, [
          [30, -65, 20, 20], [5, -50, 42, 42], [-11, -50, 42, 50]
        ]]],
        ['temp', [[[6, 5, 64, 102], [33, 83]],]],

      ['tornado-1', [[[12,1524, 77, 113], [33, 120]], PushBox.IDLE, HurtBox.IDLE]],
      ['tornado-2', [[[92, 1522,78, 95], [33, 120]], PushBox.IDLE, HurtBox.IDLE]],
      ['tornado-3', [[[161, 1520, 57, 87], [33, 120]], PushBox.IDLE, HurtBox.IDLE, ]],
      ['tornado-4', [[[226, 1520,70, 82], [33, 120]], PushBox.IDLE, HurtBox.IDLE]],
      ['tornado-5', [[[301, 1520,103, 111], [33, 120]], PushBox.IDLE, HurtBox.IDLE, [13, -80, 50, 12]]],
      ['tornado-6', [[[406, 1524,66, 105], [33, 120]], PushBox.IDLE, HurtBox.IDLE]],
      ['tornado-7', [[[474, 1531,106, 94], [33, 120]], PushBox.IDLE, HurtBox.IDLE, [13, -80, 50, 18]]],
      ['tornado-8', [[[579,1530,71, 97], [33, 120]], PushBox.IDLE, HurtBox.IDLE]],
      ['tornado-9', [[[652, 1532,55, 118], [33, 120]], PushBox.IDLE, HurtBox.IDLE]],
      ['tornado-10', [[[706, 1550,59, 109], [33, 120]], PushBox.IDLE, HurtBox.IDLE]],
      ['tornado-11', [[[770, 1560,61, 101], [33, 120]], PushBox.IDLE, HurtBox.IDLE]],


      ['crouchtacle-1', [[[1424,1214, 56, 71], [40, 53]], PushBox.CROUCH, HurtBox.CROUCH]],
      ['crouchtacle-2', [[[1484, 1216,126, 69], [40, 53]], PushBox.CROUCH, HurtBox.CROUCH,[13, -4, 70, 12]]],
      ['crouchtacle-3', [[[1610, 1221, 67, 64], [40, 53]], PushBox.CROUCH, HurtBox.CROUCH]],
      ['chut-1', [[[634,2161, 88, 83], [60, 64]]]],
      ['chut-2', [[[724, 2160,105, 86], [70, 63]]]],
      ['chut-3', [[[828,2162, 80, 83], [80, 63]]]],
      ['monte-1', [[[1170,2214, 98, 45], [60, 23]]]],
      ['monte-2', [[[1274, 2178,66, 80], [30, 64]]]],
      ['monte-3', [[[1344,2136, 58, 128], [30, 110]]]],
      ['monte-4', [[[1416,2175, 91, 87], [50, 80]]]],

      ['win-1', [[[499, 1916,68, 105], [30, 87]]]],
      ['win-2', [[[576,1891, 58, 126], [30, 110]]]],
      ['win-3', [[[635,1896, 60, 121], [30, 105]]]],

    ]);


    this.animations = {
      [FighterState.IDLE]: [['idle-1', 68], ['idle-2', 68], ['idle-3', 68], ['idle-4', 68], ['idle-5', 68], ['idle-1', 68]],
      [FighterState.WALK_FORWARD]: [['forwards-1', 65], ['forwards-2', 65], ['forwards-3', 65], ['forwards-4', 65], ['forwards-5', 65], ['forwards-6', 65]],
      [FighterState.WALK_BACKWARD]: [['backwards-1', 65], ['backwards-2', 65], ['backwards-3', 65], ['backwards-4', 65], ['backwards-5', 65], ['backwards-6', 65]],
      [FighterState.JUMP_START]: [['jump-land', 50], ['jump-land', -2]],
      [FighterState.JUMP_LAND]: [['jump-land', 33], ['jump-land', 127], ['jump-land', -2]],
      [FighterState.JUMP_UP]: [['jump-1', 100], ['jump-2', 100], ['jump-3', 100], ['jump-4', 100], ['jump-5', 100], ['jump-6', -1]],
      [FighterState.JUMP_FORWARD]: [['jump-roll-1', 200], ['jump-roll-2', 50], ['jump-roll-3', 50], ['jump-roll-5', 50], ['jump-roll-6', -1]],
      [FighterState.JUMP_BACKWARD]: [['jump-roll-6', 200], ['jump-roll-5', 60], ['jump-roll-3', 60], ['jump-roll-2', 60], ['jump-roll-1', -1]],
      [FighterState.JUMP_END]: [['jump-1', 1]],
      [FighterState.CROUCH]: [['crouch-3', 0]],
      [FighterState.CROUCH_DOWN]: [['crouch-1', 30], ['crouch-2', 30], ['crouch-3', 30], ['crouch-3', -2]],
      [FighterState.CROUCH_UP]: [['crouch-3', 30], ['crouch-2', 30], ['crouch-1', 30], ['crouch-1', -2]],
      [FighterState.IDLE_TURN]: [['idle-turn-3', 33], ['idle-turn-2', 30], ['idle-turn-1', 30], ['idle-turn-1', 1]],
      [FighterState.CROUCH_TURN]: [['crouch-turn-3', 33], ['crouch-turn-2', 30], ['crouch-turn-1', 30], ['crouch-turn-1', 1]],
      [FighterState.LIGHT_PUNCH]: [['light-punch-1', 33], ['light-punch-2', 66], ['light-punch-1', 66], ['light-punch-1', -2]],
      [FighterState.MEDIUM_PUNCH]: [['med-punch-1', 16], ['med-punch-2', 33], ['med-punch-3', 66], ['med-punch-2', 50], ['med-punch-1', 199], ['med-punch-1', -2]],
      [FighterState.HEAVY_PUNCH]: [
        ['med-punch-1', 50],
        ['med-punch-2', 33],
        ['heavy-punch-3', 100],
        ['med-punch-2', 166],
        ['med-punch-1', 199],
        ['med-punch-1', -2],
      ],
      [FighterState.LIGHT_Kick]: [['med-punch-1', 100], ['light-kick-1', 50], ['light-kick-2', 133], ['light-kick-1', 66], ['med-punch-1', 66], ['med-punch-1', -2]],
      [FighterState.MEDIUM_Kick]: [['med-punch-1', 82], ['med-kick-1', 100], ['med-kick-1', 199], ['light-kick-1', 116], ['light-kick-1', -2]],
      [FighterState.HEAVY_Kick]: [
        ['heavy-kick-1', 40],
        ['heavy-kick-2', 66],
        ['heavy-kick-3', 133],
        ['heavy-kick-4', 166],
        ['heavy-kick-5', 116],
        ['heavy-kick-5', -2],
      ], [FighterState.HURT_HEAD_LIGHT]: [
        ['hit-face-1', FIGHTER_HURT_DELAY],
        ['hit-face-2', 48],
        ['hit-face-3', 128],
        ['hit-face-3', -2],
        ['hit-face-3', -2],

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
        ['hit-face-3', 112],
        ['stun-3', 144],
        ['stun-3', -2],

      ],

      [FighterState.HURT_BODY_LIGHT]: [
        ['hit-stomach-1', FIGHTER_HURT_DELAY],
        ['hit-stomach-1', 11],
        ['hit-stomach-2', -2],
      ],

      [FighterState.HURT_BODY_MEDIUM]: [
        ['hit-stomach-1', FIGHTER_HURT_DELAY],
        ['hit-stomach-2', 7],
        ['hit-stomach-2', 9],
        ['hit-stomach-3', -2],
      ],

      [FighterState.HURT_BODY_HEAVY]: [
        ['hit-stomach-2', FIGHTER_HURT_DELAY],
        ['hit-stomach-2', 3],
        ['hit-stomach-3', 4],
        ['stun-3', 9],
        ['stun-3', -2],
      ],
      [FighterState.SPECIAL_1]: [
        ['special-1', 32],
        ['special-2', 128],
        ['special-3', 32],
        ['special-4', 640],
        ['special-4', -2],
      ],
      [FighterState.CROUCH_PUNCH]: [['crouch-punch-1', 33], ['crouch-punch-2', 33], ['crouch-punch-3', 66], ['crouch-punch-3', 66], ['crouch-punch-1', -2]],
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
      [FighterState.Tacle]: [
        ['crouchtacle-1', 32],
        ['crouchtacle-2', 128],
        ['crouchtacle-3', 128],
       
        ['crouchtacle-3', -2],
      ],
      [FighterState.CHUT1]: [
        
        ['chut-1', 200],
        ['chut-2', 200],
        ['chut-3', 500],
        ['monte-1', 150],
        ['monte-2', 150],
        ['monte-3', 150],
        ['monte-4', 150],
        ['temp', 150],
        ['monte-4', -2],
      ],[FighterState.DOWN]: [
        
        ['chut-1', 200],
        ['chut-2', 200],
        ['chut-3', 500],
        ['chut-3', -2],
        
      ],
      [FighterState.ko]: [
        
        ['monte-1', 200],
      
        
      ],
      [FighterState.WIN]: [
        
        ['win-1', 200],
        ['win-2', 200],
        ['win-3', 200],
        
      ],


    };

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
        SpecialMoveDirection.DOWN, SpecialMoveDirection.FORWARD_DOWN,
        SpecialMoveDirection.FORWARD,
        SpecialMoveButton.ANY_PUNCH],
      cursor: 0.
    },
    {
      state: FighterState.CROUCH_PUNCH,
      sequence : [
        SpecialMoveDirection.DOWN,
        SpecialMoveButton.ANY_PUNCH],
        cursor : 0.


    },{
      state: FighterState.TORNADE,
      sequence : [
        SpecialMoveDirection.BACKWARD, SpecialMoveDirection.FORWARD,SpecialMoveDirection.UP,
        SpecialMoveButton.ANY_KICK],
        cursor : 0,
       
    },
    {
      state: FighterState.Tacle,
      sequence : [
        SpecialMoveDirection.DOWN,
        SpecialMoveButton.ANY_KICK],
        cursor : 0,
       
    }
    ]
    this.gravity = 1000;
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
      this.entityList.addEntity.call(this.entityList, Fireball, this, time, this.fireball.strength, time);

    }

    if (this.animations[this.cunrentState][this.animationFrame][1] != -2) return;
    this.changeState(FighterState.IDLE)
  }
}



