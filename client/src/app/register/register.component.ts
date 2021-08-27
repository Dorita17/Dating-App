import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter<boolean>();

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  register(registerForm: NgForm) {
    var registerFormValues = registerForm.value;
    this.accountService.register(registerFormValues).subscribe(
      response => {
        console.log(response);
        this.cancel();
      }, error => {
        console.log(error);
      }
    );
    
  }

  cancel() {
    this.cancelRegister.emit(true);
  }

}
