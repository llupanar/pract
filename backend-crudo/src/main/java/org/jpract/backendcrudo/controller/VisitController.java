package org.jpract.backendcrudo.controller;

import org.jpract.backendcrudo.exception.ResourceNotFoundException;
import org.jpract.backendcrudo.model.Visit;
import org.jpract.backendcrudo.repository.VisitRepositoty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/")
public class VisitController {
    @Autowired
    private VisitRepositoty visitRepositoty;
    private final String notFoundMessage="Not found visit for this id: ";

    @GetMapping("visit")
    public List<Visit> getVisit(){
        return this.visitRepositoty.findAll();
    }

    @GetMapping("/visit/{id}")
    public ResponseEntity<Visit> getVisitById (@PathVariable(value="id")Integer visitId)
            throws ResourceNotFoundException {
        Visit visit = visitRepositoty.findById(visitId)
                .orElseThrow(() -> new ResourceNotFoundException (notFoundMessage+visitId));
        return  ResponseEntity.ok().body(visit);
    }

    @PostMapping("visit")
    public Visit createVisit(@RequestBody Visit visit){
        return this.visitRepositoty.save(visit);
    }

    @PostMapping("visit/{id}")
    public ResponseEntity<Visit> updateVisit(@PathVariable(value = "id") Integer visitId,
                                                 @RequestBody Visit visitDetails) throws ResourceNotFoundException {
        Visit visit = visitRepositoty.findById(visitId)
                .orElseThrow(() -> new ResourceNotFoundException (notFoundMessage+visitId));
        visit.setAttended(visitDetails.getAttended());
        visit.setDateTime(visitDetails.getDateTime());
        visit.setClient(visitDetails.getClient());
        visit.setEmployee(visitDetails.getEmployee());
        visit.setLesson(visitDetails.getLesson());
        visitRepositoty.save(visit);
        return  ResponseEntity.ok((this.visitRepositoty.save(visit)));
    }
    @DeleteMapping("visit/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteVisit(@PathVariable(value = "id") Integer visitId)throws ResourceNotFoundException{
        Visit visit = visitRepositoty.findById(visitId)
                .orElseThrow(() -> new ResourceNotFoundException(notFoundMessage+visitId));
        visitRepositoty.delete(visit);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
