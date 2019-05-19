var LivingCreature = require("./livingcreature.js");
module.exports = class Bomb extends LivingCreature {

    boom() {
        var datark = this.chooseCell(3);
        if (datark.length > 0) {
            for (var i in datark) {
                var newX = datark[i][0];
                var newY = datark[i][1];
                matrix[newY][newX] = 0;
                this.die();
            }

        }
    }
    die() {
        matrix[this.y][this.x] = 0;
    }
}