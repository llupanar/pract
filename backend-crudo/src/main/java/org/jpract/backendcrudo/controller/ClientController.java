package org.jpract.backendcrudo.controller;

import org.jpract.backendcrudo.exception.ResourceNotFoundException;
import org.jpract.backendcrudo.model.Client;
import org.jpract.backendcrudo.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/")
public class ClientController {
    @Autowired
    private ClientRepository clientRepository;

    @GetMapping("client")
    private List<Client> getClient(){
        return this.clientRepository.findAll();
    }

    @GetMapping("/client/{passport_number}")
    public ResponseEntity<Client> getClientByPassNum (@PathVariable(value="passport_number")String clientPasNum)
            throws ResourceNotFoundException {
        Client client = clientRepository.findById(clientPasNum)
                .orElseThrow(() -> new ResourceNotFoundException ("Not found client for this passport number: "+clientPasNum));
        return  ResponseEntity.ok().body(client);
    }

    @PostMapping("client")
    public Client createClient(@RequestBody Client client){
        return this.clientRepository.save(client);
    }
    @PostMapping("client/{passport_number}")
    public ResponseEntity<Client> updateClient(@PathVariable(value = "passport_number") String clientPasNum,
                                                   @RequestBody Client clientDetails) throws ResourceNotFoundException {
        Client client = clientRepository.findById(clientPasNum)
                .orElseThrow(() -> new ResourceNotFoundException ("Not found client for this position: "+clientPasNum));
        client.setFullName(clientDetails.getFullName());
        client.setMedicalCertificate(clientDetails.getMedicalCertificate());
        client.setEmployee(clientDetails.getEmployee());
        client.setSubscription(clientDetails.getSubscription());
        Client updateClient = clientRepository.save(client);
        return  ResponseEntity.ok((this.clientRepository.save(client)));
    }

    @DeleteMapping("client/{passport_number}")
    public ResponseEntity<Map<String, Boolean>> deleteClient(@PathVariable String clientPasNum)throws ResourceNotFoundException{
        Client client = clientRepository.findById(clientPasNum)
            .orElseThrow(() -> new ResourceNotFoundException("Client not exist with id :" + clientPasNum));

        clientRepository.delete(client);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}