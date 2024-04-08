package org.jpract.backendcrudo.controller;

import org.jpract.backendcrudo.exception.ResourceNotFoundException;
import org.jpract.backendcrudo.model.Employee;
import org.jpract.backendcrudo.repository.EmployeeRepositoty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {

    private final EmployeeRepositoty employeeRepository;
    private final static String notFoundMessage="Not found employee for this passport number: ";

    @Autowired
    public EmployeeController(EmployeeRepositoty employeeRepository){
        this.employeeRepository=employeeRepository;
    }

    @GetMapping("employee")
    public List<Employee> getEmployee(){
        return this.employeeRepository.findAll();
    }

    @GetMapping("/employee/{passport_number}")
    public ResponseEntity<Employee> getEmployeeByPassNum (@PathVariable(value="passport_number")String employeePassNum)
            throws ResourceNotFoundException {
        Employee employee = employeeRepository.findById(employeePassNum)
                .orElseThrow(() -> new ResourceNotFoundException (notFoundMessage+employeePassNum));
        return  ResponseEntity.ok().body(employee);
    }

    @PostMapping("employee")
    public Employee createEmployee(@RequestBody Employee employee){
        return this.employeeRepository.save(employee);
    }
    @PutMapping("employee/{passport_number}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable(value = "passport_number") String employeePassNum,
                                                   @RequestBody Employee employeeDetails) throws ResourceNotFoundException {
        Employee employee = employeeRepository.findById(employeePassNum)
                .orElseThrow(() -> new ResourceNotFoundException (notFoundMessage+employeePassNum));
        employee.setFullName(employeeDetails.getFullName());
        employee.setExperience(employeeDetails.getExperience());
        employee.setJobTitle(employeeDetails.getJobTitle());
        employeeRepository.save(employee);
        return  ResponseEntity.ok((this.employeeRepository.save(employee)));
    }

    @DeleteMapping("employee/{passport_number}")
    public ResponseEntity<Map<String, Boolean>> deleteJobTitle(@PathVariable(value = "passport_number") String employeePassNum)throws ResourceNotFoundException{
        Employee employee = employeeRepository.findById(employeePassNum)
                .orElseThrow(() -> new ResourceNotFoundException (notFoundMessage+employeePassNum));
        employeeRepository.delete(employee);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

}
