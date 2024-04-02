package org.jpract.backendcrudo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name="client")
public class Client {
    @Id
    private String passportNumber;
    @Column(name="full_name")
    private String fullName;
    @Column(name="medical_certificate")
    private Boolean medicalCertificate;
    @ManyToOne
    @JoinColumn(name = "employee_passport_number")
    private Employee employee;
    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "subscription_id")
    private PoolSubscription subscription;
    @JsonProperty("subscription_id")
    public Integer getSubscriptionId() {
        return subscription.getId();
    }
    @JsonProperty("employee_passport_number")
    public String getEmpPassNum() {
        return employee.getPassportNumber();
    }
    public Client(){super();}

    public Client(String passportNumber, String fullName, Boolean medicalCertificate,
                  Employee employee, PoolSubscription subscription) {
        this.passportNumber = passportNumber;
        this.fullName = fullName;
        this.medicalCertificate = medicalCertificate;
        this.employee = employee;
        this.subscription = subscription;
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

    public Boolean getMedicalCertificate() {
        return medicalCertificate;
    }

    public void setMedicalCertificate(Boolean medicalCertificate) {
        this.medicalCertificate = medicalCertificate;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public PoolSubscription getSubscription() {
        return subscription;
    }

    public void setSubscription(PoolSubscription subscription) {
        this.subscription = subscription;
    }
}
