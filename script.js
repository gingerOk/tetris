let popup = document.querySelector('.popup');
let restartGame = document.querySelector('.restartGame');
let quitGame = document.querySelector('.quitGame');


let tetris = document.createElement('div');
tetris.classList.add('tetris');

quitGame.addEventListener('click', () => {
    window.location.replace('file:///C:/Users/oksan/Desktop/MainPage.html')
})

for(let i=1; i < 181; i++) {
    let excel = document.createElement('div');
    excel.classList.add('excel')
    tetris.appendChild(excel)
}

let main = document.querySelector('.main');
main.appendChild(tetris);
let excels = document.querySelectorAll('.excel');
let i = 0;

for(let y=18; y> 0; y--) {
    for(let x = 1; x < 11; x++) {
        excels[i].setAttribute('posX', x);
        excels[i].setAttribute('posY', y);
        i++;
    }
}

let scoreTabl = document.querySelector('.scoreTabl');
let score = document.createElement('h3');
score.classList.add('score');
scoreTabl.appendChild(score);
score.innerHTML = "Score: <br>"

let x = 5;
let y = 15;

let mainArr = [
    //палка
    [ 
       [0,1],
       [0,2],
       [0,3], 

       [ //поворот на 90 градусов
           [-1,1],
           [0,0],
           [1,-1],
           [2,-2]
       ],
       // поворот на 180 градусов
       [
        [1,-1],
        [0,0],
        [-1,1],
        [-2,2]
       ],
       // поворот на 270 градусов
       [
        [-1,1],
        [0,0],
        [1,-1],
        [2,-2]
       ],
       // поворот на 360 градусов
       [
        [1,-1],
        [0,0],
        [-1,1],
        [-2,2]
       ]
    ],
    //квадрат
    [
        [1,0],
        [0,1],
        [1,1],

        [ //поворот на 90 градусов
            [0,0],
            [0,0],
            [0,0],
            [0,0]
        ],
        // поворот на 180 градусов
        [
            [0,0],
            [0,0],
            [0,0],
            [0,0]
        ],
        // поворот на 270 градусов
        [
            [0,0],
            [0,0],
            [0,0],
            [0,0]
        ],
        // поворот на 360 градусов
        [
            [0,0],
            [0,0],
            [0,0],
            [0,0]
        ]
    ],
    //L вправо

    [
        [1,0],
        [0,1],
        [0,2],

        [ //поворот на 90 градусов
            [0,0],
            [-1,1],
            [1,0],
            [2,-1]
        ],
        // поворот на 180 градусов
        [
            [1,-1],
            [1,-1],
            [-1,0],
            [-1,0]
        ],
        // поворот на 270 градусов
        [
            [-1,0],
            [0,-1],
            [2,-2],
            [1,-1]
        ],
        // поворот на 360 градусов
        [
            [0,-1],
            [0,-1],
            [-2,0],
            [-2,0]
        ]
    ],
    //L влево
    [
        [1,0],
        [1,1],
        [1,2],
        [ //поворот на 90 градусов
            [0,0],
            [0,0],
            [1,-1],
            [-1,-1]
        ],
        // поворот на 180 градусов
        [
            [0,-1],
            [-1,0],
            [-2,1],
            [1,0]
        ],
        // поворот на 270 градусов
        [
            [2,0],
            [0,0],
            [1,-1],
            [1,-1]
        ],
        // поворот на 360 градусов
        [
            [-2,0],
            [1,-1],
            [0,0],
            [-1,1]
        ]
    ],
    // пирамидка
    [
        [1,0],
        [2,0],
        [1,1],
        [ //поворот на 90 градусов
            [1,-1],
            [0,0],
            [0,0],
            [0,0]
        ],
        // поворот на 180 градусов
        [
            [0,0],
            [-1,0],
            [-1,0],
            [1,-1]
        ],
        // поворот на 270 градусов
        [
            [1,-1],
            [1,-1],
            [1,-1],
            [0,0]
        ],
        // поворот на 360 градусов
        [
            [-2,0],
            [0,-1],
            [0,-1],
            [-1,-1]
        ]
    ],
    //молния влево
    [
        [1,0],
        [-1,1],
        [0,1],
        [ //поворот на 90 градусов
            [0,-1],
            [-1,0],
            [2,-1],
            [1,0]
        ],
        // поворот на 180 градусов
        [
            [0,0],
            [1,-1],
            [-2,0],
            [-1,-1]
        ],
        // поворот на 270 градусов
        [
            [0,-1],
            [-1,0],
            [2,-1],
            [1,0]
        ],
        // поворот на 360 градусов
        [
            [0,0],
            [1,-1],
            [-2,0],
            [-1,-1]
        ]
    ],
    //молния вправо
    [
        [1,0],
        [1,1],
        [2,1],
        [ //поворот на 90 градусов
            [2,-1],
            [0,0],
            [1,-1],
            [-1,0]
        ],
        // поворот на 180 градусов
        [
            [-2,0],
            [0,-1],
            [-1,0],
            [1,-1]
        ],
        // поворот на 270 градусов
        [
            [2,-1],
            [0,0],
            [1,-1],
            [-1,0]
        ],
        // поворот на 360 градусов
        [
            [-2,0],
            [0,-1],
            [-1,0],
            [1,-1]
        ]
    ]
]

