import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contacts } from '../contacts';
import { Mygroup } from '../mygroup';
import { ContactService } from '../service/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  public loading:boolean = false;
  public contactId:string | null = null;
  public contact:Contacts = {} as Contacts;
  public errorMessage: string | null = null;
  public groups:Mygroup[] = [] as Mygroup[];

  constructor(private active:ActivatedRoute, private cont:ContactService, private router:Router) {}

  ngOnInit(): void {
    this.active.paramMap.subscribe((param)=>{
      this.contactId = param.get('contactId')
    });
    if(this.contactId)
    {
      this.loading = true;
      this.cont.getContact(this.contactId).subscribe((data:Contacts)=>{
        this.contact = data;
        this.loading = false;
        this.cont.getAllGroups().subscribe((data:Mygroup[])=>{
          this.groups = data;
        })
      },(error)=>{
        this.errorMessage = error;
        this.loading = false;
      });
    } 
      
  }

  public submitUpdate() {
    if(this.contactId)
    {
      this.cont.updateContact(this.contact, this.contactId).subscribe((data:Contacts)=>{
        this.router.navigate(['/']).then();
      },(error)=>{
        this.errorMessage = error;
        this.router.navigate([`/contact/edit/${this.contact}`]).then();
      })
    }

  }

}
