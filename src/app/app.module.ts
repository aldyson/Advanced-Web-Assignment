import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from "@angular/router";
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';

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
import { FilterPipe } from "./shared/filter.pipe";
import { AuthGuard } from "./auth/auth-guard.service";

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'listed-items', component: ListedItemsComponent, canActivate: [AuthGuard] },
  { path: 'sold-items', component: SoldItemsComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'alerts', component: AlertsComponent, canActivate: [AuthGuard] },
  { path: 'favourites', component: FavouritesComponent, canActivate: [AuthGuard] },
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
    FavouritesComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBs0YDk89cCTI27610G9O0CGtFx7oMSyx0',
      libraries: ["places"]
    }),
    AgmJsMarkerClustererModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
