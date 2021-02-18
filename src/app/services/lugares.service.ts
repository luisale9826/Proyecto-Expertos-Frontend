import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LugarModel } from '../models/lugar-model';

@Injectable({
  providedIn: 'root',
})
export class LugaresService {
  constructor(private http: HttpClient) {}

  getLugares(): Observable<LugarModel[]> {
    return this.http.get<LugarModel[]>(`${environment.url}lugares`);
  }
}
