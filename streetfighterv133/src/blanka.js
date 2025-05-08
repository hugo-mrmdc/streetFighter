import { Control } from "./constants/control.js";
import { FIGHTER_HURT_DELAY, FighterAttackStrenght, FighterState, HurtBox, PushBox, SpecialMoveButton, SpecialMoveDirection } from "./constants/fighter.js";
import { Fighter } from "./fighter.js";
import { Fireball } from "./special/fireball.js";
import { kikouken } from "./special/kikouken.js";
export class BLANKA extends Fighter {
  constructor(x, y, direction, playerId, onAttackHit, entityList) {
    super('BLANKA', x, y, direction, playerId, onAttackHit);
    this.entityList = entityList
    this.tornadoCooldown = 0;
    this.image = document.querySelector('img[alt="blankaperso"]');
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
      ['idle-1', [[[8, 12, 99, 97], [40, 82]], PushBox.IDLE, [[2, -70, 30, 16],
      [-15, -63, 40, 42],
      [-15, -20, 40, 32]]]],
      ['idle-2', [[[112, 10, 101, 99], [40, 82]], PushBox.IDLE, [[2, -70, 30, 16],
      [-15, -63, 40, 42],
      [-15, -20, 40, 32]]]],
      ['idle-3', [[[213, 9, 102, 102], [40, 82]], PushBox.IDLE, [[2, -70, 30, 16],
      [-15, -63, 40, 42],
      [-15, -20, 40, 32]]]],
      ['idle-4', [[[160, 32, 48, 82], [40, 82]], PushBox.IDLE, [[2, -70, 30, 16],
      [-15, -63, 40, 42],
      [-15, -20, 40, 32]]]],



      ['forwards-1', [[[326, 23, 94, 82], [27, 65]], PushBox.IDLE, [[40, -50, 20, 25],
      [0, -55, 40, 42],
      [0, -20, 40, 32]]]],
      ['forwards-2', [[[428, 29, 95, 85], [27, 65]], PushBox.IDLE, [[40, -50, 20, 25],
      [0, -55, 40, 42],
      [0, -20, 40, 32]]]],
      ['forwards-3', [[[534, 25, 91, 85], [27, 65]], PushBox.IDLE, [[40, -50, 20, 25],
      [0, -55, 40, 42],
      [0, -20, 40, 32]]]],
      ['forwards-4', [[[632, 23, 97, 86], [27, 65]], PushBox.IDLE, [[40, -50, 20, 25],
      [0, -55, 40, 42],
      [0, -20, 40, 32]]]],
      ['forwards-5', [[[747, 21, 84, 89], [27, 65]], PushBox.IDLE, [[40, -50, 20, 25],
      [0, -55, 40, 42],
      [0, -20, 40, 32]]]],
      ['forwards-6', [[[843, 30, 90, 78], [27, 65]], PushBox.IDLE, [[40, -50, 20, 25],
      [0, -55, 40, 42],
      [0, -20, 40, 32]]]],
      ['forwards-7', [[[942, 30, 89, 79], [27, 65]], PushBox.IDLE, [[40, -50, 20, 25],
      [0, -55, 40, 42],
      [0, -20, 40, 32]]]],
      ['forwards-8', [[[1032, 24, 102, 86], [27, 65]], PushBox.IDLE, [[40, -50, 20, 25],
      [0, -55, 40, 42],
      [0, -20, 40, 32]]]],


      ['backwards-1', [[[874, 992, 62, 95], [35, 85]], PushBox.IDLE, HurtBox.BACKWARD]],
      ['backwards-2', [[[809, 992, 62, 95], [36, 87]], PushBox.IDLE, HurtBox.BACKWARD]],
      ['backwards-3', [[[744, 992, 62, 95], [36, 88]], PushBox.IDLE, HurtBox.BACKWARD]],
      ['backwards-4', [[[672, 992, 62, 95], [38, 89]], PushBox.IDLE, HurtBox.BACKWARD]],
      ['backwards-5', [[[598, 992, 62, 95], [36, 87]], PushBox.IDLE, HurtBox.BACKWARD]],

      ['jump-1', [[[15, 244, 81, 129], [32, 107]], PushBox.JUMP, HurtBox.JUMP]],
      ['jump-2', [[[94, 249, 83, 103], [25, 103]], PushBox.JUMP, HurtBox.JUMP]],
      ['jump-3', [[[181, 257, 76, 91], [25, 88]], PushBox.JUMP, HurtBox.JUMP]],
      ['jump-4', [[[259, 257, 78, 86], [28, 101]], PushBox.JUMP, HurtBox.JUMP]],
      ['jump-5', [[[341, 261, 82, 83], [25, 106]], PushBox.JUMP, HurtBox.JUMP]],
      ['jump-6', [[[421, 253, 97, 91], [31, 113]], PushBox.JUMP, HurtBox.JUMP]],
      ['jump-7', [[[519, 235, 116, 113], [31, 113]], PushBox.JUMP, HurtBox.JUMP]],


      ['jump-roll-1', [[[795, 129, 130, 90], [70, 106]], PushBox.JUMP, HurtBox.JUMP]],
      ['jump-roll-2', [[[927, 134, 130, 84], [70, 90]], PushBox.JUMP, HurtBox.JUMP]],
      ['jump-roll-3', [[[1058, 135, 91, 85], [70, 76]], PushBox.JUMP, HurtBox.JUMP]],
      ['jump-roll-4', [[[1187, 126, 80, 95], [40, 100]], PushBox.JUMP, HurtBox.JUMP]],

      ['jump-roll-5', [[[1273, 128, 88, 91], [40, 100]], PushBox.JUMP, HurtBox.JUMP]],

      ['jump-roll-6', [[[1366, 127, 101, 95], [40, 100]], PushBox.JUMP, [[-55, -100, 24, 16], [-48, -87, 44, 38], [-22, -66, 38, 18]]]],

      ['jump-land', [[[8, 12, 99, 97], [22, 83]], PushBox.IDLE, HurtBox.IDLE]],
      ['crouch-1', [[[627, 30, 46, 84], [27, 81]], PushBox.IDLE, HurtBox.IDLE]],
      ['crouch-2', [[[1311, 43, 47, 69], [25, 66]], PushBox.BEND, HurtBox.BEND]],
      ['crouch-3', [[[1673, 149, 95, 72], [50, 50]], PushBox.CROUCH, HurtBox.CROUCH]],



      ['light-punch-1', [[[7, 433, 101, 98], [40, 88]], PushBox.IDLE, HurtBox.IDLE]],
      ['light-punch-2', [[[119, 430, 137, 102], [40, 88]], PushBox.IDLE, HurtBox.IDLE]],
      ['light-punch-3', [[[263, 430, 117, 103], [40, 88]], PushBox.IDLE, HurtBox.IDLE, [35, -80, 50, 30]]],
      ['med-punch-1', [[[396, 397, 93, 134], [40, 110]], PushBox.IDLE, HurtBox.IDLE]],
      ['med-punch-2', [[[497, 410, 126, 119], [40, 100]], PushBox.IDLE, HurtBox.PUNCH]],
      ['med-punch-3', [[[629, 430, 137, 102], [40, 80]], PushBox.IDLE, HurtBox.PUNCH, [25, -45, 70, 15]]],

      ['heavy-punch-1', [[[772, 432, 114, 104], [50, 82]], PushBox.IDLE, HurtBox.PUNCH]],
      ['heavy-punch-2', [[[897, 432, 110, 99], [50, 82]], PushBox.IDLE, HurtBox.PUNCH]],
      ['heavy-punch-3', [[[1019, 429, 136, 103], [50, 82]], PushBox.IDLE, HurtBox.PUNCH]],
      ['heavy-punch-4', [[[1160, 408, 115, 126], [50, 100]], PushBox.IDLE, HurtBox.PUNCH, [10, -90, 50, 40]]],

      ['light-kick-1', [[[7, 725, 87, 103], [30, 92]], PushBox.IDLE, [
        [-15, -79, 30, 18], [-20, -79, 42, 38], [-20, -52, 44, 50]
      ]]],
      ['light-kick-2', [[[101, 729, 103, 99], [30, 92]], PushBox.IDLE, [
        [-15, -79, 30, 18], [-20, -79, 42, 38], [-20, -52, 44, 50],
      ]]],
      ['light-kick-3', [[[216, 732, 141, 99], [30, 92]], PushBox.IDLE, [
        [-15, -79, 30, 18], [-20, -79, 42, 38], [-20, -52, 44, 50],
      ], [40, -65, 70, 18]]],

      ['med-kick-1', [[[363, 729, 103, 95], [50, 70]], PushBox.IDLE, [
        [-40, -79, 30, 18], [-57, -79, 42, 38], [-32, -52, 44, 50]
      ]]],
      ['med-kick-2', [[[481, 730, 112, 91], [50, 70]], PushBox.IDLE, [
        [-40, -79, 30, 18], [-57, -79, 42, 38], [-32, -52, 44, 50]
      ]]],
      ['med-kick-3', [[[614, 726, 133, 96], [50, 70]], PushBox.IDLE, [
        [-40, -79, 30, 18], [-57, -79, 42, 38], [-32, -52, 44, 50]
      ], [0, -78, 80, 28]]],

      ['heavy-kick-1', [[[769, 723, 102, 67], [35, 92]], PushBox.IDLE, [
        [-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]
      ]]],
      ['heavy-kick-2', [[[877, 719, 172, 57], [60, 92]], PushBox.IDLE, [
        [-50, -90, 34, 34], [-20, -90, 42, 42], [20, -80, 50, 30]
      ], [35, -70, 80, 24]]],
      ['heavy-kick-3', [[[1051, 715, 130, 103], [35, 90]], PushBox.IDLE, [
        [13, -91, 62, 34], [-25, -78, 42, 42], [-50, -50, 20, 30]
      ]]],
      ['heavy-kick-4', [[[1186, 698, 96, 132], [70, 115]], PushBox.IDLE, [
        [-30, -50, 20, 20], [-60, -80, 30, 42], [-50, -130, 20, 50]
      ]]],

      ['hit-face-1', [
        [[0, 1612, 93, 106], [50, 78]], PushBox.IDLE, [
          [-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]
        ]]],
      ['hit-face-2', [
        [[94, 1616, 112, 102], [50, 78]], PushBox.IDLE, [
          [-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]
        ]]],
      ['hit-face-3', [
        [[212, 1625, 125, 90], [50, 78]], PushBox.IDLE, [
          [-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]
        ]]],
      ['hit-face-4', [
        [[308, 2150, 83, 93], [56, 901]], PushBox.IDLE,
        [[-57, -80, 20, 20], [-57, -74, 40, 46], [-35, -37, 40, 30]]
      ]],


      ['hit-stomach-1', [
        [[347, 1629, 97, 89], [50, 78]], PushBox.IDLE, [
          [-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]
        ]]],
      ['hit-stomach-2', [
        [[444, 1628, 102, 92], [50, 78]], PushBox.IDLE, [
          [-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]
        ]]],
      ['hit-stomach-3', [
        [[547, 1632, 104, 87], [50, 78]], PushBox.IDLE, [
          [-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]
        ]]],
      ['hit-stomach-4', [
        [[651, 1631, 110, 79], [50, 78]], PushBox.IDLE, [
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
        [[10, 591, 41, 93], [50, 80]], PushBox.IDLE, [
          [10, -78, 20, 20], [-10, -50, 42, 42], [-11, -50, 42, 50]
        ]]],
      ['special-2', [
        [[53, 592, 64, 88], [50, 80]], PushBox.IDLE, [
          [20, -65, 20, 20], [-10, -50, 42, 42], [-11, -50, 42, 50]
        ]]],
      ['special-3', [
        [[118, 583, 41, 98], [40, 80]], PushBox.IDLE, [
          [25, -75, 20, 20], [-5, -50, 42, 42], [-11, -50, 42, 50]
        ]]],
      ['special-4', [
        [[171, 607, 67, 80], [40, 80]], PushBox.IDLE, [
          [30, -65, 20, 20], [5, -50, 42, 42], [-11, -50, 42, 50]
        ]]],
      ['crouch-punch-1', [[[533, 912, 117, 61], [60, 40]], PushBox.CROUCH, HurtBox.CROUCH]],
      ['crouch-punch-2', [[[666, 920, 160, 54], [60, 40]], PushBox.CROUCH, HurtBox.CROUCH, [40, -23, 50, 12]]],

      ['crouch-punch-m-1', [[[990, 902, 93, 74], [50, 60]], PushBox.CROUCH, HurtBox.CROUCH]],
      ['crouch-punch-m-2', [[[1101, 906, 147, 70], [50, 50]], PushBox.CROUCH, [
        [50, -45, 20, 20], [5, -50, 42, 42], [-11, -50, 42, 50]
      ],]],
      ['crouch-punch-m-3', [[[1265, 900, 155, 76], [50, 60]], PushBox.CROUCH, [
        [40, -43, 20, 20], [5, -50, 42, 42], [-11, -50, 42, 50]
      ], [50, -50, 50, 30]]],
      ['crouch-punch-m-4', [[[1437, 896, 148, 82], [50, 60]], PushBox.CROUCH, HurtBox.CROUCH]],

      ['crouch-punch-h-1', [[[14, 1022, 90, 64], [50, 60]], PushBox.CROUCH, HurtBox.CROUCH]],
      ['crouch-punch-h-2', [[[110, 1025, 111, 63], [50, 50]], PushBox.CROUCH, [
        [50, -45, 20, 20], [5, -50, 42, 42], [-11, -50, 42, 50]
      ],]],
      ['crouch-punch-h-3', [[[238, 995, 177, 93], [50, 60]], PushBox.CROUCH, [
        [40, -43, 20, 20], [5, -50, 42, 42], [-11, -50, 42, 50]
      ], [60, -60, 60, 30]]],


      ['chut-1', [[[506, 1926, 102, 90], [40, 70]]]],
      ['chut-2', [[[610, 1927, 128, 74], [45, 70]]]],
      ['chut-3', [[[739, 1929, 133, 79], [45, 65]]]],
      ['chut-4', [[[874, 1966, 172, 65], [80, 55]]]],
      ['chut-5', [[[1048, 1990, 181, 44], [90, 20]]]],
      ['monte-1', [[[2, 1950, 141, 77], [90, 55]], PushBox.IDLE]],
      ['monte-2', [[[157, 1922, 105, 102], [40, 85 ]], PushBox.IDLE]],
      ['monte-3', [[[262, 1911, 96, 113], [40, 96]], PushBox.IDLE]],
      ['monte-4', [[[369, 1927, 131, 96], [50, 70]], PushBox.IDLE]],

      ['temp', [[[3, 32, 48, 82], [33, 83]],]],


      ['crouchtacle-1', [[[424, 1013, 80, 81], [40, 53]], PushBox.CROUCH, HurtBox.CROUCH]],
      ['crouchtacle-2', [[[513, 1009, 92, 85], [40, 53]], PushBox.CROUCH, HurtBox.CROUCH]],
      ['crouchtacle-3', [[[613, 1005, 146, 74], [40, 53]], PushBox.CROUCH, HurtBox.CROUCH, [27, -4, 80, 12]]],



      ['win-1', [[[1230, 1912, 91, 118], [40, 90]]]],
      ['win-2', [[[1323, 1891, 106, 139], [50, 110]]]],
      ['win-3', [[[1429, 1873, 100, 155], [60, 130]]]],
      ['win-4', [[[316, 956, 51, 98], [30, 150]]]],


      ['jump-kick-1', [[[729, 3045, 143, 64], [40, 53]], PushBox.CROUCH, HurtBox.CROUCH, [13, -4, 70, 12]]],
      ['jump-kick-2', [[[647, 3045, 80, 64], [40, 53]], PushBox.JUMP, HurtBox.JUMP,]],


      ['crouch-l-1', [[[222, 386, 44, 60], [40, 50]]]],
      ['crouch-l-2', [[[273, 397, 69, 51], [40, 50]], PushBox.CROUCH, HurtBox.CROUCH, [13, -4, 50, 12]]],

      ['crouch-h-1', [[[776, 996, 80, 87], [60, 70]]]],
      ['crouch-h-2', [[[875, 997, 100, 85], [60, 70]], PushBox.CROUCH, HurtBox.CROUCH]],
      ['crouch-h-3', [[[979, 1008, 170, 73], [70, 60]], PushBox.CROUCH, HurtBox.CROUCH, [25, -10, 70, 20]]],

      ['jum-up-p-1', [[[3, 1135, 100, 89], [30, 80]], PushBox.CROUCH, HurtBox.CROUCH,]],
      ['jum-up-p-2', [[[103, 1135, 91, 85], [20, 80]], PushBox.CROUCH, HurtBox.CROUCH, [25, -50, 50, 30]]],
      ['jum-up-p-3', [[[196, 1136, 124, 86], [30, 80]], PushBox.CROUCH, HurtBox.CROUCH, [25, -50, 50, 30]]],

      ['jum-up-h-1', [[[325, 1127, 131, 94], [30, 80]], PushBox.CROUCH, HurtBox.CROUCH, [25, -50, 70, 30]]],
      ['jum-up-h-2', [[[469, 1128, 91, 92], [20, 80]], PushBox.CROUCH, HurtBox.CROUCH]],
      ['jum-up-h-3', [[[559, 1124, 73, 95], [30, 80]], PushBox.CROUCH, HurtBox.CROUCH]],

      ['jump-f-1', [[[1061, 377, 39, 63], [30, 80]]]],
      ['jump-f-2', [[[1100, 373, 55, 74], [20, 80]], PushBox.JUMP, HurtBox.JUMP, [25, -50, 40, 30]]],

      ['jum-up-k-1', [[[1, 475, 39, 88], [30, 80]], PushBox.JUMP, HurtBox.JUMP,]],
      ['jum-up-k-2', [[[41, 475, 56, 87], [20, 80]], PushBox.JUMP, HurtBox.JUMP]],
      ['jum-up-k-3', [[[96, 472, 42, 91], [30, 80]], PushBox.JUMP, HurtBox.JUMP, [10, -60, 40, 50]]],


      ['jum-up-k-h-1', [[[240, 473, 47, 88], [30, 110]], PushBox.JUMP, HurtBox.JUMP,]],
      ['jum-up-k-h-2', [[[287, 473, 56, 89], [20, 110]], PushBox.JUMP, HurtBox.JUMP, [20, -60, 40, 50]]],
      ['jum-up-k-h-3', [[[345, 469, 69, 73], [30, 125]], PushBox.JUMP, HurtBox.JUMP, [20, -75, 40, 50]]],
      ['jum-up-k-h-4', [[[414, 465, 35, 95], [30, 140]], PushBox.JUMP, HurtBox.JUMP]],


      ['for-jump-f-1', [[[596, 378, 53, 66], [30, 80]]]],
      ['for-jump-f-2', [[[632, 488, 69, 61], [20, 80]], PushBox.JUMP, HurtBox.JUMP, [30, -50, 40, 30]]],



      ['jum-for-k-1', [[[630, 1107, 95, 120], [30, 120]], PushBox.JUMP, HurtBox.JUMP,]],
      ['jum-for-k-2', [[[729, 1114, 132, 109], [20, 120]], PushBox.JUMP, HurtBox.JUMP, [10, -76, 80, 10]]],
      ['jum-for-k-3', [[[862, 1110, 104, 116], [30, 120]], PushBox.JUMP, HurtBox.JUMP, [10, -76, 80, 10]]],
      ['jum-for-k-4', [[[969, 1108, 82, 129], [30, 120]], PushBox.JUMP, HurtBox.JUMP]],

      ['aerial-l-kick-1', [[[1056, 1137, 84, 88], [30, 100]], PushBox.JUMP, [
        [20, -90, 20, 20], [-20, -80, 42, 42], [20, -80, 20, 50]
      ]]],
      ['aerial-l-kick-2', [[[1139, 1134, 108, 95], [50, 100]], PushBox.JUMP, [
        [10, -90, 20, 20], [-20, -80, 42, 42], [20, -80, 20, 50]
      ]]],
      ['aerial-l-kick-3', [[[1247, 1135, 133, 93], [50, 100]], PushBox.JUMP, [[-13, -106, 28, 18],
      [-26, -90, 40, 42],
      [-10, -40, 80, 18]], [0, -35, 80, 20]]],

      ['aerial-h-kick-1', [[[1383, 1140, 98, 83], [30, 100]], PushBox.JUMP, [
        [20, -90, 20, 20], [-20, -80, 42, 42], [20, -80, 20, 50]
      ]]],
      ['aerial-h-kick-2', [[[1481, 1123, 137, 100], [50, 100]], PushBox.JUMP, [
        [10, -90, 20, 20], [-20, -80, 42, 42], [20, -80, 20, 50]
      ]]],
      ['aerial-h-kick-3', [[[1620, 1109, 178, 109], [80, 120]], PushBox.JUMP, [[-13, -106, 28, 18],
      [-26, -90, 40, 42],
      [-10, -50, 80, 30]], [10, -50, 80, 30]]],



      ['spe-1', [[[543, 594, 66, 94], [30, 90]], PushBox.IDLE, HurtBox.IDLE, [15, -90, 30, 30]]],
      ['spe-2', [[[729, 593, 79, 97], [20, 90]], PushBox.IDLE, HurtBox.IDLE, [30, -90, 30, 50]]],
      ['spe-3', [[[707, 595, 76, 93], [30, 85]], PushBox.IDLE, HurtBox.IDLE, [20, -50, 30, 30]]],
      ['spe-4', [[[797, 600, 85, 89], [30, 80]], PushBox.IDLE, HurtBox.IDLE, [30, -40, 30, 40]]],
      ['spe-5', [[[890, 601, 80, 87], [20, 80]], PushBox.IDLE, HurtBox.IDLE, [34, -62, 30, 30]]],
      ['spe-6', [[[976, 593, 92, 95], [20, 85]], PushBox.IDLE, HurtBox.IDLE, [42, -50, 30, 40]]],
      ['spe-7', [[[1075, 599, 65, 88], [20, 80]], PushBox.IDLE, HurtBox.IDLE, [20, -40, 30, 40]]],
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
      [FighterState.IDLE]: [['idle-1', 68],
      ['idle-2', 68], ['idle-3', 68], ['idle-1', 68], ['idle-1', 68]],
      [FighterState.WALK_FORWARD]: [['forwards-1', 65],
      ['forwards-2', 65], ['forwards-3', 65], ['forwards-4', 65], ['forwards-5', 65], ['forwards-6', 65], ['forwards-7', 65], ['forwards-8', 65], ['forwards-1', 65]],
      [FighterState.WALK_BACKWARD]: [['forwards-8', 65], ['forwards-7', 65], ['forwards-6', 65], ['forwards-5', 65], ['forwards-4', 65], ['forwards-3', 65], ['forwards-2', 65], ['forwards-1', 65], ['forwards-1', 65]],
      [FighterState.JUMP_UP]: [['jump-1', 100], ['jump-2', 100], ['jump-3', 100], ['jump-4', 100], ['jump-4', 100], ['jump-6', 100], ['jump-7', 100], ['jump-4', -1]],
      [FighterState.JUMP_FORWARD]: [['jump-1', 100], ['jump-2', 100], ['jump-3', 100], ['jump-roll-1', 200], ['jump-roll-2', 100], ['jump-roll-3', 100], ['jump-land', 500], ['jump-roll-6', -1]],
      [FighterState.JUMP_BACKWARD]: [['jump-1', 100], ['jump-2', 100], ['jump-3', 100], ['jump-roll-4', 200], ['jump-roll-5', 100], ['jump-roll-6', 100], ['jump-land', 500], ['jump-roll-6', -1]],
      [FighterState.JUMP_END]: [['jump-1', 1]],
      [FighterState.CROUCH]: [['crouch-3', 0]],
      [FighterState.JUMP_START]: [['jump-land', 50], ['jump-land', -2]],
      [FighterState.JUMP_LAND]: [['jump-land', 33], ['jump-land', 127], ['jump-land', -2]],
      [FighterState.CROUCH_DOWN]: [['crouch-1', 30], ['crouch-2', 30], ['crouch-3', 30], ['crouch-3', -2]],
      [FighterState.CROUCH_UP]: [['crouch-3', 30], ['crouch-2', 30], ['crouch-1', 30], ['crouch-1', -2]],
      [FighterState.IDLE_TURN]: [['idle-turn-3', 33], ['idle-turn-2', 30], ['idle-turn-1', 30], ['idle-turn-1', 1]],
      [FighterState.CROUCH_TURN]: [['crouch-turn-3', 33], ['crouch-turn-2', 30], ['crouch-turn-1', 30], ['crouch-turn-1', 1]],
      [FighterState.LIGHT_PUNCH]: [['light-punch-1', 100], ['light-punch-2', 100], ['light-punch-3', 100], ['light-punch-1', 100], ['light-punch-1', -2]],
      [FighterState.MEDIUM_PUNCH]: [
        ['med-punch-1', 100],

        ['med-punch-2', 50],
        ['med-punch-2', 30],
        ['med-punch-3', 100],
        ['med-punch-3', 50],
        ['med-punch-1', -2],
      ],
      [FighterState.HEAVY_PUNCH]: [

        ['heavy-punch-1', 50],
        ['heavy-punch-1', 50],
        ['heavy-punch-2', 50],
        ['heavy-punch-3', 50],
        ['heavy-punch-4', 200],
        ['med-punch-1', -2],
      ],
      [FighterState.LIGHT_Kick]: [['light-kick-1', 100], ['light-kick-2', 50], ['light-kick-2', 0], ['light-kick-2', 33], ['light-kick-3', 66], ['light-kick-3', 66], ['med-punch-1', -2]],
      [FighterState.MEDIUM_Kick]: [['med-kick-1', 100], ['med-kick-1', 30], ['med-kick-2', 100], ['light-kick-3', 116], ['light-kick-1', -2]],
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
        ['hit-face-3', 64],
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
        ['hit-stomach-2', 100],
        ['hit-stomach-3', 230],
        ['hit-stomach-4', 230],
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
        ['special-1', 32],
        ['special-2', 128],
        ['special-2', 32],
        ['special-2', 240],
        ['special-1', -2],
      ],
      [FighterState.CROUCH_PUNCH]: [['crouch-punch-1', 33], ['crouch-punch-2', 33], ['crouch-punch-2', 66], ['crouch-punch-1', -2]],
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

       ['chut-1', 50],
        ['chut-2', 50],
        ['chut-3', 50],
        ['chut-4', 50],
        ['chut-5', 400],
        ['monte-1', 100],
        ['monte-2', 100],
        ['monte-3', 100],
        ['monte-4', 100],
        ['monte-4', -2],
      ],
      [FighterState.DOWN]: [

        ['chut-1', 200],
        ['chut-2', 200],
        ['chut-3', 500],
        ['chut-3', -2],
      ],
      [FighterState.ko]: [

        ['chut-5', 200],


      ],
      [FighterState.Tacle]: [
        ['crouchtacle-1', 100],
        ['crouchtacle-2', 128],
        ['crouchtacle-3', 128],
        ['crouchtacle-3', -2],
      ],
      [FighterState.WIN]: [

        ['win-1', 50],
        ['win-2', 100],
        ['win-3', 100],
        ['win-1', 10],
        ['win-3', 100],
        ['win-1', 100],
      ],
      //special 

