import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from 'src/app/emitters/emitter';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  message="";

  constructor(private http: HttpClient){}

  ngOnInit(): void {

    this.http.get("http://localhost:3000/api/user", {withCredentials: true})
    .subscribe((res:any)=>{
        this.message = `Hi ${res.name}`;
        Emitters.authEmitter.emit(true)
      },
      (err) => {
        console.log(err);
        this.message = `An error occurred while fetching user data. Please try again.`;
        Emitters.authEmitter.emit(false);
      }
    );
  }
}



