import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CocktailsComponent } from './cocktails/cocktails.component';
import { FormsModule } from '@angular/forms';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { SortFilterPipe } from './pipes/sort-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CocktailsComponent,
    SearchFilterPipe,
    SortFilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
