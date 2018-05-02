import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusyModule } from 'angular2-busy';
import { TdDataTableService } from '@covalent/core/data-table';
import { CovalentDialogsModule, TdDialogService, TdConfirmDialogComponent } from '@covalent/core/dialogs';
import { ToastrService } from 'ngx-toastr';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UsersComponent } from './users/users.component';
import { UsersService } from './users.service';

@NgModule({
  imports: [
    CommonModule,
    BusyModule,
    UsersRoutingModule,
    SharedModule 
  ],
  declarations: [CreateUserComponent, UpdateUserComponent, UsersComponent],
  providers: [UsersService,TdDataTableService,TdDialogService,ToastrService]
})
export class UsersModule { }
