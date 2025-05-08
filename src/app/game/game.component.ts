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
import { Firestore, collection, collectionData, addDoc, doc, docData, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, MatDialogModule,
     MatFormFieldModule, FormsModule, GameInfoComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})

export class GameComponent implements OnInit {
  firestore: Firestore= inject(Firestore);;
  game!: Game;
  items$: Observable<any[]>;
  gameId!: string;
  gameDoc: any;

  constructor(private route: ActivatedRoute, public dialog: MatDialog){
    const FIREBASE_COLLECTION = collection(this.firestore, 'games')
    this.items$ = collectionData(FIREBASE_COLLECTION);
  }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
      this.gameDoc = doc(this.firestore, `games/${this.gameId}`);
      docData(this.gameDoc).subscribe((gameData: any) => {
        this.game.players = gameData.players ?? [];
        this.game.stack = gameData.stack ?? [];
        this.game.playedCards = gameData.playedCards ?? [];
        this.game.currentPlayer = gameData.currentPlayer ?? 0;
        this.game.pickCardAnimation = gameData.pickCardAnimation ?? false;
        this.game.currentCard = gameData.currentCard ?? '';
      });
    });
  }
  
  

  async addGameToFirestore() {
    const gamesCollection = collection(this.firestore, 'games');
    await addDoc(gamesCollection, this.game.toJson());
  }  

  async takeCard() {
    if(!this.game.pickCardAnimation){
      
    this.game.currentCard = this.game.stack.pop();
    this.game.pickCardAnimation = true;    
    await this.saveGame();

    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

    console.log(this.game.playedCards);
    
    setTimeout(async () => {    
      if (this.game.currentCard)
        {
      this.game.playedCards.push(this.game.currentCard);
      await this.saveGame();
    }
    this.game.pickCardAnimation = false;
      
    }, 1000);}
  }

  newGame() {
    this.game = new Game();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

   
    dialogRef.afterClosed().subscribe(async (result: string) => {
      if (result && result.length > 0) {
        this.game.players.push(result);
        await this.saveGame();
      }
    });
    
  }

  async saveGame() {
    if (this.gameDoc) {
      await updateDoc(this.gameDoc, this.game.toJson());
    }
  }
  
}
