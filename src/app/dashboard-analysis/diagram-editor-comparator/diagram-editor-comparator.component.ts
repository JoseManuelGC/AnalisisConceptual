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


  @Output()
  modelChanged = new EventEmitter<go.ChangedEvent>();

  constructor() {
    const $ = go.GraphObject.make;
    this.diagram = new go.Diagram();
    this.diagram.initialContentAlignment = go.Spot.Center;
    this.diagram.allowDrop = true;  // necessary for dragging from Palette
    this.diagram.undoManager.isEnabled = true;
    this.diagram.addDiagramListener("ChangedSelection",
        e => {
          const node = e.diagram.selection.first();
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
            // allow many kinds of links
            fromLinkable: true, toLinkable: true,
            fromLinkableSelfNode: true, toLinkableSelfNode: true,
            fromLinkableDuplicates: true, toLinkableDuplicates: true
          }, 
          new go.Binding("fill", "color")),
        $(go.TextBlock,
          { margin: 8, editable: true },
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