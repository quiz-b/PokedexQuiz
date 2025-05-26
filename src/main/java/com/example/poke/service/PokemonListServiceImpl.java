package com.example.poke.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.poke.entity.Pokemon;
import com.example.poke.repository.PokemonListRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PokemonListServiceImpl implements PokemonListService {

	private final PokemonListRepository repository;
	
	@Override
	public List<Pokemon> GetPokemonList(){
		
		List<Pokemon> result = repository.GetPokemonList();
		
		return result;
	}

}
