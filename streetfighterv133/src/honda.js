import { Control } from "./constants/control.js";
import { FIGHTER_HURT_DELAY, FighterAttackStrenght, FighterState, HurtBox, PushBox, SpecialMoveButton, SpecialMoveDirection } from "./constants/fighter.js";
import { Fighter } from "./fighter.js";
import { Fireball } from "./special/fireball.js";
import { kikouken } from "./special/kikouken.js";
export class HONDA extends Fighter {
    constructor(x, y, direction, playerId, onAttackHit, entityList) {
        super('HONDA', x, y, direction, playerId, onAttackHit);
        this.entityList = entityList
        this.tornadoCooldown = 0;
        this.image = document.querySelector('img[alt="honda"]');
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
            ['idle-1', [[[24, 412, 106, 97], [60, 75]], PushBox.IDLE, [[-15, -75, 30, 16],
            [-32, -60, 60, 42],
            [-35, -20, 70, 32]]]],
            ['idle-2', [[[131, 412, 112, 97], [60, 75]], PushBox.IDLE, [[-15, -75, 30, 16],
            [-32, -60, 60, 42],
            [-35, -20, 70, 32]]]],
            ['idle-3', [[[244, 412, 112, 97], [60, 75]], PushBox.IDLE, [[-15, -75, 30, 16],
            [-32, -60, 60, 42],
            [-35, -20, 70, 32]]]],
            ['idle-4', [[[358, 412, 111, 97], [60, 75]], PushBox.IDLE, [[-15, -75, 30, 16],
            [-32, -60, 60, 42],
            [-35, -20, 70, 32]]]],



            ['forwards-1', [[[24, 525, 106, 94], [60, 75]], PushBox.IDLE, [[-5, -70, 20, 18],
            [-30, -55, 60, 42],
            [-21, -20, 60, 32]]]],
            ['forwards-2', [[[132, 525, 112, 94], [60, 75]], PushBox.IDLE, [[-5, -70, 20, 18],
            [-30, -55, 60, 42],
            [-20, -20, 60, 32]]]],
            ['forwards-3', [[[247, 525, 105, 94], [60, 75]], PushBox.IDLE, [[-5, -70, 20, 18],
            [-30, -55, 60, 42],
            [-20, -20, 60, 32]]]],
            ['forwards-4', [[[353, 525, 97, 94], [60, 75]], PushBox.IDLE, [[-5, -70, 20, 18],
            [-30, -55, 60, 42],
            [-20, -20, 60, 32]]]],
            ['forwards-5', [[[454, 525, 102, 89], [60, 75]], PushBox.IDLE, [[-5, -70, 20, 18],
            [-30, -55, 60, 42],
            [-20, -20, 60, 32]]]],
            ['forwards-6', [[[560, 525, 109, 94], [60, 75]], PushBox.IDLE, [[-5, -70, 20, 18],
            [-30, -55, 60, 42],
            [-20, -20, 60, 32]]]],
            ['forwards-7', [[[670, 525, 114, 94], [60, 75]], PushBox.IDLE, [[-5, -70, 20, 18],
            [-30, -55, 60, 42],
            [-20, -20, 60, 32]]]],
            ['forwards-8', [[[785, 525, 124, 94], [60, 75]], PushBox.IDLE, [[-5, -70, 20, 18],
            [-30, -55, 60, 42],
            [-20, -20, 60, 32]]]],


            ['backwards-1', [[[874, 992, 62, 95], [35, 85]], PushBox.IDLE, HurtBox.BACKWARD]],
            ['backwards-2', [[[809, 992, 62, 95], [36, 87]], PushBox.IDLE, HurtBox.BACKWARD]],
            ['backwards-3', [[[744, 992, 62, 95], [36, 88]], PushBox.IDLE, HurtBox.BACKWARD]],
            ['backwards-4', [[[672, 992, 62, 95], [38, 89]], PushBox.IDLE, HurtBox.BACKWARD]],
            ['backwards-5', [[[598, 992, 62, 95], [36, 87]], PushBox.IDLE, HurtBox.BACKWARD]],

            ['jump-1', [[[26, 1816, 103, 138], [50, 150]], PushBox.JUMP, [
                [10, -90, 28, 18],
                [-40, -70, 80, 20],
                [-35, -48, 80, 25]
            ]]],
            ['jump-2', [[[132, 1816, 95, 138], [50, 120]], PushBox.JUMP, [
                [-10, -114, 28, 18],
                [-35, -95, 60, 50],
                [-35, -30, 50, 50]
            ]]],
            ['jump-3', [[[231, 1816, 97, 138], [50, 150]], PushBox.JUMP, [
                [10, -90, 28, 18],
                [-40, -70, 80, 20],
                [-35, -48, 80, 25]
            ]]],
            ['jump-4', [[[332, 1816, 105, 138], [50, 150]], PushBox.JUMP, [
                [10, -90, 28, 18],
                [-40, -70, 80, 20],
                [-35, -48, 80, 25]
            ]]],
            ['jump-5', [[[438, 1816, 114, 138], [50, 150]], PushBox.JUMP, [
                [10, -90, 28, 18],
                [-40, -70, 80, 20],
                [-35, -48, 80, 25]
            ]]],
            ['jump-6', [[[553, 1816, 113, 138], [50, 150]], PushBox.JUMP, [
                [10, -90, 28, 18],
                [-40, -70, 80, 20],
                [-35, -48, 80, 25]
            ]]],
            ['jump-7', [[[667, 1816, 103, 138], [50, 150]], PushBox.JUMP, [
                [10, -90, 28, 18],
                [-40, -70, 80, 20],
                [-35, -48, 80, 25]
            ]]],


            ['jump-roll-1', [[[135, 1644, 143, 155], [70, 130]], PushBox.JUMP, [
                [10, -90, 24, 16], [-20, -80, 44, 38], [-40, -50, 60, 40]
            ]]],
            ['jump-roll-2', [[[282, 1644, 114, 155], [70, 180]], PushBox.JUMP, HurtBox.JUMP]],
            ['jump-roll-3', [[[395, 1644, 92, 155], [70, 180]], PushBox.JUMP, HurtBox.JUMP]],
            ['jump-roll-4', [[[489, 1644, 92, 155], [40, 180]], PushBox.JUMP, [
                [0, 0,0, 0], [-20, -90, 60, 60], [0,0, 0, 0]
            ]]],

            ['jump-roll-5', [[[585, 1644, 130, 155], [60, 180]], PushBox.JUMP, [
                [-30, -90, 24, 16], [-20, -80, 44, 38], [0, -100, 60, 40]
            ]]],

            ['jump-roll-6', [[[719, 1644, 147, 155], [40, 140]], PushBox.JUMP, [
                [-10, -90, 24, 17], [-20, -74, 44, 34], [0, -60, 60, 40]]]],

            ['jump-land', [[[8, 12, 99, 97], [22, 83]], PushBox.IDLE, HurtBox.IDLE]],
            ['crouch-1', [[[24, 1146, 108, 82], [27, 63]], PushBox.IDLE, HurtBox.IDLE]],
            ['crouch-2', [[[134, 1146, 110, 82], [25, 63]], PushBox.BEND, HurtBox.BEND]],
            ['crouch-3', [[[246, 1146, 105, 82], [60, 63]], PushBox.CROUCH, [
                [10, -50, 24, 18],
                [-40, -32, 80, 24],
                [-40, -8, 80, 24]
            ],]],



            ['light-punch-1', [[[24, 644, 124, 89], [50, 70]], PushBox.IDLE, [[-15, -75, 30, 16],
            [-32, -60, 60, 42],
            [-35, -20, 70, 32]]]],
            ['light-punch-2', [[[150, 644, 156, 89], [50, 70]], PushBox.IDLE, [[-15, -75, 30, 16],
            [-32, -60, 60, 42],
            [-25, -20, 70, 32]], [30, -55, 65, 18]]],
            ['light-punch-3', [[[307, 644, 125, 89], [50, 70]], PushBox.IDLE, [[-15, -75, 30, 16],
            [-32, -60, 60, 42],
            [-35, -20, 70, 32]]]],
            ['med-punch-1', [[[440, 636, 111, 97], [50, 70]], PushBox.IDLE, [[-15, -75, 30, 16],
            [-32, -60, 60, 42],
            [-35, -20, 70, 32]]]],
            ['med-punch-2', [[[553, 636, 111, 97], [50, 70]], PushBox.IDLE, [[-15, -75, 30, 16],
            [-32, -60, 60, 42],
            [-35, -20, 70, 32]]]],
            ['med-punch-3', [[[666, 636, 161, 97], [50, 70]], PushBox.IDLE, [[-15, -75, 30, 16],
            [-32, -60, 60, 42],
            [-35, -20, 70, 32]], [36, -60, 70, 23]]],

            ['heavy-punch-1', [[[716, 749, 124, 125], [50, 100]], PushBox.IDLE, [[20, -58, 20, 20],
            [-32, -60, 60, 42],
            [-35, -20, 80, 32]]]],
            ['heavy-punch-2', [[[418, 749, 145, 125], [50, 100]], PushBox.IDLE, [[20, -58, 20, 20],
            [-32, -60, 60, 42],
            [-35, -20, 80, 32]]]],
            ['heavy-punch-3', [[[563, 749, 151, 125], [50, 100]], PushBox.IDLE, [[20, -58, 20, 20],
            [-32, -60, 60, 42],
            [-35, -20, 80, 32]], [50, -20, 50, 20]]],
            ['heavy-punch-4', [[[1160, 749, 115, 125], [50, 100]], PushBox.IDLE, HurtBox.PUNCH]],

            ['light-kick-1', [[[413, 899, 103, 95], [50, 80]], PushBox.IDLE, [
                [-15, -79, 30, 18], [-20, -79, 42, 38], [-20, -52, 44, 50]
            ]]],
            ['light-kick-2', [[[519, 899, 123, 95], [50, 80]], PushBox.IDLE, [
                [-15, -79, 30, 18], [-20, -79, 42, 38], [-20, -52, 44, 50],
            ]]],
            ['light-kick-3', [[[644, 899, 168, 95], [50, 80]], PushBox.IDLE, [
                [-15, -79, 30, 18], [-20, -79, 42, 38], [-20, -52, 44, 50],
            ], [50, -65, 70, 18]]],

            ['med-kick-1', [[[363, 729, 103, 95], [50, 70]], PushBox.IDLE, [
                [-40, -79, 30, 18], [-57, -79, 42, 38], [-32, -52, 44, 50]
            ]]],
            ['med-kick-2', [[[481, 730, 112, 91], [50, 70]], PushBox.IDLE, [
                [-40, -79, 30, 18], [-57, -79, 42, 38], [-32, -52, 44, 50]
            ]]],
            ['med-kick-3', [[[614, 726, 133, 96], [50, 70]], PushBox.IDLE, [
                [-40, -79, 30, 18], [-57, -79, 42, 38], [-32, -52, 44, 50]
            ], [0, -78, 80, 28]]],

            ['heavy-kick-1', [[[24, 1010, 102, 120], [50, 100]], PushBox.IDLE, [
                [15, -72, 20, 20], [-15, -55, 42, 25], [-20, -30, 60, 40]
            ]]],
            ['heavy-kick-2', [[[127, 1010, 87, 120], [50, 100]], PushBox.IDLE, [
                [15, -72, 20, 20], [-15, -55, 42, 25], [-20, -30, 60, 40]
            ]]],
            ['heavy-kick-3', [[[216, 1010, 100, 120], [50, 100]], PushBox.IDLE, [
                [15, -72, 20, 20], [-15, -55, 42, 25], [-20, -30, 60, 40]
            ]]],
            ['heavy-kick-4', [[[318, 1010, 153, 120], [50, 100]], PushBox.IDLE, [
                [15, -72, 20, 20], [-15, -55, 42, 25], [-20, -30, 60, 40]
            ], [20, -88, 80, 24]]],

            ['hit-face-1', [
                [[137, 4041, 124, 112], [50, 90]], PushBox.IDLE, [
                    [-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]
                ]]],
            ['hit-face-2', [
                [[259, 4041, 102, 112], [50, 90]], PushBox.IDLE, [
                    [-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]
                ]]],
            ['hit-face-3', [
                [[361, 4041, 93, 112], [50, 90]], PushBox.IDLE, [
                    [-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]
                ]]],
            ['hit-face-4', [
                [[308, 4041, 83, 93], [56, 901]], PushBox.IDLE,
                [[-57, -80, 20, 20], [-57, -74, 40, 46], [-35, -37, 40, 30]]
            ]],


            ['hit-stomach-1', [
                [[463, 4066, 120, 87], [50, 60]], PushBox.IDLE, [
                    [-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]
                ]]],
            ['hit-stomach-2', [
                [[580, 4066, 123, 87], [50, 60]], PushBox.IDLE, [
                    [-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]
                ]]],
            ['hit-stomach-3', [
                [[704, 4066, 126, 87], [50, 60]], PushBox.IDLE, [
                    [-41, -78, 20, 20], [-25, -78, 42, 42], [-11, -50, 42, 50]
                ]]],
            ['hit-stomach-4', [
                [[830, 4066, 121, 87], [50, 78]], PushBox.IDLE, [
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
            ['crouch-punch-1', [[[24, 1255, 132, 71], [80, 50]], PushBox.CROUCH, HurtBox.CROUCH]],
            ['crouch-punch-2', [[[158, 1255, 172, 71], [80, 50]], PushBox.CROUCH, HurtBox.CROUCH, [40, -40, 50, 18]]],

            ['crouch-punch-m-1', [[[473, 1244, 108, 82], [50, 60]], PushBox.CROUCH, HurtBox.CROUCH]],
            ['crouch-punch-m-2', [[[583, 1244, 128, 82], [50, 60]], PushBox.CROUCH, [
                [50, -45, 20, 20], [5, -50, 42, 42], [-11, -50, 42, 50]
            ],]],
            ['crouch-punch-m-3', [[[713, 1244, 171, 82], [50, 60]], PushBox.CROUCH, [
                [40, -43, 20, 20], [5, -50, 42, 42], [-11, -50, 42, 50]
            ], [70, -50, 50, 30]]],
            ['crouch-punch-m-4', [[[1437, 1244, 148, 82], [50, 60]], PushBox.CROUCH, HurtBox.CROUCH]],


            ['crouch-punch-h-1', [[[24, 1342, 142, 81], [80, 60]], PushBox.CROUCH, HurtBox.CROUCH]],
            ['crouch-punch-h-2', [[[164, 1342, 192, 81], [80, 60]], PushBox.CROUCH, [
                [50, -45, 20, 20], [5, -50, 42, 42], [-11, -50, 42, 50]
            ], [60, -30, 50, 20]]],
            ['crouch-punch-h-3', [[[358, 1342, 158, 81], [80, 60]], PushBox.CROUCH, [
                [40, -43, 20, 20], [5, -50, 42, 42], [-11, -50, 42, 50]
            ]]],


            ['chut-1', [[[24, 4329, 98, 145], [50, 120]]]],
            ['chut-2', [[[123, 4329, 146, 145], [70, 115]]]],
            ['chut-3', [[[273, 4329, 191, 145], [70, 115]]]],
            ['chut-4', [[[464, 4329, 192, 145], [100, 115]]]],
            ['chut-5', [[[658, 4329, 191, 145], [100, 115]]]],
            ['monte-1', [[[848, 4329, 104, 145], [60, 125]], PushBox.IDLE]],
            ['monte-2', [[[952, 4329, 135, 145], [70, 115]], PushBox.IDLE]],
            ['monte-3', [[[1088, 4329, 146, 145], [70, 115]], PushBox.IDLE]],
            ['monte-4', [[[1236, 4329, 112, 145], [70, 115]], PushBox.IDLE]],

            ['temp', [[[3, 32, 48, 82], [33, 83]],]],


            ['crouchtacle-1', [[[24, 1439, 116, 78], [40, 53]], PushBox.CROUCH, [
                [40, -43, 20, 20], [5, -50, 42, 42], [-11, -50, 42, 50]
            ]]],
            ['crouchtacle-2', [[[144, 1439, 161, 78], [40, 53]], PushBox.CROUCH, [
                [40, -43, 20, 20], [5, -50, 42, 42], [-11, -50, 42, 50]
            ], [27, 0, 80, 12]]],
            ['crouchtacle-3', [[[613, 1005, 146, 74], [40, 53]], PushBox.CROUCH, HurtBox.CROUCH]],



            ['win-1', [[[24, 4741, 109, 142], [ 50, 120]]]],
            ['win-2', [[[133, 4741, 111, 142], [50, 120]]]],
            ['win-3', [[[247, 4741, 97, 142], [50, 120]]]],
            ['win-4', [[[316, 4741, 51, 98], [60, 150]]]],


            ['jump-kick-1', [[[729, 3045, 143, 64], [40, 53]], PushBox.CROUCH, HurtBox.CROUCH, [13, -4, 70, 12]]],
            ['jump-kick-2', [[[647, 3045, 80, 64], [40, 53]], PushBox.JUMP, HurtBox.JUMP,]],


            ['crouch-l-1', [[[222, 386, 44, 60], [40, 50]]]],
            ['crouch-l-2', [[[273, 397, 69, 51], [40, 50]], PushBox.CROUCH, HurtBox.CROUCH, [13, -4, 50, 12]]],

            ['crouch-h-1', [[[150, 1533, 162, 95], [60, 70]], PushBox.CROUCH, [
                [-10, -70, 20, 20], [5, -50, 42, 42], [-11, -50, 42, 50]
            ], [25, -10, 70, 20]]],
            ['crouch-h-2', [[[478, 1533, 106, 95], [60, 70]], PushBox.CROUCH, [
                [-10, -70, 20, 20], [5, -50, 42, 42], [-11, -50, 42, 50]
            ]]],
            ['crouch-h-3', [[[588, 1533, 135, 95], [70, 60]], PushBox.CROUCH, [
                [-10, -70, 20, 20], [5, -50, 42, 42], [-11, -50, 42, 50]
            ]]],
            ['crouch-h-4', [[[725, 1533, 105, 95], [60, 70]], PushBox.CROUCH, [
                [-10, -70, 20, 20], [5, -50, 42, 42], [-11, -50, 42, 50]
            ]]],
            ['crouch-h-5', [[[831, 1533, 93, 95], [70, 60]], PushBox.CROUCH, [
                [-10, -70, 20, 20], [5, -50, 42, 42], [-11, -50, 42, 50]
            ]]],

            ['jum-up-p-1', [[[399, 1970, 98, 152], [60, 90]], PushBox.CROUCH, [
                [10, -90, 28, 18],
                [-40, -70, 80, 20],
                [-35, -48, 80, 25]
            ],]],
            ['jum-up-p-2', [[[498, 1970, 118, 152], [70, 110]], PushBox.CROUCH, [
                [10, -90, 28, 18],
                [-40, -70, 80, 20],
                [-35, -48, 80, 25]
            ]]],
            ['jum-up-p-3', [[[618, 1970, 179, 152], [70, 100]], PushBox.CROUCH, [
                [10, -90, 28, 18],
                [-40, -70, 80, 20],
                [-35, -48, 80, 25]
            ], [50, -50, 50, 30]]],
            ['jum-up-p-4', [[[798, 1970, 157, 152], [70, 100]], PushBox.CROUCH, [
                [10, -90, 28, 18],
                [-40, -70, 80, 20],
                [-35, -48, 80, 25]
            ], [35, -30, 50, 30]]],
            
            ['jum-up-h-1', [[[24, 2138, 117, 127], [30, 80]], PushBox.CROUCH, [
                [10, -90, 28, 18],
                [-40, -70, 80, 20],
                [-35, -48, 80, 25]
            ]]],
            ['jum-up-h-2', [[[141, 2138, 106, 127], [20, 80]], PushBox.CROUCH, [
                [10, -90, 28, 18],
                [-40, -70, 80, 20],
                [-35, -48, 80, 25]
            ]]],
            ['jum-up-h-3', [[[250, 2138, 155, 127], [30, 80]], PushBox.CROUCH,[
                [10, -90, 28, 18],
                [-40, -70, 80, 20],
                [-35, -48, 80, 25]
            ], [75, -20, 50, 30]]],

            ['jump-f-1', [[[1061, 377, 39, 63], [30, 80]]]],
            ['jump-f-2', [[[1100, 373, 55, 74], [20, 80]], PushBox.JUMP, HurtBox.JUMP, [25, -50, 40, 30]]],

            ['jum-up-k-1', [[[24, 2392, 123, 94], [60, 110]], PushBox.JUMP, [
                [-10, -90, 28, 18],
                [-40, -70, 80, 20],
                [-35, -48, 80, 25]
            ],]],
            ['jum-up-k-2', [[[144, 2392, 100, 94], [50, 100]], PushBox.JUMP, [
                [-10, -90, 28, 18],
                [-40, -70, 80, 20],
                [-35, -48, 80, 25]
            ]]],
            ['jum-up-k-3', [[[245, 2392, 166, 94], [50,100]], PushBox.JUMP, [
                [-10, -90, 28, 18],
                [-40, -70, 80, 20],
                [-35, -48, 80, 25]
            ], [30, -40, 80, 30]]],


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
            [FighterState.IDLE]: [['idle-1', 68], ['idle-2', 68], ['idle-3', 68], ['idle-1', 68], ['idle-1', 68]
            ],
            [FighterState.WALK_FORWARD]: [['forwards-1', 65],
            ['forwards-2', 65], ['forwards-3', 65], ['forwards-4', 65], ['forwards-5', 65], ['forwards-6', 65], ['forwards-7', 65], ['forwards-8', 65], ['forwards-1', 65]],
            [FighterState.WALK_BACKWARD]: [['forwards-8', 65], ['forwards-7', 65], ['forwards-6', 65], ['forwards-5', 65], ['forwards-4', 65], ['forwards-3', 65], ['forwards-2', 65], ['forwards-1', 65], ['forwards-1', 65]],
            [FighterState.JUMP_UP]: [
                ['jump-1', 100],
                ['jump-2', 100],
                ['jump-3', 100],
                ['jump-4', 100],
                ['jump-4', 100],
                ['jump-6', 100],
                ['jump-7', 100],
                ['jump-4', -1]
            ],
            [FighterState.JUMP_FORWARD]: [
                ['jump-roll-1', 200],
                ['jump-roll-2', 100],
                ['jump-roll-3', 100],
                ['jump-roll-4', 100],
                ['jump-roll-5', 100],
                ['jump-roll-6', 500],
                ['jump-roll-6', -1],
            ],
            [FighterState.JUMP_BACKWARD]: [['jump-roll-6', 200], ['jump-roll-5', 100],['jump-roll-4', 100], ['jump-roll-3', 100],['jump-roll-2', 100], ['jump-roll-1', -1]],
            [FighterState.JUMP_END]: [['idle-1', 1]],
            [FighterState.CROUCH]: [['crouch-3', 0]],
            [FighterState.JUMP_START]: [['jump-1', 50], ['jump-1', -2]],
            [FighterState.JUMP_LAND]: [['idle-1', 33], ['idle-1', 127], ['idle-1', -2]],
            [FighterState.CROUCH_DOWN]: [['crouch-1', 30], ['crouch-2', 30], ['crouch-3', 30], ['crouch-3', -2]],
            [FighterState.CROUCH_UP]: [['crouch-3', 30], ['crouch-2', 30], ['crouch-1', 30], ['crouch-1', -2]],
            [FighterState.IDLE_TURN]: [['idle-turn-3', 33], ['idle-turn-2', 30], ['idle-turn-1', 30], ['idle-turn-1', 1]],
            [FighterState.CROUCH_TURN]: [['crouch-turn-3', 33], ['crouch-turn-2', 30], ['crouch-turn-1', 30], ['crouch-turn-1', 1]],
            [FighterState.LIGHT_PUNCH]: [
                ['light-punch-1', 100],
                ['light-punch-2', 100],
                ['light-punch-3', 100],
                ['light-punch-1', 100],
                ['light-punch-1', -2]
            ],
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
                ['heavy-punch-2', 100],
                ['heavy-punch-3', 50],
                ['heavy-punch-3', 100],
                ['med-punch-1', -2],
            ],
            [FighterState.LIGHT_Kick]: [['light-kick-1', 100], ['light-kick-2', 50], ['light-kick-2', 0], ['light-kick-2', 33], ['light-kick-3', 66], ['light-kick-3', 66], ['med-punch-1', -2]],
            [FighterState.MEDIUM_Kick]: [['light-kick-1', 100], ['light-kick-1', 30], ['light-kick-2', 140], ['light-kick-3', 116], ['light-kick-1', -2]],
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

            [FighterState.CHUT1]: [

                ['chut-1', 50],
                ['chut-2', 50],
                ['chut-3', 50],
                ['chut-4', 50],
                ['chut-5', 400],
                ['monte-1', 130],
                ['monte-2', 130],
                ['monte-3', 130],
                ['monte-4', 130],
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

                ['crouchtacle-2', -2],
            ],
            [FighterState.WIN]: [

                ['win-1', 200],
                ['win-2', 200],
                ['win-3', 200],
               
            ],
            //special 

            [FighterState.CROUCH_L_Kick]: [

                ['crouchtacle-1', 50],
                ['crouchtacle-1', 50],
                ['crouchtacle-2', 128],

                ['crouchtacle-2', -2],

            ],
            [FighterState.CROUCH_h_Kick]: [
                ['crouch-h-1', 50],
                ['crouch-h-1', 50],
                ['crouch-h-2', 70],
                ['crouch-h-3', 70],
                ['crouch-h-4', 70],
                ['crouch-h-5', 70],
                ['crouch-h-1', -2],

            ],
            [FighterState.JUMP_PUNCH]: [
                ['jum-up-p-1', 150],
                ['jum-up-p-2', 50],
                ['jum-up-p-3', 128],
                ['jum-up-p-4', 128],
                ['jum-up-p-3', -1],
            ],
            [FighterState.FOR_JUMP_PUNCH]: [
                ['jum-up-p-1', 150],
                ['jum-up-p-2', 50],
                ['jum-up-p-3', 128],
                ['jum-up-p-4', 128],
                ['jum-up-p-3', -1],
            ],
            [FighterState.JUMKICK]: [
                ['jum-up-k-1', 100],
                ['jum-up-k-2', 100],
                ['jum-up-k-3', 150],

                ['jum-up-k-3', -1],
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
                ['jum-up-k-1', 150],
                ['jum-up-k-2', 150],
                ['jum-up-k-3', 150],

                ['jum-up-k-3', -1],
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
                ['crouch-punch-m-3', 50],
                ['crouch-punch-m-3', 50],
                ['crouch-punch-m-3', -2],
            ],
            [FighterState.CROUCH_h_PUNCH]: [
                ['crouch-punch-h-1', 200],
                ['crouch-punch-h-2', 200],
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



