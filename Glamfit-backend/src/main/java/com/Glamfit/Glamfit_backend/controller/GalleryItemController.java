package com.Glamfit.Glamfit_backend.controller;

import com.Glamfit.Glamfit_backend.entity.GalleryItem;
import com.Glamfit.Glamfit_backend.repository.GalleryItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class GalleryItemController {

    @Autowired
    private GalleryItemRepository galleryItemRepository;

    @GetMapping("/gallery")
    public List<GalleryItem> getAllGalleryItems() {
        return galleryItemRepository.findAll();
    }

    @PostMapping("/admin/gallery")
    public GalleryItem saveGalleryItem(@RequestBody GalleryItem item) {
        return galleryItemRepository.save(item);
    }

    @DeleteMapping("/admin/gallery/{id}")
    public ResponseEntity<?> deleteGalleryItem(@PathVariable Long id) {
        galleryItemRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
