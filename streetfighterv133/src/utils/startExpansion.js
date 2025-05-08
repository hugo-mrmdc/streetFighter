export class StartExpansion {
    constructor(image, frames, animation, startFrame = 0) {
        this.image = image;
        this.frames = new Map(frames);
        this.animation = animation;
        this.animationTimer = 0;
        this.animationFrame = startFrame;
        this.frameDelay = animation[this.animationFrame][1];
        this.stop = false;
    }

    update(time) {
        if (this.stop) return; // If animation is stopped, do not update

        if (time.previous > this.animationTimer + this.frameDelay) {
            this.animationFrame += 1;
            if (this.animationFrame >= this.animation.length) {
                this.animationFrame = this.animation.length - 1;
                this.stop = true; // Stop the animation once it's done
                return;
            }
            this.frameDelay = this.animation[this.animationFrame][1];
            this.animationTimer = time.previous;
        }
    }

    draw(context, x, y, scalex, scaley) {
        if (this.stop) return; // Do not draw if animation is stopped

        const [frameKey] = this.animation[this.animationFrame];
        const [frameX, frameY, frameWidth, frameHeight] = this.frames.get(frameKey);

        // Check if we are drawing the last frame and apply transparency
        context.save(); // Save the current context state
        context.globalAlpha = 1; // Fully opaque for other frames
        if (this.animationFrame >= this.animation.length - 9) {
            context.globalAlpha = 0.7; // Set transparency for the last frame (50% transparent)
        }
        if (this.animationFrame >= this.animation.length - 8) {
            context.globalAlpha = 0.7; // Set transparency for the last frame (50% transparent)
        }
        if (this.animationFrame >= this.animation.length - 7) {
            context.globalAlpha = 0.5; // Set transparency for the last frame (50% transparent)
        }
        if (this.animationFrame >= this.animation.length - 6) {
            context.globalAlpha = 0.4; // Set transparency for the last frame (50% transparent)
        }
        if (this.animationFrame >= this.animation.length - 5) {
            context.globalAlpha = 0.3; // Set transparency for the last frame (50% transparent)
        }
        if (this.animationFrame >= this.animation.length - 4) {
            context.globalAlpha = 0.2; // Set transparency for the last frame (50% transparent)
        }
        if (this.animationFrame >= this.animation.length - 3) {
            context.globalAlpha = 0.1; // Set transparency for the last frame (50% transparent)
        }
        if (this.animationFrame >= this.animation.length - 2) {
            context.globalAlpha = 0.1; // Set transparency for the last frame (50% transparent)
        }
        if (this.animationFrame >= this.animation.length - 1) {
            context.globalAlpha = 0.1; // Set transparency for the last frame (50% transparent)
        } else {
            context.globalAlpha = 1; // Fully opaque for other frames
        }
      

        context.drawImage(
            this.image, frameX, frameY, frameWidth, frameHeight, x, y, frameWidth * scalex, frameHeight * scaley
        );

        context.restore(); // Restore the context state to avoid affecting other drawings
    }
}
