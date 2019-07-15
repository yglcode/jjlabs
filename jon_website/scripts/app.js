function e(a) {
    return document.querySelector(a)
}

let sched = e("#spod")

sched.style.color = "blue"

let clist = e("#clist")

let ll = e("#ll")

clist.removeChild(ll)

let bigMeme = e("li")

bigMeme.textContent = "Big Meme"

clist.appendChild(bigMeme)

let multi = e("#multi")

let buffer = e("#buffer")

let times = e("#times")

let results = e("#results")

let calcin = e("#calcin")

let calcnum = document.querySelectorAll(".calcnum")

let operations = document.querySelectorAll(".operations")

let c = 1

let count = 0

let data = []

let ac = e("#ac")

let back = e("#back")

let equal = e("#equal")

let neg = e("#neg")

let percent = e("#percent")

for (let i = 0; i < 12; i++) {
    let multirow = document.createElement("tr")
    multi.appendChild(multirow)
    for (let i = 0; i < 12; i++) {
        let multicell = document.createElement("td")
        multicell.textContent = (1 + i) * c
        multirow.appendChild(multicell)
        multicell.setAttribute("class", "time")
        multicell.onclick = (ev)=>{
            if (count === 0) {
                blank = buffer.textContent
                buffer.value = ev.target.textContent
                a = buffer.value
                count = 1
                data.push(ev.target.textContent)
                question = a
            } else {
                buffer.value = a + "*" + ev.target.textContent
                a = buffer.value
                data.push(ev.target.textContent)
                question = a
            }
        }
    }
    c++
}

let answer = 1

times.onclick = (ev)=>{
    for (let i = 0; i < data.length; i++) {
        answer = answer * data[i]
    }
    console.log(answer)
    let qa = document.createElement("li")
    qa.textContent = question + "=" + answer
    results.appendChild(qa)
    count = 0
    buffer.value = blank
    question = undefined
    answer = 1
    a = undefined
    data = []
}

clear.onclick = (ev)=>{
    while (results.childNodes.length > 0) {
        results.removeChild(results.childNodes[0])
    }
}

let calcanswer = 0
let calcbuffer = 0
let blank = calcin.value
let block = 0

for (let i = 0; i < calcnum.length; i++) {
    calcnum[i].onclick = (ev)=>{
        calcin.value = calcin.value + ev.target.textContent
        /* calcbuffer = calcbuffer * 10 + Number(ev.target.textContent)*/
    }
}

for (let i = 0; i < operations.length; i++) {
    operations[i].onclick = (ev)=>{
        if (block === 0) {
            calcin.value = calcin.value + " " + ev.target.textContent + " "
            block++
        }
        /*        if (calcanswer === 0) {
            calcanswer = calcbuffer
        } else {
            calcanswer = calcanswer +ev.target.textContent + calcbuffer
        }
        calcbuffer = 0*/
    }
}

ac.onclick = (ev)=>{
    calcanswer = 0
    calcbuffer = 0
    calcin.value = blank
    block = 0
}

equal.onclick = (ev)=>{
    let fans = calcin.value.split(" ")
    if (fans[0][fans[0].length-1] === "%") {
        fans[0] = fans[0].substr(0,fans[0].length-1)
        fans[0] = fans[0] / 100.0
    } else if (fans[2][fans[2].length-1] === "%") {
        fans[2] = fans[2].substr(0,fans[2].length-1)
        fans[2] = fans[2] / 100.0}
    if (fans[1] === "*") {
        calcin.value = fans[0] * fans[2]
    } else if (fans[1] === "/") {
        calcin.value = fans[0] / fans[2]
    } else if (fans[1] === "+") {
        calcin.value = Number(fans[0]) + Number(fans[2])
    } else if (fans[1] === "-") {
        calcin.value = fans[0] - fans[2]
    }
    block = 0
}

back.onclick = (ev)=>{
    calcin.value = calcin.value.substr(0, calcin.value.length - 1)
    if (calcin.value[calcin.value.length] === "*" || "/" || "+" || "-" || ".") {
        block = 0
    }
}

neg.onclick = (ev)=>{
    if (calcin.value[0] === "-") {
        calcin.value = calcin.value.substr(1, calcin.value.length)
    } else {
        calcin.value = "-" + calcin.value
    }
}