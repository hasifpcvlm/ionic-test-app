import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PickupcallsPageRoutingModule } from './pickupcalls-routing.module';

import { PickupcallsPage } from './pickupcalls.page';
import { PickupCallCardComponent } from 'src/app/components/pickup-call-card/pickup-call-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PickupcallsPageRoutingModule
  ],
  declarations: [
    PickupcallsPage,
    PickupCallCardComponent]
})
export class PickupcallsPageModule { }
