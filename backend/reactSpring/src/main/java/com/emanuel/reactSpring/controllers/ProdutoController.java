package com.emanuel.reactSpring.controllers;

import com.emanuel.reactSpring.model.ProdutoModel;
import com.emanuel.reactSpring.model.ResponseModel;
import com.emanuel.reactSpring.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
//@CrossOrigin(origins = "http//localhost:3000")
@CrossOrigin(origins = "*")
public class ProdutoController {

    @Autowired
    private ProdutoService ps;

    @DeleteMapping("/remover/{codigo}")
    public ResponseEntity<ResponseModel> remover(@PathVariable Long codigo) {
        return ps.remover(codigo);
    }

    @PutMapping("/alterar")
    public ResponseEntity<?> alterar(@RequestBody ProdutoModel pm) {
        return ps.cadastrarAlterar(pm, "alterar");
    }


    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody ProdutoModel pm) {
        return ps.cadastrarAlterar(pm, "cadastrar");
    }

    @GetMapping("/listar")
    public Iterable<ProdutoModel> listar() {
        return ps.listar();
    }
}