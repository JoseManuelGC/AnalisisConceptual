import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';
import * as _ from 'lodash';
@Injectable()
export class ExportPDFServiceService {

  constructor() { }

  exportPDF(diagramModelComparador,diagramModelProfesor,diagramModelAlumno,nombreArchivoProfesor,nombreArchivoAlumno, ELEMENT_DATA, listaNodos, listEnlaces, options){
    const imageDiagramComparador = diagramModelComparador ? diagramModelComparador.imageDiagram() : null;
    const imageDiagramProfesor = diagramModelProfesor ? diagramModelProfesor.imageDiagram() : null;
    const imageDiagramAlumno = diagramModelAlumno ? diagramModelAlumno.imageDiagram(): null;
    const doc = new jsPDF;
    let imgUCLM = document.getElementById('imgUCLM');
    let imgESI = document.getElementById('imgESI');
    
    if (options.grafoExperto){
      
    doc.addImage(imgUCLM, 'PNG', 10, 10);
    doc.addImage(imgESI, 'PNG', 150, 10); 
    doc.text('Análisis de Mapas Conceptuales', 37,20);
      doc.text('-----------------------------------------------------------------------------------------------------', 10,35);
      doc.text('Grafo 1 ---> ' + nombreArchivoProfesor,30, 50);
     // doc.addImage(imageDiagramProfesor, 'image', 10, 60, 190,150);
     doc.addImage(imageDiagramProfesor, 'image', 50,-30,-100,100, null, 'NONE', -90);
     doc.setFontSize(10);
     doc.setFontType("italic");
     doc.text('Autor: José Manuel García-Calvillo García-Navas',100,285);
    }
    if (options.grafoAlumno){
    doc.setFontType("normal");
      if (options.grafoExperto){
        doc.addPage();
      }
      doc.setFontSize(15);
      doc.addImage(imgUCLM, 'PNG', 10, 10);
      doc.addImage(imgESI, 'PNG', 150, 10);
      doc.text('Análisis de Mapas Conceptuales', 37,20);
        doc.text('-----------------------------------------------------------------------------------------------------', 10,35);
        doc.text('Grafo 2 ---> ' + nombreArchivoAlumno,30, 50);
      doc.addImage(imageDiagramAlumno, 'image', 50,-30,-100,100, null, 'NONE', -90);
      doc.setFontSize(10);
      doc.setFontType("italic");
      doc.text('Autor: José Manuel García-Calvillo García-Navas',100,285);
    }
   // Segunda Pagina
    if (options.metricasGrafo){

    doc.setFontType("normal");
    if (options.grafoExperto || options.grafoAlumno){
      doc.addPage();
    }
      doc.setFontSize(15);
      doc.addImage(imgUCLM, 'PNG', 10, 10);
      doc.addImage(imgESI, 'PNG', 150, 10);
      doc.text('Análisis de Métricas Y Grafo comparador', 40,20);
      doc.text('-----------------------------------------------------------------------------------------------------', 10,35);
      doc.text('Tabla comparativa de métricas',10,50);
      doc.text('-----------------------------------------',10,55);
  
      doc.setFontSize(11);
      doc.text('Def. Métrica                            Valor Profesor                             Valor Alumno', 10,65);
      let numFila = 75;
      _.forEach(ELEMENT_DATA, element => {
        doc.text('' + element.def + ' ' ,10, numFila);
        doc.text('                                   ' + element.valor_pro, 30, numFila);
        doc.text('                                                             ' + element.valor_alu, 60, numFila);
        numFila += 5;
      });

    doc.setFontSize(10);
    doc.setFontType("italic");
    doc.text('Autor: José Manuel García-Calvillo García-Navas',100,285);
    doc.setFontType("normal");
    }
    if(options.grafoComparador){

      doc.setFontSize(15);
      if (options.grafoExperto || options.grafoAlumno || options.metricasGrafo){
        doc.addPage();
      }
    doc.setFontType("normal");
    doc.setFontSize(15);
      doc.addImage(imgUCLM, 'PNG', 10, 10);
      doc.addImage(imgESI, 'PNG', 150, 10);
      doc.text('Análisis de Métricas Y Grafo comparador', 40,20);
      doc.text('-----------------------------------------------------------------------------------------------------', 10,35);
        doc.text('Grafo comparativo --->',30,50);
        doc.addImage(imageDiagramComparador, 'image', 50,-30,-100,100, null, 'NONE', -90);
        if ( ELEMENT_DATA.find(t => t.def === '# Enlaces No Comunes').valor_alu > 0){
          doc.setDrawColor(255, 0, 0);
          doc.line(100,269,60,269)
          doc.setFontSize(10);
          doc.text('Enlace no común.', 10, 270);
        }
        if ( ELEMENT_DATA.find(t => t.def === '# Enlaces Comunes').valor_alu > 0){
          doc.setDrawColor(9, 92, 238);
          doc.line(100,274,60,274)
          doc.setFontSize(10);
          doc.text('Enlace común.', 10, 275);
        }    

    doc.setFontSize(10);
    doc.setFontType("italic");
    doc.text('Autor: José Manuel García-Calvillo García-Navas',100,285);
    doc.setFontType("normal");
    }
    
     if (options.listaNodos){
       // Segunda Pagina
       if (options.grafoExperto || options.grafoAlumno || options.grafoComparador || options.metricasGrafo){
        doc.addPage();
      }
     doc.setFontSize(15);
     doc.addImage(imgUCLM, 'PNG', 10, 10);
     doc.addImage(imgESI, 'PNG', 150, 10);
     doc.text('Análisis de Métricas Y Grafo comparador', 40,20);
     doc.text('-----------------------------------------------------------------------------------------------------', 10,35);
     
      doc.text('Tabla Listado de Nodos Comunes y No Comunes',10,50);
      doc.text('-------------------------------------------------------------------',10,55);
  
      doc.setFontSize(11);
      doc.text('Nodo Común                                                                                      Nodo no común', 10,65);
      let numFila_1 = 75;
      let numFila_3 = 75
      _.forEach(listaNodos, element => {
        if (element.comun === 'Si') {
          doc.text('' + element.text + ' ' ,10, numFila_1);
          numFila_1 += 5;
        }
        if (element.comun === 'No'){
          doc.text('                                                                                     ' + element.text, 40, numFila_3);
          numFila_3 += 5;
        }
      
        if(numFila_1 > 270 || numFila_3 > 270){
           numFila_1 = 75
           numFila_3 = 75
           doc.setFontSize(10);
           doc.setFontType("italic");
           doc.text('Autor: José Manuel García-Calvillo García-Navas',100,285);
           doc.setFontType("normal");
           doc.addPage();
           doc.setFontSize(15);
           doc.addImage(imgUCLM, 'PNG', 10, 10);
           doc.addImage(imgESI, 'PNG', 150, 10);
           doc.text('Análisis de Métricas Y Grafo comparador', 40,20);
           doc.text('-----------------------------------------------------------------------------------------------------', 10,35);
          
             doc.text('Tabla Listado de Nodos Comunes y No Comunes',10,50);
             doc.text('-------------------------------------------------------------------',10,55);
         
             doc.setFontSize(11);
             doc.text('Nodo común                                                    Nodo no común', 10,65);     
             doc.setFontSize(10);
          
           doc.setFontType("italic");
           doc.text('Autor: José Manuel García-Calvillo García-Navas',100,285);
           doc.setFontType("normal");
         }
      });
      doc.setFontType("italic");
           doc.text('Autor: José Manuel García-Calvillo García-Navas',100,285);
           doc.setFontType("normal");
     }
  
      
      if (options.listaEnlaces){
        // Segunda Pagina
        if (options.grafoExperto || options.grafoAlumno || options.grafoComparador || options.metricasGrafo || options.listaNodos){
          doc.addPage();
        }
      doc.setFontSize(15);
      doc.addImage(imgUCLM, 'PNG', 10, 10);
      doc.addImage(imgESI, 'PNG', 150, 10);
      doc.text('Análisis de Métricas Y Grafo comparador', 40,20);
      doc.text('-----------------------------------------------------------------------------------------------------', 10,35);
        doc.text('Tabla Listado de Enlaces Comunes',10,50);
        doc.text('-------------------------------------------------------------------',10,55);
  
        doc.setFontSize(11);
        doc.text('Descripción del Nodo Inicial         Dir. Enlace                Descripción del Nodo Final         Enlace común', 10,65);
        let numFila_2 = 75;
        _.forEach(listEnlaces, element => {
         if (element.comun === 'Si'){
          doc.text('' + element.from + ' ' ,10, numFila_2);
          doc.text('                                        ' + element.dir, 25, numFila_2);
          doc.text('                                           ' + element.to, 60, numFila_2);
          doc.text('                                                                             ' + element.comun, 100, numFila_2);
          numFila_2 += 5;
          if(numFila_2 > 270){
            numFila_2 = 75
            doc.setFontSize(10);
            doc.setFontType("italic");
            doc.text('Autor: José Manuel García-Calvillo García-Navas',100,285);
            doc.setFontType("normal");
            doc.addPage();
            doc.setFontSize(15);
            doc.addImage(imgUCLM, 'PNG', 10, 10);
            doc.addImage(imgESI, 'PNG', 150, 10);
            doc.text('Análisis de Métricas Y Grafo comparador', 40,20);
            doc.text('-----------------------------------------------------------------------------------------------------', 10,35);
            doc.text('Tabla Listado de Enlaces Comunes y No Comunes',10,50);
            doc.text('-------------------------------------------------------------------',10,55);
        
            doc.setFontSize(11);
            doc.text('Descripción del Nodo Inicial         Dir. Enlace                Descripción del Nodo Final         Enlace común', 10,65);
        doc.setFontSize(10);
            doc.setFontType("italic");
            doc.text('Autor: José Manuel García-Calvillo García-Navas',100,285);
            doc.setFontType("normal");
          }
         }
      });
      if(numFila_2 > 270){
        doc.setFontSize(15);
        doc.addImage(imgUCLM, 'PNG', 10, 10);
        doc.addImage(imgESI, 'PNG', 150, 10);
        doc.text('Análisis de Métricas Y Grafo comparador', 40,20);
        doc.text('-----------------------------------------------------------------------------------------------------', 10,35);
       numFila_2 = 75;  
      } else {
        doc.setFontSize(15);
        numFila_2 += 10;
      }
      doc.text('Tabla Listado de Enlaces No Comunes',10,numFila_2 );
      numFila_2 += 5;
      doc.text('-------------------------------------------------------------------',10,numFila_2);
      numFila_2 += 10;
      doc.setFontSize(11);
      doc.text('Descripción del Nodo Inicial         Dir. Enlace                Descripción del Nodo Final         Enlace común', 10,numFila_2);
      numFila_2 += 10;
      _.forEach(listEnlaces, element => {
        if (element.comun === 'No'){
          doc.text('' + element.from + ' ' ,10, numFila_2);
          doc.text('                                        ' + element.dir, 25, numFila_2);
          doc.text('                                           ' + element.to, 60, numFila_2);
          doc.text('                                                                             ' + element.comun, 100, numFila_2);
          numFila_2 += 5;
          if(numFila_2 > 270){
            numFila_2 = 75
            doc.setFontSize(10);
            doc.setFontType("italic");
            doc.text('Autor: José Manuel García-Calvillo García-Navas',100,285);
            doc.setFontType("normal");
            doc.addPage();
            doc.setFontSize(15);
            doc.addImage(imgUCLM, 'PNG', 10, 10);
            doc.addImage(imgESI, 'PNG', 150, 10);
            doc.text('Análisis de Métricas Y Grafo comparador', 40,20);
            doc.text('-----------------------------------------------------------------------------------------------------', 10,35);
            doc.text('Tabla Listado de Enlaces Comunes y No Comunes',10,50);
            doc.text('-------------------------------------------------------------------',10,55);
        
            doc.setFontSize(11);
            doc.text('Descripción del Nodo Inicial         Dir. Enlace                Descripción del Nodo Final         Enlace común', 10,65);
        doc.setFontSize(10);
            doc.setFontType("italic");
            doc.text('Autor: José Manuel García-Calvillo García-Navas',100,285);
            doc.setFontType("normal");
          }
        }
       
    });
      doc.setFontSize(10);
      doc.setFontType("italic");
      doc.text('Autor: José Manuel García-Calvillo García-Navas',100,285);
      doc.setFontType("normal");
     }
     


    doc.save('Métricas-' +nombreArchivoProfesor + '-' +nombreArchivoAlumno +'.pdf');
    return false;
  }
}
