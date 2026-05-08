import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GalleryService, GalleryItem } from '../../../services/gallery.service';

@Component({
  selector: 'app-admin-gallery',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class GalleryAdminComponent implements OnInit {
  galleryItems: GalleryItem[] = [];
  isEditing = false;
  currentItem: GalleryItem = {
    type: 'GALLERY',
    image: '',
    title: '',
    description: ''
  };

  constructor(private galleryService: GalleryService) {}

  ngOnInit() {
    this.loadGallery();
  }

  loadGallery() {
    this.galleryService.getAll('GALLERY').subscribe(data => {
      this.galleryItems = data;
    });
  }

  editItem(item: GalleryItem) {
    this.currentItem = { ...item };
    this.isEditing = true;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.currentItem.image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  saveItem() {
    this.galleryService.save(this.currentItem).subscribe({
      next: () => {
        this.loadGallery();
        this.cancelEdit();
      },
      error: (err) => {
        console.error('Save gallery item failed:', err);
        alert('Failed to save gallery item. Please check your permissions.');
      }
    });
  }

  deleteItem(id: number | undefined) {
    if (id && confirm('Delete this gallery item?')) {
      this.galleryService.delete(id).subscribe(() => {
        this.loadGallery();
      });
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.currentItem = {
      type: 'GALLERY',
      image: '',
      title: '',
      description: ''
    };
  }
}
