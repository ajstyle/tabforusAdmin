import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MaterialDesignModule} from './material-design/material-design.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { YouTubeComponent } from './you-tube/you-tube.component';
import { ApiService } from './api.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddChannelComponent } from './you-tube/add-channel/add-channel.component';
import {ToastModule} from 'ng2-toastr/ng2-toastr' ;

@NgModule({
  declarations: [
    AppComponent,
    YouTubeComponent,
    AddChannelComponent,

  ],entryComponents:[AddChannelComponent],
  imports: [
    BrowserModule,
    MaterialDesignModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule.forRoot()

  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
