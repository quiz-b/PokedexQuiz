package com.example.poke.repository;

import java.util.List;

import com.example.poke.entity.Pokemon;

public interface PokemonListRepository {
	List<Pokemon> GetPokemonList();
}
