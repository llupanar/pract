package org.jpract.backendcrudo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="employee")
public class Employee {
    @Id
    private String passportNumber;
    @Column(name="full_name")
    private String fullName;
    @Column(name="experience")
    private Integer experience;
    @JsonIgnore
    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "position")
    private JobTitle jobTitle;
    @JsonIgnore
    @OneToMany(mappedBy = "employee", cascade = CascadeType.REMOVE)
    private List<Client> clients;
    @JsonIgnore
    @OneToMany(mappedBy = "employee", cascade = CascadeType.REMOVE)
    private List<Lesson> lessons;
    @JsonIgnore
    @OneToMany(mappedBy = "employee", cascade = CascadeType.REMOVE)
    private List<Visit> visits;

    @JsonProperty("position")
    public String getJobTitilePosition() {
        return jobTitle.getPosition();
    }
    public Employee(){
        super();
    }

    public Employee(String passportNumber, String fullName, Integer experience, JobTitle jobTitle) {
        this.passportNumber = passportNumber;
        this.fullName = fullName;
        this.experience = experience;
        this.jobTitle = jobTitle;
    }

    public String getPassportNumber() {
        return passportNumber;
    }

    public void setPassportNumber(String passportNumber) {
        this.passportNumber = passportNumber;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public Integer getExperience() {
        return experience;
    }

    public void setExperience(Integer experience) {
        this.experience = experience;
    }

    public JobTitle getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(JobTitle jobTitle) {
        this.jobTitle = jobTitle;
    }
}
