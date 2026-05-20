import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Matricula } from '../model/matricula';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {

  private baseURL = environment.apiUrl + "/matricula"; 

  constructor(private http: HttpClient) { }

  
  getMatriculas(): Observable<Matricula[]> {
    return this.http.get<Matricula[]>(this.baseURL);
  }

  
  getMatriculaById(id: number): Observable<Matricula> {
    return this.http.get<Matricula>(this.baseURL + "/" + id);
  }
}



