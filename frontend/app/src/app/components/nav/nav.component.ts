import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppConstant } from 'src/app/app.constant';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  authenticated=false;

  constructor(private http:HttpClient,private authenticationService : AuthenticationService){}

  ngOnInit(): void {
    this.authenticationService.checkSession().subscribe((data:any)=>{
      console.log(data);
      this.authenticated = data;
    });
  }

  logout():void{
    this.http.post(`${AppConstant.API_URL}/logout`,{},{withCredentials:true})
    .subscribe(()=>
    {
      this.authenticated = false
      this.authenticationService.removeSession();
    })
  }

}
