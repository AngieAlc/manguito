const intro = document.getElementById("intro-el")
const popUpContainer = document.getElementById("pop-up-el")
const cerrar = document.getElementById("cerrar")
const verificarContra = document.getElementById("verificar-contra")
const posibleContra = document.getElementById("posible-contra")
const quieresVer = document.getElementById("quieres-ver")
const clavesEl = document.getElementsByClassName("claves")
const verificarQuizz = document.getElementById("verificar-quizz")
const quizz = document.getElementById("quizz")
const minimum = 4

if(quieresVer){
    quieresVer.addEventListener("click", function(){
        popUpContainer.classList.add("show")
    })
}

if(cerrar){
    cerrar.addEventListener("click", function(){
        console.log("rataaas")
        popUpContainer.classList.remove("show")
        document.body.classList.remove("no-scroll")
        
        // Clearing the password written before
        posibleContra.value = "" 
    })
}

if(verificarContra){
    verificarContra.addEventListener("click", function(){
        const contra = posibleContra.value.toLowerCase()
        if (contra == contraInicial){
            // Add fase-out class 
            document.body.classList.add("fade-out")
            // Redirect to the correct window when transition ends 
            setTimeout(function(){
                window.location = "quizz.html"
            }, 800) // Extra time to let the window load :) 
        }
        else if(contra == "manguito"){
            alert("Acaso pregunté por tu nombre? Dije una contraseña.")
        }
        else if(contra == "rata" || contra == "angie" || contra == "amor" || contra == "mi amor"){
            alert("Hey, esa soy yo. No trates de invocarme. Mejor pídeme una pista. (Claro, si quieres perder el honor.)")
        }
        else if(contra == "natsuki" || contra == "monika" || contra == "yuri" || contra == "sayori"){
            alert("No estamos jugando Doki Doki e.e.")
        }
        else if(contra == "bingsu"){
            alert("Buen intento, pero, POR QUÉ TRATAS DE USAR LAS CONTRAS DE TU JUEGOOO?. Estamos en el mio esta vez. Qué contra sugerí yo?")
        }
        else if(contra == "capybara" || contra == "capi" || contra == "mascapito" || contra == "capy"){
            alert("Buen intento, pero ya deja de intentar palabras random. Prueba con contraseñas random.")
        }
        else if(contra == "rollitodecanela"){
            alert("Ya casi, pero recuerda que este regalo es porque LOS 2 cumplimos 1 más de estar juntos :).")
        }
        else if(contra == "nosequeponer"){
            alert("Fun fact: esta fue la contraseña durante mucho tiempo hasta que decidí cuál sería la contra.")
        }
        else if(contra == "4loko" || contra == "fourloko" || contra == "four loko" || contra == "4 loko"){
            alert("Ahora ya no me gusta tomar mucho eso. Pero te acuerdas en qué año si???")
        }
        else if(contra == "2024"){
            alert("Ya no tomo basura oe.")
        }
        else if(contra == "2023"){
            alert("Pipipi acá si me gustaba tomar pero acá cambié al otro trago jajasj.")
        }
        else if(contra == "2022"){
            alert("Siii, lamentablemente 2022 fue el año en que decidí descubrir qué se sentía emborracharse. Me pregunto qué cosas feas dirán los audios esos q grabemos.")
        }
        else if(contra == "alcohol"){
            alert("Si ps no quiero que me duela la pancita, o que nadie se ponga mal. Pero antes me solía gustar mucho el ...")
        }
        else{
            alert("No tengo idea de por qué creiste que eso funcionaría pipip.")
        }
    })
}

function showQuestions(){
    const preguntas = document.querySelector(".preguntas")
    let curr = ""

    for(let i = 0; i < questions.length; i++){
        curr += `<li class="pregunta"> 
                    <p> ${questions[i].question} </p> 
                    <div class="opciones">`
        
        for(let j = 0; j < questions[i].options.length; j++){
            curr +=     `<div class="claves"> 
                            ${questions[i].options[j]} 
                        </div>`
        }
        curr += `  </div> 
                </li>`
    }
    preguntas.innerHTML = curr 
    const claves = document.querySelectorAll(".claves") // junta todas las claves
    for(let i = 0; i < claves.length; i++){
        claves[i].addEventListener("click", function(){
            optionSelected(claves, i)
        })
    }

}

