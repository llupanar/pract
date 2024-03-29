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

    @GetMapping("job_title")
    private List<JobTitle> getJobTitle(){
        return this.jobTitleRepository.findAll();
    }

    @GetMapping("/job_title/{position}")
    public ResponseEntity<JobTitle> getJobTitleByPosition (@PathVariable(value="position")String jobTitlePos)
        throws ResourceNotFoundException {
        JobTitle jobTitle = jobTitleRepository.findById(jobTitlePos)
                .orElseThrow(() -> new ResourceNotFoundException ("Not found job title for this position: "+jobTitlePos));
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
                .orElseThrow(() -> new ResourceNotFoundException ("Not found job title for this position: "+jobTitlePos));
        jobTitle.setBonus(jobTitleDetails.getBonus());
        jobTitle.setSalary(jobTitleDetails.getSalary());
        JobTitle updateJobTitle = jobTitleRepository.save(jobTitle);

        return  ResponseEntity.ok((this.jobTitleRepository.save(jobTitle)));
    }

    @DeleteMapping("job_title/{position}")
    public ResponseEntity<Map<String, Boolean>> deleteJobTitle(@PathVariable String jobTitlePos)throws ResourceNotFoundException{
        JobTitle jobTitle = jobTitleRepository.findById(jobTitlePos)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + jobTitlePos));

        jobTitleRepository.delete(jobTitle);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}