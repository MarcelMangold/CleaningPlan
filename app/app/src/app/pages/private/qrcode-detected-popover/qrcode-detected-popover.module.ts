import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { QrcodeDetectedPopoverPage } from './qrcode-detected-popover.page';

const routes: Routes = [
  {
    path: '',
    component: QrcodeDetectedPopoverPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [QrcodeDetectedPopoverPage]
})
export class QrcodeDetectedPopoverPageModule {}
