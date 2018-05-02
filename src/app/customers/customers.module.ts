import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusyModule } from 'angular2-busy';
import { TdDataTableService } from '@covalent/core/data-table';
import { CovalentDialogsModule, TdDialogService, TdConfirmDialogComponent } from '@covalent/core/dialogs';
import { ToastrService } from 'ngx-toastr';
import { CustomersRoutingModule } from './customers-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomersService } from './customers.service';

@NgModule({
  imports: [
    CommonModule,
    BusyModule,
    CustomersRoutingModule,
    SharedModule
  ],
  declarations: [CreateCustomerComponent, UpdateCustomerComponent, CustomersComponent],
  providers: [CustomersService,TdDataTableService,TdDialogService,ToastrService]
})
export class CustomersModule { }
