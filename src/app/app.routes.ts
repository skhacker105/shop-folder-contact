import { Routes } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { AddEditContactGroupComponent } from './components/add-edit-contact-group/add-edit-contact-group.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'contact',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: ContactComponent
    },
    {
        path: 'addEditGroup',
        component: AddEditContactGroupComponent
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
