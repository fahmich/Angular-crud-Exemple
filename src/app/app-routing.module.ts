import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

 
const PersonsModule = () => import('./Persons/persons.module').then(x => x.PersonsModule);

const routes: Routes = [
    { path: '', loadChildren: PersonsModule },

    // otherwise redirect to home
    { path: '**', redirectTo: '' ,pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }