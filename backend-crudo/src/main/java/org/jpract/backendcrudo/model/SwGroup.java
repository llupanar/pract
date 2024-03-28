package org.jpract.backendcrudo.model;

import jakarta.persistence.*;

@Entity
@Table(name="swgroup")
public class SwGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name="level")
    private Integer level;
    @Column(name="member_count")
    private Integer memberCount;
    @Column(name="age_category")
    private String ageCategory;
}
