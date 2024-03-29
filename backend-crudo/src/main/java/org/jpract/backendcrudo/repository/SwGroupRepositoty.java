package org.jpract.backendcrudo.repository;

import org.jpract.backendcrudo.model.SwGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SwGroupRepositoty extends JpaRepository<SwGroup,Integer> {
}
