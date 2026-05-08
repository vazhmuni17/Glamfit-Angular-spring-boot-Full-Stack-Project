package com.Glamfit.Glamfit_backend.repository;

import com.Glamfit.Glamfit_backend.entity.GalleryItem;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GalleryItemRepository extends JpaRepository<GalleryItem, Long> {
}
