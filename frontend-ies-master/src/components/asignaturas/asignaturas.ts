import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Asignatura } from '../../model/asignatura';
import { AsignaturaService } from '../../services/asignatura-service';
import { AsignaturaDetalle } from './asignatura-detalle/asignatura-detalle';

@Component({
  selector: 'app-asignaturas',
  standalone: true,
  imports: [CommonModule, AsignaturaDetalle],
  templateUrl: './asignaturas.html',
  styleUrl: './asignaturas.css',
})
export class Asignaturas implements OnInit {

  asignaturas: Asignatura[] = [];
  asignaturaSeleccionada: Asignatura | null = null;
  cargarAlumnosInmediatamente: boolean = false;
  
  constructor(
    private asignaturaService: AsignaturaService
  ){};

  ngOnInit(): void {
    this.asignaturaService.getAsignaturas().subscribe(data => {
      this.asignaturas = data;
    })
  }

  seleccionar(a: Asignatura) {
    this.cargarAlumnosInmediatamente = false;
    this.asignaturaSeleccionada = a;
  }

  verAlumnos(a: Asignatura, event: Event) {
    event.stopPropagation();
    this.cargarAlumnosInmediatamente = true;
    this.asignaturaSeleccionada = a;
  }
}
