import {MessageService} from 'primeng/primeng';
import {split} from 'ts-node';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, count } from 'rxjs/operators';
import { Component, ViewChild, ElementRef } from '@angular/core';
import * as go from 'gojs';
import {xml} from 'angular-xml';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { Ng2FileInputService } from 'ng2-file-input';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { NgForm } from '@angular/forms';
import * as _ from 'lodash';
@Component({
  selector: 'dashboard-analysis',
  templateUrl: './dashboard-analysis.component.html',
  styleUrls: ['./dashboard-analysis.component.css']
})
export class DashboardAnalysisComponent {
  imageShown: boolean;
  public ELEMENT_DATA: any[] = [
    {def: '# Nodos Globales', valor_pro: 0, valor_alu: 0},
    {def: '# Enlaces Globales', valor_pro: 0, valor_alu: 0},
    {def: 'Densidad', valor_pro: 0, valor_alu: 0},
    {def: 'Diámetro', valor_pro: 0, valor_alu: 0},
    {def: 'Nodo Principal', valor_pro: 0, valor_alu: 0},
    {def: 'Grado de Enl. Nod. Pric.', valor_pro: 0, valor_alu: 0},
    {def: '# Nodos Comunes', valor_pro: '', valor_alu: 0},
    {def: '# Nodos No Comunes', valor_pro: '', valor_alu: 0},
    {def: '# Enlaces Comunes', valor_pro: '', valor_alu: 0},
    {def: '# Enlaces No Comunes', valor_pro: '', valor_alu: 0}
  ];
  displayedColumns: string[] = ['def', 'valor_pro', 'valor_alu'];
  dataSource = this.ELEMENT_DATA;
  currentProfileImage: any;
  cardsDashboard = [
    { title: 'Modelo Profesor', cols: 6, rows: 2 },
    { title: 'Estadísticas', cols: 6, rows: 4 },
    { title: 'Modelo Alumno', cols: 6, rows: 2 }
  ];
  cardsEstadisticas = [
    { title: 'Métricas', cols: 2, rows: 2 },
    { title: 'Gráficos comparativa', cols: 2, rows: 2}
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
// public model3:any = new go.GraphLinksModel();
public barChartData:any[] = [
  {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
  {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
];

  constructor(private ngxXml2jsonService: NgxXml2jsonService, private ng2FileInputService: Ng2FileInputService) {

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
    console.log($event.file);
    const xmlfile = $event.file;
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlfile, 'text/xml');
    const obj = this.ngxXml2jsonService.xmlToJson(xml);
    console.log(obj);
  }

  title = 'My First GoJS App in Angular';

  model = new go.GraphLinksModel(
    [

    ],
    [
    ]);
    model3= new go.GraphLinksModel(
      [
       
      ],
      [

      ]);
    
  modelComparador = new go.GraphLinksModel(
    [
     
    ],
    [
    ]);
   listaNodos = [];
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
  addActivity($event){
    
    let fileInput: any = document.getElementById("img");
    let files = fileInput.files[0];
    if (files){
      let imgPromise = this.getFileBlob(files);
      imgPromise.then(blob => {
        this.asignarMapa(blob);
      });
    } else {
      alert('Introduce un archivo correcto');
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
  asignarMapa(blob) {
    let json: any;
    const map = decodeURIComponent(atob(blob.split(',')[1]).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    const parser = new DOMParser();
    const fin = JSON.parse(map);
    /*const xml = parser.parseFromString(map, 'application/xml');
    json = this.xmlToJson(xml);*/
    const link = [];
    const values = [];
  
    _.forEach(fin.nodeDataArray, node => {
      values.push(node);
    });
    _.forEach(fin.linkDataArray, lin => {
      link.push(lin);
    });
    this.model3 = new go.GraphLinksModel(
      [
        
      ],
      [
        
      ]);

        this.model3.linkDataArray = link;
        this.model3.nodeDataArray = values;
    /*const self = this;
    _.forEach(json.graph.node, element => {
        const v = '{ key:' + element.attributes.key+', text:'+ element.attributes.text+', color:'+element.attributes.color+ '}';
        values.push(v);
    });*/

  }

  asignarMapa_2(blob) {
    let json: any;
    const map = decodeURIComponent(atob(blob.split(',')[1]).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    const parser = new DOMParser();
    const fin = JSON.parse(map);
    /*const xml = parser.parseFromString(map, 'application/xml');
    json = this.xmlToJson(xml);*/
    const link = [];
    const values = [];
  
    _.forEach(fin.nodeDataArray, node => {
      values.push(node);
    });
    _.forEach(fin.linkDataArray, lin => {
      link.push(lin);
    });
    this.model = new go.GraphLinksModel(
      [
        
      ],
      [
        
      ]);

        this.model.linkDataArray = link;
        this.model.nodeDataArray = values;
    /*const self = this;
    _.forEach(json.graph.node, element => {
        const v = '{ key:' + element.attributes.key+', text:'+ element.attributes.text+', color:'+element.attributes.color+ '}';
        values.push(v);
    });*/

  }
  private onDataSuccess(data: any) {
    if (data) {
      // Parse content to object
      const binary = JSON.parse(data._body);
      const parser = new DOMParser();

      // DECODE UTF-8 and insert <![CDATA[ and ]]> inside tag text

      const xmlString = decodeURIComponent(escape(window.atob(binary.content)))
        .replace(new RegExp('\<ClinicalDocument.*[^xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"].*\>', 'g'),
         '<ClinicalDocument xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">')
        .replace(new RegExp('\<text.*\>\\b|\<text.*\>', 'g'), '<text><![CDATA[')
        .replace(new RegExp('[\\b]?\<\/text\>', 'g'), ']]></text>')
        .replace(new RegExp('\<th\/\>', 'g'), '');

      const xml = parser.parseFromString(xmlString, 'application/xml');
      
      return this.xmlToJson(xml);

    }
  }


  /**
   * Create JSON from object XML
   * @param {*} xml
   * @returns
   * @memberof DocumentReferenceService
   */
  xmlToJson(xml) {

    // Create the return object
    let obj = {};

    if (xml.nodeType === 1) { // element
      // do attributes
      if (xml.attributes.length > 0) {
        obj['attributes'] = {};
        for (let j = 0; j < xml.attributes.length; j++) {
          const attribute = xml.attributes.item(j);
          obj['attributes'][attribute.nodevalor_pro] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType === 4 || xml.nodeType === 3) { // cdata section y text
      obj = xml.nodeValue
    }

    // do children
    if (xml.hasChildNodes()) {
      for (let i = 0; i < xml.childNodes.length; i++) {
        const item = xml.childNodes.item(i);
        const nodevalor_pro = item.nodevalor_pro;

        if (typeof (obj[nodevalor_pro]) === 'undefined') {
          obj[nodevalor_pro] = this.xmlToJson(item);
        } else {
          if (typeof (obj[nodevalor_pro].length) === 'undefined') {
            const old = obj[nodevalor_pro];
            obj[nodevalor_pro] = [];
            obj[nodevalor_pro].push(old);
          }
          if (typeof (obj[nodevalor_pro]) === 'object') {
            obj[nodevalor_pro].push(this.xmlToJson(item));
          }
        }
      }
    }
    return obj;
  }

  importGraph($event){
    let fileInput: any = document.getElementById("img_2");
    let files = fileInput.files[0];
    if (files){
      let imgPromise = this.getFileBlob(files);
      imgPromise.then(blob => {
        this.asignarMapa_2(blob);
      });
    } else {
      alert('Introduce un archivo correcto');
    }
  }

  updateMetrica($event){
    if (this.model.nodeDataArray.length > 0 && this.model3.nodeDataArray.length > 0) {
      this.n_nodosGlobales();
      this.n_linkGlobales();
      this.densidad();
      this.diametro();
      this.nodoPrincipal();
      this.n_nodosComunes();
      this.n_nodosNoComunes();
      this.graphComparador();
    } else {
      alert('Introduce los grafos para comparar.')
    }
  }
  n_nodosGlobales(){
    this.ELEMENT_DATA.find(t => t.def === '# Nodos Globales').valor_pro = this.model.nodeDataArray.length;
    this.ELEMENT_DATA.find(t => t.def === '# Nodos Globales').valor_alu = this.model3.nodeDataArray.length;
  }
  n_linkGlobales(){
    this.ELEMENT_DATA.find(t => t.def === '# Enlaces Globales').valor_pro = this.model.linkDataArray.length;
    this.ELEMENT_DATA.find(t => t.def === '# Enlaces Globales').valor_alu = this.model3.linkDataArray.length;
  }
  densidad(){
    let pc_prof = 0;
    let pc_alu = 0;
    let ac_pro = 0;
    let ac_alu = 0;
    pc_prof = (this.model.nodeDataArray.length * (this.model.nodeDataArray.length - 1))/2;
    ac_pro = Math.round((this.model.linkDataArray.length / pc_prof) * 100);
  

    pc_alu = (this.model3.nodeDataArray.length * (this.model3.nodeDataArray.length - 1))/2;
    ac_alu = Math.round((this.model3.linkDataArray.length / pc_alu)* 100);


    this.ELEMENT_DATA.find(t => t.def === 'Densidad').valor_pro = ac_pro + '%';
    this.ELEMENT_DATA.find(t => t.def === 'Densidad').valor_alu = ac_alu + '%';
  
  }
  diametro(){
    // Recorre todas las conexiones para ver como de alejados estan dos nodos
    this.ELEMENT_DATA.find(t => t.def === 'Diámetro').valor_pro = 'NTS';
    this.ELEMENT_DATA.find(t => t.def === 'Diámetro').valor_alu = 'NTS';
  }
  nodoPrincipal(){
  const countFrom: any = _.groupBy(this.model.linkDataArray, 'from');
  const modelNode: any = this.model.nodeDataArray;
  let idPrincipal: any = 0;
  let count: any = 0;
  let textModel: any;
  _.forEach(countFrom, t=> {
    if (count < t.length) {
      count = t.length;
      idPrincipal = t[0].from;
    }
  });
 _.forEach(modelNode, n=>{
   if (n.key === idPrincipal){
     textModel = n.text;
   }
 });
  this.ELEMENT_DATA.find(t => t.def === 'Nodo Principal').valor_pro = textModel;
  this.ELEMENT_DATA.find(t => t.def === 'Grado de Enl. Nod. Pric.').valor_pro = count;

  const countFromAlum: any = _.groupBy(this.model3.linkDataArray, 'from');
  const modelNodeAlum: any = this.model3.nodeDataArray;
  let idPrincipalAlum: any = 0;
  let countAlum: any = 0;
  let textModelAlum: any;
  _.forEach(countFromAlum, t=> {
    if (countAlum < t.length) {
      countAlum = t.length;
      idPrincipalAlum = t[0].from;
    }
  });
 _.forEach(modelNodeAlum, n=>{
   if (n.key === idPrincipalAlum){
     textModelAlum = n.text;
   }
 });
  this.ELEMENT_DATA.find(t => t.def === 'Nodo Principal').valor_alu = textModelAlum;
  this.ELEMENT_DATA.find(t => t.def === 'Grado de Enl. Nod. Pric.').valor_alu = countAlum;
  }
  n_nodosComunes(){

    this.ELEMENT_DATA.find(t => t.def === '# Nodos Comunes').valor_alu = this.model.nodeDataArray.length;
  }
  n_nodosNoComunes(){
    this.ELEMENT_DATA.find(t => t.def === '# Nodos No Comunes').valor_alu = 0;
  }
  graphComparador(){
    let valueComparador: any = [];
    let linkComparador: any = [];
    let valueProfesor: any = [];
    let linkProfesor: any = [];
    valueProfesor = this.model.nodeDataArray;
    linkProfesor = this.model.linkDataArray;
    let valueAlumno: any = [];
    let linkAlumno: any = [];
    valueAlumno = this.model3.nodeDataArray;
    linkAlumno = this.model3.linkDataArray;
    const self = this;
    let listNod: any = [];

    
    _.forEach(valueProfesor, nod => {
      nod.color = 'lightgreen';
      listNod.push(nod.text);
      valueComparador.push(nod);
      
    });
    _.forEach(linkAlumno, c =>{
      if(linkProfesor.find(obj => obj.from === c.from && obj.to === c.to)){
        c.color="ligthgreen";
        linkComparador.push(c);
      } 
    });
    this.ELEMENT_DATA.find(t => t.def === '# Enlaces Comunes').valor_alu = linkComparador.length;
    _.forEach(linkProfesor, c =>{
      if(!linkComparador.find(obj => obj.from === c.from && obj.to === c.to)){
        c.color="red";
        linkComparador.push(c);
      }
    });
    const resta = linkComparador.length - this.ELEMENT_DATA.find(t => t.def === '# Enlaces Comunes').valor_alu;
    this.ELEMENT_DATA.find(t => t.def === '# Enlaces No Comunes').valor_alu = resta ;
    this.modelComparador = new go.GraphLinksModel(
      [
        
      ],
      [
        
      ]);
        this.modelComparador.nodeDataArray = valueComparador;
        this.modelComparador.linkDataArray = linkComparador;
      this.listaNodos = listNod;
      
  }
    
 }
