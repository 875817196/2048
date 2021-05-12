//代码实现随机生成两ge2以及实现靠左靠右

document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid')
    //两种方式查找元素const scoreDisplay = document.getElementById('score')
    const scoreDisplay = document.getElementById('score')
    const resultDisplay = document.getElementById('result')
    const width = 4
    let squares = []
    //create a playing board by a function
    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            square = document.createElement('div')
            square.innerHTML = 0
            gridDisplay.appendChild(square)
            squares.push(square)
        }
        generate()
        generate()
    }
    createBoard()


    // generate a number randomly
    function generate() {
        let randomNumber = Math.floor(Math.random() * squares.length)
        if (squares[randomNumber].innerHTML == 0) {
            squares[randomNumber].innerHTML = 2
        } else {
            generate()
        }
    }

    function moveRight() {
        for (let i = 0; i < width * width; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i+1].innerHTML
                let totalThree = squares[i+2].innerHTML
                let totalFour = squares[i+3].innerHTML
                //innerHTML返回值为字符串，所以用parseInt将其转换
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
                // let row = [totalOne, totalTwo, totalThree, totalFour]

                console.log(row)
                //filter接受一个回调函数，判断数组内的值是否满足函数条件，选取满足条件的返回值构成新数组
                let filterRow = row.filter(num=>num)
                console.log(filterRow)
                //创建一个数组接受剩下的格子
                let missing = 4-filterRow.length
                //注意 Array 首字母A大写
                let zeros = Array(missing).fill(0)
                console.log(zeros)
                //使用concat方法将两个数组连接起来已实现数字靠右
                //注意要让zeros数组去调用filter数组
                let newRow = zeros.concat(filterRow)
                console.log(newRow)

                //把newRow的值改入innerHTML/注意这里newRow每次循环都被重新定义一次
                //所以[]内应该是0-3而非i++
                squares[i].innerHTML=newRow[0]
                squares[i+1].innerHTML=newRow[1]
                squares[i+2].innerHTML=newRow[2]
                squares[i+3].innerHTML=newRow[3]
            }
            
        }
    }


    function moveLeft() {
        for (let i = 0; i < width * width; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i+1].innerHTML
                let totalThree = squares[i+2].innerHTML
                let totalFour = squares[i+3].innerHTML
                //innerHTML返回值为字符串，所以用parseInt将其转换
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
                // let row = [totalOne, totalTwo, totalThree, totalFour]

                console.log(row)
                //filter接受一个回调函数，判断数组内的值是否满足函数条件，选取满足条件的返回值构成新数组
                let filterRow = row.filter(num=>num)
                console.log(filterRow)
                //创建一个数组接受剩下的格子
                let missing = 4-filterRow.length
                //注意 Array 首字母A大写
                let zeros = Array(missing).fill(0)
                console.log(zeros)
                //使用concat方法将两个数组连接起来已实现数字靠右
                //注意要让zeros数组去调用filter数组
                let newRow = filterRow.concat(zeros)
                console.log(newRow)

                //把newRow的值改入innerHTML/注意这里newRow每次循环都被重新定义一次
                //所以[]内应该是0-3而非i++
                squares[i].innerHTML=newRow[0]
                squares[i+1].innerHTML=newRow[1]
                squares[i+2].innerHTML=newRow[2]
                squares[i+3].innerHTML=newRow[3]
            }
            
        }
    }
    moveLeft()
})

//下一步将会删除所有console.log和方法调用