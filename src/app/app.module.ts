import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { forwardRef, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule, MatInputModule,
  MatSelectModule,
  MatStepperModule,
  MatTooltipModule
} from '@angular/material';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UploadPageComponent } from './images-list/upload-page/upload-page.component';
import { ImagesListComponent } from './images-list/images-list.component';
import { ImageComponent } from './images-list/image/image.component';
import { FileDropModule } from 'ngx-file-drop';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AddHeaderInterceptor } from './services/interceptors';

@NgModule({
  declarations: [
    AppComponent,
    UploadPageComponent,
    ImagesListComponent,
    HomeComponent,
    ImageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    FontAwesomeModule,
    FormsModule,
    FileDropModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    HttpClientModule,
    MatInputModule,
    MatTooltipModule,
    MatSelectModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddHeaderInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
