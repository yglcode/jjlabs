class Scene2D extends Two {
    constructor(canvasId='canvas', w=585, h=500) {
        super({
            width: w,
            height: h
        })
        this.elem = document.getElementById(canvasId)
        this.appendTo(this.elem)
        this.elem.style.backgroundColor = 'rgb(10,50,50)'
        this.children = this.scene.children.ids
        this.on("dblclick", function(e) {
            let c = this.position(e)
            console.log(c.x + ":" + c.y + "double clicked");
            new Ball(this,c.x,c.y,60)
        })
    }
    //events: click,mousedown,mousemove,mouseup
    on(event, callback) {
        this.elem["on" + event] = callback.bind(this)
    }
    off(event) {
        this.elem["on" + event] = null
    }
    position(e) {
        let bbox = this.elem.getBoundingClientRect()
        return {
            x: e.x - bbox.x * this.width / bbox.width,
            y: e.y - bbox.y * this.height / bbox.height
        }
    }
    clear() {
        for (let c in this.children) {
            this.children[c].stop()
            this.remove(this.children[c])
            this.update()
        }
    }
}

class Circle extends Two.Circle {
    constructor(scene2d, cx=72, cy=100, r=50, color) {
        super(cx, cy, r)

        if (color === undefined) {
            let rc = Math.random() * 255
            let gc = Math.random() * 255
            let bc = Math.random() * 255
            color = `rgb(${rc},${gc},${bc})`
        }
        this.fill = color
        //this.stroke = 'orangered'
        //this.linewidth = 5
        this.scene2d = scene2d

        scene2d.add(this)
        scene2d.update()

        this.elem = this._renderer.elem
        this.position = this.translation
    }
    move(dx, dy) {
        this.translation.x += dx
        this.translation.y += dy
        this.scene2d.update()
    }
    //events: click,mousedown,mousemove,mouseup
    on(event, callback) {
        this.elem["on" + event] = callback.bind(this)
    }
    off(event) {
        this.elem["on" + event] = null
    }

    stop() {
        if (this.interval !== undefined) {
            console.log("stop!")
            clearInterval(this.interval)
        }
    }
}

class Ball extends Circle {
    constructor(scene2d, cx=72, cy=100, r=50, color) {
        super(scene2d, cx, cy, r, color)
        this.ds = 3
        this.dx = 3
        this.dy = 3
        let that = this
        this.start()
        this.on("click", function() {
                this.explode()
        })
    }
    explode() {
        this.scene2d.remove(this)
let b1 = new Ball(s,this.position.x,this.position.y,this.radius/4)
        b1.dx = this.dx
        b1.dy = this.dy
let b2 = new Ball(s,this.position.x,this.position.y,this.radius/4)
        b2.dx = -this.dx
        b2.dy = this.dy
let b3 = new Ball(s,this.position.x,this.position.y,this.radius/4)
        b3.dx = this.dx
        b3.dy = -this.dy
let b4 = new Ball(s,this.position.x,this.position.y,this.radius/4)
        b4.dx = -this.dx
        b4.dy = -this.dy
    }
    stop() {
            clearInterval(this.sc1)
            delete this.sc1
        }
    start() {
            let that=this
            this.sc1 = setInterval(function() {
                that.move(); that.size()
            }, 25)
    }
    size() {
        if (this.radius < 3) {
            this.ds = 1
        } else if (this.radius > 100) {
            this.ds = -1
        }
        this.radius +=this.ds
        this.scene2d.update()
    }
    move() {
        if (this.position.x < 0) {
            this.dx = 3
        } else if (this.position.x > this.scene2d.width) {
            this.dx = -3
        } else if (this.position.y < 0) {
            this.dy = 3
        } else if (this.position.y > this.scene2d.height) {
            this.dy = -3
        }
        super.move(this.dx, this.dy)
    }

}


/*

function drawRect(scene2d,x=213,y=100,w=100,h=100,color='rgb(0,200,255)') {
    let rect = scene2d.makeRectangle(x,y,w,h)

    rect.fill=color
    rect.opacity=0.75
    rect.noStroke()

    scene2d.update()

    return rect
}

*/

function setup() {
    s = new Scene2D()
    b1 = new Ball(s, 50, 50, 50)

/*    c1 = new Circle(s)

    c1.on("mousedown", function(e) {
        c1.x = e.x;
        c1.y = e.y;
        c1.on("mousemove", (e)=>{
            c1.move(e.x - c1.x, e.y - c1.y)
            c1.x = e.x;
            c1.y = e.y
        }
        )
    })

    c1.on("mouseup", function() {
        c1.off("mousemove")
        delete c1.x
        delete c1.y
    })

    c1.on("click", function(e) {
        console.log(`click: ${e.x}:${e.y}`)
        if (c1.interval !== undefined) {
            clearInterval(c1.interval);
            delete c1.interval
            delete c1.dx
            delete c1.dy
            return
        }
        c1.dx = 10;
        c1.dy = 10
        c1.interval = setInterval(function() {
            c1.move(c1.dx, c1.dy)
            if (c1.translation.x < 0 && c1.dx < 0) {
                c1.dx = -c1.dx
            }
            if (c1.translation.x > c1.scene2d.width && c1.dx > 0) {
                c1.dx = -c1.dx
            }
            if (c1.translation.y < 0 && c1.dy < 0) {
                c1.dy = -c1.dy
            }
            if (c1.translation.y > c1.scene2d.height && c1.dy > 0) {
                c1.dy = -c1.dy
            }
        }, 50)
    })*/
    /*
    s.on("dblclick", function(e) {
        console.log(`center: ${e.x}:${e.y}`)
        let center = s.position(e)
        new Ball(this,center.x,center.y)
    })
    */
    //for(let i=0;i<30;i++) {
//let b=new Ball(s,10*i,10*i,30);b.start()
//}

}

window.onload = setup
