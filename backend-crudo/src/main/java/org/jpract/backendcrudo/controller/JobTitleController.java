package org.jpract.backendcrudo.controller;

import org.jpract.backendcrudo.exception.ResourceNotFoundException;
import org.jpract.backendcrudo.model.JobTitle;
import org.jpract.backendcrudo.repository.JobTitleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/job_title")
public class JobTitleController {

    private final JobTitleRepository jobTitleRepository;
    private static final String NOT_FOUND_MESSAGE = "Not found job title for this position: ";

    public JobTitleController(JobTitleRepository jobTitleRepository) {
        this.jobTitleRepository = jobTitleRepository;
    }

    @GetMapping
    public List<JobTitle> getJobTitle() {
        return this.jobTitleRepository.findAll();
    }

    @GetMapping("/{position}")
    public ResponseEntity<JobTitle> getJobTitleByPosition(@PathVariable(value = "position") String jobTitlePos)
            throws ResourceNotFoundException {
        JobTitle jobTitle = jobTitleRepository.findById(jobTitlePos)
                .orElseThrow(() -> new ResourceNotFoundException(NOT_FOUND_MESSAGE + jobTitlePos));
        return ResponseEntity.ok().body(jobTitle);
    }

    @PostMapping
    public JobTitle createJobTitle(@RequestBody JobTitle jobTitle) {
        return this.jobTitleRepository.save(jobTitle);
    }

    @PutMapping("/{position}")
    public ResponseEntity<JobTitle> updateJobTitle(@PathVariable(value = "position") String jobTitlePos,
                                                   @RequestBody JobTitle jobTitleDetails) throws ResourceNotFoundException {
        JobTitle jobTitle = jobTitleRepository.findById(jobTitlePos)
                .orElseThrow(() -> new ResourceNotFoundException(NOT_FOUND_MESSAGE + jobTitlePos));
        jobTitle.setBonus(jobTitleDetails.getBonus());
        jobTitle.setSalary(jobTitleDetails.getSalary());
        jobTitleRepository.save(jobTitle);

        return ResponseEntity.ok((this.jobTitleRepository.save(jobTitle)));
    }

    @DeleteMapping("/{position}")
    public ResponseEntity<Map<String, Boolean>> deleteJobTitle(@PathVariable(value = "position") String jobTitlePos) throws ResourceNotFoundException {
        JobTitle jobTitle = jobTitleRepository.findById(jobTitlePos)
                .orElseThrow(() -> new ResourceNotFoundException(NOT_FOUND_MESSAGE + jobTitlePos));

        jobTitleRepository.delete(jobTitle);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
