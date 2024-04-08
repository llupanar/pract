package org.jpract.backendcrudo.controller;

import org.jpract.backendcrudo.exception.ResourceNotFoundException;
import org.jpract.backendcrudo.model.SwGroup;
import org.jpract.backendcrudo.repository.SwGroupRepositoty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/")
public class SwGroupController {

    private final SwGroupRepositoty swGroupRepository;
    private final static String notFoundMessage="Not found sqgroup for this id: ";

    @Autowired
    public SwGroupController(SwGroupRepositoty swGroupRepository){
        this.swGroupRepository=swGroupRepository;
    }

    @GetMapping("swgroup")
    public List<SwGroup> getSwGroup(){
        return this.swGroupRepository.findAll();
    }

    @GetMapping("/swgroup/{id}")
    public ResponseEntity<SwGroup> getSwGroupByPosition (@PathVariable(value="id")Integer swGroupId)
            throws ResourceNotFoundException {
        SwGroup swGroup = swGroupRepository.findById(swGroupId)
                .orElseThrow(() -> new ResourceNotFoundException (notFoundMessage+swGroupId));
        return  ResponseEntity.ok().body(swGroup);
    }

    @PostMapping("swgroup")
    public SwGroup createSwGroup(@RequestBody SwGroup swGroup){
        return this.swGroupRepository.save(swGroup);
    }
    @PutMapping("swgroup/{id}")
    public ResponseEntity<SwGroup> updateSwGroup(@PathVariable(value = "id") Integer swGroupId,
                                                   @RequestBody SwGroup swGroupDetails) throws ResourceNotFoundException {
        SwGroup swGroup = swGroupRepository.findById(swGroupId)
                .orElseThrow(() -> new ResourceNotFoundException (notFoundMessage+swGroupId));
        swGroup.setAgeCategory(swGroupDetails.getAgeCategory());
        swGroup.setLevel(swGroupDetails.getLevel());
        swGroup.setMemberCount(swGroupDetails.getMemberCount());
        swGroupRepository.save(swGroup);
        return  ResponseEntity.ok((this.swGroupRepository.save(swGroup)));
    }
    @DeleteMapping("swgroup/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteSwGroup(@PathVariable(value = "id") Integer swGroupId)throws ResourceNotFoundException{
        SwGroup swGroup = swGroupRepository.findById(swGroupId)
                .orElseThrow(() -> new ResourceNotFoundException(notFoundMessage + swGroupId));

        swGroupRepository.delete(swGroup);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
