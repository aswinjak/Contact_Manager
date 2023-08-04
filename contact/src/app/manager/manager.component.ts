import { Component,OnInit } from '@angular/core';
import { Contacts } from '../contacts';
import { ContactService } from '../service/contact.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})

export class ManagerComponent implements OnInit {

  public loading:boolean = false;
  public contacts: Contacts[] = [];
  public errorMessage: string | null = null;

  constructor(private contservice:ContactService){
    
  }

  ngOnInit():void {
    this.getAllContactData();
  }

  getAllContactData() {
    this.loading = true;
    this.contservice.getAllContact().subscribe((data:Contacts[])=>{
      this.contacts = data;
      this.loading = false;
    },(error)=>{
      this.errorMessage = error;
      this.loading = false;
    });

  }

  deleteContact(contactId:string | undefined) {
    if(contactId)
    {
      this.contservice.deleteContact(contactId).subscribe((data:{})=>{
        this.getAllContactData();
      },(error)=>{
        this.errorMessage = error;
        this.loading = false;
      })
    }

  }

}
