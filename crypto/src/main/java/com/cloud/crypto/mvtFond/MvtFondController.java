package com.cloud.crypto.mvtFond;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("/api/MvtFond")
@CrossOrigin(origins = "http://localhost:8081")
public class MvtFondController {
    @Autowired
    private MvtFondService mvtFondService;

    @GetMapping("/insertMvt")
    public ModelAndView insertMvt(@RequestParam int idUtilisateur,
                                 @RequestParam(required = false) BigDecimal depot,
                                 @RequestParam(required = false) BigDecimal retrait,  // ageMin peut être null
                                 @RequestParam String dateMvt) {

        LocalDateTime MvtDate = null;
    
        // Conversion des dates si elles sont présentes dans la requête
        if (dateMvt != null && !dateMvt.isEmpty()) {
            MvtDate = LocalDateTime.parse(dateMvt);
        }

        MvtFond newMvt = new MvtFond();

        newMvt.setDateMvt(MvtDate);

        ModelAndView m = new ModelAndView();
        return m;
    }

    @GetMapping("/formMvt")
    public ModelAndView formMvt() {
        ModelAndView m = new ModelAndView();
        return m;
    }

}
