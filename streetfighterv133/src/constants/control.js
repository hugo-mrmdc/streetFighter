export const Control = {
    LEFT: 'left',
    RIGHT: 'right',
    UP: 'up',
    DOWN:'down',
    LIGHT_PUNCH: 'lightPunch',
    MEDIUM_PUNCH: 'mediumPunch',
    HEAVY_PUNCH: 'heavyPunch',
    LIGHT_Kick: 'lightKick',
    MEDIUM_Kick: 'mediumKick',
    HEAVY_Kick: 'heavyKick',
    CLOSERANGE:'closeRange',
    PRET:'pret',
}

export const Controls = [
    {
        Keyboard:{
            [Control.LEFT]: 'KeyA',
            [Control.RIGHT]: 'KeyD',
            [Control.UP]: 'KeyW',
            [Control.DOWN]:'KeyS',
            [Control.LIGHT_PUNCH]:'KeyJ',
            [Control.MEDIUM_PUNCH]:'KeyV',
            [Control.HEAVY_PUNCH]:'KeyC',
            [Control.LIGHT_Kick]:'KeyR',
            [Control.MEDIUM_Kick]:'KeyT',
            [Control.HEAVY_Kick]:'KeyZ',
            [Control.PRET]:'ShiftLeft',
        }
    },
    {
        Keyboard:{
           
            [Control.LEFT]: 'ArrowLeft',
            [Control.RIGHT]: 'ArrowRight',
            [Control.UP]: 'ArrowUp',
            [Control.DOWN]:'ArrowDown',
            [Control.LIGHT_PUNCH]:'Numpad1',
            [Control.MEDIUM_PUNCH]:'Numpad2',
            [Control.HEAVY_PUNCH]:'Numpad3',
            [Control.LIGHT_Kick]:'Numpad4',
            [Control.MEDIUM_Kick]:'Numpad5',
            [Control.HEAVY_Kick]:'Numpad6',
            [Control.PRET]:'ShiftRight',
        }
    }
];