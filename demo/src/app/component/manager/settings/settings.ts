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
  // Load manager email from localStorage (set at login)
  managerEmail = localStorage.getItem('managerEmail') || 'manager@glamfit.com';

  manager = {
    name: localStorage.getItem('managerName') || 'Manager User',
    email: this.managerEmail,
    role: 'Manager Access',
    avatar: 'MG'
  };

  passwords = { current: '', new: '', confirm: '' };

  profileSuccess = '';
  profileError   = '';
  passwordSuccess = '';
  passwordError   = '';

  constructor(private adminService: AdminService) {}

  updateProfile() {
    this.profileSuccess = '';
    this.profileError   = '';
    const body = { name: this.manager.name, email: this.manager.email, oldEmail: this.managerEmail };
    this.adminService.updateProfile(body).subscribe({
      next: () => {
        localStorage.setItem('managerName', this.manager.name);
        if (this.manager.email !== this.managerEmail) {
          localStorage.setItem('managerEmail', this.manager.email);
          this.managerEmail = this.manager.email;
        }
        this.manager.avatar = this.manager.name.charAt(0).toUpperCase();
        this.profileSuccess = 'Profile updated successfully!';
      },
      error: (err) => {
        this.profileError = err?.error || 'Failed to update profile.';
      }
    });
  }

  changePassword() {
    this.passwordSuccess = '';
    this.passwordError   = '';
    if (this.passwords.new !== this.passwords.confirm) {
      this.passwordError = 'New passwords do not match!';
      return;
    }
    if (this.passwords.new.length < 6) {
      this.passwordError = 'Password must be at least 6 characters.';
      return;
    }
    const body = {
      email: this.managerEmail,
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
