import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DestinosDialogComponent } from '../dialogs/destinos-dialog/destinos-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openDestinos(): void {
    this.dialog.open(DestinosDialogComponent);
  }
}
