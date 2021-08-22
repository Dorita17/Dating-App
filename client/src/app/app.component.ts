import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Dating App';
  users: any[] = [];
  apiUrl: string = 'http://localhost:5000/api/';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get(this.apiUrl + 'users').subscribe((data: any[]) => {
      this.users = data;
      console.log(this.users);
    }, error => {
      console.log(error);
    })
  }
}
