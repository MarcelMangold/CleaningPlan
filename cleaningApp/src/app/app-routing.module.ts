import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'today', loadChildren: './today/today.module#TodayPageModule' },
  { path: 'week', loadChildren: './week/week.module#WeekPageModule' },
  { path: 'month', loadChildren: './month/month.module#MonthPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
