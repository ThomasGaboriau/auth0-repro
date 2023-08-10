import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuardFn } from '@auth0/auth0-angular';
import { ForbiddenComponent } from './forbidden/forbidden.component';

const routes: Routes = [
    {
        path: 'forbidden',
        component: ForbiddenComponent
    },
    {
        path: '',
        loadChildren: () => import('./core/core.module').then(m => m.CoreModule),
        title: 'title',
        canActivate: [authGuardFn]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
