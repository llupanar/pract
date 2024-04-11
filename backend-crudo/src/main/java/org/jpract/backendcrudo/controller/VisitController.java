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
@RequestMapping("/visit")
public class VisitController {

    private final VisitRepositoty visitRepositoty;

    private static final String NOT_FOUND_MESSAGE = "Not found visit for this id: ";

    public VisitController(VisitRepositoty visitRepository) {
        this.visitRepositoty = visitRepository;
    }

    @GetMapping
    public List<Visit> getVisit() {
        return this.visitRepositoty.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Visit> getVisitById(@PathVariable(value = "id") Integer visitId)
            throws ResourceNotFoundException {
        Visit visit = visitRepositoty.findById(visitId)
                .orElseThrow(() -> new ResourceNotFoundException(NOT_FOUND_MESSAGE + visitId));
        return ResponseEntity.ok().body(visit);
    }

    @PostMapping
    public Visit createVisit(@RequestBody Visit visit) {
        return this.visitRepositoty.save(visit);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Visit> updateVisit(@PathVariable(value = "id") Integer visitId,
                                             @RequestBody Visit visitDetails) throws ResourceNotFoundException {
        Visit visit = visitRepositoty.findById(visitId)
                .orElseThrow(() -> new ResourceNotFoundException(NOT_FOUND_MESSAGE + visitId));
        visit.setAttended(visitDetails.getAttended());
        visit.setDateTime(visitDetails.getDateTime());
        visit.setClient(visitDetails.getClient());
        visit.setEmployee(visitDetails.getEmployee());
        visit.setLesson(visitDetails.getLesson());
        visitRepositoty.save(visit);
        return ResponseEntity.ok((this.visitRepositoty.save(visit)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteVisit(@PathVariable(value = "id") Integer visitId) throws ResourceNotFoundException {
        Visit visit = visitRepositoty.findById(visitId)
                .orElseThrow(() -> new ResourceNotFoundException(NOT_FOUND_MESSAGE + visitId));
        visitRepositoty.delete(visit);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
