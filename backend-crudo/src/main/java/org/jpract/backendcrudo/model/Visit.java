package org.jpract.backendcrudo.model;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="visit")

public class Visit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name="attended")
    private Boolean attended;
    @Column(name = "datetime", columnDefinition = "TIMESTAMP WITHOUT TIME ZONE USING datetime::timestamp without time zone")
    private LocalDateTime dateTime;

    @ManyToOne
    @JoinColumn(name = "client_passport_number")
    private Client client;
    @ManyToOne
    @JoinColumn(name = "employee_passport_number")
    private Employee employee;
    @ManyToOne
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;

    public Visit() {super();}

    public Visit(Boolean attended, LocalDateTime dateTime, Client client, Employee employee, Lesson lesson) {
        this.attended = attended;
        this.dateTime = dateTime;
        this.client = client;
        this.employee = employee;
        this.lesson = lesson;
    }

    public Boolean getAttended() {
        return attended;
    }

    public void setAttended(Boolean attended) {
        this.attended = attended;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Lesson getLesson() {
        return lesson;
    }

    public void setLesson(Lesson lesson) {
        this.lesson = lesson;
    }
}
