import { Component } from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http' ;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer ,  private http: HttpClient ) {
    iconRegistry.addSvgIcon(
        'you-tube',
        sanitizer.bypassSecurityTrustResourceUrl('../assets/youtube.svg'));
         iconRegistry.addSvgIcon(
        'Itune',
        sanitizer.bypassSecurityTrustResourceUrl('../assets/Itune.svg'));
  }

}
