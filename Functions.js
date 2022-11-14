let height = 6;
let width = 5;

let row = 0;
let col = 0;

let gameOver = false;
let wordList = ["SQUID", "APPLE", "CARLO", "DAVID"];
let word = wordList[Math.floor(Math.random() * wordList.length)]
let button = document.getElementsByClassName("button")


window.onload = function () {
    creatBoard();
    intialize();
}

function creatBoard() {
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            let tile = document.createElement("span")
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }
}
//
// function resetBoard() {
//     document.getElementById("board").innerHTML = "";
//     col = row = 0;
//     creatBoard();
//     intialize();
// }

function intialize() {
    document.addEventListener("keyup", (e) => {
        // alert(e.code)
        if (gameOver) {
            return;
        }

        if ("KeyA" <= e.code && e.code < "KeyZ") {
            if (col < width) {
                let currTile = document.getElementById(row.toString()
                    + '-' + col.toString());
                if (currTile.innerText === "") {
                    currTile.innerText = e.code[3];
                    col += 1;
                    if (currTile.innerText === ""){
                      pr
                    }

                }
            }
        } else if (e.code === "Backspace") {
            if (0 < col && col <= width) {
                col -= 1
            }
            let currTile = document.getElementById(row.toString() + "-"
                + col.toString())
            currTile.innerText = "";
        } else if (e.code === "Enter") {
            update();
            row += 1;
            col = 0;
        }

        if (!gameOver && row === height) {
            gameOver = true;
            document.getElementById("answer").innerText = word;
        }
    })
}

function update() {
    let correct = 0;
    for (let i = 0; i < width; i++) {
        let currTile = document.getElementById(row.toString() + "-"
            + i.toString())
        let letter = currTile.innerText;


        if (word[i] === letter) {
            currTile.classList.add("correct")
            correct += 1;
        } else if (word.includes(letter)) {
            currTile.classList.add("present")
        } else {
            currTile.classList.add("absent")
        }
        if (correct === width) {
            gameOver = true
        }

    }
}
