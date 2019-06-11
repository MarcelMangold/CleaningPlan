import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../../../services/auth-guard.service';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [

    {
        path: '',
        component: TabsPage,
        canActivate: [AuthGuardService],
        children: [
            {
                path: 'home',
                loadChildren: '../home/home.module#HomePageModule'
            },
            {
                path: 'settings',
                loadChildren: '../settings/settings.module#SettingsPageModule'
            },
            {
                path: 'shopping-list',
                loadChildren: '../shopping-list/shopping-list.module#ShoppingListPageModule'
            },
            {
                path: 'calendar',
                loadChildren: '../calendar/calendar.module#CalendarPageModule'
            },
            {
                path: '',
                redirectTo: '/tabs/home',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [TabsPage]
})
export class TabsPageModule { }
