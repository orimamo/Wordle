let height = 6;
let width = 5;

let row = 0;
let col = 0;

let gameOver = false;
let wordList = ["אפרסק", "תמרור", "אבטיח", "אריאל",""];
let word = wordList[Math.floor(Math.random() * wordList.length)]
let button = document.getElementsByClassName("button")


window.onload = function () {
    initialize();
}


function processKey(){
        let e = { "code" : this.id};
        processInput(e);
 }



function initialize() {
    for (let r = 0;r < height; r++) {
        for (let c = width-1; c >= 0; c--) {
            let tile = document.createElement("span")
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }
    let keyboard=[
        ["ENTER","ק","ר","א","ט","ו","ן","ם","פ"],
        ["ש","ד","ג","כ","ע","י","ח","ל","ך","ף"],
        ["ז","ס","ב","ה","נ","מ","צ","ת","ץ","DEL"]
    ];
    for (let i = 0; i < keyboard.length; i++) {
        let currRow = keyboard[i];
        let keyboardRow = document.createElement("div");
        keyboardRow.classList.add("keyboard-row");

        for (let j = 0; j < currRow.length; j++) {
            let keyTile = document.createElement("div");
            let key = currRow[j];
            keyTile.innerText = key;
            if (key === "ENTER") {
                keyTile.id = "Enter";
            } else if (key === "DEL") {
                keyTile.id = "Backspace";
            }
            else if ( "א" <= key && "ת" >= key) {
                keyTile.id = key;
            }
            keyTile.addEventListener("click",processKey);
            if (key == "ENTER") {
                keyTile.classList.add("enter-key-tiles");
            } else {
                keyTile.classList.add("key-tiles");
            }
            keyboardRow.appendChild(keyTile);
        }
        document.body.appendChild(keyboardRow);
    }

    document.addEventListener("keyup", (e) => {
        processInput(e);
    })
}
function processInput(e){
    if (gameOver) {
        return;
    }

    if ("א" <= e.code && e.code <= "ת") {
        if (col < width) {
            let currTile = document.getElementById(row.toString()
               + "-" + col.toString());
            if (currTile.innerText == "") {
                currTile.innerText = e.code[0];
                col += 1;
            }
        }
    } else if (e.code == "Backspace") {
        if (0 < col && col <= width) {
            col -= 1
        }
        let currTile = document.getElementById(row.toString() + "-"
            + col.toString())
        currTile.innerText = "";
    } else if (e.code == "Enter" ) {
        update();
        row += 1;
        col = 0;
    }

    if (!gameOver && row === height) {
        gameOver = true;
        document.getElementById("answer").innerText = word;
    }

}

function update() {
    document.getElementById("answer").innerText="";


    //התחלת התהליך
    let correct = 0;
    let letterCounter={};
    let letter="";
    for (let i=0;i<word.length;i++){
        letter =word[i];
        if (letterCounter[letter]){
            letterCounter[letter] +=1;
        }
        else {
            letterCounter[letter]=1;
        }
    }


    //איטרציה ראשונה בודקת את כל האותיות הנכונות
    for (let i = 0; i < width; i++) {
        let currTile = document.getElementById(row.toString() + "-"
            + i.toString())
        let letter = currTile.innerText;


        if (word[i] === letter) {
            currTile.classList.add("correct")
            correct += 1;
            letterCounter[letter]-=1;
        }
        if (correct === width) {
            gameOver = true
        }

    }
//איטרציה שנייה בודקת את כל האותיות שקיימות במילה אך לא במיקומים נכונים
    for (let j = 0; j < width; j++) {
        let currTile = document.getElementById(row.toString() + "-"
            + j.toString())
        let letter = currTile.innerText;

        if(!currTile.classList.contains("correct")){
            if (word.includes(letter) && letterCounter[letter]>0) {
            currTile.classList.add("present")
            letterCounter[letter]-=1;
        } else {
            currTile.classList.add("absent")
        }


        }
    }
}
