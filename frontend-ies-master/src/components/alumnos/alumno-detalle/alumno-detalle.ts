import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Alumno } from '../../../model/alumno';

@Component({
  selector: 'app-alumno-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alumno-detalle.html',
  styleUrl: './alumno-detalle.css'
})
export class AlumnoDetalle {
  @Input() alumno: Alumno | null = null;

  @Output() cerrar = new EventEmitter<void>();

  onCerrar() {
    this.cerrar.emit();
  }
}


