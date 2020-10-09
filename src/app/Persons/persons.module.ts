import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PersonsRoutingModule } from './persons-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';
import { DetailsPersonComponent } from './details-person/details-person.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PersonsRoutingModule
    ],
    declarations: [
        LayoutComponent,
        ListComponent,
        AddEditComponent,
        DetailsPersonComponent
    ]
})
export class PersonsModule { }