      [FighterState.CROUCH_L_Kick]: [


        ['crouchtacle-1', 100],
        ['crouchtacle-2', 128],
        ['crouchtacle-3', 128],
        ['crouchtacle-3', -2],

      ],
      [FighterState.CROUCH_h_Kick]: [
        ['crouch-h-1', 50],
        ['crouch-h-1', 50],
        ['crouch-h-2', 64],
        ['crouch-h-2', 64],
        ['crouch-h-3', 128],
        ['crouch-h-1', -2],

      ],
      [FighterState.JUMP_PUNCH]: [
        ['jum-up-p-1', 150],
        ['jum-up-p-2', 50],
        ['jum-up-p-3', 128],
        ['jum-up-p-3', -1],
      ],
      [FighterState.FOR_JUMP_PUNCH]: [
        ['jump-f-1', 150],
        ['jump-f-2', 300],
        ['jump-f-1', -1],
      ],
      [FighterState.JUMKICK]: [
        ['aerial-l-kick-1', 150],
        ['aerial-l-kick-2', 150],
        ['aerial-l-kick-3', 100],

        ['jump-f-1', -1],
      ],

      [FighterState.FOR_JUMP_h_KICK]: [
        ['aerial-h-kick-1', 150],
        ['aerial-h-kick-2', 150],
        ['aerial-h-kick-3', 100],
        ['aerial-h-kick-3', -1],

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
      [FighterState.FOR_JUMP_h_PUNCH]: [
        ['jum-for-k-1', 150],
        ['jum-for-k-2', 150],
        ['jum-for-k-3', 150],
        ['jum-for-k-4', 150],

        ['jum-for-k-4', -1],
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
      [FighterState.CROUCH_M_PUNCH]: [
        ['crouch-punch-m-1', 100],
        ['crouch-punch-m-2', 100],
        ['crouch-punch-m-3', 100],
        ['crouch-punch-m-4', 100],
        ['crouch-punch-m-4', -2],
      ],
      [FighterState.CROUCH_h_PUNCH]: [
        ['crouch-punch-h-1', 100],
        ['crouch-punch-h-2', 100],
        ['crouch-punch-h-3', 100],
        ['crouch-punch-h-3', -2],

      ],
      [FighterState.JUMP_h_PUNCH]: [
        ['jum-up-h-1', 20],
        ['jum-up-h-1', 180],
        ['jum-up-h-2', 100],
        ['jum-up-h-3', 100],
        ['jum-up-h-1', -1],

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
    this.specialMove = [
      {
        state: FighterState.CROUCH_PUNCH,
        sequence: [
          SpecialMoveDirection.DOWN,
          SpecialMoveButton.L_PUNCH],
        cursor: 0.


      },

      {
        state: FighterState.CROUCH_L_Kick,
        sequence: [
          SpecialMoveDirection.DOWN,
          SpecialMoveButton.L_Kick],
        cursor: 0,

      }
      , {
        state: FighterState.CROUCH_h_Kick,
        sequence: [
          SpecialMoveDirection.DOWN,
          SpecialMoveButton.H_Kick],
        cursor: 0,

      }
      , {
        state: FighterState.CROUCH_M_PUNCH,
        sequence: [
          SpecialMoveDirection.DOWN,
          SpecialMoveButton.M_PUNCH],
        cursor: 0,

      }, {
        state: FighterState.CROUCH_h_PUNCH,
        sequence: [
          SpecialMoveDirection.DOWN,
          SpecialMoveButton.H_PUNCH],
        cursor: 0,

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
      this.entityList.addEntity.call(this.entityList, kikouken, this, time, this.fireball.strength);

    }

    if (this.animations[this.cunrentState][this.animationFrame][1] != -2) return;
    this.changeState(FighterState.IDLE)
  }


}



