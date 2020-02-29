import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogBoardComponent } from './dialog-board/dialog-board.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  squares = [
    {id: 1, value: '', isDisabled: false},
    {id: 2, value: '', isDisabled: false},
    {id: 3, value: '', isDisabled: false},
    {id: 4, value: '', isDisabled: false},
    {id: 5, value: '', isDisabled: false},
    {id: 6, value: '', isDisabled: false},
    {id: 7, value: '', isDisabled: false},
    {id: 8, value: '', isDisabled: false},
    {id: 9, value: '', isDisabled: false}
  ];

  squaresCopy = [];
  xValues = [];
  oValues = [];
  winner: boolean;

  winnerArray = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7],
    [7,8,9],
  ]

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.winner = false;
    this.squaresCopy = this.squares;
  }

  newGame() {
    this.winner = false;
    this.squares.forEach(s => {
      s.value = ''
      s.isDisabled = false;
    });
    this.squaresCopy = this.squares;
    this.xValues = [];
    this.oValues = [];
    console.log(this.winner);
  }

  onRowClicked(val) {
    console.log('Is it?', val.isDisabled);
    this.xPlayerMove(val);
    if(this.xValues.length > 0 && !this.winner ){
      this.oPlayerMove();
    }
  }

  xPlayerMove(val) {
    let square = this.squares.find(s => s.id == val.id);
    square.value = 'X';
    square.isDisabled = true;
    this.squaresCopy = this.squaresCopy.filter(s => s !== square);
    this.xValues.push(square.id);
    console.log('a ',this.winner);
    this.checkForWinner(this.xValues, 'X player');
  }

  oPlayerMove() {
    let randomNum = this.squaresCopy[Math.floor(Math.random() * this.squaresCopy.length)];
    let o = this.squares.find(s => s.id == randomNum.id);
    o.value = 'O';
    o.isDisabled = true;
    this.squaresCopy = this.squaresCopy.filter(s => s !== o);
    this.oValues.push(o.id);
    this.checkForWinner(this.oValues, 'O player');
  }

  checkForWinner(playerValues, player) {
    console.log(`${player}: ${playerValues}`);
    this.winnerArray.forEach(e => {
      if(e.every(x => playerValues.includes(x))){
        let filteredWinnerIds =  e.filter(x => playerValues.includes(x));
        console.log('filteredWinnerArray: ', filteredWinnerIds);
        this.winner = true;
        this.gameOver(player, filteredWinnerIds);
      }
    });
  }

  gameOver(player, filteredWinnerIds) {
    console.log(`${player } WINS!`);
    const dialogRef = this.dialog.open(DialogBoardComponent, {
      width: '250px',
      data: {player: player, winCombo: filteredWinnerIds}
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(res => {
      this.newGame();
    })
  }

}
