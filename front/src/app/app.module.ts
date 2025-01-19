import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './person/home/home.component';
import { ModalComponent } from './modal/modal.component';
import { EditComponent } from './person/edit/edit.component';
import {CreateComponent} from "./person/create/create.component";
import { DeleteComponent } from './person/delete/delete.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ModalComponent,
    CreateComponent,
    EditComponent,
    DeleteComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
