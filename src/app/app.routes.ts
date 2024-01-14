import { Routes } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { loadRemoteModule } from '@angular-architects/module-federation';

export const routes: Routes = [
    {
        path: '',
        component: ContactComponent
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
