import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

import { Contact } from './../model/contact.model';
import { FirebaseService } from './../services/firebase.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  createContactForm!: FormGroup;
  @ViewChild('createForm') createForm!: FormGroupDirective;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
  this.createContactForm = new FormGroup({
    'name':  new FormControl('', Validators.required),
    'lastname':  new FormControl('', Validators.required),
    'phone':  new FormControl('', Validators.required),
    'email':  new FormControl('', Validators.required),
    'category':  new FormControl('', Validators.required),
  });

  }

  OnSubmit() {

  }

  createContact(values: any) {
    //copiar
    let newContact:Contact = {...values};
    this.firebaseService.save(newContact);
    console.log(newContact);
    this.createForm.reset();
  }

}
