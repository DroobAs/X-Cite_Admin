import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Component/navbar/navbar.component';
import { SidebarComponent } from './Component/sidebar/sidebar.component';
import { MainSectionComponent } from './Component/main-section/main-section.component';

import { NotFoundComponent } from './Component/not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditAndUpdateComponent } from './Component/edit-and-update/edit-and-update.component';
import { SellersComponent } from './Component/sellers/sellers.component';
import { CustomersComponent } from './Component/customers/customers.component';
import { ProductsComponent } from './Component/products/products.component';
import { CategoryiesComponent } from './Component/categoryies/categoryies.component';
@NgModule({
  declarations: [
    SidebarComponent,
    AppComponent,
    NavbarComponent,
    MainSectionComponent,

    NotFoundComponent,
     EditAndUpdateComponent,
     SellersComponent,
     CustomersComponent,
     ProductsComponent,
     CategoryiesComponent,
  ],
  imports: [
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
