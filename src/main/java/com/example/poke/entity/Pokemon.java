package com.example.poke.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "pokemon_description")
public class Pokemon {
	
	@Id
	private Long id;
	private String number;
	private String name;
	private String generation;
    private String description;
    private String type1;
    private String type2;
}
