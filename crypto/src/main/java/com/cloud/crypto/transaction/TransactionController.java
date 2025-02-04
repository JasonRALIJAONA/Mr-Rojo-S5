package com.cloud.crypto.transaction;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.*;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @GetMapping("/historique")
    public List<Transaction> getTransactions(
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dateStart,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime dateEnd,
        @RequestParam(required = false) Long idUtilisateur,
        @RequestParam(required = false) Long idCryptomonnaie
    ) {
        return transactionService.getFilteredTransactions(dateStart, dateEnd, idUtilisateur, idCryptomonnaie);
    }

}
