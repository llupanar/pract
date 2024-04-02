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
@RequestMapping("/api/v1/")
public class JobTitleController {
    @Autowired
    private JobTitleRepository jobTitleRepository;
    private final String notFoundMessage="Not found job title for this position: ";

    @GetMapping("job_title")
    public List<JobTitle> getJobTitle(){
        return this.jobTitleRepository.findAll();
    }

    @GetMapping("/job_title/{position}")
    public ResponseEntity<JobTitle> getJobTitleByPosition (@PathVariable(value="position")String jobTitlePos)
        throws ResourceNotFoundException {
        JobTitle jobTitle = jobTitleRepository.findById(jobTitlePos)
                .orElseThrow(() -> new ResourceNotFoundException (notFoundMessage+jobTitlePos));
        return  ResponseEntity.ok().body(jobTitle);
    }

    @PostMapping("job_title")
    public JobTitle createJobTitle(@RequestBody JobTitle jobTitle){
        return this.jobTitleRepository.save(jobTitle);
    }

    @PostMapping("job_title/{position}")
    public ResponseEntity<JobTitle> updateJobTitle(@PathVariable(value = "position") String jobTitlePos,
                                                   @RequestBody JobTitle jobTitleDetails) throws ResourceNotFoundException {
        JobTitle jobTitle = jobTitleRepository.findById(jobTitlePos)
                .orElseThrow(() -> new ResourceNotFoundException (notFoundMessage+jobTitlePos));
        jobTitle.setBonus(jobTitleDetails.getBonus());
        jobTitle.setSalary(jobTitleDetails.getSalary());
        jobTitleRepository.save(jobTitle);

        return  ResponseEntity.ok((this.jobTitleRepository.save(jobTitle)));
    }

    @DeleteMapping("job_title/{position}")
    public ResponseEntity<Map<String, Boolean>> deleteJobTitle(@PathVariable(value = "position") String jobTitlePos)throws ResourceNotFoundException{
        JobTitle jobTitle = jobTitleRepository.findById(jobTitlePos)
                .orElseThrow(() -> new ResourceNotFoundException(notFoundMessage+ jobTitlePos));

        jobTitleRepository.delete(jobTitle);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
