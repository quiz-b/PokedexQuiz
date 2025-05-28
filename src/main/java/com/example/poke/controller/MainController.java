package com.example.poke.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.poke.entity.Pokemon;
import com.example.poke.service.PokemonListService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class MainController {
	
	private final PokemonListService service;
	
	@GetMapping("/top")
	public String Top() {
		return "pokedexquiz-top";
	}
	
	@PostMapping("/startgame")
	public String StartGame(@RequestParam List<String> generation, Model model){
		
		System.out.print(service.GetPokemonList());
		System.out.print("StartGame");
		
		List<Pokemon> pokemons = service.getPokemonsByGenerations(generation);
		
		model.addAttribute("pokemonList", pokemons);
		
		return "main-game";
	}
}
