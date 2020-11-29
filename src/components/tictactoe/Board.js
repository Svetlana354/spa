import React, {Component, useState} from "react";
import Square from "./Square";

function Board() {
    const [squares, setSquares] = useState({Array: 9, fill: null});
    const [xIsNext, setXIsNext] = useState(true);

    // обработчик нажатия на кнопку
    function handleClick(i) {
        const squaresCopy = setSquares.slice(); // создаем копию массива из состояния squares

        // отмена повторного нажатия на элемент при ничей и победе
        if (!squaresCopy[i] && !calculateWinner(squaresCopy)) {
            setXIsNext ? squaresCopy[i] = 'X' : squaresCopy[i] = '0';
        }

        let randomIndex;
        do {
            if (!squaresCopy.includes(null)) break;
            randomIndex = Math.floor(Math.random() * 9); // получаем случайное целое число от 0 до 8
        } while (squaresCopy[randomIndex] !== null);
        squaresCopy[randomIndex] = '0';

        setXIsNext(true) // меняем каждый ход значение на противоположное
        setSquares(squaresCopy)
    }

    // метод генерации square
    function renderSquare(i) {
        return <Square
            value={setSquares[i]}
            onClick={() => handleClick(i)}
        />
    }


    function render() {
        let winner = calculateWinner(setSquares);
        // let status = 'Сейчас ходит: ' + (this.state.xIsNext ? 'X' : '0');
        let status = null;
        if (winner && winner !== 'draw') {
            status = `Победил: ${winner}`;
        } else if (winner === 'draw') {
            status = 'НИЧЬЯ!'
        } else {
            status = `Сейчас ходит: ${setXIsNext ? 'X' : '0'}`;
        }

        return (
            <div>
                <div className={"status"}>
                    <h4>{status}</h4>
                </div>
                <div className={"board-row"}>
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}

                </div>
                <div className={"board-row"}>
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                </div>
                <div className={"board-row"}>
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                </div>
            </div>
        )
    }
}

function calculateWinner(squaresCalc) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const elLines of lines) {
        const [a, b, c] = elLines;
        console.log([a, b, c]);
        if (squaresCalc[a] && squaresCalc[a] === squaresCalc[b] && squaresCalc[a] === squaresCalc[c]) {
            return squaresCalc[a]; // возвращается крестик / нолик
        } else if (!squaresCalc.includes(null)) { // если нет в массиве null, значит ничья
            return 'draw';
        }
    }

    // const winner = lines.filter(([a, b, c]) => squaresCalc[a] && squaresCalc[a] === squaresCalc[b] && squaresCalc[a] === squaresCalc[c]);
    // console.log(winner);
    // if (winner.length !== 0) {
    //     return squaresCalc[winner[0][0]];
    // } else if (!squaresCalc.includes(null)) {
    //     return 'draw'
    // }

        // for (let i = 0; i < lines.length; i++) {
        //     const [a, b, c] = lines[i];
        //     if (squaresCalc[a] && squaresCalc[a] === squaresCalc[b] && squaresCalc[a] === squaresCalc[c]) {
        //         return squaresCalc[a];
        //     } else if (!squaresCalc.includes(null)) { // если нет в массиве null, значит ничья
        //         return 'draw';
        //     }
        // }
    return false;
}


export default Board;