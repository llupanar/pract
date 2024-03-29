package org.jpract.backendcrudo.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="lesson")
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name="category")
    private String category;
    @Column(name="duration")
    private Integer duration;
    @ManyToOne
    @JoinColumn(name = "employee_passport_number", referencedColumnName = "passportNumber")
    private Employee employee;
    @OneToMany(mappedBy = "lesson")
    private List<Visit> visits;
    @ManyToOne
    @JoinColumn(name = "swgroup_id")
    private SwGroup swGroup;
    public Lesson(){
        super();
    }

    public Lesson(String category, Integer duration, Employee employee,
                  List<Visit> visits, SwGroup swGroup) {
        this.category = category;
        this.duration = duration;
        this.employee = employee;
        this.visits = visits;
        this.swGroup = swGroup;
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

    public List<Visit> getVisits() {
        return visits;
    }

    public void setVisits(List<Visit> visits) {
        this.visits = visits;
    }

    public SwGroup getSwGroup() {
        return swGroup;
    }

    public void setSwGroup(SwGroup swGroup) {
        this.swGroup = swGroup;
    }
}
