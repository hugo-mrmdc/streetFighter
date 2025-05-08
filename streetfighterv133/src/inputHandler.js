import { Control, Controls } from "./constants/control.js";
import { FighterDirection } from "./constants/fighter.js";

const heldKeys = new Set();
const mappedKeya = Controls.map(({Keyboard}) => Object.values(Keyboard)).flat();
const pressedKeys = new Set();
function handleKeydown(event){
    if(!mappedKeya.includes(event.code)) return;
    event.preventDefault();

    heldKeys.add(event.code)
}
function handleKeyUp(event){
    if(!mappedKeya.includes(event.code)) return;
    event.preventDefault();

    heldKeys.delete(event.code)
    pressedKeys.delete(event.code)
}

export function registerkeyboardEvent(){
    window.addEventListener('keydown', handleKeydown)
    window.addEventListener('keyup', handleKeyUp)
}

export const isKeyDown = (code) => heldKeys.has(code); 
export const isKeyUp = (code) => !heldKeys.has(code); 

export const isLeft = (id) => isKeyDown(Controls[id].Keyboard[Control.LEFT])
export const isRight = (id) => isKeyDown(Controls[id].Keyboard[Control.RIGHT])
export const isUp = (id) => isKeyDown(Controls[id].Keyboard[Control.UP])
export const isDown = (id) => isKeyDown(Controls[id].Keyboard[Control.DOWN])
export function isKeyPressed(code){
    if(heldKeys.has(code) && !pressedKeys.has(code)){
        pressedKeys.add(code)
        return true
    }
}
export const isControlPressed = (id,control) => isKeyPressed(Controls[id].Keyboard[control]) 
export const isForward = (id,direction) => direction === FighterDirection.RIGHT ? isRight(id) : isLeft(id);
export const isBackward = (id,direction) => direction === FighterDirection.LEFT ? isRight(id) : isLeft(id);
export const isIDle = (id) => !(isLeft(id) || isRight(id) || isUp(id) || isDown(id));
export const isControlDown = (id,control) => isKeyDown(Controls[id].Keyboard[control]);
export const isLightPunch = (id) => isControlPressed(id,Control.LIGHT_PUNCH);
export const isMediumPunch = (id) => isControlPressed(id,Control.MEDIUM_PUNCH);
export const isHeavyPunch = (id) => isControlPressed(id,Control.HEAVY_PUNCH);

export const isLightkick = (id) => isControlPressed(id,Control.LIGHT_Kick);
export const isMediumkick = (id) => isControlPressed(id,Control.MEDIUM_Kick);
export const isHeavykick= (id) => isControlPressed(id,Control.HEAVY_Kick);
export const ispret= (id) => isControlPressed(id,Control.PRET);