package org.jpract.backendcrudo.repository;

import org.jpract.backendcrudo.model.PoolSubscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PoolSubscriptionRepository extends JpaRepository<PoolSubscription,Integer> {
}
