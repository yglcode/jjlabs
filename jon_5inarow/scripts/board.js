function e(a) {
    return document.querySelector(a)
}

let gboard = e("#gboard")

let turn = e("#turn")

let numinrow = e("#numinrow")

let white = e("#white")

let black = e("#black")

let turnpic = e("#turnpic")

let tselect = e("#tselect")

let reset = e("#reset")

let tiles = []

let count = 0

let scorelog = e("#scorelog")

let select = e("#select")

let popuptext = e("#popuptext")

let titlet = e("#titlet")

let title = e("#title")

let humanPending = []

let popup = e("#popup")
dialogPolyfill.registerDialog(popup)
let popupShown = false

let resets = e("#resets")

for (let i = 0; i < 18; i++) {
    let row = []
    for (let i = 0; i < 18; i++) {
        row.push({
            taken: undefined,
            cell: undefined,
            img: undefined,
        })
    }
    tiles.push(row)

}

for (let i = 0; i < 18; i++) {
    let grow = document.createElement("tr")
    gboard.appendChild(grow)
    for (let j = 0; j < 18; j++) {
        let gcell = document.createElement("td")
        grow.appendChild(gcell)
        gcell.setAttribute("class", "tile")
        gcell.setAttribute("align", "center")
        tiles[i][j].cell = gcell
        gcell.onclick = (ev)=>{
            count = 0
            place(i, j, tiles[i][j].cell)
        }
    }
}

reset.onclick = (ev)=>{
    restart()
}

resets.onclick = (ev)=>{
    restart()
}

function restart() {
    white.checked = true
    for (let i = 0; i < tiles.length; i++) {
        for (let j = 0; j < tiles[i].length; j++) {
            if (tiles[i][j].taken !== undefined) {
                if (tiles[i][j].img !== undefined) {
                    tiles[i][j].cell.removeChild(tiles[i][j].img)
                }
                tiles[i][j].img = undefined
                tiles[i][j].taken = undefined
            }
        }
    }
    if (popupShown) {
        popup.close()
    }
    humanPending = []
    compuPlayer.reset()
    if (tselect.selectedIndex === 1) {
        count++
        let a = Math.round(Math.random() * 6) + 6
        let b = Math.round(Math.random() * 6) + 6
        //computer start first
        place(a, b, tiles[a][b].cell)
        compuPlayer.take(a, b)
    }
}

function check(i, j) {
    let max = checks(i, j, 1, 0)
    let vwin = checks(i, j, 0, 1)
    let dwin = checks(i, j, 1, 1)
    let awin = checks(i, j, 1, -1)

    if (max[0] < vwin[0]) {
        if (count === 0) {
            humanPending.push(max)
        }
        max = vwin
    } else if (max[0] === vwin[0] && (max.length < vwin.length || (vwin.length > 1 && max[1][2] > vwin[1][2]))) {
        if (count === 0) {
            humanPending.push(max)
        }
        max = vwin
    } else if (count === 0) {
        humanPending.push(vwin)
    }
    if (max[0] < dwin[0]) {
        if (count === 0) {
            humanPending.push(max)
        }
        max = dwin
    } else if (max[0] === dwin[0] && (max.length < dwin.length || (dwin.length > 1 && max[1][2] > dwin[1][2]))) {
        if (count === 0) {
            humanPending.push(max)
        }
        max = dwin
    } else if (count === 0) {
        humanPending.push(dwin)
    }
    if (max[0] < awin[0]) {
        if (count === 0) {
            humanPending.push(max)
        }
        max = awin
    } else if (max[0] === awin[0] && (max.length < awin.length || (awin.length > 1 && max[1][2] > awin[1][2]))) {
        if (count === 0) {
            humanPending.push(max)
        }
        max = awin
    } else if (count === 0) {
        humanPending.push(awin)
    }

    if (max[0] === numinrow.value - 1) {
        pop(tiles[i][j].taken)
        log()
    } else if (select.selectedIndex === 1 && count === 0) {
        count++
        humanPending.sort((p1,p2)=>p2[0] - p1[0])
        //sort from max->min
        if (humanPending.length > 0 && humanPending[0][0] > max[0]) {
            humanPending.push(max)
            humanPending.sort((p1,p2)=>p2[0] - p1[0])
            while (humanPending.length > 0) {
                max = humanPending.shift()
                if (max.length == 1) {
                    continue
                }
                let next = max[1]
                if (tiles[next[0]][next[1]].taken !== undefined) {
                    next = undefined
                    if (max.length > 2) {
                        next = max[2]
                        if (tiles[next[0]][next[1]].taken !== undefined) {
                            next = undefined
                        }
                    }
                }
                if (next !== undefined) {
                    max[1] = next
                    break
                }
            }
        }
        //computer's turn
        //update ComputerPlayer's candidates
        compuPlayer.humanTake(i, j)
        let nextMove = max[1]
        let compuTopMove = compuPlayer.topCandidate()
        if (compuTopMove !== undefined) {
            if (nextMove === undefined || compuTopMove.weight >= (max[0] + 1)/* && compuTopMove.weight>=3*/
            ) {
                nextMove = [compuTopMove.row, compuTopMove.col]
                humanPending.push(max)
            } else if (max.length > 2 && compuPlayer.getCandidate(max[2][0], max[2][1]) !== undefined) {
                nextMove = max[2]
            }
        }
        console.log("computer play: ", nextMove)
        place(nextMove[0], nextMove[1], tiles[nextMove[0]][nextMove[1]].cell)
        compuPlayer.take(nextMove[0], nextMove[1])
    }
}

