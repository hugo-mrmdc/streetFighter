import { FRAME_TIME } from "./game.js";

export const FIGHTER_START_DISTANCE = 88;
export const FighterDirection = {
    LEFT: -1,
    RIGHT: 1,
}
export const FIGHTER_HURT_DELAY =231;
export const FighterAttackType ={
    PUNCH:'punch',
    KICK:'kick'
}

export const FighterId = {
    RYU:'Ryu',
    KEN:'Ken',
}
export const FighterAttackStrenght = {
    VERY_LIGHT:'very-light',
    LIGHT:'light',
    MEDIUM:'medium',
    HEAVY:'heavy',
    Purple:'purple',
    HEAVYC:'heavyC', 
}
export const FighterHurtBox ={
    HEAD:'head',
    BODY:'body',
    FEET:'feet',
}

export const FighterAttacksBaseData = {
    [FighterAttackStrenght.VERY_LIGHT]:{
        score:100,
        damage:5,
        slide:{
            velocity: -12 * FRAME_TIME,
            friction: 600,
        },
    },
    [FighterAttackStrenght.LIGHT]:{
        score:100,
        damage:12,
        slide:{
            velocity: -12 * FRAME_TIME,
            friction: 600,
        },
    },
    [FighterAttackStrenght.MEDIUM]:{
        score:300,
        damage:20,
        slide:{
            velocity: -16 * FRAME_TIME,
            friction: 600,
        },
    },
    [FighterAttackStrenght.HEAVY]:{
        score:500,
        damage:28,
        slide:{
            velocity: -12 * FRAME_TIME,
            friction: 800,
        },
    },
    [FighterAttackStrenght.HEAVYC]:{
        score:500,
        damage:28,
        slide:{
            velocity: -3 * FRAME_TIME,
            friction: 500,
        },
    },
    [FighterAttackStrenght.Purple]:{
        score:1000,
        damage:45,
        slide:{
            velocity: -22 * FRAME_TIME,
            friction: 800,
        },
    },
   
}

export const FighterState = {
    IDLE: 'IDLE',
    WALK_FORWARD: 'walkForwards',
    WALK_BACKWARD: 'walkBackwards',
    JUMP_START: 'jumpStat',
    JUMP_LAND: 'jumpland',
    JUMP_UP:'jumpUp',
    JUMP_FORWARD: 'jumpForwards',
    JUMP_BACKWARD: 'jumpBackwards',
    JUMP_END: 'end',
    CROUCH: 'crouch',
    CROUCH_DOWN:'crouchDown',
    CROUCH_UP:'crouchUp',
    IDLE_TURN: 'idleTurn',
    CROUCH_TURN: 'crouchTurn',
    LIGHT_PUNCH: 'lightPunch',
    MEDIUM_PUNCH: 'mediumPunch',
    HEAVY_PUNCH: 'heavyPunch',
    LIGHT_Kick: 'lightKick',
    MEDIUM_Kick: 'mediumKick',
    HEAVY_Kick: 'heavyKick',
    HURT_HEAD_LIGHT: 'hurt_head_light',
    HURT_HEAD_MEDIUM: 'hurt-head-medium',
    HURT_HEAD_HEAVY: 'hurt-head-heavy', 
    HURT_BODY_LIGHT: 'hurt-body-light',
    HURT_BODY_MEDIUM: 'hurt-body-medium',
    HURT_BODY_HEAVY: 'hurt-body-heavy', 
    SPECIAL_1: 'special_1',
    CROUCH_PUNCH:'crouchpunch',
    TORNADE:'tornade',
    Tacle:'tacle',
    CHUT1:'chut1',
    Monte:'monte',
    DOWN:'down',
    ko:'ko',
    WIN:'Win',
    JUMKICK:'jumpKick',
    JUMPWALL:'wallJump',
    //crouchATTACK
    CROUCH_L_PUNCH:'crouch-l-punch',
    CROUCH_M_PUNCH:'crouch-l-punch',
    CROUCH_h_PUNCH:'crouch-h-punch',
    CROUCH_L_Kick:'crouch-l-Kick',
    CROUCH_h_Kick:'crouch-h-Kick',
    
    //Jump ATTACk
    JUMP_L_PUNCH:'jump-l-punch',
    JUMP_M_PUNCH:'jump-m-punch',
    JUMP_h_PUNCH:'jump-h-punch',
    JUMP_PUNCH:'jump-punch',
    FOR_JUMP_PUNCH:'for-jump-punch',
    JUMP_KICK:'jump-kick',
    JUMP_h_KICK:'jump-kick',
    FOR_JUMP_KICK:'for-jump-kick',
    FOR_JUMP_h_PUNCH:'for-jump-h-punch',
    FOR_JUMP_h_KICK:'for-jump-h-kick',
    HyakuRestu:'HyakuRestu',

    Enter:'enter',

    //gojo
    Red:'red',
    Purple:'purple',
    dashRed:'dashRed',
    SmachPunch:'smachPunch',
    AirRed:'airRed',
    Expansion:'expansion',

    //yuta
    Combo1:'combo1',

    //geto
    BigFleau:'bigFleau',
}

