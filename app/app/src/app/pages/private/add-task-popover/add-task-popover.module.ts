import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddTaskPopoverPage } from './add-task-popover.page';

const routes: Routes = [
  {
    path: '',
    component: AddTaskPopoverPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddTaskPopoverPage]
})
export class AddTaskPopoverPageModule {}
