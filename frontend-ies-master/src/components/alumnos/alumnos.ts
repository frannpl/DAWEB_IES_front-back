import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Alumno } from '../../model/alumno';
import { AlumnoService } from '../../services/alumno-service';
import { AlumnoDetalle } from './alumno-detalle/alumno-detalle'; 

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [CommonModule, AlumnoDetalle], 
  templateUrl: './alumnos.html',
  styleUrl: './alumnos.css',
})
export class Alumnos implements OnInit {
  
  alumnos: Alumno[] = [];
  alumnoSeleccionado: Alumno | null = null; 
  
  constructor(
    private alumnoService: AlumnoService
  ){};

  ngOnInit(): void {
    this.alumnoService.getAlumnos().subscribe(data => {
      this.alumnos = data;
    })
  }

  
  seleccionar(a: Alumno) {
    this.alumnoService.getAlumnoById(a.id).subscribe(data => {
      this.alumnoSeleccionado = data;
    });
  }
}


