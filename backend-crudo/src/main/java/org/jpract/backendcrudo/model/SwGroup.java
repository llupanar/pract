package org.jpract.backendcrudo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="swgroup")
public class SwGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name="level")
    private Integer level;
    @Column(name="member_count")
    private Integer memberCount;
    @Column(name="age_category")
    private String ageCategory;
    @JsonIgnore
    @OneToMany(mappedBy = "swGroup", cascade = CascadeType.REMOVE)
    private List<PoolSubscription> subscriptions;
    public SwGroup(){
        super();
    }
    public SwGroup(Integer level, Integer memberCount, String ageCategory) {
        this.level = level;
        this.memberCount = memberCount;
        this.ageCategory = ageCategory;
    }
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public Integer getMemberCount() {
        return memberCount;
    }

    public void setMemberCount(Integer memberCount) {
        this.memberCount = memberCount;
    }

    public String getAgeCategory() {
        return ageCategory;
    }

    public void setAgeCategory(String ageCategory) {
        this.ageCategory = ageCategory;
    }
}
