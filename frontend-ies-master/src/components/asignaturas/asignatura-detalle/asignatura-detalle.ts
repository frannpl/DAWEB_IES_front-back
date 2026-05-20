import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Asignatura } from '../../../model/asignatura';
import { Alumno } from '../../../model/alumno';
import { MatriculaService } from '../../../services/matricula-service';

@Component({
  selector: 'app-asignatura-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './asignatura-detalle.html',
  styleUrl: './asignatura-detalle.css'
})
export class AsignaturaDetalle {
  private _asignatura: Asignatura | null = null;
  private _cargarAlumnos: boolean = false;

  @Input()
  set asignatura(val: Asignatura | null) {
    this._asignatura = val;
    this.mostrarAlumnos = false;
    this.alumnosMatriculados = [];
    if (val && this._cargarAlumnos) {
      this.cargarDatosAlumnos();
    }
  }

  get asignatura(): Asignatura | null {
    return this._asignatura;
  }

  @Input()
  set cargarAlumnos(val: boolean) {
    this._cargarAlumnos = val;
    if (val && this._asignatura) {
      this.cargarDatosAlumnos();
    }
  }

  get cargarAlumnos(): boolean {
    return this._cargarAlumnos;
  }

  @Output() cerrar = new EventEmitter<void>();

  alumnosMatriculados: Alumno[] = [];
  mostrarAlumnos: boolean = false;

  constructor(private matriculaService: MatriculaService) {}

  onCerrar() {
    this.cerrar.emit();
  }

  cargarDatosAlumnos() {
    if (!this._asignatura) return;

    this.matriculaService.getMatriculas().subscribe(matriculas => {
      const filter = matriculas.filter(m => m.asignatura && m.asignatura.id === this._asignatura?.id);
      this.alumnosMatriculados = filter.map(m => m.alumno);
      this.mostrarAlumnos = true;
    });
  }

  verAlumnos() {
    if (this.mostrarAlumnos) {
      this.mostrarAlumnos = false;
    } else {
      this.cargarDatosAlumnos();
    }
  }
}
