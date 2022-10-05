let containerDiv = document.querySelector('.container');
let userValue = document.getElementById('user-number');
let userSubmit = document.getElementById('user-submit');
let promptText = document.getElementById('prompt');
let copyInput = document.getElementById('copy-input');
let clearButton = document.getElementById('clear-button');

userValue.addEventListener('focus', entryHint);
userValue.addEventListener('keyup', duplicateGrid);
userSubmit.addEventListener('click', makeGrid);
clearButton.addEventListener('click', clearGrid);

//Run makeGrid and draw functions on page load to make default 16x16 grid 
makeGrid();
draw();

//Indicates user that it is a Y x Y grid
function duplicateGrid() {
    let userGrid = userValue.ariaValueMax;
    copyInput.textContent = "x " + userGrid;
}

//Save space and clutter on page wit appear/disappering user instructions for grid size
function entryHint() {
    promptText.textContent = "Enter a number between 2 and 99.";
}

//Makes nested divs into grid using CSS Flexbox
//Invalid entries get a warning
function makeGrid() {
    let number = userValue.value;
    if (number < 0 || number > 99 || isNaN(number)) {
        promptText.textContent = "Make sure that it is a number between 2 and 99!";
    } else {
        promptText.textContent = "";
        copyInput.textContent = "";
        userValue.value = "";
        containerDiv.innerHTML = "";

        if (number == 0 || number > 99 || number == "") {
            for (let i = 0; i < 16; i++) {
                let row =  document.createElement('div');
                row.classList.add('row');
                containerDiv.appendChild(row);

                for (let j = 0; j < 16; j++) {
                    let column = document.createElement('div');
                    column.classList.add('column');
                    row.appendChild(column);
                }
            }
        } else {
            for (let i = 0; i < number; i++) {
                let row = document.createElement('div');
                row.classList.add('row');
                containerDiv.appendChild(row);

                for (let j = 0; j < number; j++) {
                    let column = document.createElement('div');
                    column.classList.add('column');
                    row.appendChild(column);
                }
            }
        }
    }

// call draw function to allow drawing after grid is made
draw();
} 

//adds event listeners to all divs with class "column"
//added in the global scope to allow drawing on page load
//this refers to the element triggering the mouseover event lister
function draw() {
    let columns = document.getElementsByClassName("column");
    for (let i = 0; i < columns.length; i++) {
        columns[i].addEventListener('mouseover', changeColor);
    }

    function changeColor() {
        let blueRadio = document.getElementById('blue-pen');
        let purpleRadio = document.getElementById('purple-pen');
        let pinkRadio = document.getElementById('pink-pen');
        let rainbow = document.getElementById('rainbow');
        let eraser = document.getElementById('eraser');
    
        if (blueRadio.checked) {
            this.style.backgroundColor = '#02B7DD';
        } else if (purpleRadio.checked) {
            this.style.backgroundColor = '#443A84';
        } else if (pinkRadio.checked) {
            this.style.backgroundColor = '#E97DB1';
        } else if (eraser.checked) {
            this.style.backgroundColor = "";
        } else if (rainbow.checked) {
            let randomColor = Math.floor(Math.random() * 16777215).toString(16);
            this.style.backgroundColor = "#" + randomColor;
        }
    }
}

//eraser function loops through all column divs and sets background to "" in DOM
function clearGrid() {
    let columns = document.getElementsByClassName('column');
    for (let i = 0; i < columns.length; i++) {
        columns[i].style.backgroundColor = "";
    }
}