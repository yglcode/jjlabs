function obj(id) {
    return document.getElementById(id)
}

function changeColor(id) {
    let col = obj(id).getAttribute("diffuseColor").split(' ')
    let red = (Number(col[0]) * 100 + Math.random() * 100) / 200.0
    let green = (Number(col[1]) * 100 + Math.random() * 100) / 200.0
    let blue = (Number(col[2]) * 100 + Math.random() * 100) / 200.0
    col = red + " " + green + " " + blue
    obj(id).setAttribute("diffuseColor", col)
}

function rotateCube() {

    if (sc1 === undefined) {
        sc1 = setInterval(function() {
            let xform = obj("cubeRotate")
            let rot = xform.getAttribute('rotation').split(' ')
            let w = (Number(rot[3]) + 0.3) % (2 * 3.1415)
            let new_r = rot[0] + " " + rot[1] + " " + rot[2] + " " + w
            xform.setAttribute('rotation', new_r)
            if (count1 > 9) {
                i1++
                i1 = i1 % expics.length
                pics1.setAttribute("url", expics[i1])
                count1 = 0
            } else {
                count1++
            }
        }, 100)
    } else {
        clearInterval(sc1)
        sc1 = undefined
    }

}

let ds = 0.1
let max_s = 3
let min_s = 0.7
let count1 = 0
let count2 = 0
let count3 = 0
let i1 = 0
let i2 = 0
let i3 = 0
function scaleSphere() {
    if (sc2 === undefined) {
        sc2 = setInterval(function() {
            changeColor("sphereColor")
            let xform = obj("sphereScale")
            let sca = xform.getAttribute('scale').split(' ')
            let s = Number(sca[0])
            if ((s >= max_s && ds > 0) || (s <= min_s && ds < 0)) {
                ds = -ds
            }
            s += ds
            sca = s + " " + s + " " + s
            xform.setAttribute('scale', sca)
            let rot = xform.getAttribute('rotation').split(' ')
            let w = (Number(rot[3]) + 0.3) % (2 * 3.1415)
            let new_r = rot[0] + " " + rot[1] + " " + rot[2] + " " + w
            xform.setAttribute('rotation', new_r)
            let pics = obj("pics")
            if (count2 > 9) {
                i2++
                i2 = i2 % expics.length
                pics2.setAttribute("url", expics[i2])
                count2 = 0
            } else {
                count2++
            }
        }, 100)
    } else {
        clearInterval(sc2)
        sc2 = undefined

    }
}

let dx = 0.3
let max_x = -1
let min_x = -4
function moveCone() {
    if (sc3 === undefined) {
        sc3 = setInterval(function() {
            let xform = obj("coneMove")
            let move = xform.getAttribute('translation').split(' ')
            let x = Number(move[0])
            if ((x >= max_x && dx > 0) || (x <= min_x && dx < 0)) {
                dx = -dx
            }
            x += dx
            move = x + " " + move[1] + " " + move[2]
            xform.setAttribute('translation', move)
            let rot = xform.getAttribute('rotation').split(' ')
            let w = (Number(rot[3]) + 0.3) % (2 * 3.1415)
            let new_r = rot[0] + " " + rot[1] + " " + rot[2] + " " + w
            xform.setAttribute('rotation', new_r)
            if (count3 > 9) {
                i3++
                i3 = i3 % expics.length
                pics3.setAttribute("url", expics[i3])
                count3 = 0
            } else {
                count3++
            }
        }, 100)
    } else {
        clearInterval(sc3)
        sc3 = undefined
    }

}

let sc1 = undefined
let sc2 = undefined
let sc3 = undefined
let expics = ["res/sadasdasd.jpg", "res/qwewqeqweqw.jpg", "res/jon_jason.png"]
