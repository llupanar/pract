package org.jpract.backendcrudo.controller;

import org.jpract.backendcrudo.exception.ResourceNotFoundException;
import org.jpract.backendcrudo.model.Schedule;
import org.jpract.backendcrudo.repository.ScheduleRepositoty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/schedule")
public class ScheduleController {

    private final ScheduleRepositoty scheduleRepositoty;
    private static final String NOT_FOUND_MESSAGE = "Not found schedule for this id: ";

    public ScheduleController(ScheduleRepositoty scheduleRepositoty) {
        this.scheduleRepositoty = scheduleRepositoty;
    }

    @GetMapping
    public List<Schedule> getSchedule() {
        return this.scheduleRepositoty.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Schedule> getSScheduleByPosition(@PathVariable(value = "id") Integer scheduleId)
            throws ResourceNotFoundException {
        Schedule schedule = scheduleRepositoty.findById(scheduleId)
                .orElseThrow(() -> new ResourceNotFoundException(NOT_FOUND_MESSAGE + scheduleId));
        return ResponseEntity.ok().body(schedule);
    }

    @PostMapping
    public Schedule createSchedule(@RequestBody Schedule schedule) {
        return this.scheduleRepositoty.save(schedule);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Schedule> updateSchedule(@PathVariable(value = "id") Integer scheduleId,
                                                   @RequestBody Schedule scheduleDetails) throws ResourceNotFoundException {
        Schedule schedule = scheduleRepositoty.findById(scheduleId)
                .orElseThrow(() -> new ResourceNotFoundException(NOT_FOUND_MESSAGE + scheduleId));
        schedule.setDayOfWeek(scheduleDetails.getDayOfWeek());
        schedule.setTime(scheduleDetails.getTime());
        schedule.setTrack(scheduleDetails.getTrack());
        schedule.setSwGroup(scheduleDetails.getSwGroup());
        schedule.setLesson(scheduleDetails.getLesson());
        scheduleRepositoty.save(schedule);
        return ResponseEntity.ok((this.scheduleRepositoty.save(schedule)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteSchedule(@PathVariable(value = "id") Integer scheduleId) throws ResourceNotFoundException {
        Schedule schedule = scheduleRepositoty.findById(scheduleId)
                .orElseThrow(() -> new ResourceNotFoundException(NOT_FOUND_MESSAGE + scheduleId));

        scheduleRepositoty.delete(schedule);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
