import { CommonModule} from '@angular/common';
import { Component, OnInit, inject} from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { GameInfoComponent } from '../game-info/game-info.component';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, MatDialogModule,
     MatFormFieldModule, FormsModule, GameInfoComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})

export class GameComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  pickCardAnimation = false;
  currentCard: string | undefined= '';
  game!: Game;
  items$: Observable<any[]>;

  constructor(public dialog: MatDialog){
    const FIREBASE_COLLECTION = collection(this.firestore, 'games')
    this.items$ = collectionData(FIREBASE_COLLECTION);

  }

  ngOnInit(): void {
    this.newGame();
    this.addGameToFirestore(); 
    this.items$.subscribe((games) => {
      console.log('Game Update', games);})

  }

  async addGameToFirestore() {
    const gamesCollection = collection(this.firestore, 'games');
    await addDoc(gamesCollection, this.game.toJson());
  }  

  takeCard() {
    if(!this.pickCardAnimation){
      
    this.currentCard = this.game.stack.pop();
    this.pickCardAnimation = true;    
    
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

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

   
    dialogRef.afterClosed().subscribe((result:string) => {
      if(result && result.length > 0){
      this.game.players.push(result);}
    });
  }

}
