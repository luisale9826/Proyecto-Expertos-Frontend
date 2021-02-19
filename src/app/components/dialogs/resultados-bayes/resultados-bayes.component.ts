import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as mapboxgl from 'mapbox-gl';
import { LugarModel } from 'src/app/models/lugar-model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-resultados-bayes',
  templateUrl: './resultados-bayes.component.html',
  styleUrls: ['./resultados-bayes.component.css'],
})
export class ResultadosBayesComponent implements OnInit, AfterViewInit {
  lugares: LugarModel[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.lugares = data.lugares;
  }
  ngAfterViewInit(): void {
    this.lugares.forEach((lugar) => {
      const lat = lugar.latitud;
      const lon = lugar.longitud;
      const map = new mapboxgl.Map({
        accessToken: environment.mapbox.accessToken,
        container: `map${lugar.nombre}`, // Specify the container ID
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

  ngOnInit(): void {}

  getId(lugar: LugarModel): string {
    return `map${lugar.nombre}`;
  }
}
