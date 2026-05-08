import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  showAddModal = false;
  newUser: any = {
    name: '',
    email: '',
    phone: '',
    role: 'Trainee',
    status: 'ACTIVE',
    password: '',
    id: undefined
  };

  searchTerm = '';
  selectedRole = 'All Roles';
  selectedStatus = 'All Status';

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.adminService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  saveUser() {
    this.adminService.saveUser(this.newUser).subscribe(() => {
      this.loadUsers();
      this.closeModal();
    });
  }

  openModal() {
    this.showAddModal = true;
    this.newUser = { name: '', email: '', phone: '', role: 'Trainee', status: 'ACTIVE', password: '', id: undefined };
  }

  editUser(user: any) {
    this.newUser = { ...user };
    this.showAddModal = true;
  }

  closeModal() {
    this.showAddModal = false;
    this.newUser = {
      name: '',
      email: '',
      phone: '',
      role: 'Trainee',
      status: 'ACTIVE',
      password: '',
      id: undefined
    };
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.adminService.deleteUser(id).subscribe(() => {
        this.loadUsers();
      });
    }
  }

  toggleStatus(user: any) {
    const newStatus = user.status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE';
    this.adminService.updateUserStatus(user.id, newStatus).subscribe(() => {
      user.status = newStatus;
    });
  }

  get filteredUsers() {
    return this.users.filter(user => {
      const matchesSearch = !this.searchTerm || 
        (user.name?.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
        (user.email?.toLowerCase().includes(this.searchTerm.toLowerCase()));
      
      const matchesRole = this.selectedRole === 'All Roles' || 
        user.role?.toUpperCase() === this.selectedRole.toUpperCase();
      
      const matchesStatus = this.selectedStatus === 'All Status' || 
        user.status?.toUpperCase() === this.selectedStatus.toUpperCase();

      // Hide ADMIN role users from the list
      const isNotAdmin = user.role?.toUpperCase() !== 'ADMIN';

      return matchesSearch && matchesRole && matchesStatus && isNotAdmin;
    });
  }
}
