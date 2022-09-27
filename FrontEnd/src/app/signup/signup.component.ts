import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group(
      {
        fname: ['', [Validators.required]],
        femail: ['', [Validators.required, Validators.email]],
        fpassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      (err: string | number) => {
        console.log('Some Error occured', +err);
      }
    );
  }

  signUp() {
    console.log(this.signupForm.value);
    this.http
      .post<any>('http://localhost:3000/users', this.signupForm.value)
      .subscribe((res) => {
        console.log(res);
        alert('Signup successfull');
        // this.route.navigate(['/home']);
      });
  }
}
