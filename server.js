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
    console.log("port is runninng")

});

//stex kapum en mer classery
var Grass = require("./module/grass.js");
var GrassEater = require("./module/grassEater.js");
var Predator = require("./module/predator.js");
var people = require("./module/people.js");
var bomb = require("./module/bomb.js");


//haytarum en zanvacnery
grassArr = [];
grasseaterArr = [];
predatorArr = [];
peopleArr = [];
bombArr = [];


//haytararum en popoxakan exanaki masin
Weather = "Summer";
//haytararum enq popoxaknner voronq hashvelu en qanaky kerparneri
Weatherinit = 1;
Grassinit = 0;
GrassEaterinit = 0;
Predatorinit = 0;
peopleinit = 0;
bombinit = 0;



//stexcum en matrix generacnox function
var w = 50;
var h = 60;

function genMatrix(w, h) {
    var matrix = [];
    for (var y = 0; y < h; y++) {
        matrix[y] = [];
        for (var x = 0; x < w; x++) {
            var r = Math.floor(Math.random() * 100);
            if (r < 5) r = 0;
            else if (r < 40) r = 1;
            else if (r < 55) r = 2;
            else if (r < 80) r = 3;
            else if (r < 98) r = 4;
            else if (r < 100) r = 5;
            matrix[y][x] = r;
        }
    }
    return matrix;
}


//stexcum en zangvacic patahakan andam tvoc function
Random = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

//kanchum en genMatrix functiony ev talis en matrix popoxakanin
matrix = genMatrix(w, h);


//stex pptvum en matrix-i mejov u stexcum en objectnery
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

//stexcum en function vor kkanchi objecteri methodnery ev kuxark matrixi masin datan script.js
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
    //matrixy uxarkum en clientin
    io.sockets.emit("matrix", matrix);
}
// setInterval(drawserever, 3000);

//stexcum enq function vory exanak e poxancelu script.js
function draw_wheater() {

    Weatherinit++;
    if (Weatherinit == 5) {
        Weatherinit = 1;
    }
    if (Weatherinit == 4) {
        Weather = "Autumn";
    }
    if (Weatherinit == 3) {
        Weather = "Winter";
    }
    if (Weatherinit == 2) {
        Weather = "Spring";
    }
    if (Weatherinit == 1) {
        Weather = "Summer";
    }
    //uxarkuma exanak clientin    
    io.sockets.emit("exanak", Weather);
}



// setInterval(draw_wheater, 3000);


//connectiona stexcum scriptic ekac infoi himan vra script.js i het
io.on('connection', function (socket) {
    socket.on("Sxmvec", function (arr) {
        var x = arr[0];
        var y = arr[1];

        // if (matrix[y][x] = 4) {
        //         for (var i in bombArr) {
        //             if (y == bombArr[i].y && x == bombArr[i].x) {
        //                 boom();
        //                 break;
        //             }

        //         }
        // }


        // if (matrix[y][x] == 1) {
        //     for (var i in grassArr) {
        //         if (y == grassArr[i].y && x == grassArr[i].x) {
        //             grassArr.splice(i, 1);
        //             break;
        //         }

        //     }
        // }
        // else if (matrix[y][x] == 2) {
        //     for (var i in grasseaterArr) {
        //         if (y == grasseaterArr[i].y && x == grasseaterArr[i].x) {
        //             grasseaterArr.splice(i, 1);
        //             break;
        //         }

        //     }
        // }
        // else if (matrix[y][x] == 3) {
        //     for (var i in predatorArr) {
        //         if (y == predatorArr[i].y && x == predatorArr[i].x) {
        //             predatorArr.splice(i, 1);
        //             break;
        //         }

        //     }
        // }
        // else if (matrix[y][x] == 4) {
        //     for (var i in bombArr) {
        //         if (y == bombArr[i].y && x == bombArr[i].x) {
        //             bombArr.splice(i, 1);
        //             break;
        //         }

        //     }
        // }
        // else if (matrix[y][x] == 5) {
        //     for (var i in peopleArr) {
        //         if (y == peopleArr[i].y && x == peopleArr[i].x) {
        //             peopleArr.splice(i, 1);
        //             break;
        //         }

        //     }
        // }

        // matrix[y][x] = 0;


        // for (var i in directions) {
        //     var harevanx = directions[i][0];
        //     var harevany = directions[i][1];
        //     if (harevanx >= 0 && harevanx < matrix[0].length && harevany >= 0 && harevany < matrix.length) {
        //         if (matrix[harevany][harevanx] == 1) {
        //             for (var i in grassArr) {
        //                 if (harevany == grassArr[i].y && harevanx == grassArr[i].x) {
        //                     grassArr.splice(i, 1);
        //                     break;
        //                 }

        //             }
        //         }

        //         else if (matrix[harevany][harevanx] == 2) {
        //             for (var i in grasseaterArr) {
        //                 if (harevany == grasseaterArr[i].y && harevanx == grasseaterArr[i].x) {
        //                     grasseaterArr.splice(i, 1);
        //                     break;
        //                 }

        //             }
        //         }
        //         else if (matrix[harevany][harevanx] == 3) {
        //             for (var i in predatorArr) {
        //                 if (harevany == predatorArr[i].y && harevanx == predatorArr[i].x) {
        //                     predatorArr.splice(i, 1);
        //                     break;
        //                 }

        //             }
        //         }

        //         matrix[harevany][harevanx] = 0;
        //     }

        // }
    });
    // socket.on("keyevent", function(evt){
    //     var key = evt;
    //     if (key.keyleft == "left") {
    //         GrassEater.left()   
    //     } else if (key.keyright == "right") {
    //         GrassEater.right()
    //     } else if (key.keyup == "up") {
    //         GrassEater.up()
    //     } else if (key.keydown == "down") {
    //         GrassEater.down()
    //     }

    //     console.log(key);
    // });
});


///statistca hanox function 
var obj = { "info": [] };

function main() {
    var file = "Statistics.json"
    obj.info.push(
        { "Cnvac xoter qanaky": Grassinit, "Cnvac Xotakerneri qanaky": GrassEaterinit, "Gishatichneri qanaky": Predatorinit , "mardkanc qanaky": peopleinit,"bomberi qanaky": bombinit });
    fs.writeFileSync(file, JSON.stringify(obj, null, 3));
}

setInterval(drawserever, 1000);
 setInterval(draw_wheater, 6000);
setInterval(main, 3000);







