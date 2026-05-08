package com.Glamfit.Glamfit_backend.repository;

import com.Glamfit.Glamfit_backend.entity.ShowcaseHighlight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShowcaseHighlightRepository extends JpaRepository<ShowcaseHighlight, Long> {
}
