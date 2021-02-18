import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LugarModel } from 'src/app/models/lugar-model';
import { LugaresService } from 'src/app/services/lugares.service';
import { FormDialogComponent } from '../dialogs/form-dialog/form-dialog.component';
import { ResultadosComponent } from '../dialogs/resultados/resultados.component';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css'],
})
export class CarrouselComponent implements OnInit {
  constructor(private dialog: MatDialog, private ls: LugaresService) {}

  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(FormDialogComponent);
    dialogRef.afterClosed().subscribe(
      (data) => {
        this.ls.getEuclides(data).subscribe(
          (res: LugarModel) => {
            this.dialog.open(ResultadosComponent, {
              width: '350px',
              data: { lugar: res },
            });
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {}
    );
  }
}
