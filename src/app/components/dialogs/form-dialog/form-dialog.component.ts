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
    });
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

  ngOnInit(): void {
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
      });
    }
  }

  calcular(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
