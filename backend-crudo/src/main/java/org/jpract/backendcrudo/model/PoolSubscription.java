package org.jpract.backendcrudo.model;

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
    @ManyToOne
    @JoinColumn(name = "swgroup_id")
    private SwGroup swGroup;
    @OneToOne(mappedBy = "subscription")
    private Client client;

    public PoolSubscription(){
        super();
    }

    public PoolSubscription(String type, String endDate, Integer cost,
                            SwGroup swGroup, Client client) {
        this.type = type;
        this.endDate = endDate;
        this.cost = cost;
        this.swGroup = swGroup;
        this.client = client;
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

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }
}
