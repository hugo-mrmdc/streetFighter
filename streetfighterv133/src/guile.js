import { Control } from "./constants/control.js";
import { FIGHTER_HURT_DELAY, FighterAttackStrenght, FighterState, HurtBox, PushBox, SpecialMoveButton, SpecialMoveDirection } from "./constants/fighter.js";
import { Fighter } from "./fighter.js";
import { Fireball } from "./special/fireball.js";
export class Guile extends Fighter {
    constructor(x, y, direction, playerId, onAttackHit, entityList) {
        super('GUILE', x, y, direction, playerId, onAttackHit);
        this.entityList = entityList
        this.tornadoCooldown = 0;
        this.image = document.querySelector('img[alt="guile"]');
        this.states[FighterState.SPECIAL_1] = {
            init: this.handleHadoukenInit.bind(this),
            update: this.handleHadoukenState.bind(this),
            shadow: [1.6, 1, -8, 0],
            validFrom: [
                FighterState.IDLE, FighterState.WALK_BACKWARD, FighterState.WALK_FORWARD, FighterState.CROUCH, FighterState.CROUCH_DOWN, FighterState.CROUCH_UP,
            ],
            [FighterState.TORNADE]: {

                attackType: FighterAttackStrenght.PUNCH,
                attackStrenght: FighterAttackStrenght.LIGHT,
                init: () => { this.velocity.x = 300 },
                update: this.handleStandartTornadoAttackState.bind(this),
                validFrom: [FighterState.IDLE, FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD],
            },
        }
        this.states[FighterState.IDLE].validFrom = [...this.states[FighterState.IDLE].validFrom, FighterState.SPECIAL_1]
        this.frame = new Map([
            ['idle-1', [[[18, 390, 80, 96], [39, 78]], PushBox.IDLE, HurtBox.IDLE]],
            ['idle-2', [[[117, 390, 83, 98], [39, 78]], PushBox.IDLE, HurtBox.IDLE]],
            ['idle-3', [[[220, 390, 83, 97], [39, 78]], PushBox.IDLE, HurtBox.IDLE]],
            ['idle-4', [[[324, 389, 81, 102], [39, 78]], PushBox.IDLE, HurtBox.IDLE]],



            ['forwards-1', [[[14, 550, 88, 97], [35, 81]], PushBox.IDLE, HurtBox.FORWARD]],
            ['forwards-2', [[[141, 547, 72, 97], [35, 86]], PushBox.IDLE, HurtBox.FORWARD]],
            ['forwards-3', [[[256, 541, 68, 102], [35, 89]], PushBox.IDLE, HurtBox.FORWARD]],
            ['forwards-4', [[[368, 547, 66, 96], [29, 89]], PushBox.IDLE, HurtBox.FORWARD]],
            ['forwards-5', [[[480, 551, 68, 97], [29, 89]], PushBox.IDLE, HurtBox.FORWARD]],


            ['backwards-1', [[[22, 711, 75, 104], [35, 85]], PushBox.IDLE, HurtBox.BACKWARD]],
            ['backwards-2', [[[125, 705, 74, 106], [36, 87]], PushBox.IDLE, HurtBox.BACKWARD]],
            ['backwards-3', [[[230, 703, 71, 106], [36, 88]], PushBox.IDLE, HurtBox.BACKWARD]],
            ['backwards-4', [[[327, 707, 73, 103], [38, 89]], PushBox.IDLE, HurtBox.BACKWARD]],
            ['backwards-5', [[[411, 710, 89, 106], [36, 87]], PushBox.IDLE, HurtBox.BACKWARD]],

            ['jump-1', [[[374, 892, 76, 84], [32, 107]], PushBox.JUMP, HurtBox.JUMP]],
            ['jump-2', [[[475, 868, 71, 109], [25, 103]], PushBox.JUMP, HurtBox.JUMP]],
            ['jump-3', [[[561, 868, 68, 93], [25, 88]], PushBox.JUMP, HurtBox.JUMP]],
            ['jump-4', [[[642, 868, 62, 82], [28, 101]], PushBox.JUMP, HurtBox.JUMP]],
            ['jump-5', [[[723, 867, 56, 72], [25, 106]], PushBox.JUMP, HurtBox.JUMP]],
            ['jump-6', [[[549, 1202, 62, 112], [31, 113]], PushBox.JUMP, HurtBox.JUMP]],

            ['jump-roll-1', [[[874, 1089, 62, 112], [25, 106]], PushBox.JUMP, [
                [-11, -106, 24, 16], [-26, -90, 40, 42], [-26, -31, 40, 32]
            ]]],
            ['jump-roll-2', [[[809, 1089, 62, 78], [22, 90]], PushBox.JUMP, [
                [-17, -90, 24, 16], [-14, -91, 40, 42], [-22, -66, 38, 18]
            ]]],
            ['jump-roll-3', [[[699, 1089, 105, 60], [22, 76]], PushBox.JUMP, [
                [22, -54, 24, 16], [-14, -81, 40, 42], [-22, -66, 38, 18]
            ]]],

            ['jump-roll-5', [[[501, 1089, 128, 48], [22, 98]], PushBox.JUMP, [
                [-72, -56, 24, 16], [-40, -77, 52, 40], [-14, -82, 48, 34]

            ]]],
            ['jump-roll-6', [[[421, 1089, 77, 112], [53, 98]], PushBox.JUMP, [[-55, -100, 24, 16], [-48, -87, 44, 38], [-22, -66, 38, 18]]]],

            ['jump-land', [[[874, 1315, 63, 96], [29, 83]], PushBox.IDLE, HurtBox.IDLE]],
            ['crouch-1', [[[16, 893, 76, 83], [27, 81]], PushBox.IDLE, HurtBox.IDLE]],
            ['crouch-2', [[[119, 907, 76, 68], [25, 50]], PushBox.BEND, HurtBox.BEND]],
            ['crouch-3', [[[210, 911, 71, 66], [45, 50]], PushBox.CROUCH, HurtBox.CROUCH]],

            ['idle-turn-1', [[[874, 636, 62, 95], [29, 92]], PushBox.IDLE]],
            ['idle-turn-2', [[[800, 620, 62, 110], [30, 94]], PushBox.IDLE]],
            ['idle-turn-3', [[[742, 636, 62, 94], [27, 90]], PushBox.IDLE]],

            ['crouch-turn-1', [[[874, 830, 2, 64], [26, 58]], PushBox.CROUCH]],
            ['crouch-turn-2', [[[808, 830, 64, 64], [27, 58]], PushBox.CROUCH]],
            ['crouch-turn-3', [[[743, 830, 64, 64], [29, 58]], PushBox.CROUCH]],

            ['light-punch-1', [[[22, 1392, 75, 93], [32, 78]], PushBox.IDLE, HurtBox.IDLE]],
            ['light-punch-2', [[[110, 1392, 107, 93], [32, 78]], PushBox.IDLE, HurtBox.IDLE, [14, -60, 50, 10]]],

            ['med-punch-1', [[[22, 1392, 75, 93], [28, 78]], PushBox.IDLE, HurtBox.IDLE]],
            ['med-punch-2', [[[224, 1391, 90, 95], [29, 78]], PushBox.IDLE, HurtBox.PUNCH]],
            ['med-punch-3', [[[110, 1392, 107, 93], [24, 78]], PushBox.IDLE, HurtBox.PUNCH, [14, -60, 60, 10]]],

            ['heavy-punch-1', [[[14, 1724, 102, 80], [50, 66]], PushBox.IDLE, HurtBox.PUNCH]],
            ['heavy-punch-2', [[[146, 1719, 97, 85], [50, 70]], PushBox.IDLE, HurtBox.PUNCH]],
            ['heavy-punch-3', [[[274, 1684, 102, 125], [50, 105]], PushBox.IDLE, HurtBox.PUNCH, [17, -100, 30, 50]]],
            ['heavy-punch-4', [[[411, 1706, 96, 98], [50, 82]], PushBox.IDLE, HurtBox.PUNCH]],

            ['light-kick-1', [[[23, 2844, 65, 96], [46, 82]], PushBox.IDLE, [
                [-28, -79, 30, 18], [-41, -79, 42, 38], [-32, -52, 44, 50]
            ]]],
            ['light-kick-2', [[[106, 2843, 100, 98], [45, 82]], PushBox.IDLE, [
                [-40, -79, 30, 18], [-57, -79, 42, 38], [-32, -52, 44, 50],
            ], [6, -30, 66, 28]]],

            ['med-kick-1', [[[201, 2843, 126, 98], [50, 78]], PushBox.IDLE, [
                [-40, -79, 30, 18], [-57, -79, 42, 38], [-32, -52, 44, 50]
            ], [-10, -30, 80, 28]]],

            ['heavy-kick-1', [[[857, 2481, 79, 93], [59, 80]], PushBox.IDLE, [
                [-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]
            ]]],
            ['heavy-kick-2', [[[745, 2480, 110, 94], [59, 80]], PushBox.IDLE, [
                [12, -90, 34, 34], [-25, -78, 42, 42], [-11, -50, 42, 50]
            ], [8, -80, 40, 32]]],
            ['heavy-kick-3', [[[616, 2479, 127, 96], [59, 80]], PushBox.IDLE, [
                [13, -91, 62, 34], [-25, -78, 42, 42], [-11, -50, 42, 50]
            ], [8, -80, 62, 24]]],
            ['heavy-kick-4', [[[502, 2495, 111, 79], [59, 80]], PushBox.IDLE, [
                [-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]
            ]]],
            ['heavy-kick-5', [[[437, 2479, 64, 96], [59, 80]], PushBox.IDLE, [
                [-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]
            ]]],
            ['hit-face-1', [
                [[777, 4275, 70, 90], [50, 78]], PushBox.IDLE, [
                    [-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]
                ]]],
            ['hit-face-2', [
                [[777, 4274, 70, 93], [50, 78]], PushBox.IDLE, [
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
                [[858, 4177, 79, 96], [50, 78]], PushBox.IDLE, [
                    [-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]
                ]]],
            ['hit-stomach-2', [
                [[777, 4177, 78, 95], [50, 78]], PushBox.IDLE, [
                    [-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]
                ]]],
            ['hit-stomach-3', [
                [[695, 4194, 80, 78], [50, 78]], PushBox.IDLE, [
                    [-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]
                ]]],
            ['hit-stomach-4', [
                [[614, 4194, 80, 78], [56, 901]], PushBox.IDLE,
                [[-57, -80, 20, 20], [-57, -74, 40, 46], [-35, -37, 40, 30]]
            ]],
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
                [[859, 3676, 78, 96], [50, 80]], PushBox.IDLE, [
                    [10, -78, 20, 20], [-10, -50, 42, 42], [-11, -50, 42, 50]
                ]]],
            ['special-2', [
                [[761, 3676, 93, 95], [50, 80]], PushBox.IDLE, [
                    [20, -65, 20, 20], [-10, -50, 42, 42], [-11, -50, 42, 50]
                ]]],
            ['special-3', [
                [[651, 3679, 106, 92], [40, 65]], PushBox.IDLE, [
                    [25, -75, 20, 20], [-5, -50, 42, 42], [-11, -50, 42, 50]
                ]]],
            ['special-4', [
                [[520, 3692, 125, 80], [40, 65]], PushBox.IDLE, [
                    [30, -65, 20, 20], [5, -50, 42, 42], [-11, -50, 42, 50]
                ]]],
            ['crouch-punch-1', [[[859, 2010, 78, 64], [40, 53]], PushBox.CROUCH, HurtBox.CROUCH]],
            ['crouch-punch-2', [[[776, 2010, 80, 64], [40, 53]], PushBox.CROUCH, HurtBox.CROUCH]],
            ['crouch-punch-3', [[[664, 2010, 111, 64], [40, 53]], PushBox.CROUCH, HurtBox.CROUCH, [13, -40, 50, 12]]],
            ['chut-1', [[[825, 5775, 112, 64], [60, 33]]]],
            ['chut-2', [[[696, 5775, 128, 47], [70, 33]]]],
            ['chut-3', [[[567, 5807, 128, 32], [80, 10]]]],
            ['monte-1', [[[825, 4904, 111, 47], [60, 33]], PushBox.IDLE]],
            ['monte-2', [[[760, 4872, 64, 80], [30, 64]], PushBox.IDLE]],
            ['monte-3', [[[695, 4824, 64, 128], [30, 110]], PushBox.IDLE]],
            ['monte-4', [[[614, 4872, 80, 79], [50, 80]], PushBox.IDLE]],
            ['temp', [[[874, 523, 62, 95], [33, 83]],]],

            ['tornado-1', [[[857, 3902, 78, 111], [33, 120]], PushBox.IDLE, HurtBox.IDLE]],
            ['tornado-2', [[[777, 3902, 78, 95], [33, 120]], PushBox.IDLE, HurtBox.IDLE]],
            ['tornado-3', [[[712, 3902, 63, 80], [33, 120]], PushBox.IDLE, HurtBox.IDLE,]],
            ['tornado-4', [[[647, 3902, 63, 96], [33, 120]], PushBox.IDLE, HurtBox.IDLE]],
            ['tornado-5', [[[550, 3902, 93, 111], [33, 120]], PushBox.IDLE, HurtBox.IDLE, [13, -80, 50, 12]]],
            ['tornado-6', [[[388, 3902, 94, 95], [33, 120]], PushBox.IDLE, HurtBox.IDLE]],
            ['tornado-7', [[[322, 3902, 63, 96], [33, 120]], PushBox.IDLE, HurtBox.IDLE, [13, -80, 50, 18]]],
            ['tornado-8', [[[258, 3902, 62, 111], [33, 120]], PushBox.IDLE, HurtBox.IDLE]],
            ['tornado-9', [[[192, 3902, 63, 111], [33, 120]], PushBox.IDLE, HurtBox.IDLE]],
            ['tornado-10', [[[127, 3902, 63, 96], [33, 120]], PushBox.IDLE, HurtBox.IDLE]],
            ['tornado-11', [[[62, 3902, 63, 96], [33, 120]], PushBox.IDLE, HurtBox.IDLE]],
            ['crouchtacle-1', [[[874, 3045, 56, 71], [40, 53]], PushBox.CROUCH, HurtBox.CROUCH]],
            ['crouchtacle-2', [[[729, 3045, 143, 64], [40, 53]], PushBox.CROUCH, HurtBox.CROUCH, [13, -4, 70, 12]]],
            ['crouchtacle-3', [[[647, 3045, 80, 64], [40, 53]], PushBox.CROUCH, HurtBox.CROUCH]],
            ['win-1', [[[874, 4985, 62, 95], [30, 80]]]],
            ['win-2', [[[808, 4969, 58, 111], [30, 95]]]],
            ['win-3', [[[743, 4953, 64, 128], [30, 110]]]],
            ['jump-kick-1', [[[729, 3045, 143, 64], [40, 53]], PushBox.CROUCH, HurtBox.CROUCH, [13, -4, 70, 12]]],
            ['jump-kick-2', [[[647, 3045, 80, 64], [40, 53]], PushBox.JUMP, HurtBox.JUMP,]],
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
            [FighterState.IDLE]: [
                ['idle-1', 68],
                ['idle-2', 68],
                ['idle-3', 68],
                ['idle-4', 68],
                ['idle-1', 68],
                ['idle-1', 68]
            ],
            [FighterState.WALK_FORWARD]: [
               ['forwards-1', 65],
                ['forwards-2', 65],
                ['forwards-3', 65],
                ['forwards-4', 65],
                ['forwards-5', 65],
                ['forwards-1', 65]
            ],
            [FighterState.WALK_BACKWARD]: [['backwards-1', 65], ['backwards-2', 65], ['backwards-3', 65], ['backwards-4', 65], ['backwards-5', 65], ['backwards-1', 65]],
            [FighterState.JUMP_UP]: [['jump-1', 100], ['jump-2', 100], ['jump-3', 100], ['jump-4', 100], ['jump-5', 300], ['jump-5', -1]],
            [FighterState.JUMP_FORWARD]: [['jump-1', 200], ['jump-2', 100], ['jump-3', 100], ['jump-4', 100], ['jump-5', 150], ['jump-5', -1]],
            [FighterState.JUMP_BACKWARD]: [['jump-1', 200], ['jump-2', 100], ['jump-3', 100], ['jump-4', 100], ['jump-5', 150], ['jump-5', -1]],
            [FighterState.JUMP_END]: [['jump-1', 1]],
            [FighterState.CROUCH]: [['crouch-3', 0]],
            [FighterState.JUMP_START]: [['jump-1', 50], ['jump-1', -2]],
            [FighterState.JUMP_LAND]: [['idle-1', 33], ['idle-1', 127], ['idle-1', -2]],
            [FighterState.CROUCH_DOWN]: [['crouch-1', 30], ['crouch-2', 30], ['crouch-3', 30], ['crouch-3', -2]],
            [FighterState.CROUCH_UP]: [['crouch-3', 30], ['crouch-2', 30], ['crouch-1', 30], ['crouch-1', -2]],
            [FighterState.IDLE_TURN]: [['idle-turn-3', 33], ['idle-turn-2', 30], ['idle-turn-1', 30], ['idle-turn-1', 1]],
            [FighterState.CROUCH_TURN]: [['crouch-turn-3', 33], ['crouch-turn-2', 30], ['crouch-turn-1', 30], ['crouch-turn-1', 1]],
            [FighterState.LIGHT_PUNCH]: [['light-punch-1', 33], ['light-punch-2', 66], ['light-punch-1', 66], ['light-punch-1', -2]],
            [FighterState.MEDIUM_PUNCH]: [
                ['med-punch-1', 16],
                ['med-punch-2', 33],
                ['med-punch-3', 66],
                ['med-punch-2', 50],
                ['med-punch-1', 199],
                ['med-punch-1', -2],
            ],
            [FighterState.HEAVY_PUNCH]: [
                ['heavy-punch-1', 50],
                ['heavy-punch-1', 33],
                ['heavy-punch-2', 50],
                ['heavy-punch-3', 50],
                ['heavy-punch-4', 50],
                ['med-punch-1', -2],
            ],
            [FighterState.LIGHT_Kick]: [['med-punch-1', 82],['med-punch-1', 2], ['med-kick-1', 100], ['med-kick-1', 199], ['light-kick-1', 116], ['light-kick-1', -2]],
            [FighterState.MEDIUM_Kick]: [['med-punch-1', 82], ['med-kick-1', 100], ['med-kick-1', 199], ['light-kick-1', 116], ['light-kick-1', -2]],
            [FighterState.HEAVY_Kick]: [
                ['heavy-kick-1', 40],
                ['heavy-kick-2', 66],
                ['heavy-kick-3', 133],
                ['heavy-kick-4', 166],
                ['heavy-kick-5', 166],
                ['heavy-kick-5', -2],
            ], [FighterState.HURT_HEAD_LIGHT]: [
                ['hit-face-1', FIGHTER_HURT_DELAY],
                ['hit-face-2', 48],
                ['hit-face-3', 128],

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
                ['hit-face-4', 64],
                ['stun-3', 144],
                ['stun-3', -2],
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
                ['hit-stomach-3', -2]
            ],

            [FighterState.HURT_BODY_HEAVY]: [
                ['hit-stomach-2', FIGHTER_HURT_DELAY],
                ['hit-stomach-2', 3],
                ['hit-stomach-3', 4],
                ['hit-stomach-4', 4],
                ['stun-3', 9],
                ['stun-3', -2]
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
                ['crouchtacle-1', 32],
                ['crouchtacle-2', 128],
                ['crouchtacle-3', 128],
                ['crouchtacle-3', -2],
            ],
            [FighterState.WIN]: [

                ['win-1', 200],
                ['win-2', 200],
                ['win-3', 200],

            ],
            [FighterState.JUMKICK]: [


                ['jump-kick-1', 200],


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
            this.entityList.addEntity.call(this.entityList, Fireball, this, time, this.fireball.strength);

        }

        if (this.animations[this.cunrentState][this.animationFrame][1] != -2) return;
        this.changeState(FighterState.IDLE)
    }

}



