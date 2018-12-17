import { Component, OnInit, ViewChild, Output,EventEmitter } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { trigger, transition, style, animate } from '@angular/animations';
import * as _ from 'lodash';
import { DashboardAnalysisComponent } from '../dashboard-analysis/dashboard-analysis.component';
@Component({
  selector: 'app-data-base-component',
  templateUrl: './data-base-component.component.html',
  styleUrls: ['./data-base-component.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(-100%)', opacity: 0}),
          animate('450ms', style({transform: 'translateX(0%)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(100%)', opacity: 1}),
          animate('400ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ],
})
export class DataBaseComponentComponent implements OnInit {

  @Output() onMapaExperto = new EventEmitter<any>();
  @Output() onMapaAlumno = new EventEmitter<any>();
  public profesores = [];
  public alumnos = [];
  constructor(db: AngularFireDatabase) { 
    const self = this;
    db.list('/mapas').valueChanges().subscribe(res => {
      _.forEach(res, r => {
        const item:any = r;
        if (item.alumno){
          self.alumnos.push(r);
        } else {
          self.profesores.push(r);
        }
        
      })
    });
  }

  ngOnInit() {
  }
  cargarMapaExperto(mapa){
    this.onMapaExperto.emit(mapa);
  }
  cargarMapaAlumno(mapa){
    this.onMapaAlumno.emit(mapa);
  }

}
