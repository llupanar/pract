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

    private final  ClientRepository clientRepository;
    private static final String NOT_FOUND_MESSAGE ="Not found client for this passport number: ";

    @Autowired
    public ClientController(ClientRepository clientRepository){
        this.clientRepository=clientRepository;
    }

    @GetMapping("client")
    public List<Client> getClient(){
        return this.clientRepository.findAll();
    }

    @GetMapping("/client/{passport_number}")
    public ResponseEntity<Client> getClientByPassNum (@PathVariable(value="passport_number")String clientPasNum)
            throws ResourceNotFoundException {
        Client client = clientRepository.findById(clientPasNum)
                .orElseThrow(() -> new ResourceNotFoundException (NOT_FOUND_MESSAGE +clientPasNum));
        return  ResponseEntity.ok().body(client);
    }

    @PostMapping("client")
    public Client createClient(@RequestBody Client client){
        return this.clientRepository.save(client);
    }
    @PutMapping("client/{passport_number}")
    public ResponseEntity<Client> updateClient(@PathVariable(value = "passport_number") String clientPasNum,
                                                   @RequestBody Client clientDetails) throws ResourceNotFoundException {
        Client client = clientRepository.findById(clientPasNum)
                .orElseThrow(() -> new ResourceNotFoundException (NOT_FOUND_MESSAGE +clientPasNum));
        client.setFullName(clientDetails.getFullName());
        client.setMedicalCertificate(clientDetails.getMedicalCertificate());
        client.setEmployee(clientDetails.getEmployee());
        client.setSubscription(clientDetails.getSubscription());
        clientRepository.save(client);
        return  ResponseEntity.ok((this.clientRepository.save(client)));
    }

    @DeleteMapping("client/{passport_number}")
    public ResponseEntity<Map<String, Boolean>> deleteClient(@PathVariable(value = "passport_number") String clientPasNum)throws ResourceNotFoundException{
        Client client = clientRepository.findById(clientPasNum)
            .orElseThrow(() -> new ResourceNotFoundException(NOT_FOUND_MESSAGE + clientPasNum));

        clientRepository.delete(client);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
