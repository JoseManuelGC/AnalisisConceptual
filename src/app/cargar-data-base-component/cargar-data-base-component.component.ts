import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { trigger, transition, style, animate } from '@angular/animations';
@Component({
  selector: 'app-cargar-data-base-component',
  templateUrl: './cargar-data-base-component.component.html',
  styleUrls: ['./cargar-data-base-component.component.css'],
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
export class CargarDataBaseComponentComponent implements OnInit {

  public nombre;
  public alumno;
  public archivo;
  public maps$: AngularFireList<any>;
  public alert:Boolean = false;
  public error: Boolean = false;
  constructor(db: AngularFireDatabase) { 
    this.maps$ = db.list('/mapas');
  }

  ngOnInit() {

  }
  importGraph($event){
    let fileInput: any = document.getElementById("img_3");
    let files = fileInput.files[0];
    if (files){
      let imgPromise = this.getFileBlob(files);
      imgPromise.then(blob => {
        this.archivo = blob;
      });
    } else {
      this.error = true;
    }
  }

  /*
  *
  * Método para convertir una URL de un archivo en un
  * blob
  * @author: pabhoz
  *
  */
 getFileBlob(file) {

  var reader = new FileReader();
  return new Promise(function(resolve, reject){

    reader.onload = (function(theFile) {
      return function(e) {
           resolve(e.target.result);
      };
    })(file);

    reader.readAsDataURL(file);

  });

}
  nameGraph($event){
  this.nombre  = $event;
  }
  isAlumno($event){
   this.alumno = $event.target.checked;
  }
  add(){
     if(this.nombre && this.archivo){
      this.maps$.update(this.nombre, {
        alumno : this.alumno ? this.alumno : false,
        grafo : this.archivo,
        name : this.nombre
      });
      this.alert = true;
     } else{
      this.error = true;
     }
  }
  closeAlert(){
    this.alert = false;
    this.error = false;
  }
}
