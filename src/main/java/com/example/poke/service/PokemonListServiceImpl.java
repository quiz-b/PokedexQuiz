package com.example.poke.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

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
		
		//List<Pokemon> result = repository.GetPokemonList();
		
		//return result;
		return null;
	}

	@Override
	public List<Pokemon> getPokemonsByGenerations(List<String> generations) {
        List<List<Pokemon>> results = new ArrayList<>();

        if (generations.contains("第一世代")) {
            results.add(repository.findByNumberBetween("0001", "0150"));
        }
        if (generations.contains("第二世代")) {
            results.add(repository.findByNumberBetween("0152", "0250"));
        }
        if (generations.contains("第三世代")) {
            results.add(repository.findByNumberBetween("0252", "386"));
        }

        return results.stream().flatMap(Collection::stream).collect(Collectors.toList());
    }

}
