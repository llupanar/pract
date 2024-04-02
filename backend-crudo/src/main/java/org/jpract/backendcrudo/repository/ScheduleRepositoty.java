package org.jpract.backendcrudo.repository;

import org.jpract.backendcrudo.model.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScheduleRepositoty extends JpaRepository<Schedule,Integer> {
}