function optionSelected(claves, index){
    let group = Math.trunc(index/4) // group: 0, 1, 2, 3 | 4, 5, 6, 7 
    // console.log(group)
    
    if(claves[index].classList.contains("claves-pressed")){
        claves[index].classList.remove("claves-pressed")
    }
    else{
        claves[index].classList.add("claves-pressed")
        for(let i = group*4; i < (group+1)*4; i++){
            if(i == index)
                continue
            claves[i].classList.remove("claves-pressed")
        }
    }
}

function calculateCorrect(){
    const preguntas = document.querySelectorAll(".pregunta")
    let correct = 0
    let index = 0

    preguntas.forEach(pregunta => {
        const correctAnswer = questions[index].answer
        const userAnswer = pregunta.querySelector(".claves-pressed")

        if(userAnswer){
            console.log(userAnswer.innerHTML)
            if(userAnswer.textContent.trim() == correctAnswer){
                correct++
            }
        }
        index++ 
    })
    return correct 
}
if(verificarQuizz){
    verificarQuizz.addEventListener("click", function(){
        let correct = calculateCorrect()
        
        popUpContainer.classList.add("show")
        document.body.classList.add("no-scroll")
        
        clearPressedClaves()

        const puntajeEl = document.querySelector(".pressStartFont")
        puntajeEl.textContent += correct
        puntajeEl.textContent += "/5"
        if(correct >= minimum){
            const buttons = document.querySelector(".buttons-abajo")
            
            let nextGame = null 
            if(document.getElementById("next-game")){
                nextGame = document.getElementById("next-game")
            }
            else{
                nextGame = document.createElement("button")
                nextGame.id = "next-game"
                nextGame.textContent = "Continuar"
                buttons.appendChild(nextGame)
            }
            nextGame.addEventListener("click", function(){
                document.body.classList.add("fade-out")

                setTimeout(function(){
                    window.location = "slidingPuzzle.html"
                }, 600)
            })
        }
    })
}
function clearPressedClaves(){
    const pressed = document.querySelectorAll(".claves-pressed")

    pressed.forEach(clave => {
        clave.classList.remove("claves-pressed")
    })
}
if(window.location.pathname.endsWith("quizz.html")){
    showQuestions()
}

// puzzle
const puzzleContainer = document.getElementById("puzzle")
let puzzle = []
let size = 3