export const PushBox ={
    IDLE:[-17,-75,40,78],
    JUMP:[-16,-91,32,66],
    BEND:[-16,-58,32,58],
    CROUCH:[-16,-50,32,50],
}

export const HurtBox = {
    IDLE: [
        [-8, -79, 24, 16],
        [-25, -63, 40, 42],
        [-25, -20, 40, 32]
    ],
    BACKWARD: [
        [-19, -79, 24, 16],
        [-26, -63, 40, 42],
        [-26, -25, 40, 32]
    ],
    FORWARD: [
        [-3, -79, 24, 16],
        [-26, -62, 40, 42],
        [-26, -20, 40, 32]
    ],
    JUMP: [
        [-13, -106, 28, 18],
        [-26, -90, 40, 42],
        [-22, -48, 38, 18]
    ],
    BEND: [
        [-2, -68, 24, 18],
        [-16, -53, 44, 24],
        [-16, -44, 44, 24]
    ],
    CROUCH: [
        [-8, -50, 24, 18],
        [-28, -32, 44, 24],
        [-28, -8, 44, 24]
    ],
    PUNCH: [
        [11, -83, 24, 18],
        [-7, -77, 40, 43],
        [-7, -33, 40, 33]
    ]
};
export const hurtStateValidFrom =[
    FighterState.IDLE,FighterState.WALK_BACKWARD,FighterState.WALK_FORWARD,
    FighterState.JUMP_LAND,FighterState.JUMP_START,FighterState.JUMP_START,
    FighterState.JUMP_BACKWARD, FighterState.JUMP_FORWARD,
    FighterState.LIGHT_PUNCH,FighterState.MEDIUM_PUNCH,FighterState.HEAVY_PUNCH,
    FighterState.LIGHT_Kick,FighterState.MEDIUM_Kick,FighterState.HEAVY_Kick,
    FighterState.HURT_HEAD_LIGHT,FighterState.HURT_HEAD_MEDIUM,FighterState.HURT_HEAD_HEAVY,
    FighterState.HURT_BODY_LIGHT,FighterState.HURT_BODY_MEDIUM,FighterState.HURT_BODY_HEAVY,FighterState.SPECIAL_1,FighterState.DOWN,FighterState.ko,FighterState.CHUT1
];

export const SpecialMoveDirection = {
    BACKWARD: 'backward',
    BACKWARD_UP: 'backward-up',
    UP: 'up',
    FORWARD_UP: 'forward-up',
    FORWARD: 'forward',
    FORWARD_DOWN: 'forward-down',
    DOWN: 'down',
    BACKWARD_DOWN: 'backward-down',
    NONE: 'none',
  };
  export const SpecialMoveButton = {
    ANY_PUNCH: 'any-punch',
    L_PUNCH:'l-punch',
    M_PUNCH:'m-punch',
    H_PUNCH:'h-punch.',
    ANY_KICK: 'any-kick',
    L_Kick:'l-Kick',
    M_Kick:'m-Kick',
    H_Kick:'h-Kick',
  };
  