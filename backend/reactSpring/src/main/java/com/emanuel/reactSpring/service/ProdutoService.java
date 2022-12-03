package com.emanuel.reactSpring.service;

import com.emanuel.reactSpring.model.ProdutoModel;
import com.emanuel.reactSpring.model.ResponseModel;
import com.emanuel.reactSpring.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ProdutoService {
    @Autowired
    private ProdutoRepository pr;

    @Autowired
    private ResponseModel rm;

    public Iterable<ProdutoModel> listar() {
        return pr.findAll();
    }

    public ResponseEntity<?> cadastrarAlterar(ProdutoModel pm, String acao) {
        if (pm.getNome().equals("")) {
            rm.setMensagem("O nome do produto é obrigatório");
            return new ResponseEntity<ResponseModel>(rm, HttpStatus.BAD_REQUEST);
        }else if(pm.getMarca().equals("")){
            rm.setMensagem("O nome da marca é obrigatório");
            return new ResponseEntity<ResponseModel>(rm, HttpStatus.BAD_REQUEST);
            }else{
            if(acao.equals("cadastrar")){
                return new ResponseEntity<ProdutoModel>(pr.save(pm), HttpStatus.CREATED);
            }else {
                return new ResponseEntity<ProdutoModel>(pr.save(pm), HttpStatus.OK);

            }
        }
    }

    public ResponseEntity<ResponseModel> remover(Long codigo){
        pr.deleteById(codigo);
        rm.setMensagem("O produto foi removido com sucesso!");
        return new ResponseEntity<ResponseModel>(rm, HttpStatus.OK);
    }
}