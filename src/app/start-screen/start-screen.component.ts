import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../../models/game';
import { Firestore, collection, addDoc} from '@angular/fire/firestore';

@Component({
  selector: 'app-start-screen',
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {
firestore: Firestore = inject(Firestore);

constructor(private router: Router){

}
  async newGame(){
    let game = new Game();
    const gamesCollection = collection(this.firestore, 'games');
    await addDoc(gamesCollection, game.toJson()).then((gameInfo:any)=>{
          this.router.navigateByUrl('/game/' + gameInfo.id);
    });
  }
}
