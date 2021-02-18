import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormDialogComponent } from '../dialogs/form-dialog/form-dialog.component';
import { DestinosDialogComponent } from '../dialogs/destinos-dialog/destinos-dialog.component';
//import { DestinosDialogComponent } from '../dialogs/destinos-dialog/destinos-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

//openDialogLogin

openDialogLogin(): void {
  const dialogRef = this.dialog.open(FormDialogComponent);
}

//openDialogAddDestino
openDialogAddDestino(): void {
  const dialogRef = this.dialog.open(DestinosDialogComponent);
}

//openDialogResult
openDialogResult(): void {
  const dialogRef = this.dialog.open(DestinosDialogComponent);
}


}
