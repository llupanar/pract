package org.jpract.backendcrudo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "schedule")
public class Schedule {
    @Id
    private Integer id;
    @Column(name = "day_of_week")
    private String dayOfWeek;
    @Column(name = "time")
    private String time;
    @Column(name = "track")
    private Integer track;
    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;
    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "swgroup_id")
    private SwGroup swGroup;

    @Column(name = "swgroup_id")
    public Integer getSwGroupId() {
        return swGroup.getId();
    }

    @Column(name = "lesson_id")
    public Integer getLessonId() {
        return lesson.getId();
    }

    public Schedule() {
        super();
    }

    public Schedule(String dayOfWeek, String time, Integer track,
                    Lesson lesson, SwGroup swGroup) {
        this.dayOfWeek = dayOfWeek;
        this.time = time;
        this.track = track;
        this.lesson = lesson;
        this.swGroup = swGroup;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(String dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public Integer getTrack() {
        return track;
    }

    public void setTrack(Integer track) {
        this.track = track;
    }

    public Lesson getLesson() {
        return lesson;
    }

    public void setLesson(Lesson lesson) {
        this.lesson = lesson;
    }

    public SwGroup getSwGroup() {
        return swGroup;
    }

    public void setSwGroup(SwGroup swGroup) {
        this.swGroup = swGroup;
    }
}
