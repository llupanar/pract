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
}
