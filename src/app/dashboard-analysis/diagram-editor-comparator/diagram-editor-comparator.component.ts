import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import * as go from 'gojs';
import * as _ from 'lodash';
@Component({
  selector: 'app-diagram-editor-comparator',
  templateUrl: './diagram-editor-comparator.component.html',
  styleUrls: ['./diagram-editor-comparator.component.css']
})
export class DiagramEditorComponentComparator implements OnInit {
  private diagram: go.Diagram = new go.Diagram();
  @Input() public expand: Boolean;
  @ViewChild('diagramDiv')
  private diagramRef: ElementRef;

  @Input()
  get model(): go.Model { return this.diagram.model; }
  set model(val: go.Model) { this.diagram.model = val; }

  @Output()
  nodeSelected = new EventEmitter<go.Node|null>();

  public nodeSele: any;
  @Output()
  modelChanged = new EventEmitter<go.ChangedEvent>();

  displayedColumnsNodos: string[] = ['metrica', 'valor'];
  dataSource = [];
  constructor() {
    const $ = go.GraphObject.make;
    this.diagram = new go.Diagram();
    this.diagram.initialContentAlignment = go.Spot.Center;
    this.diagram.allowDrop = true;  // necessary for dragging from Palette
    this.diagram.undoManager.isEnabled = true;
    this.diagram.commandHandler.deletesConnectedLinks = false;
    this.diagram.commandHandler.diagram.allowDelete = false;
    this.diagram.addDiagramListener("ChangedSelection",
        e => {
          const node = e.diagram.selection.first();
          this.nodeSele = node instanceof go.Node ? node : null;
          if (this.nodeSele){
 this.dataSource = [{metrica: 'Texto Nodo', valor: this.nodeSele.Yd.text, interpretacion: '    Nombre del Nodo'},
                              {metrica: 'Conexiones', valor: this.nodeSele.linksConnected.count, interpretacion: '    Nº Conexiones'},
                              {metrica: 'G. Centralidad', valor: this.nodeSele.linksConnected.count, interpretacion: '    Cantidad de caminos que posee un nodo con los demás'},
                              {metrica: 'Coef. Clustering', valor: this.getClustering(this.nodeSele),interpretacion: '     Cof ∈ [0,1] no existen ningun camino que conecte los vecinos. Cof > 1 existe algún camino que conecta a los vecinos.'}];
          }
         
          this.nodeSelected.emit(node instanceof go.Node ? node : null);
        });
    this.diagram.addModelChangedListener(e => e.isTransactionFinished && this.modelChanged.emit(e));

    this.diagram.nodeTemplate =
      $(go.Node, "Auto",
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape,
          {
            fill: "white", strokeWidth: 0,
            portId: "", cursor: "pointer",
          }, 
          new go.Binding("fill", "color")),
        $(go.TextBlock,
          { margin: 8, editable: false },
          new go.Binding("text").makeTwoWay())
      );

    this.diagram.linkTemplate =
      $(go.Link,
        // allow relinking
        { relinkableFrom: false, relinkableTo: false },
        $(go.Shape,
          new go.Binding("stroke", "color")),
        $(go.Shape, {toArrow: "" })
      );
  }

  ngOnInit() {
    this.diagram.div = this.diagramRef.nativeElement;
  }
 getClustering(nodo){
   const key = nodo.key;
  const ki = nodo.linksConnected.count;
  let Li: any = 0;
  const NodosVeciones: any = [];
  const diagram: any = this.diagram;
  let result;
  _.forEach(diagram.model.linkDataArray, nod => {
    if(nod.from === key){
      NodosVeciones.push(nod.to)
    } else if (nod.to === key){
      NodosVeciones.push(nod.from);
    }
  });
  _.forEach(NodosVeciones, n => {
    let count = 0;
    _.forEach(diagram.model.linkDataArray, t => {
      if (t.from === n || t.to === n){
        count = count + 1;
      }
    });
    if (count > 1){
      Li = Li + count;
    }
  });
  result = (2 * (Li - 1) / (ki * (ki - 1)));
  if (result === Infinity){
    result = 0;
  }
  return result.toFixed(2);

 }
  imageDiagram(){
    let diagram:any;

      diagram = this.diagram.makeImage(
        {
          size: new go.Size(700,400)
        }
      );
    return diagram
  }
}