function checkr(x) {
    return x >= 0 && x < 18
}
function checks(i, j, dx, dy) {
    let win = 0
    let space1 = 0
    let space2 = 0
    let max = []
    let min = []
    for (let c = 1; c < numinrow.value && checkr(i + c * dx) && checkr(j + c * dy); c++) {
        if (tiles[i + c * dx][j + c * dy].taken !== tiles[i][j].taken) {
            if (tiles[i + c * dx][j + c * dy].taken === undefined) {
                max[0] = i + c * dx
                max[1] = j + c * dy
                while (checkr(i + c * dx) && checkr(j + c * dy) && tiles[i + c * dx][j + c * dy].taken === undefined) {
                    space1++
                    c++
                }
                if (checkr(i + c * dx) === false || checkr(j + c * dy) === false || tiles[i + c * dx][j + c * dy].taken !== tiles[i][j].taken) {
                    space1 = 100
                }
                max[2] = space1
                console.log("space1", space1)
            }
            break
        }
        win++
    }
    for (let c = 1; c < numinrow.value && checkr(i - c * dx) && checkr(j - c * dy); c++) {
        if (tiles[i - c * dx][j - c * dy].taken !== tiles[i][j].taken) {
            if (tiles[i - c * dx][j - c * dy].taken === undefined) {
                min[0] = i - c * dx
                min[1] = j - c * dy
                while (checkr(i - c * dx) && checkr(j - c * dy) && tiles[i - c * dx][j - c * dy].taken === undefined) {
                    space2++
                    c++
                }
                if (checkr(i - c * dx) === false || checkr(j - c * dy) === false || tiles[i - c * dx][j - c * dy].taken !== tiles[i][j].taken) {
                    space2 = 100
                }
                min[2] = space2
                console.log("space2", space2)
            }
            break
        }
        win++
    }
    if (max.length !== 0 && min.length !== 0) {
        if (space1 > space2) {
            return [win, min, max]
        } else {
            return [win, max, min]
        }
    } else if (max.length !== 0) {
        return [win, max]
    } else if (min.length !== 0) {
        return [win, min]
    } else {
        return [win]
    }
}

function log() {
    if (black.checked === true) {
        let score = document.createElement("p")
        score.textContent = "WHITE"
        scorelog.appendChild(score)
    } else {
        let score = document.createElement("p")
        score.textContent = "BLACK"
        scorelog.appendChild(score)
    }
}

function pop(i) {
    popup.showModal()
    popupShown = true
    popuptext.textContent = i.toUpperCase() + " WINS!!!"
}

