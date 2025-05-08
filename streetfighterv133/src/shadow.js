import { STAGEFLOOR } from "./constants/stage.js";

export class Shadow{
    constructor(fighter){
        this.image = document.querySelector('img[alt="shadow"]');
        this.fighter = fighter;
        this.frame = [[0,0,1000,20],[25,-5]];

        
    }
    getScale(){
        if(this.fighter.position.y != STAGEFLOOR){
            const airScale = 1 - (STAGEFLOOR - this,this.fighter.position.y) / 250;
            return  [airScale,airScale];
        }else if(this.fighter.states[this.fighter.cunrentState].shadow){
            const [scalex,scaley,offsetx,offsety] = this.fighter.states[this.fighter.cunrentState].shadow;
            return [scalex,scaley,offsetx * this.fighter.direction,offsety]
        }
            return[1,1];
        
        
    }

    update(){
    }
    draw(context ,camera){
        const [
            [x,y,width,height],[originX,originY]
        ] = this.frame;
        const [scalex = 1,scaley = 1,offsetx =1 ,offsety = 0] = this.getScale();
        context.globalAlpha = 0.5
        context.drawImage(
            this.image,
            x, y, width, height,
            Math.floor(this.fighter.position.x - camera.position.x - originX * scalex) - offsetx,
            Math.floor(STAGEFLOOR - camera.position.y - originY * scaley) -offsety,
            Math.floor(width * scalex), Math.floor(height * scaley) ,
        );
        context.globalAlpha = 1;
    }
}