import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as _ from 'lodash';
@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    public isCollapsedProfesor = false;
    public isCollapsedAlumnos = false;
    public collapsed: boolean;

    @Output() onMapa = new EventEmitter<any>();
    public profesores = [];
    public alumnos = [];
    @Output() collapsedEvent = new EventEmitter<boolean>();


    public maps$;
    constructor(db: AngularFireDatabase) { 
        const self = this;
        this.maps$ = db.list('/mapas');
        db.list('/mapas').valueChanges().subscribe(res => {
            self.alumnos = [];
            self.profesores = [];
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
    isCollapsed(){
        this.isCollapsedProfesor = !this.isCollapsedProfesor;
    }
    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
    }
    isCollapsedAlumno(){
        this.isCollapsedAlumnos = !this.isCollapsedAlumnos;

    }
    cargarMapa($event, grafo){
        this.onMapa.emit(grafo);
    }
    delete(mapa){
        debugger;
        this.maps$.object('/mapas/' + mapa).remove();
    }
}