numinrow.oninput = ()=>{
    if (numinrow.value === '') {} else if (numinrow.value < 1) {
        numinrow.value = 1
    } else if (numinrow.value > 18) {
        numinrow.value = 18
    }
}

function place(i, j, gcell) {
    console.log('place1', i, j)
    if (white.checked === true && tiles[i][j].taken === undefined) {
        black.checked = true
        let wpiece = document.createElement("img")
        wpiece.setAttribute("id", "wpiece")
        wpiece.setAttribute("src", "res/white.jpeg")
        wpiece.setAttribute("width", "20px")
        wpiece.setAttribute("height", "20px")
        gcell.appendChild(wpiece)
        tiles[i][j].taken = "white"
        tiles[i][j].img = wpiece
        check(i, j)
        console.log('place2', i, j)
    } else if (black.checked === true && tiles[i][j].taken === undefined) {
        white.checked = true
        let bpiece = document.createElement("img")
        bpiece.setAttribute("id", "bpiece")
        bpiece.setAttribute("src", "res/black.png")
        bpiece.setAttribute("width", "20px")
        bpiece.setAttribute("height", "20px")
        gcell.appendChild(bpiece)
        tiles[i][j].taken = "black"
        tiles[i][j].img = bpiece
        check(i, j)
        console.log('place3', i, j)
    }
    console.log('place4', i, j)

}
select.onchange = (ev)=>{
    if (select.selectedIndex === 1) {
        tselect.hidden = false
    } else {
        tselect.hidden = true
    }
    restart()
}
tselect.onchange = (ev)=>{
    if (tselect.selectedIndex === 1) {
        count++
        let a = Math.round(Math.random() * 6) + 6
        let b = Math.round(Math.random() * 6) + 6
        //computer start first
        place(a, b, tiles[a][b].cell)
        compuPlayer.take(a, b)
    }
    restart()
}

/* --- computer's logic ---
*/

class Cell {
    constructor(r, c, w) {
        this.row = r
        this.col = c
        this.weight = w
        //num in row, weight used to sort end points
        this.peers = []
        //other ends of row/col/diag lines
        //only incr/decr weight once
        this.incred = false
        this.decred = false
    }
    //increase weight when this cell is shared endpoint of two lines
    incrWeight() {
        if (!this.incred) {
            this.weight += 0.1
            this.incred = true
        }
    }
    //decrease weight when other end taken by opponent
    decrWeight() {
        if (!this.decred) {
            this.weight -= 0.1
            this.decred = true
        }
    }

}

//distance between 2 cells
function distance(e0, e1) {
    let d = e0.row - e1.row
    if (d === 0) {
        d = e0.col - e1.col
    }
    if (d < 0) {
        d = -d
    }
    return d
}

//direction from one cell to another
function direction(e0, e1) {
    let rd = e0.row - e1.row
    let cd = e0.col - e1.col
    let dd = distance(e0, e1)
    if (dd === 0) {
        return undefined
    }
    return [rd / dd, cd / dd]
}

class ComputerPlayer {
    constructor(tiles) {
        //game board
        this.tiles = tiles
        //candidate cells for computer to pick for next step
        //keep sorted based on weight (row-length)
        this.candidates = []
    }
    //return top candidate cell for computer next step
    topCandidate() {
        if (this.candidates.length === 0) {
            return undefined
        }
        return this.candidates[0]
    }
    getCandidate(r, c) {
        let i = this.findCandidate(r, c)
        if (i === -1) {
            return undefined
        }
        return this.candidates[i]
    }
    //sort candidate cells according to their weights from max->min
    sortCandidates() {
        this.candidates.sort((p0,p1)=>p1.weight - p0.weight)
        console.log(this.candidates)
    }
    //if [r,c] is a candidate cell, return its index, otherwsie return -1
    findCandidate(r, c) {
        return this.candidates.findIndex(p=>p.row === r && p.col === c)
    }
    //game reset, delete call candidates
    reset() {
        this.candidates = []
    }
    //human take [r,c], update candidates
    //ie. update [r,c] cell's neighbor cells weight, resort candidates
    humanTake(r, c) {
        console.log("human take: ", r, c)
        //update neighbor cells' weight
        for (let dr = -1; dr < 2; dr++) {
            for (let dc = -1; dc < 2; dc++) {
                let rr = r + dr
                  , cc = c + dc
                if (!checkr(rr) || !checkr(cc) || (rr === r && cc === c) || this.tiles[rr][cc].taken !== undefined) {
                    continue
                }
                let pi = this.findCandidate(rr, cc)
                if (pi === -1) {
                    continue
                }
                this.candidates[pi].decrWeight();
            }
        }
        //if human take a candidate,remove it from candidates, update other ends of row
        let idx = this.findCandidate(r, c)
        if (idx !== -1) {
            let c = this.candidates[idx]
            for (let p of c.peers) {
                p.decrWeight()
                let ii = p.peers.indexOf(c)
                if (ii > 0) {
                    p.peers.splice(ii, 1)
                }
            }
            this.candidates.splice(idx, 1)
        }
        this.sortCandidates()
    }

