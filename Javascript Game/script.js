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
let monsterHealthText = document.querySelector('#monsterHealth')

const weapons = [
    {
        name: "stick",
        power: 10
    },
    {
        name: "dagger",
        power: 20
    },
    {
        name: "claw hammer",
        power: 40
    },
    {
        name: "sword",
        power: 50
    },
];

const monsters = [
    {
        name : "Slime",
        level: 2,
        health : 15
    },
    {
        name : "Fanged beast",
        level: 8,
        health : 60
    },
    {
        name : "Dragon",
        level: 20,
        health : 300
    }
]

const locations = [
    {
        name: "town square",
        "button text": ["Go to Store", "Go to Cave", "Fight Dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that say \"Store\"."
    },
    {
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You enter the store."
    },
    {
        name: "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You enter the cave. You see some monsters."
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting a monster."
    },
    {
        name: "killed monster",
        "button text": ["Go town square", "Go town square", "Go town square"],
        "button functions": [goTown, goTown, goTown],
        text: "The monster is dead."
    },
    {
        name: "lose",
        "button text": ["Replay?", "Replay?", "Replay?"],
        "button functions": [restart, restart, restart],
        text: "You die!"
    },
    {
        name: "win",
        "button text": ["Replay?", "Replay?", "Replay?"],
        "button functions": [restart, restart, restart],
        text: "You win!"
    }
]

// initialize buttons
button1.onclick = goStore
button2.onclick = goCave
button3.onclick = fightDragon

function update(location){
    monsterStats.style.display = "none"
    button1.innerText = location["button text"][0]
    button2.innerText = location["button text"][1]
    button3.innerText = location["button text"][2]

    button1.onclick = location["button functions"][0]
    button2.onclick = location["button functions"][1]
    button3.onclick = location["button functions"][2]

    text.innerText = location.text
}

function goTown(){
    update(locations[0])
}

function goStore(){
    update(locations[1])
}

function goCave(){
    update(locations[2])
}

function buyHealth(){
    if (gold >= 10){
        gold -= 10
        health += 10
        goldText.innerText = gold
        healthText.innerText = health
    }
    else {
        text.innerText = "Not enough gold milord!"
    }
}

function buyWeapon(){
    if (currentWeapon < weapons.length - 1){
        if (gold >= 30){
            gold -= 30
            currentWeapon++
            goldText.innerText = gold
            let newWeapon = weapons[currentWeapon].name
            text.innerText =  "You have bought a " + newWeapon + "!"
            inventory.push(newWeapon)
            text.innerText += " In you inventory you have " + inventory
        }
        else{
            text.innerText = "Not enough gold milord!"
        }
    }else {
        text.innerText = "You have the best weapon!"
        button2.innerText = "Sell weapon for 15 gold"
        button2.onclick = sellWeapon;
    }
}

function sellWeapon(){
    if (inventory.length > 1){
        gold += 15
        gold.innerText = gold
        let currentWeapon = inventory.shift()
        text.innerText = "You sold a " + currentWeapon + "."
        text.innerText += " In you inventory you have " + inventory
    } else{
        text.innerText = "Cannot sell only weapon."
    }
}

function fightSlime(){
    fighting = 0
    goFight()
}

function fightBeast(){
    fighting = 1
    goFight()
}

function fightDragon(){
    fighting = 2
    goFight()
}

function goFight(){
    update(locations[3])
    monsterHealth = monsters[fighting].health
    monsterStats.style.display = "block"
    monsterName.innerText = monsters[fighting].name
    monsterHealthText.innerText = monsterHealth
}

function attack(){
    text.innerText = "The " + monsters[fighting].name + " attacks."
    text.innerText += " You attack it with you " + weapons[currentWeapon].name + "."
    health -= monsters[fighting].level
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1
    healthText.innerText = health
    monsterHealthText.innerText = monsterHealth
    if (health <= 0){
        lose()
    }
    else if (monsterHealth <= 0){
        fighting === 2 ? winGame() : defeatMonster()
    }
}

function dodge(){
    text.innerText = "You dodged."
}

function lose(){
    update(locations[5])
}

function winGame(){
    update(locations[6])
}

function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7)
    xp += monsters[fighting].level
    goldText.innerText = gold
    xpText.innerText = xp
    update(locations[4])
}

function restart(){
    xp = 0
    health = 100
    gold = 50
    currentWeapon = 0
    inventory = ["stick"]
    goldText.innerText = gold
    healthText.innerText = health
    xpText.innerText = xp
    goTown()
}
