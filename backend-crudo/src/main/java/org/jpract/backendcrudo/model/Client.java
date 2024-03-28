package org.jpract.backendcrudo.model;

import jakarta.persistence.*;

@Entity
@Table(name="client")
public class Client {
    @Id
    String passportNumber;
    @Column(name="full_name")
    String fullName;
    @Column(name="medical_certificate")
    Boolean medicalCertificate;

}