    //computer take [r,c] cell, update candidates
    take(r, c) {
        console.log("computer take", r, c)
        let idx = this.findCandidate(r, c)
        if (idx === -1) {
            //non candidates cell taken, isolated,
            //add all its neighbor cells to candidates
            this.addNeighborCellsToCandidates(r, c)
        } else {
            //candidates cell taken, increase lines & its peers's weight
            this.updateCandidate(idx)
            //then add its remaining neighbor cells to candidates
            this.addNeighborCellsToCandidates(r, c)
            //remove 
            this.candidates.splice(idx, 1)
        }
        this.sortCandidates()
    }
    //increase lines, and add its peers's weight
    updateCandidate(idx) {
        let p = this.candidates[idx]
        for (let pp of p.peers) {
            pp.weight += 1
            //add one to length
            //remove p from pp.peers
            let idx = pp.peers.indexOf(p)
            if (idx > 0) {
                pp.peers.splice(idx, 1)
            }
            //add new candidate along line direction
            let dir = direction(p, pp)
            let r = p.row + dir[0]
              , c = p.col + dir[1]
            if (!checkr(r) || !checkr(c) || this.tiles[r][c].taken !== undefined) {
                continue
            }
            let pi = this.findCandidate(r, c)
            if (pi === -1) {
                let newp = new Cell(r,c,pp.weight)
                newp.peers.push(pp)
                pp.peers.push(newp)
                this.candidates.push(newp)
            } else {
                let pw = this.candidates[pi]
                if (pw.weight < pp.weight) {
                    pw.weight = pp.weight
                }
                pw.incrWeight()
                pw.peers.push(pp)
                pp.peers.push(pw)
            }
        }
    }
    //add all [r,c] neighbor cells to candidates
    addNeighborCellsToCandidates(r, c) {
        for (let dr = -1; dr < 2; dr++) {
            for (let dc = -1; dc < 2; dc++) {
                let rr = r + dr
                  , cc = c + dc
                if (!checkr(rr) || !checkr(cc) || (rr === r && cc === c) || this.tiles[rr][cc].taken !== undefined) {
                    continue
                }
                let pi = this.findCandidate(rr, cc)
                if (pi === -1) {
                    let pp = new Cell(rr,cc,1)
                    this.candidates.push(pp)
                    //check opposite cell
                    let ro = r - dr
                      , co = c - dc
                    if (checkr(ro) && checkr(co)) {
                        if (this.tiles[ro][co].taken === undefined) {
                            let poi = this.findCandidate(ro, co)
                            if (poi === -1) {
                                let po = new Cell(ro,co,1)
                                pp.peers.push(po)
                                po.peers.push(pp)
                                this.candidates.push(po)
                            } else {
                                //opposite cell already candidates
                                let po = this.candidates[poi]
                                pp.peers.push(po)
                                po.peers.push(pp)
                                po.incrWeight()
                                //increase po's weight
                            }
                        } else if (this.tiles[ro][co].taken !== this.tiles[r][c].taken) {
                            pp.decrWeight();
                        }
                    }
                }
            }
        }
    }
}

//computer player
let compuPlayer = new ComputerPlayer(tiles)
