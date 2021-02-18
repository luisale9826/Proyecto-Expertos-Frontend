import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as mapboxgl from 'mapbox-gl';
import { LugarModel } from 'src/app/models/lugar-model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css'],
})
export class ResultadosComponent implements OnInit {
  lugar: LugarModel;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.lugar = data.lugar;
  }

  ngOnInit(): void {
    const lat = this.lugar.latitud;
    const lon = this.lugar.longitud;
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
  }
}
