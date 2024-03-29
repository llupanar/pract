package org.jpract.backendcrudo.repository;

import org.jpract.backendcrudo.model.JobTitle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobTitleRepository extends JpaRepository<JobTitle,String> {
}
