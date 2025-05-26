package com.example.poke.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.poke.entity.Pokemon;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class PokemonListRepositoryImpl implements PokemonListRepository {

	private final JdbcTemplate jdbcTemplate;
	
	@Override
	public List<Pokemon> GetPokemonList() {
		String sql =
				" SELECT * FROM pokemon_description ORDER BY id;";
		
		System.out.print(sql);
		
		// SQLで検索（プレースホルダ：p）
		List<Map<String, Object>> list 
				= jdbcTemplate.queryForList(sql);
		
		System.out.print(list);
		
		List<Pokemon> result = new ArrayList<>();

	    for (Map<String, Object> row : list) {
	        Pokemon pokemon = new Pokemon();

	        // カラム名はDB定義に合わせてください
	        pokemon.setZukanNumber((String) row.get("number"));
	        pokemon.setName((String) row.get("name"));
	        pokemon.setGeneration((String) row.get("generation"));
	        pokemon.setDescription((String) row.get("description"));
	        pokemon.setType1((String) row.get("type1"));
	        pokemon.setType2((String) row.get("type2"));

	        result.add(pokemon);
	    }
		
		return result;
	}
}
