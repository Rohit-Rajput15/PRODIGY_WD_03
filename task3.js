let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let newgamebtn = document.querySelector("#newbtn");
let msgContainer = document.querySelector(".msgContainer");
let msg = document.querySelector("#msg");

let aiModeBtn = document.querySelector("#ai-mode");
let friendModeBtn = document.querySelector("#friend-mode");

let turnO = true;

let playwithAI = false;

const winPattern = [
    [0,1,2],[0,4,8],[0,3,6],[1,4,7],[2,5,8],
    [2,4,6],[3,4,5],[6,7,8]
];

const resetgame = () => {
    turnO = true;
    enableboxes();
    msgContainer.classList.add("hide");
}

aiModeBtn.addEventListener("click", () => {
    playwithAI = true;
    resetgame();
    console.log("AI mode selected")
});

friendModeBtn.addEventListener("click", () => {
    playwithAI = false;
    resetgame();
    console.log("Friend mode selected");
});

const aiMove = () => {
    if (turnO) return; 

    let emptyBoxes = [];

    boxes.forEach((box) => {
        if (box.innerText === "") {
        emptyBoxes.push(box);
        }
    });

    if (emptyBoxes.length === 0) return;

  
    let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    randomBox.innerText = "X";
    randomBox.classList.add("x");
    randomBox.disabled = true;

    turnO = true;
    checkWinner();
};

boxes.forEach((box) => {
    box.addEventListener("click",() => {
        console.log("box was clicked");

        if (box.innerText !== "") return;

        if(turnO){
            box.innerText = "O";
            box.classList.add("o");
            box.disabled = true;
            turnO = false;
            checkWinner();

            if(playwithAI){
                setTimeout(aiMove,200);
            }

        }
        else if (!playwithAI){

            box.innerText = "X";
            box.classList.add("x");
            box.disabled = true;
            turnO = true;
            checkWinner();
        }
    });
});

const enableboxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("x", "o");
    }
};

const disableboxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const showWinner = (Winner) => {
    msg.innerText = `Congratulations the winner is ${Winner}`;
    msgContainer.classList.remove("hide");
    disableboxes();
};

const checkWinner = () => {
    for(pattern of winPattern){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val!="" && pos2Val!="" && pos3Val!=""){
            if(pos1Val==pos2Val && pos2Val==pos3Val){
                console.log("Winner",pos1Val);
                showWinner(pos1Val);
                return;
            }
        }
    }

    let isDraw = true;
    for(let box of boxes){
        if(box.innerText === ""){
            isDraw = false;
            break;
        }
    }
    if(isDraw){
        msg.innerText = "It's a Draw";
        msgContainer.classList.remove("hide");
        disableboxes();
    }
};

newgamebtn.addEventListener("click",resetgame);
resetbtn.addEventListener("click",resetgame);