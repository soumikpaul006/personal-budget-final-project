import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  message="";

  constructor(private http: HttpClient,private authenticationService : AuthenticationService){}

  ngOnInit(): void {
    this.authenticationService.checkSession().subscribe((data:any)=>{
      console.log(data);
      if(data){
        if(localStorage.getItem("user")){
          this.message = localStorage.getItem("user")  + " is logged in";
        }else{
          this.message="You are not logged in";
        }
      }
      else{
        this.message="You are not logged in";
      }
    });

  }
}



