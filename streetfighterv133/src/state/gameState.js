import { FighterId } from "../constants/fighter.js";
import { createDfaultFighterState } from "./fighterState.js";


export const gameState = {
    fighters:[
       
       
        createDfaultFighterState(FighterId.RYU),
        createDfaultFighterState(FighterId.KEN),
    ]
}