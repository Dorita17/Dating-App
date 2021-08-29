import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  // loggedIn: boolean;
  currentUser$: Observable<User>;

  constructor(private accountService: AccountService, private router: Router,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    // this.getCurrentUser();
    this.currentUser$ = this.accountService.currentUser$;
  }

  login(loginForm: NgForm) {
    var credentials = loginForm.value;
    this.accountService.login(credentials).subscribe(response => {
      this.router.navigateByUrl('/members');
    })
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
    // this.loggedIn = false;
  }

  // getCurrentUser() {
  //   this.accountService.currentUser$.subscribe(user => {
  //     if(user) {
  //       this.loggedIn = true;
  //     } else {
  //       this.loggedIn = false;
  //     }
  //   }, error => {
  //     console.log(error);
  //   })
  // }
}
