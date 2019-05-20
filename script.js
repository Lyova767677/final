
var side = 20;
var socket = io();

var weatherclient = "Summer";

socket.on("exanak", function (w) {
    weatherclient = w;
   
});

function setup() {
    createCanvas(50 * side, 50 * side);
    background('#silver');
}


function drawWeather(w) {
    var p = document.getElementById('seasons');
    var weather = w;
    console.log(weather);

    if (weather == "Summer") {
        p.innerText = "Summer";
    }
    else if (weather == "Autumn") {
        p.innerText = "Autumn";
    }
    else if (weather == "Winter") {
        p.innerText = "Winter";
    }
    else if (weather == "Spring") {
        p.innerText = "Spring";
    }
}


function drawMatrix(matrix) {


    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 0) {
                fill("silver");
                rect(x * side, y * side, side, side);
            }

            else if (matrix[y][x] == 1) {
                if (weatherclient == "Summer") {
                    fill("green");
                } else if (weatherclient == "Autumn") {
                    fill("#A79F15");
                }
                else if (weatherclient == "Winter") {
                    fill("white");
                }
                else if (weatherclient == "Spring") {
                    fill("#96B917");
                }
                rect(x * side, y * side, side, side);
            }

            else if (matrix[y][x] == 2) {
                if (weatherclient == "Winter") {
                    fill("#696968");
                } else if (weatherclient != "Winter") {
                    fill("Yellow");
                }
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("black");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }

        }
    }
}


socket.on("matrix", drawMatrix);

socket.on("exanak", drawWeather);


function WinterPressed() {

    socket.emit("Winter");
}
function SummerPressed() {

    socket.emit("Summer");
}
function SpringPressed() {

    socket.emit("Spring");
}
function AutumnPressed() {

    socket.emit("Autumn");
}
function truePressed() {

    socket.emit("true");
}
 
function mousePressed() {
    var x = Math.floor(mouseX / side);
    var y = Math.floor(mouseY / side);
    arr = [x, y];
    console.log(arr);
    socket.emit("Sxmvec", arr);
  }
