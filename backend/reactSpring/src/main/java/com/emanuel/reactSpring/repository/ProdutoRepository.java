package com.emanuel.reactSpring.repository;

import com.emanuel.reactSpring.model.ProdutoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProdutoRepository extends CrudRepository<ProdutoModel, Long> {

}
