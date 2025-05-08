export class entitieslist {
    entities = [];
    addEntity(Entityclass, ...args) {
        this.entities.push(new Entityclass(args, this))
    }
    removeEntities(entity) {
        this.entities = this.entities.filter((thisEntity) => thisEntity !== entity)
    }
    updateEntities(time, context,camera) {
        for (const fighter of this.entities) {
            fighter.update(time, context,camera)
         
        }
    }
    drawEntities(context,camera) {
        for (const fighter of this.entities) {
            fighter.draw(context,camera)
        }
    }

}

