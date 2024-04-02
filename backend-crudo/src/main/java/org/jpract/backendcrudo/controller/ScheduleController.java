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
@RequestMapping("/api/v1/")
public class ScheduleController {
    @Autowired
    private ScheduleRepositoty scheduleRepositoty;
    private final String notFoundMessage="Not found schedule for this id: ";

    @GetMapping("schedule")
    private List<Schedule> getSchedule(){
        return this.scheduleRepositoty.findAll();
    }

    @GetMapping("/schedule/{id}")
    public ResponseEntity<Schedule> getSScheduleByPosition (@PathVariable(value="id")Integer scheduleId)
            throws ResourceNotFoundException {
        Schedule schedule = scheduleRepositoty.findById(scheduleId)
                .orElseThrow(() -> new ResourceNotFoundException (notFoundMessage+scheduleId));
        return  ResponseEntity.ok().body(schedule);
    }

    @PostMapping("schedule")
    public Schedule createSchedule(@RequestBody Schedule schedule){
        return this.scheduleRepositoty.save(schedule);
    }

    @PostMapping("schedule/{id}")
    public ResponseEntity<Schedule> updateSchedule(@PathVariable(value = "id") Integer scheduleId,
                                                 @RequestBody Schedule scheduleDetails) throws ResourceNotFoundException {
        Schedule schedule = scheduleRepositoty.findById(scheduleId)
                .orElseThrow(() -> new ResourceNotFoundException (notFoundMessage+scheduleId));
        schedule.setDayOfWeek(scheduleDetails.getDayOfWeek());
        schedule.setTime(scheduleDetails.getTime());
        schedule.setTrack(scheduleDetails.getTrack());
        schedule.setSwGroup(scheduleDetails.getSwGroup());
        schedule.setLesson(scheduleDetails.getLesson());
        Schedule updateSchedule = scheduleRepositoty.save(schedule);
        return  ResponseEntity.ok((this.scheduleRepositoty.save(schedule)));
    }
    @DeleteMapping("schedule/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteSchedule(@PathVariable Integer scheduleId)throws ResourceNotFoundException{
        Schedule schedule = scheduleRepositoty.findById(scheduleId)
                .orElseThrow(() -> new ResourceNotFoundException (notFoundMessage+scheduleId));

        scheduleRepositoty.delete(schedule);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
