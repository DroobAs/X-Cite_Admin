import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './Component/not-found/not-found.component';

import { MainSectionComponent } from './Component/main-section/main-section.component';
import { EditAndUpdateComponent } from './Component/edit-and-update/edit-and-update.component';
import { CustomersComponent } from './Component/customers/customers.component';
import { SellersComponent } from './Component/sellers/sellers.component';
import { ProductsComponent } from './Component/products/products.component';
import { CategoryiesComponent } from './Component/categoryies/categoryies.component';

const newLocal = "products";
const routes: Routes = [
  {path:"",redirectTo:"/home",pathMatch:"full"},
  {path:"home",component:MainSectionComponent},
  {path:"edit", component: EditAndUpdateComponent},
  {path:"customers", component: CustomersComponent},
  {path:"sellers", component: SellersComponent},
  {path:"products", component: ProductsComponent},
  {path:"categories", component: CategoryiesComponent},
  {path:"**",component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
