import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profesor } from '../../model/profesor';
import { ProfesorService } from '../../services/profesor-service';
import { ProfesorDetalle } from './profesor-detalle/profesor-detalle';

@Component({
  selector: 'app-profesores',
  standalone: true,
  imports: [CommonModule, ProfesorDetalle],
  templateUrl: './profesores.html',
  styleUrl: './profesores.css',
})
export class Profesores implements OnInit {

  profesores: Profesor[] = [];
  profesorSeleccionado: Profesor | null = null;

  constructor(
    private profesorService: ProfesorService
  ) { };


  ngOnInit(): void {
    this.profesorService.getProfesor().subscribe({
      next: (data) => {
        this.profesores = data;
      },
      error: (err) => console.error('Error al cargar profesores', err)
    });
  }

  
  seleccionar(p: Profesor) {
    this.profesorService.getProfesorById(p.id).subscribe({
      next: (data) => {
        this.profesorSeleccionado = data;
      },
      error: (err) => console.error('Error al cargar el detalle del profesor', err)
    });
  }
}


