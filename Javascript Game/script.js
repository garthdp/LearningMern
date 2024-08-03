let xp = 0
let health = 100
let gold = 50
let currentWeapon = 0
let fighting
let monterHealth
let inventory = ["stick"]

let button1 = document.querySelector('#button1')
let button2 = document.querySelector('#button2')
let button3 = document.querySelector('#button3')
let text = document.querySelector('#text')
let xpText = document.querySelector('#xpText')
let healthText = document.querySelector('#healthText')
let goldText = document.querySelector('#goldText')
let monsterStats = document.querySelector('#monsterStats')
let monsterName = document.querySelector('#monsterName')
let monsterHealth = document.querySelector('#monsterHealth')
const locations = [
    {
        name: "town square",
        "button text": [""]
    }
]

// initialize buttons
button1.onclick = goStore
button2.onclick = goCave
button3.onclick = fightDragon

function update(location){
    if(){

    }
}

function goTown(){
    button1.innerText = "Go to Store"
    button2.innerText = "Go to Cave"
    button3.innerText = "Fight Dragon"

    button1.onclick = goStore
    button2.onclick = goCave
    button3.onclick = fightDragon

    text.innerText = "You are in the town square. You see a sign that say \"Store\"."
}

function goStore(){
    button1.innerText = "Buy 10 health (10 gold)"
    button2.innerText = "Buy weapon (30 gold)"
    button3.innerText = "Go to town square"

    button1.onclick = buyHealth
    button2.onclick = buyWeapon
    button3.onclick = goTown

    text.innerText = "You enter the store"

}

function goCave(){
    console.log('Going to cave')
}

function fightDragon(){
    console.log('Fighting dragon')
}

function buyHealth(){
    
}

function buyWeapon(){
    
}
