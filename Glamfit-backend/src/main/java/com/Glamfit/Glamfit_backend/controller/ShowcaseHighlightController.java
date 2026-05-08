package com.Glamfit.Glamfit_backend.controller;

import com.Glamfit.Glamfit_backend.entity.ShowcaseHighlight;
import com.Glamfit.Glamfit_backend.repository.ShowcaseHighlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/highlights")
@CrossOrigin(origins = "http://localhost:4200")
public class ShowcaseHighlightController {

    @Autowired
    private ShowcaseHighlightRepository repository;

    @GetMapping
    public List<ShowcaseHighlight> getAllHighlights() {
        return repository.findAll();
    }

    @PostMapping
    public ShowcaseHighlight saveHighlight(@RequestBody ShowcaseHighlight highlight) {
        return repository.save(highlight);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteHighlight(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
