import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from '../model/alumno';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlumnoService {
  private baseUrl = environment.apiUrl + '/alumno';

  constructor(
    private _httpClient: HttpClient
  ){};

  getAlumnos(): Observable<Alumno[]>{
    return this._httpClient.get<Alumno[]>(this.baseUrl);
  }

  
  getAlumnoById(id: number): Observable<Alumno>{
    return this._httpClient.get<Alumno>(this.baseUrl + "/" + id);
  }
}


