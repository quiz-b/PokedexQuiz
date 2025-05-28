package com.example.poke.service;

import java.util.List;

import com.example.poke.entity.Pokemon;

public interface PokemonListService {
	List<Pokemon> GetPokemonList();
	List<Pokemon> getPokemonsByGenerations(List<String> generation);
}
