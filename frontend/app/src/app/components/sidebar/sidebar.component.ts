import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

authenticated=false;
constructor(private AuthenticationService: AuthenticationService ){}


  ngOnInit(): void {
    this.AuthenticationService.checkSession().subscribe((data:any)=>{
      console.log(data);
      this.authenticated = data;
    }
    );
  }

}
