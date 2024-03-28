package org.jpract.backendcrudo.model;

import jakarta.persistence.*;

@Entity
@Table(name="visit")

public class Visit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name="attended")
    private Boolean attended;
    @Column(name="datetime")
    private String dateTime;

    //public void Employee (){
       // super();
    //}
    public Visit( Boolean attended, String dateTime) {
        super();
        this.attended = attended;
        this.dateTime = dateTime;
    }
    public long getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public Boolean getAttended() {
        return attended;
    }
    public void setAttended(Boolean attended) {
        this.attended = attended;
    }
    public String getDateTime() {
        return dateTime;
    }
    public void setDateTime(String dateTime) {
        this.dateTime = dateTime;
    }
}
