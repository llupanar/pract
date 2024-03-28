package org.jpract.backendcrudo.model;

import jakarta.persistence.*;

@Entity
@Table(name="schedule")
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name="day_of_week")
    private String dayOfWeek;
    @Column(name="time")
    private String time;
    @Column(name="track")
    private Integer track;
}
