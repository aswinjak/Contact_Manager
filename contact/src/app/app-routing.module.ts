import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddContactComponent } from './add-contact/add-contact.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { ManagerComponent } from './manager/manager.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ViewContactComponent } from './view-contact/view-contact.component';

const routes: Routes = [
  {path:'', redirectTo:'/contact/admin', pathMatch:'full'},
  {path:'contact/admin', component:ManagerComponent},
  {path:'contact/add', component:AddContactComponent},
  {path:'contact/edit/:contactId', component:EditContactComponent},
  {path:'contact/view/:contactId', component:ViewContactComponent},
  {path:'**', component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
