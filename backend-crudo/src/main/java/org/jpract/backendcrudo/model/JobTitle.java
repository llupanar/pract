package org.jpract.backendcrudo.model;

import jakarta.persistence.*;

@Entity
@Table(name="job_title")
public class JobTitle {
    @Id
    private String position;
    @Column(name="salary")
    private Integer salary;
    @Column(name="bonus")
    private Boolean bonus;
}
