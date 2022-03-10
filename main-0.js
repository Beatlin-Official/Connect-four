// model
const number = Array.from(Array(49).keys())
let cellCol = []
let cellRow = []
let yellowPlayer = true

//function
function displayCells(indexes) {
    const playboard = document.querySelector('.playboard')
    playboard.innerHTML = indexes.map(index =>
        getCellElement(index)).join('')
}

function getCellElement(index) {
    if (index < 7) {
        return `
            <div data-index="${index}" class="cell prepare">
            </div>
            `
    } else {
        return `
            <div data-index="${index}" class="cell">
            </div>
            `
    }
}

function removeCellClass(cell) {
    const colPosition = Number(cell.dataset.index % 7)

    document.querySelectorAll('.prepare').forEach(prepare => {
        const preparePosition = Number(prepare.dataset.index)

        if (preparePosition === colPosition) {
            prepare.classList.remove('yellow')
            prepare.classList.remove('red')
        }
    })
}

function addCellClass(cell) {
    const colPosition = Number(cell.dataset.index % 7)

    document.querySelectorAll('.prepare').forEach(prepare => {
        const preparePosition = Number(prepare.dataset.index)

        if (preparePosition === colPosition) {
            prepare.classList.add(yellowPlayer ? 'yellow' : 'red')
        }
    })
}

function checkColor(cell) {
    const color = [...cell.classList][1] //取出顏色之值
    switch (color) {
        case 'yellow':
            return 'yellow'
        case 'red':
            return 'red'
        default:
            return null
    }
}

function currentCellPosition(cell) {
    const cells = document.querySelectorAll('.cell')
    const currentCell = cell.dataset.index

    cells.forEach(cell => {
        if (cell.dataset.index % 7 === currentCell % 7) {
            cellCol.unshift(cell)
        }
    })
    cellCol.pop()

    for (const cell of cellCol) {
        if (!cell.classList.contains('yellow') && !cell.classList.contains('red')) {
            return cell
        }
    }
    return null //如果col全都有cell的話，回傳null
}

function checkVerticalCells(cellCol, cellPosition) {
    let yellowWinningCol = []
    let redWinningCol = []
    let colIndex = 0
    const currentColor = checkColor(cellPosition)

    if (!currentColor) return

    while (colIndex <= 5) {
        if (checkColor(cellCol[colIndex]) === 'yellow') {
            yellowWinningCol.push(cellPosition)
        } else if (checkColor(cellCol[colIndex]) === 'red') {
            redWinningCol.push(cellPosition)
        } else {
            break
        }
        colIndex++
    }
    console.log(yellowWinningCol, redWinningCol)
}

displayCells(number)

//Event Handlers
function handleCellMouseOver(cell) {
    addCellClass(cell)
}

function handleCellMouseOut(cell) {
    removeCellClass(cell)
}

function handleCellClicked(cell) {
    const cellPosition = currentCellPosition(cell)

    //如果回傳null的話，直接跳出不執行
    if (!cellPosition) {
        cellCol = []
        return
    }

    cellPosition.classList.add(yellowPlayer ? 'yellow' : 'red')
    checkVerticalCells(cellCol, cellPosition)

    cellCol = []
    yellowPlayer = !yellowPlayer

    removeCellClass(cell)
    addCellClass(cell)
}

//Event Listeners

document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('mouseover', event => {
        handleCellMouseOver(cell)
    })
    cell.addEventListener('mouseout', event => {
        handleCellMouseOut(cell)
    })
    cell.addEventListener('click', event => {
        handleCellClicked(cell)
    })
})