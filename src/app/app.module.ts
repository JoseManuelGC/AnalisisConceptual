import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule } from '@angular/material';
import { BackComponent } from './back/back.component';
import { DashboardAnalysisComponent } from './dashboard-analysis/dashboard-analysis.component';
import { FileDropDirective, FileSelectDirective } from 'ng2-file-upload';
import { Ng2FileInputModule } from 'ng2-file-input';
import { ChartsModule } from 'ng2-charts';

import { DiagramEditorComponent } from './dashboard-analysis/diagram-editor/diagram-editor.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    BackComponent,
    DashboardAnalysisComponent,
    FileDropDirective,
    FileSelectDirective,
    DiagramEditorComponent
    
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
    Ng2FileInputModule.forRoot(),
    ChartsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
