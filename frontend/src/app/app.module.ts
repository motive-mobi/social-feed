import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
/*import { Router } from '@angular/router';*/
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

/*const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./app.component').then(m => m.CustomersModule)
  }
];*/

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    /*RouterModule.forRoot(routes)*/
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
