import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profesor } from '../../../model/profesor';

@Component({
  selector: 'app-profesor-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profesor-detalle.html',
  styleUrl: './profesor-detalle.css'
})
export class ProfesorDetalle {
  @Input() profesor: Profesor | null = null;
  @Output() cerrar = new EventEmitter<void>();

  onCerrar() {
    this.cerrar.emit();
  }
}


