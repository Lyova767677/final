var LivingCreature = require("./LivingCreature.js");
module.exports = class Grass extends LivingCreature{
    
    mul() {
        this.multiply+=3;
        var newCell = Random(this.chooseCell(0));
        //  console.log(newCell, this.multiply > 6);
        if (this.multiply >= 6 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }   
    mul_() {
        this.multiply+=3;
        var newCell = Random(this.chooseCell(6));
        //  console.log(newCell, this.multiply > 6);
        if (this.multiply >= 6 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }
}