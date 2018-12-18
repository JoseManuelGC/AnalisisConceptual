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
import { DiagramEditorComponent } from './dashboard-analysis/diagram-profesor/diagram-editor.component';
import { DiagramEditorAlumnoComponent } from './dashboard-analysis/diagram-alumno/diagram-alumno.component';
import { DiagramEditorComponentComparator } from './dashboard-analysis/diagram-editor-comparator/diagram-editor-comparator.component';
import { FormsModule } from '@angular/forms';
import {FileUploadModule, MessageService} from 'primeng/primeng';
import { DataBaseComponentComponent } from './data-base-component/data-base-component.component';
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule} from  'angularfire2/database';
import { CargarDataBaseComponentComponent } from './cargar-data-base-component/cargar-data-base-component.component';
import { SignInComponentComponent } from './sign-in-component/sign-in-component.component';
@NgModule({
  declarations: [
    AppComponent,
    BackComponent,
    DashboardAnalysisComponent,
    DiagramEditorComponent,
    DiagramEditorAlumnoComponent,
    DiagramEditorComponentComparator,
    DataBaseComponentComponent,
    CargarDataBaseComponentComponent,
    SignInComponentComponent
    
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
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
