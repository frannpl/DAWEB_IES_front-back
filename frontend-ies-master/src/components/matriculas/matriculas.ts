import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Matricula } from '../../model/matricula';
import { MatriculaService } from '../../services/matricula-service';
import { MatriculaDetalle } from './matricula-detalle/matricula-detalle';

@Component({
  selector: 'app-matriculas',
  standalone: true,
  imports: [CommonModule, MatriculaDetalle],
  templateUrl: './matriculas.html',
  styleUrl: './matriculas.css',
})
export class Matriculas implements OnInit {

  matriculas: Matricula[] = [];
  matriculaSeleccionada: Matricula | null = null;
  
  constructor(
    private matriculaService: MatriculaService
  ){};

  ngOnInit(): void {
    this.matriculaService.getMatriculas().subscribe(data => {
      this.matriculas = data;
    })
  }

  
  seleccionar(m: Matricula) {
    this.matriculaService.getMatriculaById(m.idMat).subscribe(data => {
      this.matriculaSeleccionada = data;
    });
  }
}


