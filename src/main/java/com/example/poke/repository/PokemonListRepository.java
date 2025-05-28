package com.example.poke.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.poke.entity.Pokemon;

public interface PokemonListRepository  extends JpaRepository<Pokemon, Long>{
	//List<Pokemon> GetPokemonList();
	//List<Pokemon> GetPokemonListByGenerations(List<String> generation);
    List<Pokemon> findByNumberBetween(String start, String end);
}
