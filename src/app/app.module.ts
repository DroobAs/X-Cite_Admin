import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { Injectable } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './Components/Home/home.component';
import { SideBarComponent } from './Components/sideBar/side-bar.component';
import { HeaderComponent } from './Components/Header/header.component';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { AnalyticsComponent } from './Components/analytics/analytics.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { SellersComponent } from './Components/sellers/sellers.component';
import { UsersComponent } from './Components/users/users.component';
import { BrandsComponent } from './Components/brands/brands.component';
import { LoginComponent } from './Components/login/login.component';
import { FooterComponent } from './Components/footer/footer.component';
import { BrandDetailesComponent } from './Components/brands/brand-detailes/brand-detailes.component';
import { AddUpdateBrandComponent } from './Components/brands/add-update-brand/add-update-brand.component';
import { PiachartComponent } from './Components/Home/piachart/piachart.component';
import { CharttwoComponent } from './Components/Home/charttwo/charttwo.component';
import { OrdersComponent } from './Components/orders/orders.component';
import { CategoriesComponent } from './Components/Categories/categories.component';
import { UpdateSellerComponent } from './Components/sellers/update-seller/update-seller.component';
import { AddUpdateProductComponent } from './Components/products/add-update-product/add-update-product.component';
import { ProductDetailsComponent } from './Components/products/product-details/product-details.component';
import { ProductsComponent } from './Components/products/products.component';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';

import { environment } from 'environments/environment';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import {AngularFirestoreModule, SETTINGS} from '@angular/fire/compat/firestore';

import { SearchPipe } from './pipes/search.pipe';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
  declarations: [
    // NgModule,
    AppComponent,
    HomeComponent,
    SideBarComponent,
    FooterComponent,
    MainLayoutComponent,
    AnalyticsComponent,
    ProfileComponent,
    UsersComponent,
    CategoriesComponent,
    // injected========================
    HeaderComponent,
    SellersComponent,
    UpdateSellerComponent,
    LoginComponent,
    BrandsComponent,
    BrandDetailesComponent,
    AddUpdateBrandComponent,
    ProductsComponent,
    ProductDetailsComponent,
    AddUpdateProductComponent,
    // =================================
    OrdersComponent,
    PiachartComponent,
    CharttwoComponent,
    SearchPipe
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
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    AngularFireStorageModule,
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    RouterModule,
    NgSelectModule
    // NgSelectModule
    // Injectable
  ],
  providers: [
    { provide: SETTINGS, useValue: {} },
    AngularFirestore,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
