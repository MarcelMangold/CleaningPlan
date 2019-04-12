import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsidePage } from './inside.page';

const routes: Routes = [
    {
        path: 'inside',
        component: InsidePage,
        children:
            [
                {
                    path: 'inside',
                    children:
                        [
                            {
                                path: 'inside',
                                loadChildren: '../inside/inside.module#InsidePageModule'
                            }
                        ]
                },
                {
                    path: 'settings',
                    children:
                        [
                            {
                                path: 'inside',
                                loadChildren: '../settings/settings.module#SettingsPageModule'
                            }
                        ]
                },
                {
                    path: 'inside',
                    redirectTo: 'inside',
                    pathMatch: 'full'
                }
            ]
    },
    {
        path: 'inside',
        redirectTo: '/inside',
        pathMatch: 'full'
    }
];

@NgModule({
    imports:
        [
            RouterModule.forChild(routes)
        ],
    exports:
        [
            RouterModule
        ]
})
export class TabsPageRoutingModule { }