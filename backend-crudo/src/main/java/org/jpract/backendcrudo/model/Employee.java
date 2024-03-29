package org.jpract.backendcrudo.model;

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
    @ManyToOne
    @JoinColumn(name = "position")
    private JobTitle jobTitle;
    @OneToMany(mappedBy = "employee")
    private List<Client> clients;
    @OneToMany(mappedBy = "employee")
    private List<Visit> visits;
    @OneToMany(mappedBy = "employee")
    private List<Lesson> lessons;

    public Employee(){
        super();
    }

    public Employee(String passportNumber, String fullName, Integer experience, JobTitle jobTitle, List<Client> clients,
                    List<Visit> visits, List<Lesson> lessons) {
        this.passportNumber = passportNumber;
        this.fullName = fullName;
        this.experience = experience;
        this.jobTitle = jobTitle;
        this.clients = clients;
        this.visits = visits;
        this.lessons = lessons;
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

    public List<Client> getClients() {
        return clients;
    }

    public void setClients(List<Client> clients) {
        this.clients = clients;
    }

    public List<Visit> getVisits() {
        return visits;
    }

    public void setVisits(List<Visit> visits) {
        this.visits = visits;
    }

    public List<Lesson> getLessons() {
        return lessons;
    }

    public void setLessons(List<Lesson> lessons) {
        this.lessons = lessons;
    }
}
