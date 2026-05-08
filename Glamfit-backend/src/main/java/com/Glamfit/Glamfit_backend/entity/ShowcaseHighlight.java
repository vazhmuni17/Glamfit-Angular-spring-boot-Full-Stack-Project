package com.Glamfit.Glamfit_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShowcaseHighlight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String beforeImage;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String afterImage;

    private String title;
    private String description;
}
