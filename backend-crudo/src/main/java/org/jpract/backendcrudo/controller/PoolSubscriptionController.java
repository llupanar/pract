package org.jpract.backendcrudo.controller;

import org.jpract.backendcrudo.exception.ResourceNotFoundException;
import org.jpract.backendcrudo.model.PoolSubscription;
import org.jpract.backendcrudo.repository.PoolSubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/")
public class PoolSubscriptionController {

    private final PoolSubscriptionRepository poolSubscriptionRepository;
    private static final String NOT_FOUND_MESSAGE ="Not found subscription for this id: ";

    @Autowired
    public PoolSubscriptionController(PoolSubscriptionRepository poolSubscriptionRepository){
        this.poolSubscriptionRepository=poolSubscriptionRepository;
    }

    @GetMapping("pool_subscription")
    public List<PoolSubscription> getPoolSubscription(){
        return this.poolSubscriptionRepository.findAll();
    }

    @GetMapping("/pool_subscription/{id}")
    public ResponseEntity<PoolSubscription> getPoolSubscriptionById (@PathVariable(value="id")Integer poolSubscriptionId)
            throws ResourceNotFoundException {
        PoolSubscription poolSubscription = poolSubscriptionRepository.findById(poolSubscriptionId)
                .orElseThrow(() -> new ResourceNotFoundException (NOT_FOUND_MESSAGE +poolSubscriptionId));
        return  ResponseEntity.ok().body(poolSubscription);
    }

    @PostMapping("pool_subscription")
    public PoolSubscription createPoolSubscription(@RequestBody PoolSubscription poolSubscription){
        return this.poolSubscriptionRepository.save(poolSubscription);
    }
    @PutMapping("pool_subscription/{id}")
    public ResponseEntity<PoolSubscription> updatePoolSubscription(@PathVariable(value = "id") Integer poolSubscriptionId,
                                                 @RequestBody PoolSubscription poolSubscriptionDetails) throws ResourceNotFoundException {
        PoolSubscription poolSubscription = poolSubscriptionRepository.findById(poolSubscriptionId)
                .orElseThrow(() -> new ResourceNotFoundException (NOT_FOUND_MESSAGE +poolSubscriptionId));
        poolSubscription.setType(poolSubscriptionDetails.getType());
        poolSubscription.setCost(poolSubscriptionDetails.getCost());
        poolSubscription.setEndDate(poolSubscriptionDetails.getEndDate());
        poolSubscription.setSwGroup(poolSubscriptionDetails.getSwGroup());
       poolSubscriptionRepository.save(poolSubscription);
        return  ResponseEntity.ok((this.poolSubscriptionRepository.save(poolSubscription)));
    }
    @DeleteMapping("pool_subscription/{id}")
    public ResponseEntity<Map<String, Boolean>> deletePoolSubscription(@PathVariable(value = "id") Integer poolSubscriptionId)throws ResourceNotFoundException{
        PoolSubscription poolSubscription = poolSubscriptionRepository.findById(poolSubscriptionId)
                .orElseThrow(() -> new ResourceNotFoundException (NOT_FOUND_MESSAGE +poolSubscriptionId));

        poolSubscriptionRepository.delete(poolSubscription);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
