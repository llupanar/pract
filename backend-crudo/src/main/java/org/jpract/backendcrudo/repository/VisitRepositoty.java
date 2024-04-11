package org.jpract.backendcrudo.repository;

import org.jpract.backendcrudo.model.Visit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VisitRepositoty extends JpaRepository<Visit, Integer> {
}
