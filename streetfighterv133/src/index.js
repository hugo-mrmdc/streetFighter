import { StreetFighterGame } from "./streetFighterGame.js";
import {  FighterState } from "./constants/fighter.js";
const GameViewport = {
    WIDTH: 384,
    HEIGHT: 224,

};




window.addEventListener('load', function () {
   
    
    new StreetFighterGame().start();
})
