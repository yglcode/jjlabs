function obj(id) {
    return document.getElementById(id)
}

let ddx=0.3
let dmax_x=4
let dmin_x=-4

function moveScreen() {
    let xform = obj("screenmove")
    let move = xform.getAttribute('translation').split(' ')
    let x=Number(move[0])
    if ((x>=dmax_x && ddx>0) || (x<=dmin_x && ddx<0)) {
        ddx=-ddx
    }
    x+=dx
    move=x+" "+move[1]+" "+move[2]
    xform.setAttribute('translation',move)
}

function changeColor(id) {
    let col = obj(id).getAttribute("diffuseColor").split(' ')
    let red = (Number(col[0])*100+Math.random()*100)/200.0
    let green = (Number(col[1])*100+Math.random()*100)/200.0
    let blue = (Number(col[2])*100+Math.random()*100)/200.0
    col = red+" "+green+" "+blue
    obj(id).setAttribute("diffuseColor",col)
}

let running = undefined
let pics = 0
let i = 2
function rotateCube()
{
    if (running === undefined) {
    running = setInterval(function(){
    let xform = obj("cubeRotate")
    let rot = xform.getAttribute('rotation').split(' ')
    let w = (Number(rot[3])+0.3)%(2*3.1415)
    let new_r = rot[0]+" "+rot[1]+" "+rot[2]+" "+w
    xform.setAttribute('rotation',new_r)
    let xformimage = obj("image")
    if (pics>30) {
        i++
        i = i%expics.length
        xformimage.setAttribute("url",expics[i])
        pics = 0
    } else {
        pics++
    }
    },100)
    } else {
        clearInterval(running)
        running = undefined
    }
}
let running1 = undefined
let ds=0.1
let max_s=1.5
let min_s=0.7
let ii = 3
function scaleSphere()

{
    if (running1 === undefined) {
    running1=setInterval(function(){changeColor("sphereColor")
    let xform = obj("sphereScale")
    let sca = xform.getAttribute('scale').split(' ')
    let s = Number(sca[0])
    if ((s>=max_s && ds>0) || (s<=min_s && ds<0)) {
        ds=-ds
    }
    let rot = xform.getAttribute('rotation').split(' ')
    let w = (Number(rot[3])+0.3)%(2*3.1415)
    let new_r = rot[0]+" "+rot[1]+" "+rot[2]+" "+w
    xform.setAttribute('rotation',new_r)
    s+=ds
    sca=s+" "+s+" "+s
    xform.setAttribute('scale',sca)
    let xformimage = obj("image2")
    if (pics>30) {
        ii++
        ii = ii%expics.length
        xformimage.setAttribute("url",expics[ii])
        pics = 0
    } else {
        pics++
    }
    },100
    )
    } else {
        clearInterval(running1)
        running1 = undefined
    }
}
let running2 = undefined
let dx=0.3
let max_x=-1
let min_x=-4
let iii=4
function moveCone() {
    if (running2 === undefined) {
    running2 = setInterval(function(){
    let xform = obj("coneMove")
    let move = xform.getAttribute('translation').split(' ')
    let x=Number(move[0])
    if ((x>=max_x && dx>0) || (x<=min_x && dx<0)) {
        dx=-dx
    }
    x+=dx
    move=x+" "+move[1]+" "+move[2]
    xform.setAttribute('translation',move)
    let xformimage = obj("image1")
    if (pics>30) {
        iii++
        iii = ii%expics.length
        xformimage.setAttribute("url",expics[ii])
        pics = 0
    } else {
        pics++
    }
    },100) 
    } else {
        clearInterval(running2)
        running2 = undefined
    }
}

let expics=['res/minecraft_meme_1.png','res/minecraft_meme_2.png','res/jon_jason.png']