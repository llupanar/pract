package org.jpract.backendcrudo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name="lesson")
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "category")
    private String category;
    @Column(name = "duration")
    private Integer duration;
    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "employee_passport_number", referencedColumnName = "passportNumber")
    private Employee employee;
    @OneToMany(mappedBy = "lesson", cascade = CascadeType.REMOVE)
    private List<Visit> visits;
    @OneToMany(mappedBy = "lesson", cascade = CascadeType.REMOVE)
    private List<Schedule> schedules;
    @Column(name="employee_passport_number")
    public String getEmpPassNum() {
        return employee.getPassportNumber();
    }

    public Lesson() {
        super();
    }

    public Lesson(String category, Integer duration, Employee employee) {
        this.category = category;
        this.duration = duration;
        this.employee = employee;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
}