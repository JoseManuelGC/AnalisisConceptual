import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as _ from 'lodash';
@Component({
  selector: 'app-sign-in-component',
  templateUrl: './sign-in-component.component.html',
  styleUrls: ['./sign-in-component.component.css']
})
export class SignInComponentComponent implements OnInit {

  public usuario;
  public contrasenia;

  private usuariosBD = [];

  @Output() onSigin = new EventEmitter<any>();
  constructor(db: AngularFireDatabase) { 
    const self = this;
    db.list('/usuarios').valueChanges().subscribe(res => {
      _.forEach(res, r => {
        const item:any = r;
        const user = 
          {
            userName: item.name,
            pwdName: item.clave
          }
          self.usuariosBD.push(user);
      })
    });
  }

  ngOnInit() {
  }

  nombreUsuario(usuario){
    this.usuario = usuario;
  }
  contraseniaUsuario(contrasenia){
    this.contrasenia = contrasenia;
  }

  comprobar($event, text){
    if ($event.key === "Enter" || text === 'enviar') {
      const self = this;
    let sign: Boolean = false;
    _.forEach(this.usuariosBD, user => {
      const item: any = user;
        if (self.usuario === item.userName && self.contrasenia === item.pwdName){
          sign = true;
        }
    });
    this.onSigin.emit(sign);
    }
    
  }
  cancelar(){
    this.onSigin.emit(false);
  }
 
}
