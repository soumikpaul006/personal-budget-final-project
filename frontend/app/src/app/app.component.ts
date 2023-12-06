import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'app';
  authenticated=false;
 constructor(private authenticationService : AuthenticationService ){}

  ngOnInit(): void {
    this.authenticationService.checkSession().subscribe((data:any)=>{
      console.log(data);
      this.authenticated = data;
    }
    );

  }

}



