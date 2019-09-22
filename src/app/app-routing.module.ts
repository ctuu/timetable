import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { EventComponent } from './views/event/event.component';
import { EventEditComponent } from './views/event-edit/event-edit.component';
import { ImportExportComponent } from './views/import-export/import-export.component';
import { AboutComponent } from './views/about/about.component';


const routes: Routes = [
  { path: "", component: HomeComponent, data: { animation: 'view' } },
  { path: "import-export", component: ImportExportComponent, data: { animation: 'view' } },
  { path: "about", component: AboutComponent, data: { animation: 'view' } },
  { path: "event/:id", component: EventComponent, data: { animation: 'com' } },
  { path: "event/:id/edit/:sid", component: EventEditComponent, data: { animation: 'edit' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
