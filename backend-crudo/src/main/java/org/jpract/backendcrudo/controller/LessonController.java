package org.jpract.backendcrudo.controller;

import org.jpract.backendcrudo.exception.ResourceNotFoundException;
import org.jpract.backendcrudo.model.Lesson;
import org.jpract.backendcrudo.repository.LessonRepositoty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/")
public class LessonController {
    @Autowired
    private LessonRepositoty lessonRepository;

    @GetMapping("lesson")
    private List<Lesson> getLesson(){
        return this.lessonRepository.findAll();
    }

    @GetMapping("/lesson/{id}")
    public ResponseEntity<Lesson> getLessonById(@PathVariable(value="id")Integer lessonId)
            throws ResourceNotFoundException {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException ("Not found lesson for this id: "+lessonId));
        return  ResponseEntity.ok().body(lesson);
    }

    @PostMapping("lesson")
    public Lesson createLesson(@RequestBody Lesson swGroup){
        return this.lessonRepository.save(swGroup);
    }

    @PostMapping("lesson/{id}")
    public ResponseEntity<Lesson> updateLesson(@PathVariable(value = "id") Integer lessonId,
                                                 @RequestBody Lesson lessonDetails) throws ResourceNotFoundException {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException ("Not found lesson for this id: "+lessonId));
        lesson.setCategory(lessonDetails.getCategory());
        lesson.setDuration(lessonDetails.getDuration());
        lesson.setEmployee(lessonDetails.getEmployee());
        Lesson updateLesson = lessonRepository.save(lesson);
        return  ResponseEntity.ok((this.lessonRepository.save(lesson)));
    }
    @DeleteMapping("lesson/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteLesson(@PathVariable Integer lessonId)throws ResourceNotFoundException{
        Lesson swGroup = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException ("Not found lesson for this id: "+lessonId));

        lessonRepository.delete(swGroup);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}