import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contacts } from '../contacts';
import { Mygroup } from '../mygroup';
import { ContactService } from '../service/contact.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {
  public contactId:string | null = null;
  public loading:boolean = false;
  public contact:Contacts = {} as Contacts;
  public errorMessage: string | null = null;
  public group:Mygroup = {} as Mygroup;

  constructor(private active:ActivatedRoute, private cont:ContactService) {}

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
        this.cont.getGroup(data).subscribe((data:Mygroup)=>{
          this.group = data;
        })
      },(error)=>{
        this.errorMessage = error;
        this.loading = false;
      });
    } 
  }

  public isNotEmpty() {
    return Object.keys(this.contact).length > 0 && Object.keys(this.group).length > 0;
  }

}
