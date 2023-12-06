import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstant } from 'src/app/app.constant';
import { AuthenticationService } from 'src/app/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authenticationService : AuthenticationService
  ){}

  ngOnInit():void{
    this.form=this.formBuilder.group({
      email:'',
      password:'',
    });
  }


  ValidateEmail = (email: any) => {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(email.match(validRegex))
    {
      return true;
    }
    else {
      return false;
    }
  }

  submit():void{
    let user = this.form.getRawValue()
    console.log(user)

    if(user.email==""||user.password=="")
    {
      Swal.fire("Error","Please enter all the required fields")
    }
    else if(!this.ValidateEmail(user.email))
    {
      Swal.fire("Error", "Please enter a valid email","error")
    }
    else
    {
      this.http.post(`${AppConstant.API_URL}/login`,user,{withCredentials:true})
      .subscribe(
        (user:any)=>{

          Swal.fire("Success","User registered successfully","success")
          console.log(user);
          localStorage.setItem("jwt",user.token);
          localStorage.setItem("user",user.user);
          this.authenticationService.setSession(user.token);

          this.router.navigate(['/'])


        },(error)=>{
          console.log(error)
          Swal.fire("Error",error.error.message,"error")
        } )
      }
  }
}
