import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';

import {
  CovalentDataTableModule, CovalentMediaModule, CovalentLoadingModule,
  CovalentNotificationsModule, CovalentLayoutModule, CovalentMenuModule,
  CovalentPagingModule, CovalentSearchModule, CovalentStepsModule,
  CovalentCommonModule, CovalentDialogsModule,
} from '@covalent/core';
import {
  MatAutocompleteModule,MatButtonModule,MatButtonToggleModule,
  MatCardModule,MatCheckboxModule,MatChipsModule,
  MatDatepickerModule,MatDialogModule,MatExpansionModule,
  MatGridListModule,MatIconModule,MatInputModule,
  MatListModule,MatMenuModule,MatNativeDateModule,MatPaginatorModule,
  MatProgressBarModule,MatProgressSpinnerModule,MatRadioModule,MatRippleModule,MatSelectModule,
  MatSidenavModule,MatSliderModule,MatSlideToggleModule,MatSnackBarModule,MatSortModule,
  MatTableModule,MatTabsModule,MatToolbarModule,MatTooltipModule, MatStepperModule
} from '@angular/material';


const ANGULAR_MODULES: any[] = [
  FormsModule, ReactiveFormsModule
];

const MATERIAL_MODULES: any[] = [
  MatAutocompleteModule,MatButtonModule,MatButtonToggleModule,MatCardModule,
  MatCheckboxModule,MatChipsModule,MatDatepickerModule,MatDialogModule,
  MatExpansionModule,MatGridListModule,MatIconModule,MatInputModule,MatListModule,
  MatMenuModule,MatNativeDateModule,MatPaginatorModule,MatProgressBarModule,
  MatProgressSpinnerModule,MatRadioModule,MatRippleModule,MatSelectModule,
  MatSidenavModule,MatSliderModule,MatSlideToggleModule,MatSnackBarModule,
  MatSortModule,MatTableModule,MatTabsModule,MatToolbarModule,
  MatTooltipModule,MatStepperModule
];

const COVALENT_MODULES: any[] = [
  CovalentDataTableModule, CovalentMediaModule, CovalentLoadingModule,
  CovalentNotificationsModule, CovalentLayoutModule, CovalentMenuModule,
  CovalentPagingModule, CovalentSearchModule, CovalentStepsModule,
  CovalentCommonModule, CovalentDialogsModule,
];


@NgModule({
  imports: [
    CommonModule,
    ANGULAR_MODULES,
    MATERIAL_MODULES,
    COVALENT_MODULES
  ],
  declarations: [],
  exports: [
    ANGULAR_MODULES,
    MATERIAL_MODULES,
    COVALENT_MODULES
  ],
})
export class SharedModule { }
