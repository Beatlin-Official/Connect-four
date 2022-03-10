const allCells = document.querySelectorAll('.cell:not(.row-top)')
const topCells = document.querySelectorAll('.row-top')

const column0 = [allCells[35], allCells[28], allCells[21],
    allCells[14], allCells[7], allCells[0], topCells[0]
]
const column1 = [allCells[36], allCells[29], allCells[22],
    allCells[15], allCells[8], allCells[1], topCells[1]
]
const column2 = [allCells[37], allCells[30], allCells[23],
    allCells[16], allCells[9], allCells[2], topCells[2]
]
const column3 = [allCells[38], allCells[31], allCells[24],
    allCells[17], allCells[10], allCells[3], topCells[3]
]
const column4 = [allCells[39], allCells[32], allCells[25],
    allCells[18], allCells[11], allCells[4], topCells[4]
]
const column5 = [allCells[40], allCells[33], allCells[26],
    allCells[19], allCells[12], allCells[5], topCells[5]
]
const column6 = [allCells[41], allCells[34], allCells[27],
    allCells[20], allCells[13], allCells[6], topCells[6]
]
const columns = [column0, column1, column2, column3, column4, column5, column6]

const topRow = [topCells[0], topCells[1], topCells[2],
    topCells[3], topCells[4], topCells[5], topCells[6]
]
const rows0 = [allCells[0], allCells[1], allCells[2],
    allCells[3], allCells[4], allCells[5], allCells[6]
]
const rows1 = [allCells[7], allCells[8], allCells[9],
    allCells[10], allCells[11], allCells[12], allCells[13]
]
const rows2 = [allCells[14], allCells[15], allCells[16],
    allCells[17], allCells[18], allCells[19], allCells[20]
]
const rows3 = [allCells[21], allCells[22], allCells[23],
    allCells[24], allCells[25], allCells[26], allCells[27]
]
const rows4 = [allCells[28], allCells[29], allCells[30],
    allCells[31], allCells[32], allCells[33], allCells[34]
]
const rows5 = [allCells[35], allCells[36], allCells[37],
    allCells[38], allCells[39], allCells[40], allCells[41]
]
const rows = [rows0, rows1, rows2, rows3, rows4, rows5, topRow]

let gameIsLive = true
let yellowIsNext = true

// function
function getClassArray(cell) {
    const classList = cell.classList
    return [...classList]
}

function getCellLocation(cell) {
    const classArray = getClassArray(cell)
    const rowClass = classArray.find(className => className.includes('row'))
    const colClass = classArray.find(className => className.includes('col'))

    const xLocation = Number(rowClass[4])
    const yLocation = Number(colClass[4])

    return [xLocation, yLocation]
}

function getOpenCell(y) {
    const currentColumn = columns[y].slice(0, 6)
    for (const cell of currentColumn) {
        const classArray = getClassArray(cell)
        if (!classArray.includes('yellow') && !classArray.includes('red')) {
            return cell
        }
    }
    return null
}

function clearColorFromTop(y) {
    topCells[y].classList.remove('yellow')
    topCells[y].classList.remove('red')
}

function changeColorFromTop(y) {
    clearColorFromTop(y)
    topCells[y].classList.add(yellowIsNext ? 'yellow' : 'red')
}

function getColorOfCell(cell) {
    const classArray = getClassArray(cell)
    if (classArray.includes('yellow')) return 'yellow'
    if (classArray.includes('red')) return 'red'
    return null
}

function checkWinningCells(cells) {
    if (cells.length < 4) {
        return false
    } else {
        gameIsLive = false
        return true
    }
}

