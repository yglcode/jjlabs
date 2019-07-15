let sched = document.querySelector('#schoolsched')
sched.style.color = 'crimson'
sched.style.backgroundColor = 'green'

let classes = document.querySelector('.classes')

let aplang = document.querySelector('#aplang')

//classes.removeChild(aplang)

let apphysics = document.createElement('li')
apphysics.textContent = 'AP Physics'

let multtable = document.querySelector('#multiplicationtable')

let multcell1 = document.createElement('tr')
multcell1.textContent = '1'
let multcell2 = document.createElement('td')
multcell2.textContent = '1'

let text = document.querySelector('#text')

let t = 0

let numbers = []

for (let i = 1; i < 13; i++) {
    let multcell1 = document.createElement('tr')
    multtable.appendChild(multcell1)
    for (let j = 1; j < 13; j++) {
        let multcell2 = document.createElement('td')
        multcell2.textContent = i * j
        multtable.appendChild(multcell2)
        multcell2.onclick = (ev)=>{
            if (t === 0) {
                original = text.value
                text.value = ev.target.textContent
                numbers.push(ev.target.textContent)
                t++
            } else {
                let a = text.value
                a = a + "*" + ev.target.textContent
                text.value = a
                numbers.push(ev.target.textContent)
            }
        }
    }
}

let ChildLog = []

let finalvalue = 1

let log = document.querySelector('#log')

let button = document.querySelector('#button')
button.onclick = (ev)=>{
    for (i = 0; i < numbers.length; i++) {
        finalvalue = finalvalue * numbers[i]
    }

    let logindividual = document.createElement('li')
    log.appendChild(logindividual)
    ChildLog.push(logindividual)
    logindividual.textContent = text.value + "=" + finalvalue
    finalvalue = 1
    t = 0
    text.value = ""
    numbers = []
}

let clear = document.querySelector('#clear')
clear.onclick = (ev)=>{
    numbers = []
    text.value = ""
    finalvalue = 1
    t = log.childNodes.length
    for (i = t - 1; i > 0; i--) {
        log.removeChild(log.childNodes[i])
        t = 0
    }
}

let display = document.querySelector('#screen')

let tinumber = document.querySelectorAll('.number')

let tilognum = []

let tilogoperator = []

let tilogall = []

let titype = []

let total = 0

let reuse = 0

let tisplit = []

let tistring = ""

for (let i = 0; i < tinumber.length; i++) {
    tinumber[i].onclick = (ev)=>{
            let zeta = display.value
            zeta = zeta + ev.target.textContent
            display.value = zeta
        titype.push('number')
        tistring = tistring + ev.target.textContent
    }
}

let operator = document.querySelectorAll('.operator')

for (let i = 0; i < operator.length; i++) {
    operator[i].onclick = (ev)=>{
        let zeta = display.value
        zeta = zeta + ev.target.textContent
        display.value = zeta
        titype.push('operator')
        tistring = tistring + " " + ev.target.textContent + " "
    }
}

let equals = document.querySelector('#equals')
equals.onclick = (ev)=>{
    let data = tistring.split(' ')
    console.log(data)
    if (data[0][data[0].length - 1] === '%') {
        data[0] = data[0].substr(0, data[0].length - 1)
        data[0] = data[0] / 100.0
    }
    if (data[2][data[2].length - 1] === '%') {
        data[2] = data[2].substr(0, data[2].length - 1)
        data[2] = data[2] / 100.0
    }
    if (data[1] === '+') {
        total = Number(data[0]) + Number(data[2])
    }
    if (data[1] === '-') {
        total = Number(data[0]) - Number(data[2])
    }
    if (data[1] === 'x') {
        total = Number(data[0]) * Number(data[2])
    }
    if (data[1] === '/') {
        total = Number(data[0]) / Number(data[2])

    }
    display.value = total
    tistring = ''
    tistring = tistring + total
}

let clearall = document.querySelector('#delete')
clearall.onclick = (ev)=>{
    display.value = ''
    tistring = ''
    total = 0
}

let back = document.querySelector('#back')
back.onclick = (ev)=>{
    tistring = tistring.substr(0, tistring.length - 1)
    display.value = display.value.substr(0, display.value.length - 1)
}

let flip = document.querySelector('#flip')
flip.onclick = (ev)=>{
    tistring = -tistring
    display.value = -display.value
}
/*
let percent = document.querySelector('#percent')
percent.onclick = (ev)=>{
    let zeta = display.value
    zeta = zeta + ev.target.textContent
    display.value = zeta
    if (Number(tistring.split('')[0]) === undefined) {
        tistring.split('')
        tistring.split('')[0] = tistring.split('')[0] / 100
    } else if (Number(tistring.split('')[2]) === undefined) {
        tistring.split('')
        tistring.split('')[2] = tistring.split('')[2] / 100
    }
}
*/