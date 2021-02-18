import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LugarModel } from 'src/app/models/lugar-model';
import { LugaresService } from 'src/app/services/lugares.service';
import { ResultadosComponent } from '../resultados/resultados.component';

@Component({
  selector: 'app-destinos-dialog',
  templateUrl: './destinos-dialog.component.html',
  styleUrls: ['./destinos-dialog.component.css'],
})
export class DestinosDialogComponent implements OnInit {
  public lugares: LugarModel[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private ls: LugaresService) {
    this.lugares = [];
  }

  ngOnInit(): void {
    this.ls.getLugares().subscribe(
      (data) => {
        this.lugares = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  filterLugaresData(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
  }

  openLugar(lugar: LugarModel): void {
    const dialogRef = this.dialog.open(ResultadosComponent, {
      width: '350px',
      data: { titulo: lugar.nombre, lugar },
    });
  }
}
