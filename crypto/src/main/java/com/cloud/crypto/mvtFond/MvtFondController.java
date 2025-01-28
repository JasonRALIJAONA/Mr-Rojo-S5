package com.cloud.crypto.mvtFond;

import java.math.BigDecimal;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class MvtFondController {
    @Autowired
    private MvtFondService mvtFondService;

    @GetMapping("/insertMvt")
    public ModelAndView insertMvt(@RequestParam int idUtilisateur,
                                 @RequestParam(required = false) BigDecimal depot,
                                 @RequestParam(required = false) BigDecimal retrait,  // ageMin peut être null
                                 @RequestParam String dateMvt) {

        LocalDate MvtDate = null;
    
        // Conversion des dates si elles sont présentes dans la requête
        if (dateMvt != null && !dateMvt.isEmpty()) {
            MvtDate = LocalDate.parse(dateMvt);
        }

        ModelAndView m = new ModelAndView();
        return m;
    }

    @GetMapping("/formMvt")
    public ModelAndView formMvt() {
        ModelAndView m = new ModelAndView();
        return m;
    }

}
