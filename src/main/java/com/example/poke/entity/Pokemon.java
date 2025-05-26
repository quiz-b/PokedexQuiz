package com.example.poke.entity;

import lombok.Data;

@Data
public class Pokemon {
	private String zukanNumber;
	private String name;
	private String generation;
    private String description;
    private String type1;
    private String type2;
}
