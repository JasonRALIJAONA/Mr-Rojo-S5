package com.cloud.crypto.portefeuille;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping("api/portefeuille")

public class PorteFeuilleController {
    @Autowired
    private PorteFeuilleService porteFeuilleService;

    @GetMapping("/{idUtilisateur}")
    public List<PorteFeuille> getByIdUtilisateur(@PathVariable Long idUtilisateur) {
        return porteFeuilleService.findByIdUtilisateur(idUtilisateur);
    }
}
