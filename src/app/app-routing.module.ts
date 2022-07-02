import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from './admin-auth.guard';
import { AnalyticsComponent } from './Components/analytics/analytics.component';
import { AddUpdateBrandComponent } from './Components/brands/add-update-brand/add-update-brand.component';
import { BrandDetailesComponent } from './Components/brands/brand-detailes/brand-detailes.component';
import { BrandsComponent } from './Components/brands/brands.component';
import { CategoriesComponent } from './Components/Categories/categoryies.component';
import { HomeComponent } from './Components/Home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { ProductsComponent } from './Components/products/products.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { SellersComponent } from './Components/sellers/sellers.component';
import { UsersComponent } from './Components/users/users.component';
import { WebConfigComponent } from './Components/web-config/web-config.component';

const routes: Routes = [
  {path: '', component: MainLayoutComponent, canActivate:[AdminAuthGuard], children:[
    {path: '', redirectTo:'/Home', pathMatch:'full'},
    {path: 'Home', component:HomeComponent},
    {path: 'Products', component:ProductsComponent},
    {path: 'Categories', component:CategoriesComponent},
    {path: 'Users', component: UsersComponent},
    {path: 'Sellers', component: SellersComponent},
    {path: 'Brands', component: BrandsComponent},
    {path: 'Brand/:id', component: BrandDetailesComponent},
    {path: 'SaveBrand/:id', component: AddUpdateBrandComponent},
    {path: 'SaveBrand', component: AddUpdateBrandComponent},
    {path: 'Analytics', component: AnalyticsComponent},
    {path: 'Profile', component: ProfileComponent},
    {path: 'WebSite', component: WebConfigComponent}
  ]},
  {path: 'Login', component:LoginComponent},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
