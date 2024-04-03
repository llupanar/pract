package org.jpract.backendcrudo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name="pool_subscription")
public class PoolSubscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name="type")
    private String type;
    @Column(name="end_date")
    private String endDate;
    @Column(name="cost")
    private Integer cost;
    @JsonIgnore
    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "swgroup_id")
    private SwGroup swGroup;

    @JsonProperty("swgroup_id")
    public Integer getSwGroupId() {
        return swGroup.getId();
    }

    public PoolSubscription(){
        super();
    }

    public PoolSubscription(String type, String endDate, Integer cost,
                            SwGroup swGroup) {
        this.type = type;
        this.endDate = endDate;
        this.cost = cost;
        this.swGroup = swGroup;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public Integer getCost() {
        return cost;
    }

    public void setCost(Integer cost) {
        this.cost = cost;
    }

    public SwGroup getSwGroup() {
        return swGroup;
    }

    public void setSwGroup(SwGroup swGroup) {
        this.swGroup = swGroup;
    }

}
