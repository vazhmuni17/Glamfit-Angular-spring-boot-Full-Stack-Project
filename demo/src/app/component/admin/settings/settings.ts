import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class SettingsComponent {
  // Load admin email from localStorage (set at login)
  adminEmail = localStorage.getItem('adminEmail') || 'glamfit41@gmail.com';

  admin = {
    name: localStorage.getItem('adminName') || 'Super Admin',
    email: this.adminEmail,
    role: 'Full Access',
    avatar: 'AD'
  };

  passwords = { current: '', new: '', confirm: '' };

  profileSuccess = '';
  profileError = '';
  passwordSuccess = '';
  passwordError = '';

  constructor(private adminService: AdminService) { }

  updateProfile() {
    this.profileSuccess = '';
    this.profileError = '';
    const body = { name: this.admin.name, email: this.admin.email, oldEmail: this.adminEmail };
    this.adminService.updateProfile(body).subscribe({
      next: () => {
        localStorage.setItem('adminName', this.admin.name);
        if (this.admin.email !== this.adminEmail) {
          localStorage.setItem('adminEmail', this.admin.email);
          this.adminEmail = this.admin.email;
        }
        this.admin.avatar = this.admin.name.charAt(0).toUpperCase();
        this.profileSuccess = 'Profile updated successfully!';
      },
      error: (err) => {
        this.profileError = err?.error || 'Failed to update profile.';
      }
    });
  }

  changePassword() {
    this.passwordSuccess = '';
    this.passwordError = '';
    if (this.passwords.new !== this.passwords.confirm) {
      this.passwordError = 'New passwords do not match!';
      return;
    }
    if (this.passwords.new.length < 6) {
      this.passwordError = 'Password must be at least 6 characters.';
      return;
    }
    const body = {
      email: this.adminEmail,
      currentPassword: this.passwords.current,
      newPassword: this.passwords.new
    };
    this.adminService.changePassword(body).subscribe({
      next: () => {
        this.passwordSuccess = 'Password changed successfully!';
        this.passwords = { current: '', new: '', confirm: '' };
      },
      error: (err) => {
        this.passwordError = err?.error || 'Current password is incorrect.';
      }
    });
  }
}
