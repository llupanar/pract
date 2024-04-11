package org.jpract.backendcrudo.repository;

import org.jpract.backendcrudo.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepositoty extends JpaRepository<Employee, String> {
}
