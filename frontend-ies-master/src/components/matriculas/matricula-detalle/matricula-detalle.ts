import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Matricula } from '../../../model/matricula';

@Component({
  selector: 'app-matricula-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './matricula-detalle.html',
  styleUrl: './matricula-detalle.css'
})
export class MatriculaDetalle {
  @Input() matricula: Matricula | null = null;
  @Output() cerrar = new EventEmitter<void>();

  onCerrar() {
    this.cerrar.emit();
  }
}


