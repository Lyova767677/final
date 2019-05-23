var LivingCreature = require("./livingcreature.js");
module.exports = class People extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.directions = "down";
    }
    move() {

            var naxkinX = this.x;
            var naxkinY = this.y;

            if (this.y == matrix.length - 1 && this.x == matrix[0].length - 1) {
                this.x = 0;
                this.y = 0;
                this.directions = "down";
            }
            if (this.directions == "down") {
                this.y++;
            }
            else if (this.directions == "up") {
                this.y--;
            }
            if (this.y == matrix.length) {
                this.x++;
                this.y--;
                this.directions = "up";
            }
            else if (this.y == -1) {
                this.x++;
                this.y++;
                this.directions = "down";
            }

            matrix[this.y][this.x] = matrix[naxkinY][naxkinX];
     
            if (matrix[naxkinY][naxkinX] == 1) {
                for (var i in grassArr) {
                    if (naxkinY == grassArr[i].y && naxkinX == grassArr[i].x) {
                        grassArr.splice(i, 1);
                        break;
                    }

                }
            }
            else if (matrix[naxkinY][naxkinX] == 2) {
                for (var i in grasseaterArr) {
                    if (naxkinY == grasseaterArr[i].y && naxkinX == grasseaterArr[i].x) {
                        grasseaterArr.splice(i, 1);
                        break;
                    }

                }
            }
            else if (matrix[naxkinY][naxkinX] == 3) {
                for (var i in predatorArr) {
                    if (naxkinY == predatorArr[i].y && naxkinX == predatorArr[i].x) {
                        predatorArr.splice(i, 1);
                        break;
                    }

                }
            }
            else if (matrix[naxkinY][naxkinX] == 4) {
                for (var i in bombArr) {
                    if (naxkinY == bombArr[i].y && naxkinX == bombArr[i].x) {
                        bombArr.splice(i, 1);
                        break;
                    }

                }
            }
            matrix[naxkinY][naxkinX] = 0;




           
        
    }
}