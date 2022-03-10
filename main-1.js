let player = 1
let winner = 0
const colors = {}
colors[-1] = 'yellow'
colors[1] = 'red'
let count = 0
document.querySelectorAll('.cell').forEach(cell => {
    cell.setAttribute('id', count)
    cell.setAttribute('data-player', 0)
    count++
    cell.addEventListener('click', event => {
        console.log(document.getElementById('id'))
        if (isValid(cell)) {
            cell.classList.add(colors[player])
            cell.setAttribute('data-player', player)

            if (checkWin(player, cell)) {
                alert(colors[player] + ' has Won!!')
                winner = player
            }

            player *= -1 // change player
        }
    })
})

function isValid(cell) {
    const id = parseInt(cell.getAttribute('id'))
    const underId = id + 7
    while (cell.getAttribute('data-player') === '0') {
        if (id >= 35) {
            return true

        } else if (parseInt(cell.getAttribute('id', underId)) === underId &&
            cell.getAttribute('data-player') !== ' 0') {
            return true
        }
        return false
    }
}

function checkWin(player, cell) {
    //check rows
    let connectCell = 0
    for (let cellId = 0; cellId < 42; cellId += 7) {

        for (let row = 0; row < 7; row++) {
            let checkCellId = cellId + row

            if (cell.getAttribute('id', checkCellId) == checkCellId &&
                cell.getAttribute('data-player') == player) {
                connectCell++
            } else {
                connectCell = 0
            }

            if (connectCell >= 4) {
                return true
            }
        }
        connectCell = 0
    }

    //check columns
    connectCell = 0
    for (let col = 0; col < 7; col++) {

        for (let cellId = 0; cellId < 42; cellId += 7) {
            let checkCellId = cellId + col

            if (cell.getAttribute('id', checkCellId) == checkCellId &&
                cell.getAttribute('data-player') == player) {
                connectCell++
            } else {
                connectCell = 0
            }

            if (connectCell >= 4) {
                return true
            }
        }
        connectCell = 0
    }
    return false
}