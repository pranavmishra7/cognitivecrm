import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../services/config/client-service.service';
import { ImfResponse } from '../models/FieldConfig';
import { ClientDto } from '../models/clientDto';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class ClientRegisterComponent {
  registerForm: FormGroup;
  logoPreview: string | null = null;

  constructor(private fb: FormBuilder, private clientService: ClientService) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      logoBase64: [''],
      userName: ['', Validators.required],
      userPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      zipCode: ['', Validators.required]
    });
  }

  onLogoUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.logoPreview = reader.result as string;
        this.registerForm.patchValue({ logoBase64: this.logoPreview });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const client: ClientDto = this.registerForm.value;
      this.clientService.create(client).subscribe({
        next: (res: ImfResponse<ClientDto>) => {
          if (res.success) {
            alert('✅ Client registered successfully!');
            this.registerForm.reset();
            this.logoPreview = null;
          } else {
            alert('❌ Error: ' + res.message);
          }
        },
        error: (err) => {
          console.error(err);
          alert('❌ API error');
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
