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
    @Autowired
    private SwGroupRepositoty swGroupRepository;

    @GetMapping("pool_subscription")
    private List<SwGroup> getSwGroup(){
        return this.swGroupRepository.findAll();
    }

    @GetMapping("/pool_subscription/{id}")
    public ResponseEntity<SwGroup> getSwGroupByPosition (@PathVariable(value="id")Integer swGroupId)
            throws ResourceNotFoundException {
        SwGroup swGroup = swGroupRepository.findById(swGroupId)
                .orElseThrow(() -> new ResourceNotFoundException ("Not found swimming-group for this position: "+swGroupId));
        return  ResponseEntity.ok().body(swGroup);
    }

    @PostMapping("pool_subscription")
    public SwGroup createSwGroup(@RequestBody SwGroup swGroup){
        return this.swGroupRepository.save(swGroup);
    }
    @PostMapping("pool_subscription/{id}")
    public ResponseEntity<SwGroup> updateSwGroup(@PathVariable(value = "id") Integer swGroupId,
                                                   @RequestBody SwGroup swGroupDetails) throws ResourceNotFoundException {
        SwGroup swGroup = swGroupRepository.findById(swGroupId)
                .orElseThrow(() -> new ResourceNotFoundException ("Not found job title for this position: "+swGroupId));
        swGroup.setAgeCategory(swGroupDetails.getAgeCategory());
        swGroup.setLevel(swGroupDetails.getLevel());
        swGroup.setMemberCount(swGroupDetails.getMemberCount());
        SwGroup updateSwGroup = swGroupRepository.save(swGroup);
        return  ResponseEntity.ok((this.swGroupRepository.save(swGroup)));
    }
    @DeleteMapping("pool_subscription/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteSwGroup(@PathVariable Integer swGroupId)throws ResourceNotFoundException{
        SwGroup swGroup = swGroupRepository.findById(swGroupId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + swGroupId));

        swGroupRepository.delete(swGroup);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}