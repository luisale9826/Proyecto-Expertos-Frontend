import { Component, OnInit } from '@angular/core';
import { LugaresService } from 'src/app/services/lugares.service';

@Component({
  selector: 'app-destinos-dialog',
  templateUrl: './destinos-dialog.component.html',
  styleUrls: ['./destinos-dialog.component.css'],
})
export class DestinosDialogComponent implements OnInit {

  

  constructor(private ls: LugaresService) {}

  ngOnInit(): void {
    this.ls.getLugares().subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
