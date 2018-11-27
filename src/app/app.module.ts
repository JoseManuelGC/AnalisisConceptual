import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatTableModule } from '@angular/material';
import { BackComponent } from './back/back.component';
import { DashboardAnalysisComponent } from './dashboard-analysis/dashboard-analysis.component';
import { Ng2FileInputModule } from 'ng2-file-input';
import { ChartsModule } from 'ng2-charts';
import { DiagramEditorComponent } from './dashboard-analysis/diagram-editor/diagram-editor.component';
import { DiagramEditorComponentComparator } from './dashboard-analysis/diagram-editor-comparator/diagram-editor-comparator.component';
import { FormsModule } from '@angular/forms';
import {FileUploadModule, MessageService} from 'primeng/primeng';
@NgModule({
  declarations: [
    AppComponent,
    BackComponent,
    DashboardAnalysisComponent,
    DiagramEditorComponent,
    DiagramEditorComponentComparator
    
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    FileUploadModule,
    MatTableModule,
    Ng2FileInputModule.forRoot(),
    ChartsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
