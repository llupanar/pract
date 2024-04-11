package org.jpract.backendcrudo.repository;

import org.jpract.backendcrudo.model.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LessonRepositoty extends JpaRepository<Lesson, Integer> {
}
