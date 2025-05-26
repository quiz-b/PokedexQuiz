package com.example.poke.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

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
	public String StartGame(Model model){
		
		System.out.print(service.GetPokemonList());
		System.out.print("StartGame");
		
		model.addAttribute("pokemonList", service.GetPokemonList());
		
		return "main-game";
	}
}
