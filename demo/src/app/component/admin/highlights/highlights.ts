import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GalleryService, ShowcaseHighlight } from '../../../services/gallery.service';

@Component({
  selector: 'app-highlights',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './highlights.html',
  styleUrl: './highlights.css'
})
export class Highlights implements OnInit {
  galleryItems: ShowcaseHighlight[] = [];
  isEditing = false;
  currentItem: ShowcaseHighlight = {
    beforeImage: '',
    afterImage: '',
    title: '',
    description: ''
  };

  constructor(private galleryService: GalleryService) {}

  ngOnInit() {
    this.loadGallery();
  }

  loadGallery() {
    this.galleryService.getHighlights().subscribe(data => {
      this.galleryItems = data;
    });
  }

  editItem(item: ShowcaseHighlight) {
    this.currentItem = { ...item };
    this.isEditing = true;
  }

  onBeforeFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.currentItem.beforeImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onAfterFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.currentItem.afterImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  saveItem() {
    this.galleryService.saveHighlight(this.currentItem).subscribe({
      next: () => {
        this.loadGallery();
        this.cancelEdit();
      },
      error: (err) => {
        console.error('Save highlight item failed:', err);
        alert('Failed to save highlight item. Please check your permissions.');
      }
    });
  }

  deleteItem(id: number | undefined) {
    if (id && confirm('Delete this highlight item?')) {
      this.galleryService.deleteHighlight(id).subscribe(() => {
        this.loadGallery();
      });
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.currentItem = {
      beforeImage: '',
      afterImage: '',
      title: '',
      description: ''
    };
  }
}
