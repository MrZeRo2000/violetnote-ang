import {AfterViewInit, Component, ElementRef, inject, ViewChild} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-password',
    imports: [
      FormsModule,
      ReactiveFormsModule,
      MatButtonModule,
      MatIconModule,
      MatFormFieldModule,
      MatInputModule,
    ],
  templateUrl: './password.html',
  styleUrl: './password.scss'
})
export class Password implements AfterViewInit {
  @ViewChild('passwordInput') passwordInput!: ElementRef;

  fb = inject(FormBuilder)

  passwordForm = this.fb.group({
    passwordControl: ['', Validators.required],
  })

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.passwordInput.nativeElement.focus();
    }, 0);
  }

  onPasswordInput(): void {
    if (this.passwordForm.valid) {
      console.log(`Input password: ${this.passwordForm.value.passwordControl}`)
    } else {
      console.error('Invalid form')
    }
  }
}
