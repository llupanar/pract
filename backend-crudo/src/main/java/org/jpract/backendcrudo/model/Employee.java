package org.jpract.backendcrudo.model;

import jakarta.persistence.*;

@Entity
@Table(name="employee")
public class Employee {
    @Id
    private String passportNumber;

    @Column(name="full_name")
    private String fullName;
    @Column(name="experience")
    private Integer experience;
}
