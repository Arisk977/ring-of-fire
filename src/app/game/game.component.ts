import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, MatDialogModule,
     MatFormFieldModule, FormsModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string | undefined= '';
  game!: Game;

  constructor(public dialog: MatDialog){

  }

  ngOnInit(): void {
    this.newGame();
  }
  takeCard() {
    if(!this.pickCardAnimation){
      
    this.currentCard = this.game.stack.pop();
    this.pickCardAnimation = true;

    console.log('game is: ', this.game);
    console.log('new card: ' + this.currentCard);
    
    

    setTimeout(() => {    
      if(this.currentCard){this.game.playedCards.push(this.currentCard);}
      this.pickCardAnimation = false;
    }, 1000);}
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

}
