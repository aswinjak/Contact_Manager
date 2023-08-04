import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contacts } from '../contacts';
import { Mygroup } from '../mygroup';
import { ContactService } from '../service/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit{

  public loading:boolean = false;
  public contact:Contacts = {} as Contacts;
  public errorMessage: string | null = null;
  public groups:Mygroup[] = [] as Mygroup[];

  constructor(private cont:ContactService, private router:Router) {}

  ngOnInit(): void {
      this.cont.getAllGroups().subscribe((data:Mygroup[])=>{
        this.groups = data;
      },(error)=>{
        this.errorMessage = error;
      })
  }

  public addSubmit(){
    this.cont.createContact(this.contact).subscribe((data:Contacts)=>{
      this.router.navigate(['/']).then();
    },(error)=>{
      this.errorMessage = error;
      this.router.navigate(['/contact/add']).then();
    })
  }
}
