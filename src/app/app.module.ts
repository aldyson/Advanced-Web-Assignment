import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { ListedItemsComponent } from './listed-items/listed-items.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { SoldItemsComponent } from './sold-items/sold-items.component';
import { SearchComponent } from './search/search.component';
import { AlertsComponent } from './alerts/alerts.component';
import { FavouritesComponent } from './favourites/favourites.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'listed-items', component: ListedItemsComponent },
  { path: 'sold-items', component: SoldItemsComponent },
  { path: 'search', component: SearchComponent },
  { path: 'alerts', component: AlertsComponent },
  { path: 'favourites', component: FavouritesComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ListedItemsComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    SoldItemsComponent,
    SearchComponent,
    AlertsComponent,
    FavouritesComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
