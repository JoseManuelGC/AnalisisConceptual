import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Component, ViewChild, ElementRef } from '@angular/core';
import * as go from 'gojs';

@Component({
  selector: 'dashboard-analysis',
  templateUrl: './dashboard-analysis.component.html',
  styleUrls: ['./dashboard-analysis.component.css']
})
export class DashboardAnalysisComponent {
  imageShown: boolean;
  currentProfileImage: any;
  cardsDashboard = [
    { title: 'Modelo Profesor', cols: 8, rows: 2 },
    { title: 'Estadísticas', cols: 4, rows: 3 },
    { title: 'Modelo Alumno', cols: 8, rows: 2 }
  ];
  cardsEstadisticas = [
    { title: 'Métricas', cols: 2, rows: 1 },
    { title: 'Gráficos comparativa', cols: 2, rows: 1}
  ];
// Doughnut
public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
public doughnutChartData:number[] = [350, 450, 100];
public doughnutChartType:string = 'doughnut';
public barChartOptions:any = {
  scaleShowVerticalLines: false,
  responsive: true
};
public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
public barChartType:string = 'bar';
public barChartLegend:boolean = true;

public barChartData:any[] = [
  {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
  {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
];

  constructor() {

  }
  public chartClickedGrafica(e:any):void {
    console.log(e);
  }
 
  public chartHoveredGrafica(e:any):void {
    console.log(e);
  }
 
  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
  onAction($event) {
    console.log($event);
  }

  title = 'My First GoJS App in Angular';

  model = new go.GraphLinksModel(
    [
      { key: 1, text: "Alpha", color: "lightblue" },
      { key: 2, text: "Beta", color: "orange" },
      { key: 3, text: "Gamma", color: "lightgreen" },
      { key: 4, text: "Delta", color: "pink" }
    ],
    [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 2 },
      { from: 3, to: 4 },
      { from: 4, to: 1 }
    ]);
    model3= new go.GraphLinksModel(
      [
        { key: 1, text: "Alpha", color: "lightblue" },
        { key: 2, text: "Beta", color: "orange" }
      ],
      [
        { from: 1, to: 2 },
        { from: 2, to: 2 }
      ]);
  @ViewChild('text')
  private textField: ElementRef;

  data: any;
  node: go.Node;

  showDetails(node: go.Node | null) {
    this.node = node;
    if (node) {
      // copy the editable properties into a separate Object
      this.data = {
        text: node.data.text,
        color: node.data.color
      };
    } else {
      this.data = null;
    }
  }

  onCommitDetails() {
    if (this.node) {
      const model = this.node.diagram.model;
      // copy the edited properties back into the node's model data,
      // all within a transaction
      model.startTransaction();
      model.setDataProperty(this.node.data, "text", this.data.text);
      model.setDataProperty(this.node.data, "color", this.data.color);
      model.commitTransaction("modified properties");
    }
  }

  onCancelChanges() {
    // wipe out anything the user may have entered
    this.showDetails(this.node);
  }

  onModelChanged(c: go.ChangedEvent) {
    // who knows what might have changed in the selected node and data?
    this.showDetails(this.node);
  }
}
