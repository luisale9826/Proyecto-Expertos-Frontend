import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LugarModel } from '../models/lugar-model';
import { OpinionModel } from '../models/opinion-model';

@Injectable({
  providedIn: 'root',
})
export class LugaresService {

  constructor(private http: HttpClient) {}

  getLugares(): Observable<LugarModel[]> {
    return this.http.get<LugarModel[]>(`${environment.url}lugares`);
  }

  getEuclides(body: OpinionModel): Observable<any> {
    return this.http.post<any>(`${environment.url}euclides`, body);
  }

  getBayes(body: OpinionModel): Observable<any> {
    return this.http.post<any>(`${environment.url}bayes`, body);
  }

  agregarLugar(lugar: LugarModel) {
    return this.http.post<any>(`${environment.url}lugares`, lugar);
  }
}
