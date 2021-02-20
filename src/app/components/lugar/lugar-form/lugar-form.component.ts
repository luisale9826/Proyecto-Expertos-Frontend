import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LugarModel } from 'src/app/models/lugar-model';
import { LugaresService } from 'src/app/services/lugares.service';

@Component({
  selector: 'app-lugar-form',
  templateUrl: './lugar-form.component.html',
  styleUrls: ['./lugar-form.component.css'],
})
export class LugarFormComponent implements OnInit {
  public form;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<LugarFormComponent>,
    private ls: LugaresService
  ) {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: [],
      categoria: ['', Validators.required],
      latitud: ['', Validators.required],
      longitud: ['', Validators.required],
      url_imagen: ['', Validators.required],
      url_video: [''],
    });
  }

  ngOnInit(): void {}

  submit(): void {
    if (this.form.valid) {
      const lugar = new LugarModel(
        this.form.get('nombre')?.value,
        this.form.get('descripcion')?.value,
        this.form.get('categoria')?.value,
        this.form.get('latitud')?.value,
        this.form.get('longitud')?.value,
        this.form.get('url_imagen')?.value,
        this.form.get('url_video')?.value
      );
      this.ls.agregarLugar(lugar).subscribe(
        (data) => {
          this.dialogRef.close();
        },
        (errors) => {
          this.dialogRef.close();
        }
      );
    }
  }
}
