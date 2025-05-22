import { Control } from "./control.js";

export const FireballState ={
    ACTIVE:'active',
    COLLIDED:'collided',
    Lancer:'lance',
    Idle:'idle',
    Attack1:'attack1',
    Attack2:'attack2',
    Ult:'Ult',
    Slash1:'slash1',
   UltStart:'ultStart',
}
export const FireballCollidedState ={
    NONE:'none',
    OPPONENT:'opponent',
    FIREBALL:'fireball',
}

export const FireballVellocity = {
    [Control.LIGHT_PUNCH]:150,
    [Control.MEDIUM_PUNCH]:220,
    [Control.HEAVY_PUNCH]:300,
}