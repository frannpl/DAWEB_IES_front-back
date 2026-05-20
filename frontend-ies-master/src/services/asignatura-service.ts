import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asignatura } from '../model/asignatura';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AsignaturaService {
    
  private baseUrl = environment.apiUrl + '/asignatura';

  constructor(
    private _httpClient: HttpClient
  ){};

  getAsignaturas(): Observable<Asignatura[]>{
    return this._httpClient.get<Asignatura[]>(this.baseUrl);
  }

  
  getAsignaturaById(id: number): Observable<Asignatura>{
    return this._httpClient.get<Asignatura>(this.baseUrl + "/" + id);
  }

}



