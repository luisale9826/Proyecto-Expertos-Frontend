import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import * as mapboxgl from 'mapbox-gl';
import { OpinionModel } from 'src/app/models/opinion-model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.css'],
})
export class FormDialogComponent implements OnInit {
  public form: FormGroup;
  public consulta: string;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<FormDialogComponent>
  ) {
    this.form = this.formBuilder.group({
      mejor_mes: ['', Validators.required],
      alojamiento: ['', Validators.required],
      clima: ['', Validators.required],
      precio: ['', Validators.required],
      conexion_internet: ['', Validators.required],
      accesibilidad: ['', Validators.required],
      comida: ['', Validators.required],
      id_lugar: [''],
      latitud: [''],
      longitud: [''],
    });
    this.consulta = 'Euclides';
  }

  meses = [
    { value: 1, name: 'Enero' },
    { value: 2, name: 'Febrero' },
    { value: 3, name: 'Marzo' },
    { value: 4, name: 'Abril' },
    { value: 5, name: 'Mayo' },
    { value: 6, name: 'Junio' },
    { value: 7, name: 'Julio' },
    { value: 8, name: 'Agosto' },
    { value: 9, name: 'Septiembre' },
    { value: 10, name: 'Octubre' },
    { value: 11, name: 'Noviembre' },
    { value: 12, name: 'Diciembre' },
  ];

  alojamiento = [
    { value: 0, option: 'No incluido' },
    { value: 1, option: 'Incluido' },
  ];

  tresOpcionesSel = [
    { value: 3, option: 'Buena' },
    { value: 2, option: 'Media' },
    { value: 1, option: 'Mala' },
  ];

  precio = [
    { value: 5, option: 'Alto' },
    { value: 4, option: 'Medio Alto' },
    { value: 3, option: 'Intermedio' },
    { value: 2, option: 'Bajo' },
    { value: 1, option: 'Barato' },
  ];

  clima = [
    { value: 3, option: 'Caliente' },
    { value: 2, option: 'Intermedio' },
    { value: 1, option: 'Frío' },
  ];

  ngOnInit(): void {}

  cambiarConsulta(): void {
    if (this.consulta === 'Euclides') {
      this.consulta = 'Bayes';
      this.form.controls.mejor_mes.setValidators(null);
      this.form.controls.alojamiento.setValidators(null);
      this.form.controls.accesibilidad.setValidators(null);
      this.form.controls.precio.setValidators(null);
      this.form.controls.clima.setValidators(null);
      this.form.controls.comida.setValidators(null);
      this.form.controls.conexion_internet.setValidators(null);

      this.form.controls.mejor_mes.updateValueAndValidity();

      this.form.controls.alojamiento.updateValueAndValidity();

      this.form.controls.accesibilidad.updateValueAndValidity();

      this.form.controls.precio.updateValueAndValidity();

      this.form.controls.clima.updateValueAndValidity();

      this.form.controls.comida.updateValueAndValidity();

      this.form.controls.conexion_internet.updateValueAndValidity();

      this.form.controls.id_lugar.setValidators([Validators.required]);
      this.form.controls.id_lugar.updateValueAndValidity();

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const map = new mapboxgl.Map({
            accessToken: environment.mapbox.accessToken,
            container: 'map', // Specify the container ID
            style: 'mapbox://styles/mapbox/streets-v11', // Specify which map style to use
            center: [lon, lat], // Specify the starting position
            zoom: 11.5, // Specify the starting zoom
          });

          const marker = new mapboxgl.Marker({
            color: '#314ccd',
          });

          // Create a LngLat object to use in the marker initialization
          // https://docs.mapbox.com/mapbox-gl-js/api/#lnglat
          const lngLat = {
            lon,
            lat,
          };
          marker.setLngLat(lngLat).addTo(map);
          this.form.get('latitud')?.setValue(lat);
          this.form.get('longitud')?.setValue(lon);
        });
      }
    } else {
      this.consulta = 'Euclides';
      this.form.controls.mejor_mes.setValidators([Validators.required]);
      this.form.controls.mejor_mes.updateValueAndValidity();

      this.form.controls.alojamiento.setValidators([Validators.required]);
      this.form.controls.alojamiento.updateValueAndValidity();

      this.form.controls.accesibilidad.setValidators([Validators.required]);
      this.form.controls.accesibilidad.updateValueAndValidity();

      this.form.controls.precio.setValidators([Validators.required]);
      this.form.controls.precio.updateValueAndValidity();

      this.form.controls.clima.setValidators([Validators.required]);
      this.form.controls.clima.updateValueAndValidity();

      this.form.controls.comida.setValidators([Validators.required]);
      this.form.controls.comida.updateValueAndValidity();

      this.form.controls.conexion_internet.setValidators([Validators.required]);
      this.form.controls.conexion_internet.updateValueAndValidity();

      this.form.controls.id_lugar.setValidators(null);
      this.form.controls.id_lugar.updateValueAndValidity();
    }
  }

  calcular(): void {
    if (this.form.valid) {
      const opinion = new OpinionModel(
        this.form.get('mejor_mes')?.value,
        this.form.get('alojamiento')?.value,
        this.form.get('accesibilidad')?.value,
        this.form.get('precio')?.value,
        this.form.get('clima')?.value,
        this.form.get('comida')?.value,
        this.form.get('conexion_internet')?.value,
      );
      opinion.id_lugar = this.form.get('id_lugar')?.value;
      opinion.latitud = this.form.get('latitud')?.value;
      opinion.longitud = this.form.get('longitud')?.value;
      this.dialogRef.close({ consulta: this.consulta, opinion });
    }
  }
}
