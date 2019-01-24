import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import * as go from 'gojs';

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
          this.dataSource = [{metrica: 'Texto Nodo', valor: this.nodeSele.Yd.text},
                              {metrica: 'Conexiones', valor: this.nodeSele.linksConnected.count},
                              {metrica: 'Posicón X', valor: this.nodeSele.location.x.toFixed(2)},
                              {metrica: 'Posición Y', valor: this.nodeSele.location.y.toFixed(2)}]
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

  imageDiagram(){
    let diagram:any;
    if (this.diagram.model.nodeDataArray.length > 2) {
      diagram = this.diagram.makeImage(
        {
          size: new go.Size(700,1400)
        }
      );
    } else {
      diagram = this.diagram.makeImage(
        {
          size: new go.Size(300,600)
        }
      );
    }
    return diagram;
  }
}