import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // type: string = 'password';
  // isText: boolean = false;
  // eyeIcon: string = 'fa fa-eye-slash';

  public loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group(
      {
        femail: ['', [Validators.required, Validators.email]],
        fpassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      (err: string | number) => {
        console.log('Some Error Occured', +err);
      }
    );
  }

  logIn() {
    this.http.get<any>('http://localhost:3000/users').subscribe(
      (res) => {
        const user = res.find((a: any) => {
          console.log(a);
          console.log(this.loginForm.value.femail);
          return (
            a.femail === this.loginForm.value.femail &&
            a.fpassword === this.loginForm.value.fpassword
          );
        });
        if (user) {
          alert('Login Successfull!!!');
          this.loginForm.reset();
        } else {
          alert('User not Found');
        }
      },
      (err) => {
        alert('Some error occured');
        console.log(err);
      }
    );
  }
}

// hideShowpass() {
//   this.isText = !this.isText;
//   this.isText
//     ? (this.eyeIcon = 'fa fa-eye')
//     : (this.eyeIcon = 'fa fa-eye-slash');
//   this.isText ? (this.type = 'text') : (this.type = 'password');
// }
