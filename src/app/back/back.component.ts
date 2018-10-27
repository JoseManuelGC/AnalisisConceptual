import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UploadEvent, UploadFile, FileSystemDirectoryEntry, FileSystemFileEntry } from 'ngx-file-drop';

@Component({
  selector: 'back',
  templateUrl: './back.component.html',
  styleUrls: ['./back.component.css']
})
export class BackComponent {

}