function checkStatusOfGame(cell) {
    const color = getColorOfCell(cell) //取得目前cell的顏色
    if (!color) return
    const [x, y] = getCellLocation(cell)

    //check x軸線
    let winningCells = [cell]
    let leftCheck = y - 1
    while (leftCheck >= 0) {
        const checkedCell = rows[x][leftCheck]
        if (getColorOfCell(checkedCell) === color) {
            winningCells.push(checkedCell)
            leftCheck--
        } else {
            break
        }
    }
    let rightCheck = y + 1
    while (rightCheck <= 6) {
        const checkedCell = rows[x][rightCheck]
        if (getColorOfCell(checkedCell) === color) {
            winningCells.push(checkedCell)
            rightCheck++
        } else {
            break
        }
    }
    let winningStatus = checkWinningCells(winningCells)
    if (winningStatus) return

    //check y軸線
    winningCells = [cell]
    let downCheck = x - 1
    while (downCheck >= 0) {
        const checkedCell = rows[downCheck][y]
        if (getColorOfCell(checkedCell) === color) {
            winningCells.push(checkedCell)
            downCheck--
        } else {
            break
        }
    }
    let upCheck = x + 1
    while (upCheck <= 5) {
        const checkedCell = rows[upCheck][y]
        if (getColorOfCell(checkedCell) === color) {
            winningCells.push(checkedCell)
            upCheck++
        } else {
            break
        }
    }
    winningStatus = checkWinningCells(winningCells)
    if (winningStatus) return

    //check 對角軸線
    winningCells = [cell]
    leftCheck = y - 1
    downCheck = x - 1
    while (downCheck >= 0 && leftCheck >= 0) {
        const checkedCell = rows[downCheck][leftCheck]
        if (getColorOfCell(checkedCell) === color) {
            winningCells.push(checkedCell)
            downCheck--
            leftCheck--
        } else {
            break
        }
    }
    upCheck = x + 1
    rightCheck = y + 1
    while (upCheck <= 5 && rightCheck <= 6) {
        const checkedCell = rows[upCheck][rightCheck]
        if (getColorOfCell(checkedCell) === color) {
            winningCells.push(checkedCell)
            upCheck++
            rightCheck++
        } else {
            break
        }
    }
    winningStatus = checkWinningCells(winningCells)
    if (winningStatus) return

    winningCells = [cell]
    leftCheck = y - 1
    upCheck = x + 1
    while (upCheck <= 5 && leftCheck >= 0) {
        const checkedCell = rows[upCheck][leftCheck]
        if (getColorOfCell(checkedCell) === color) {
            winningCells.push(checkedCell)
            leftCheck--
            upCheck++
        } else {
            break
        }
    }
    downCheck = x - 1
    rightCheck = y + 1
    while (downCheck >= 0 && rightCheck <= 6) {
        const checkedCell = rows[downCheck][rightCheck]
        if (getColorOfCell(checkedCell) === color) {
            winningCells.push(checkedCell)
            downCheck--
            rightCheck++
        } else {
            break
        }
    }
    winningStatus = checkWinningCells(winningCells)
    if (winningStatus) return

}

// event handlers
function handleCellMouseOver(cell) {
    if (!gameIsLive) return
    const [x, y] = getCellLocation(cell)
    const topCell = topCells[y]
    topCell.classList.add(yellowIsNext ? 'yellow' : 'red')
}

function handleCellMouseOut(cell) {
    const [x, y] = getCellLocation(cell)
    const topCell = topCells[y]
    clearColorFromTop(y)
}

function handleCellClicked(cell) {
    const [x, y] = getCellLocation(cell)
    const openCell = getOpenCell(y)

    if (!openCell) {
        return //如果此col沒有openCell，就跳出
    } else {
        openCell.classList.add(yellowIsNext ? 'yellow' : 'red')
        checkStatusOfGame(openCell)
    }
    if (gameIsLive) {
        yellowIsNext = !yellowIsNext
        changeColorFromTop(y)
    } else {
        alert(`${yellowIsNext ? 'yellow' : 'red'} player Won!`)
    }
}
// event listeners
for (const row of rows) {
    for (const cell of row) {
        cell.addEventListener('mouseover', (e) => {
            handleCellMouseOver(e.target)
        })
        cell.addEventListener('mouseout', (e) => {
            handleCellMouseOut(e.target)
        })
        cell.addEventListener('click', (e) => {
            if (!gameIsLive) return
            handleCellClicked(e.target)
        })
    }
}