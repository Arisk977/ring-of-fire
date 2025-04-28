import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-add-player',
  imports: [CommonModule, FormsModule, MatDialogModule, MatFormField, MatInputModule, MatButtonModule
  ],
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss'
})

export class DialogAddPlayerComponent {
name:string = '';

constructor(public dialogRef: MatDialogRef<DialogAddPlayerComponent>){

}
onNoClick(){
  this.dialogRef.close();
}
}