function getRow(i){
    return Math.trunc((i-1)/3)
}
function getColumn(i){
    return (i-1) % 3
}
function generatePuzzle(){
    for(let i = 1; i <= size*size; i++){
        puzzle.push({
            value: i, 
            position: i, 
            image: "/img/cat-cat-jumping.gif", 
            x: getColumn(i) * 120, 
            y: getRow(i) * 120, 
            disabled: false, 
        })
    }
    console.log(puzzle)
}
function renderPuzzle(){
    let puzzleContainerHTML = ''
    for(let puzzleItem of puzzle){
        puzzleContainerHTML += `
            <div class="all-center puzzle-item" style="left: ${puzzleItem.x}px; top: ${puzzleItem.y}px; border: 1px solid;">
            `
        if(!puzzleItem.disabled){
            puzzleContainerHTML += `
                ${puzzleItem.value}
            `   
        }
        puzzleContainerHTML += "</div>"
        
        // <img src="${puzzleItem.image}">
    }
    puzzleContainer.innerHTML = puzzleContainerHTML
}
const contraInicial = "rollitodecanela112358"
function checkInversions(p){ // #inversiones permutacion p
    let n = p.length
    let ans = 0

    for(let i = 0; i < n; i++){
        for(let j = i+1; j < n; j++){
            if(p[i] > p[j]){
                ans++
            }
        }
    }
    return ans % 2 == 0 
}
function randomizePuzzle(){
    let p = []
    for(let i = 0; i < size*size; i++){
        p.push(i)
    }

    // only gives solvable puzzles 
    while(true){
        for(let i = 0; i < size*size; i++){
            let x = Math.trunc(Math.random() * size*size)
            // swapping p's indexes i, x
            let temp = p[i]
            p[i] = p[x]
            p[x] = temp 
        }
        if(checkInversions(p)) break
    }

    console.log("pasaaa rata")
    let aux = []
    for(let i = 0; i < size*size; i++){
        aux.push(puzzle[p[i]].value)
    }
    for(let i = 0; i < size*size; i++){
        puzzle[i].value = aux[i]
    }
    const puzzleWithValue9 = puzzle.find(item => item.value == 9)
    puzzleWithValue9.disabled = true 
}
function handleInput(){
    document.addEventListener('keydown', handleKeyDown)
}
function handleKeyDown(event){
    if(event.key === "ArrowDown" || event.key === "s" || event.key === "S"){
        moveUp()
    }
    else if(event.key === "ArrowUp" || event.key === "w" || event.key === "W"){
        moveDown()
    }
    else if(event.key === "ArrowLeft" || event.key === "a" || event.key === "A"){
        moveLeft()
    }
    else if(event.key === "ArrowRight" || event.key === "d" || event.key === "D"){
        moveRight()
    }
    renderPuzzle()
}
function getRightPuzzle(){
    const emptyPuzzle = getEmptyPuzzle()
    const isRightEdge = getColumn(emptyPuzzle.position) === size - 1 
    if(isRightEdge){
        return null
    }
    return getPuzzleByPos(emptyPuzzle.position + 1)
}
function getLeftPuzzle(){
    const emptyPuzzle = getEmptyPuzzle()
    const isLeftEdge = getColumn(emptyPuzzle.position) === 0
    if(isLeftEdge){
        return null
    }
    return getPuzzleByPos(emptyPuzzle.position - 1)
}
function getAbovePuzzle(){
    const emptyPuzzle = getEmptyPuzzle()
    const isAboveEdge = getRow(emptyPuzzle.position) === 0 
    if(isAboveEdge){
        return null
    }
    return getPuzzleByPos(emptyPuzzle.position - size)
}
function getBelowPuzzle(){
    const emptyPuzzle = getEmptyPuzzle()
    const isBelowEdge = getRow(emptyPuzzle.position) === size - 1 
    if(isBelowEdge){
        return null
    }
    return getPuzzleByPos(emptyPuzzle.position + size)
}   
function getEmptyPuzzle(){
    return puzzle.find((item) => item.disabled === true)
}
function getPuzzleByPos(pos){
    return puzzle.find((item) => item.position === pos)
}
function moveLeft(){
    const emptyPuzzle = getEmptyPuzzle()
    const rightPuzzle = getRightPuzzle()
    
    if(rightPuzzle){
        swapPositions(emptyPuzzle, rightPuzzle)
    }
}
function moveRight(){
    const emptyPuzzle = getEmptyPuzzle()
    const leftPuzzle = getLeftPuzzle()

    if(leftPuzzle){
        swapPositions(emptyPuzzle, leftPuzzle)
    }
}
function moveUp(){
    const emptyPuzzle = getEmptyPuzzle()
    const abovePuzzle = getAbovePuzzle()

    if(abovePuzzle){
        swapPositions(emptyPuzzle, abovePuzzle)
    }
}
function moveDown(){
    const emptyPuzzle = getEmptyPuzzle()
    const belowPuzzle = getBelowPuzzle()

    if(belowPuzzle){
        swapPositions(emptyPuzzle, belowPuzzle)
    }
}

function swapPositions(firstPuzzle, secondPuzzle){
    let temp = firstPuzzle.position
    firstPuzzle.position = secondPuzzle.position
    secondPuzzle.position = temp

    // swap x
    temp = firstPuzzle.x
    firstPuzzle.x = secondPuzzle.x
    secondPuzzle.x = temp
    // swap y 
    temp = firstPuzzle.y
    firstPuzzle.y = secondPuzzle.y
    secondPuzzle.y = temp 
}

if(puzzleContainer){
    generatePuzzle()
    randomizePuzzle()
    renderPuzzle()
    handleInput()
}

const verificarPuzzle = document.getElementById("verificar-puzzle")

// if(nextPuzzle){
//     verificarPuzzle.addEventListener("click", function(){
//         document.body.classList.add("no-scroll")
//         popUpContainer.classList.add("show")
//     })
// }