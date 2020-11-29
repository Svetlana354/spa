import React, {Component, useState} from "react";
import Board from "./Board";

function MainTicTacToe() {
        return (
            <div className={"game"}>
                <h1>Крестики-нолики</h1>
                <div className={"game-board"}>
                    <Board />
                </div>
                <div className={"game-info"}>

                </div>
            </div>
        )
}

export default MainTicTacToe;