import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { Ng2PaginationModule } from 'ng2-pagination';//module pour la pagination
import { InfiniteScrollModule } from 'angular2-infinite-scroll';//module pour l'infinite scroll
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';//module pour l'auto-complétion

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, 
    Ng2PaginationModule,
    InfiniteScrollModule,
    Ng2AutoCompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
