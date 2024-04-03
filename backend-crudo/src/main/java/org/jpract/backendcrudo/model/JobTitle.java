package org.jpract.backendcrudo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="job_title")
public class JobTitle {
    @Id
    private String position;
    @Column(name="salary")
    private Integer salary;
    @Column(name="bonus")
    private Boolean bonus;
    @JsonIgnore
    @OneToMany(mappedBy = "jobTitle", cascade = CascadeType.REMOVE)
    private List<Employee> employees;

    public JobTitle(String position, Integer salary, Boolean bonus) {
        this.position = position;
        this.salary = salary;
        this.bonus = bonus;
    }
    public JobTitle(){
        super();
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public Integer getSalary() {
        return salary;
    }

    public void setSalary(Integer salary) {
        this.salary = salary;
    }

    public Boolean getBonus() {
        return bonus;
    }

    public void setBonus(Boolean bonus) {
        this.bonus = bonus;
    }
}
