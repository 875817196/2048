document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid')
    //两种方式查找元素const scoreDisplay = document.getElementById('score')
    const scoreDisplay = document.getElementById('score')
    const resultDisplay = document.getElementById('result')
    const width = 4
    let squares = []
    let score = 0
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
        // 渲染颜色
        for(let i=0;i<squares.length;i++){
            squares[i].className = "n"+squares[i].innerHTML
        }
        checkForGameOver()
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


                //filter接受一个回调函数，判断数组内的值是否满足函数条件，选取满足条件的返回值构成新数组
                let filterRow = row.filter(num=>num)

                //创建一个数组接受剩下的格子
                let missing = 4-filterRow.length
                //注意 Array 首字母A大写
                let zeros = Array(missing).fill(0)

                //使用concat方法将两个数组连接起来已实现数字靠右
                //注意要让zeros数组去调用filter数组
                let newRow = zeros.concat(filterRow)


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


                //filter接受一个回调函数，判断数组内的值是否满足函数条件，选取满足条件的返回值构成新数组
                let filterRow = row.filter(num=>num)

                //创建一个数组接受剩下的格子
                let missing = 4-filterRow.length
                //注意 Array 首字母A大写
                let zeros = Array(missing).fill(0)

                //使用concat方法将两个数组连接起来已实现数字靠右
                //注意要让zeros数组去调用filter数组
                let newRow = filterRow.concat(zeros)


                //把newRow的值改入innerHTML/注意这里newRow每次循环都被重新定义一次
                //所以[]内应该是0-3而非i++
                squares[i].innerHTML=newRow[0]
                squares[i+1].innerHTML=newRow[1]
                squares[i+2].innerHTML=newRow[2]
                squares[i+3].innerHTML=newRow[3]
            }
            
        }
    }

    function moveDown(){
        for(let i=0;i<4;i++){
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i+width].innerHTML
            let totalThree = squares[i+width*2].innerHTML
            let totalFour = squares[i+width*3].innerHTML
            let column = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]

            //
            let filterColumn = column.filter(num=>num)
            let missing = 4-filterColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = zeros.concat(filterColumn)

            squares[i].innerHTML = newColumn[0]
            squares[i+width].innerHTML = newColumn[1]
            squares[i+width*2].innerHTML = newColumn[2]
            squares[i+width*3].innerHTML = newColumn[3]
        }
    }
 
    function moveUp(){
        for(let i=0;i<4;i++){
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i+width].innerHTML
            let totalThree = squares[i+width*2].innerHTML
            let totalFour = squares[i+width*3].innerHTML
            let column = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)]

            //
            let filterColumn = column.filter(num=>num)
            let missing = 4-filterColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = filterColumn.concat(zeros)

            squares[i].innerHTML = newColumn[0]
            squares[i+width].innerHTML = newColumn[1]
            squares[i+width*2].innerHTML = newColumn[2]
            squares[i+width*3].innerHTML = newColumn[3]
        }
    }
    
    function combineRow(){
        for(let i=0;i<15;i++){
            if(squares[i].innerHTML===squares[i+1].innerHTML){
                let combinedTotal =parseInt(squares[i].innerHTML)+parseInt(squares[i+1].innerHTML)
                squares[i].innerHTML = combinedTotal
                squares[i+1].innerHTML = 0
                score += combinedTotal
                scoreDisplay.innerHTML = score
            }
        }
        checkForWin()
    }

    function combineColumn(){
        for(let i=0;i<12;i++){
            if(squares[i].innerHTML===squares[i+width].innerHTML){
                let combinedTotal =parseInt(squares[i].innerHTML)+parseInt(squares[i+width].innerHTML)
                squares[i].innerHTML = combinedTotal
                squares[i+width].innerHTML = 0
                score += combinedTotal
                scoreDisplay.innerHTML = score
            }
        }
        checkForWin()
    }

    function control(e){
        //参考图片keyCode.png
        if(e.keyCode===39){
            keyRight()
        }else if(e.keyCode===37){
            keyLeft()
        }else if(e.keyCode===38){
            keyUp()
        }else if(e.keyCode===40){
            keyDown()
        }
    }

    document.addEventListener("keyup",control)

    function keyRight(){
        moveRight()
        combineRow()
        moveRight()
        generate()  
    }
    function keyLeft(){
        moveLeft()
        combineRow()
        moveLeft()
        generate()
    }
    function keyDown(){
        moveDown()
        combineColumn()
        moveDown()
        generate()
    }
    function keyUp(){
        moveUp()
        combineColumn()
        moveUp()
        generate()
    }
    function checkForWin(){
        for(let i=0;i<squares.length;i++){
            if(squares[i].innerHTML == 2048){
                resultDisplay.innerHTML = 'You Win!'
                //移除监听事件确保键盘按键正常运行
                document.removeEventListener('keyup',control)
            }
        }
    }
    function checkForGameOver(){
        let zeros =0
        let possibleRow = 0
        let possibleColumn = 0
        for(let i=0;i<squares.length;i++){
            if(squares[i].innerHTML==0){zeros++}         
        }   
        for(let j=0;(j<squares.length-1)&&(j!=3,7,11,15);j++){
            if((squares[j].innerHTML)==(squares[j+1].innerHTML)){possibleRow++}  
        }
        for(let k=0;(k<squares.length-width);k++){
            if((squares[k].innerHTML)==(squares[k+width].innerHTML)){possibleColumn++}  
        }
        

       
        if(zeros===0&&possibleRow===0&&possibleColumn===0){
            resultDisplay.innerHTML = 'You Lose'
            document.removeEventListener('keyup',control)
        }
    }
})
