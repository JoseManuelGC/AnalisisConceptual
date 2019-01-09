import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-listado',
  templateUrl: './table-listado.component.html',
  styleUrls: ['./table-listado.component.css']
})
export class TableListadoComponent implements OnInit {

  displayedColumns: string[] = ['text', 'key', 'comun'];
  dataSource = [];
  
  @Input() public modelTable: any;
  constructor() { }

  ngOnInit() {
    this.dataSource = this.modelTable;
  }


}
