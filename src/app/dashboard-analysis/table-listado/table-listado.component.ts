import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-listado',
  templateUrl: './table-listado.component.html',
  styleUrls: ['./table-listado.component.css']
})
export class TableListadoComponent implements OnInit {

  displayedColumnsNodos: string[] = ['text', 'comun'];
  displayedColumnsEnlaces: string[] = ['from', 'dir', 'to', 'comun'];
  dataSource = [];
  
  @Input() public modelTable: any;
  @Input() public nodos: Boolean;
  constructor() { }

  ngOnInit() {
    this.dataSource = this.modelTable;
  }


}
