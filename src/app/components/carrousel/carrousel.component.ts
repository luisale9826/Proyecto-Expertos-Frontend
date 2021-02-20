import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LugarModel } from 'src/app/models/lugar-model';
import { LugaresService } from 'src/app/services/lugares.service';
import { FormDialogComponent } from '../dialogs/form-dialog/form-dialog.component';
import { ResultadosBayesComponent } from '../dialogs/resultados-bayes/resultados-bayes.component';
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
        if (data) {
          const {consulta, opinion} = data;
          if (consulta === 'Euclides') {
            this.ls.getEuclides(opinion).subscribe(
              (res: LugarModel) => {
                this.dialog.open(ResultadosComponent, {
                  width: '350px',
                  data: { titulo: 'Te recomendamos ir a', lugar: res },
                });
              },
              (error) => {
                console.log(error);
              }
            );
          } else {
            this.ls.getBayes(opinion).subscribe(
              (res: LugarModel[]) => {
                this.dialog.open(ResultadosBayesComponent, {
                  width: '350px',
                  data: { titulo: 'Te recomendamos ir a', lugares: res },
                });
              },
              (error) => {
                console.log(error);
              }
            );
          }
        }
      },
      (error) => {}
    );
  }
}