let currentFigure = 0;
let figureBody = 0;
let rotate = 1;
let flag = true;
let scoreN = 0;
let interval;
score.innerHTML += scoreN;
function create() {
    function getRandom() {
        return Math.round(Math.random()*(mainArr.length - 1))
    }
    rotate = 1
    currentFigure = getRandom();
console.log(mainArr[currentFigure][2])
    figureBody = [
        document.querySelector(`[posX = "${x}"][posY = "${y}"]`),
        document.querySelector(`[posX = "${x + mainArr[currentFigure][0][0]}"][posY = "${y + mainArr[currentFigure][0][1]}"]`),
        document.querySelector(`[posX = "${x + mainArr[currentFigure][1][0]}"][posY = "${y + mainArr[currentFigure][1][1]}"]`),
        document.querySelector(`[posX = "${x + mainArr[currentFigure][2][0]}"][posY = "${y + mainArr[currentFigure][2][1]}"]`)
    ]

    console.log(figureBody)
try{
    for(let i=0; i < figureBody.length; i++) {
        figureBody[i].classList.add('figure');
    }
} catch(e) {}
}
create()
function move() {
    
    let moveFlag = true;
    
    let coordinates = [
        [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')],
        [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')],
        [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')],
        [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')]
    ];

    console.log(coordinates[2][1])
    for(let i=0; i < coordinates.length; i++) {
        if(coordinates[i][1] == 1 || document.querySelector(`[posX = "${coordinates[i][0]}"][posY = "${coordinates[i][1]-1}"]`).classList.contains('set')) {
            moveFlag = false;
            break;
        }
    }
    if(moveFlag){
    removeClass('figure', figureBody);

    figureBody = [
        document.querySelector(`[posX = "${coordinates[0][0]}"][posY = "${coordinates[0][1]-1}"]`),
        document.querySelector(`[posX = "${coordinates[1][0]}"][posY = "${coordinates[1][1]-1}"]`),
        document.querySelector(`[posX = "${coordinates[2][0]}"][posY = "${coordinates[2][1]-1}"]`),
        document.querySelector(`[posX = "${coordinates[3][0]}"][posY = "${coordinates[3][1]-1}"]`)
    ];

    addClass('figure', figureBody);
} else {
    for(let i=0; i < figureBody.length; i++) {
        figureBody[i].classList.remove('figure');
        figureBody[i].classList.add('set');
        console.log(figureBody[i])
    }
    create()
    gameOver();
    let fullRows = [];
    for(let i = 1; i < 15; i++) {
        let count = 0;
        for(let k=1; k<11; k++) {
            if(document.querySelector(`[posX = "${k}"][posY = "${i}"]`).classList.contains('set')) {
                count++;
             if(count == 10) {
                 fullRows.push(i);
             }
            }
        }
    }
    for(var i = 0; i < fullRows.length; i++) {
        removeRow(fullRows[i]);
        changeRows(fullRows[i]);
        scoreN += 10;
        score.innerHTML = `Score:<br>${scoreN}`
        console.log("score", scoreN)
        for(var j = 0; j < fullRows.length; j++) {
            fullRows[j] -= 1
        }
    }
}
}

function removeRow(i) {
    for(let m=1; m<11; m++) {
            document.querySelector(`[posX = "${m}"][posY = "${i}"]`).classList.remove('set')
         }
}

function changeRows(rowsNum) {
         let set = document.querySelectorAll('.set');
         let newSet = [];
         for(let s=0; s<set.length;s++) {
             let setCoordinates = [set[s].getAttribute('posX'), set[s].getAttribute('posY')];
             if(setCoordinates[1] > rowsNum) {
                 set[s].classList.remove('set');
                 newSet.push(document.querySelector(`[posX = "${setCoordinates[0]}"][posY = "${setCoordinates[1]-1}"]`))
             }
         }
         for(let a=0; a< newSet.length; a++) {
             newSet[a].classList.add('set')
         }
}

window.addEventListener('keydown', function(e) {
    console.log('work')
    let coordinates1 = [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')];
    let coordinates2 = [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')];
    let coordinates3 = [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')];
    let coordinates4 = [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')];

        function getNewState(a) {
            flag = true;
            let figureNew = [
                document.querySelector(`[posX = "${+coordinates1[0] + a}"][posY = "${+coordinates1[1]}"]`),
                document.querySelector(`[posX = "${+coordinates2[0] + a}"][posY = "${+coordinates2[1]}"]`),
                document.querySelector(`[posX = "${+coordinates3[0] + a}"][posY = "${+coordinates3[1]}"]`),
                document.querySelector(`[posX = "${+coordinates4[0] + a}"][posY = "${+coordinates4[1]}"]`)
            ]
    
            for(let i=0; i < figureNew.length;i++) {
                if(!figureNew[i] || figureNew[i].classList.contains('set')) {
                    flag = false;
                }
            }
    
            if(flag == true) {
                removeClass('figure', figureBody);
    
                figureBody = figureNew;
    
                addClass('figure', figureBody);
            }
        }

        if(e.keyCode === 37) { //влево
            getNewState(-1);
        } else if(e.keyCode === 39) { //вправо
            getNewState(1)
        } else if(e.keyCode === 40) { //вниз
            move();
        } else if(e.keyCode === 38) { //вверх
            e.preventDefault()
            flag = true;
            let figureNew = [
                document.querySelector(`[posX = "${+coordinates1[0] + mainArr[currentFigure][rotate+2][0][0]}"][posY = "${+coordinates1[1] + mainArr[currentFigure][rotate+2][0][1]}"]`),
                document.querySelector(`[posX = "${+coordinates2[0] + mainArr[currentFigure][rotate+2][1][0]}"][posY = "${+coordinates2[1] + mainArr[currentFigure][rotate+2][1][1]}"]`),
                document.querySelector(`[posX = "${+coordinates3[0] + mainArr[currentFigure][rotate+2][2][0]}"][posY = "${+coordinates3[1] + mainArr[currentFigure][rotate+2][2][1]}"]`),
                document.querySelector(`[posX = "${+coordinates4[0] + mainArr[currentFigure][rotate+2][3][0]}"][posY = "${+coordinates4[1] + mainArr[currentFigure][rotate+2][3][1]}"]`)
            ]
    
            for(let i=0; i < figureNew.length;i++) {
                if(!figureNew[i] || figureNew[i].classList.contains('set')) {
                    flag = false;
                }
            }
    
            if(flag == true) {
                for(let i=0; i < figureBody.length; i++) {
                    figureBody[i].classList.remove('figure');
                }
    
                figureBody = figureNew;
    
                for(let i=0; i < figureBody.length; i++) {
                    figureBody[i].classList.add('figure');
                }
    
                if(rotate < 4) {
                    rotate++;
                } else {
                    rotate = 1;
                }
            }
        }
});
    interval = setInterval(() => {
        move();
    }, 500);

function addClass(itemClass, selector) {
    for(let i=0; i < selector.length; i++) {
        selector[i].classList.add(itemClass);
    }
};

function removeClass(itemClass, selector) {
    for(let i=0; i < selector.length; i++) {
        selector[i].classList.remove(itemClass);
    }
}


restartGame.addEventListener('click', () => {
    location.reload();
});

function gameOver() {
    for(let i = 1; i < 11; i++) {
        if(document.querySelector(`[posX = "${i}"][posY = "14"]`).classList.contains('set')) {
            clearInterval(interval);
            let scoreRes = document.querySelector('.finalScore');
            scoreRes.innerHTML = `Your Score: ${scoreN}`;
            popup.style.display = "block"
        }
    }
}
