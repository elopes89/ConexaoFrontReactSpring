package com.emanuel.reactSpring.model;

import jakarta.persistence.*;
import lombok.Data;


@Data

@Entity
@Table(name = "produtos")
public class ProdutoModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;
    private String nome;
    private String marca;
}
