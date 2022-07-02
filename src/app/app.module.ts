import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './Components/Home/home.component';
import { SideBarComponent } from './Components/sideBar/side-bar.component';
import { HeaderComponent } from './Components/Header/header.component';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { AnalyticsComponent } from './Components/analytics/analytics.component';
import { ProductsComponent } from './Components/products/products.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { SellersComponent } from './Components/sellers/sellers.component';
import { UsersComponent } from './Components/users/users.component';
import { BrandsComponent } from './Components/brands/brands.component';
import { LoginComponent } from './Components/login/login.component';
import { FooterComponent } from './Components/footer/footer.component';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import {provideAuth , getAuth} from "@angular/fire/auth"
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule, SETTINGS } from '@angular/fire/compat/firestore';
import { BrandDetailesComponent } from './Components/brands/brand-detailes/brand-detailes.component';
import { AddUpdateBrandComponent } from './Components/brands/add-update-brand/add-update-brand.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SideBarComponent,
    HeaderComponent,
    MainLayoutComponent,
    AnalyticsComponent,
    ProductsComponent,
    ProfileComponent,
    SellersComponent,
    UsersComponent,
    BrandsComponent,
    LoginComponent,
    FooterComponent,
    BrandDetailesComponent,
    AddUpdateBrandComponent
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatSidenavModule,
    MatDividerModule,
    CommonModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideAuth(()=> getAuth()),
    provideFirestore(()=> getFirestore()),
    AngularFireDatabaseModule,
    AngularFirestoreModule
  ],
  providers: [
    {provide: SETTINGS, useValue:{}},
    AngularFirestore
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
