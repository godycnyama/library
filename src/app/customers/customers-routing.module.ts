import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { CustomersComponent } from './customers/customers.component';

const routes: Routes = [
  { path: '', component: CustomersComponent },
  { path: 'create-customer', component: CreateCustomerComponent },
  { path: 'create-customer', component: UpdateCustomerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
