var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000, function () {
    console.log("port is runing")

});


var Grass = require("./module/grass.js");
var GrassEater = require("./module/grassEater.js");
var Predator = require("./module/predator.js");
var people = require("./module/people.js");
var bomb = require("./module/bomb.js");



grassArr = [];
grasseaterArr = [];
predatorArr = [];
peopleArr = [];
bombArr = [];



Weather = "Summer";

Weatherinit = 1;
Grassinit = 0;
GrassEaterinit = 0;
Predatorinit = 0;
peopleinit = 0;
bombinit = 0;




var w = 30;
var h = 30;

function genMatrix(w, h) {
    var matrix = [];
    for (var y = 0; y < h; y++) {
        matrix[y] = [];
        for (var x = 0; x < w; x++) {
            var r = Math.floor(Math.random() * 100);
            if (r < 3) r = 0;
            else if (r < 50) r = 1;
            else if (r < 70) r = 2;
            else if (r < 80) r = 3;
            else if (r < 99) r = 4;
            else if (r < 100) r = 5;
            matrix[y][x] = r;
        }
    }
    return matrix;
}



Random = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}


matrix = genMatrix(w, h);



for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {

        if (matrix[y][x] == 1) {
            grassArr.push(new Grass(x, y, 1));
            Grassinit++;
        }
        else if (matrix[y][x] == 2) {
            grasseaterArr.push(new GrassEater(x, y, 2));
            GrassEaterinit++;
        }
        else if (matrix[y][x] == 3) {
            predatorArr.push(new Predator(x, y, 3));
            Predatorinit++;
        }
        else if (matrix[y][x] == 4) {
            bombArr.push(new bomb(x, y, 4));
            bombinit++;
        }
        else if (matrix[y][x] == 5) {
            peopleArr.push(new people(x, y, 5));
            peopleinit++;
        }
    }
}


function drawserever() {

    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grasseaterArr) {
        grasseaterArr[i].move();
        grasseaterArr[i].mul();
        grasseaterArr[i].eat();
        grasseaterArr[i].die();
    }
    for (var i in predatorArr) {
        predatorArr[i].move();
        predatorArr[i].mul();
        predatorArr[i].eat();
        predatorArr[i].die();
    }
    for (var i in bombArr) {
        bombArr[i].boom();

    }
    for (var i in peopleArr) {
        peopleArr[i].move();
        ;
    }

    io.sockets.emit("matrix", matrix);
}

function draw_wheater(Weatherinit) {


    Weatherinit++;
    if (Weatherinit == 5) {
        Weatherinit = 1;
    }
    if (Weatherinit == 2) {
        Weather = "Autumn";
    }
    if (Weatherinit == 3) {
        Weather = "Winter";
    }
    if (Weatherinit == 4) {
        Weather = "Spring";
    }
    if (Weatherinit == 1) {
        Weather = "Summer";
    }

    io.sockets.emit("exanak", Weather);
}


io.on('connection', function (socket) {
    socket.on("Winter", function () {

        Weather = "Winter";
        console.log(Weather);

    });
    socket.on("Summer", function () {

        Weather = "Summer";
        console.log(Weather);

    });
    socket.on("Spring", function () {

        Weather = "Spring";
        console.log(Weather);

    });
    socket.on("Autumn", function () {
        Weather = "Autumn";
        console.log(Weather);
    });
    socket.on("true", function () {
        if (Weather == "Winter") {
            Weather = "Spring";
        }
        else if (Weather == "Spring") {
            Weather = "Summer";
        }
        else if (Weather == "Summer") {
            Weather = "Autumn";
        }
        else if (Weather == "Autumn") {
            Weather = "Winter";
        }

    });
    io.sockets.emit("exanak", Weather);
    socket.on("Sxmvec", function (arr) {
        var x = arr[0];
        var y = arr[1];


        if (x > 0 && y > 0 && y < matrix.length && x < matrix[0].length) {


            if (matrix[y][x] == 1) {
                for (var i in grassArr) {
                    if (y == grassArr[i].y && x == grassArr[i].x) {
                        grassArr.splice(i, 1);
                        break;
                    }

                }
            }
            else if (matrix[y][x] == 2) {
                for (var i in grasseaterArr) {
                    if (y == grasseaterArr[i].y && x == grasseaterArr[i].x) {
                        grasseaterArr.splice(i, 1);
                        break;
                    }

                }
            }
            else if (matrix[y][x] == 3) {
                for (var i in predatorArr) {
                    if (y == predatorArr[i].y && x == predatorArr[i].x) {
                        predatorArr.splice(i, 1);
                        break;
                    }

                }
            }
            else if (matrix[y][x] == 4) {
                for (var i in bombArr) {
                    if (y == bombArr[i].y && x == bombArr[i].x) {
                        bombArr.splice(i, 1);
                        break;
                    }

                }
            }
            else if (matrix[y][x] == 5) {
                for (var i in peopleArr) {
                    if (y == peopleArr[i].y && x == peopleArr[i].x) {
                        peopleArr.splice(i, 1);
                        break;
                    }

                }
            }
            matrix[y][x] = 0;


            directions = [
                [x - 1, y - 1],
                [x, y - 1],
                [x + 1, y - 1],
                [x - 1, y],
                [x + 1, y],
                [x - 1, y + 1],
                [x, y + 1],
                [x + 1, y + 1]];

            for (var i in directions) {
                urishx = directions[i][0];
                urishy = directions[i][1];
                if (urishx >= 0 && urishx < matrix[0].length && urishy >= 0 && urishy < matrix.length) {
                    if (matrix[urishy][urishx] == 1) {
                        for (var i in grassArr) {
                            if (urishy == grassArr[i].y && urishx == grassArr[i].x) {
                                grassArr.splice(i, 1);
                                break;
                            }

                        }
                    }
                    else if (matrix[urishy][urishx] == 2) {
                        for (var i in grasseaterArr) {
                            if (urishy == grasseaterArr[i].y && urishx == grasseaterArr[i].x) {
                                grasseaterArr.splice(i, 1);
                                break;
                            }

                        }
                    }
                    else if (matrix[urishy][urishx] == 3) {
                        for (var i in predatorArr) {
                            if (urishy == predatorArr[i].y && urishx == predatorArr[i].x) {
                                predatorArr.splice(i, 1);
                                break;
                            }

                        }
                    }
                    else if (matrix[urishy][urishx] == 4) {
                        for (var i in bombArr) {
                            if (urishy == bombArr[i].y && urishx == bombArr[i].x) {
                                bombArr.splice(i, 1);
                                break;
                            }

                        }
                    }
                    else if (matrix[urishy][urishx] == 5) {
                        for (var i in peopleArr) {
                            if (urishy == peopleArr[i].y && urishx == peopleArr[i].x) {
                                peopleArr.splice(i, 1);
                                break;
                            }

                        }
                    }
                    matrix[urishy][urishx] = 0;

                }
            }
        }


    });
    io.sockets.emit("martix", matrix);

})






var obj = { "info": [] };

function main() {
    var file = "Statistics.json"
    obj.info.push(
        { "Xoter qanaky": Grassinit, "Xotakerneri qanaky": GrassEaterinit, "Gishatichneri qanaky": Predatorinit, "Mardkanc qanaky": peopleinit, "Bomberi qanaky": bombinit });
    fs.writeFileSync(file, JSON.stringify(obj, null, 3));
}

setInterval(drawserever, 500);
setInterval(draw_wheater, 3000);
setInterval(main, 3000);

