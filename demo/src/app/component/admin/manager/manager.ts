import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-manager-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manager.html',
  styleUrl: './manager.css',
})
export class ManagerUsersComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];

  // Filters
  searchTerm = '';
  roleFilter = '';
  statusFilter = '';

  // Edit modal (Manager can only update — no add, no delete)
  showEditModal = false;
  editUserData: any = {};

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.adminService.getUsers().subscribe(data => {
      this.users = data;
      this.filteredUsers = [...data];
    });
  }

  filterUsers() {
    this.filteredUsers = this.users.filter(user => {
      const matchSearch =
        !this.searchTerm ||
        (user.name || '').toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (user.email || '').toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchRole =
        !this.roleFilter || user.role === this.roleFilter;

      const matchStatus =
        !this.statusFilter || user.status === this.statusFilter;

      return matchSearch && matchRole && matchStatus;
    });
  }

  editUser(user: any) {
    this.editUserData = { ...user };
    this.showEditModal = true;
  }

  // Uses existing saveUser() which handles both create & update via id presence
  updateUser() {
    this.adminService.saveUser(this.editUserData).subscribe(() => {
      this.loadUsers();
      this.closeModal();
    });
  }

  closeModal() {
    this.showEditModal = false;
    this.editUserData = {};
  }
}
