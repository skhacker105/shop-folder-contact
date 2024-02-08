import { Routes } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { AddEditContactGroupComponent } from './components/add-edit-contact-group/add-edit-contact-group.component';
import { ContactGroupComponent } from './components/contact-group/contact-group.component';


export const childRoutes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: ContactComponent
    },
    {
        path: 'groups',
        component: ContactGroupComponent
    },
    {
        path: 'addEditGroup',
        component: AddEditContactGroupComponent
    }
]; 

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'contact/home',
        pathMatch: 'full'
    },
    {
        path: 'contact',
        children: childRoutes
    },
    {
        path: 'login',
        loadChildren: () => loadRemoteModule({
            type: 'module',
            remoteEntry: 'http://localhost:4300/remoteEntry.js',
            exposedModule: './routes'
        }).then(m => m.routes)
    }
];