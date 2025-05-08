export class FpsCounter{
    constructor(){
        this.fps = 0;
    }

    update(time){
        this.fps = Math.trunc(1 / time.secondpassed)
    }
    draw(context){
        context.font = "bold 20px Arial";
        context.fillStyle = "green"; // Change la couleur en rouge
        context.textAlign = "right"; // Aligne le texte à droite
        context.textBaseline = "bottom"; // Aligne le texte par rapport au bas
        context.fillText(`Fps: ${this.fps}`, context.canvas.width, context.canvas.height);
        
    }
}