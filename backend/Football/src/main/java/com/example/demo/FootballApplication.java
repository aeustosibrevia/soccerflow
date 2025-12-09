package com.example.demo;

import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.CustomUserDetailService;
import com.example.demo.usermodel.Role;
import com.example.demo.usermodel.User;

@SpringBootApplication
public class FootballApplication {

	public static void main(String[] args) {
		SpringApplication.run(FootballApplication.class, args);
	}
	@Bean
	ApplicationRunner run( UserRepository userRepository, RoleRepository roleRepository,
			PasswordEncoder encode){ 
		return args->{
			Role adminRole=roleRepository.findByRole("ROLE_ADMIN")
					.orElseGet(()->roleRepository.save(new Role("ROLE_ADMIN")));
			Role userRole=roleRepository.findByRole("ROLE_USER")
					.orElseGet(()->roleRepository.save(new Role("ROLE_USER")));
			Role editorRole=roleRepository.findByRole("ROLE_EDITOR")
					.orElseGet(()->roleRepository.save(new Role("ROLE_EDITOR")));
			if(userRepository.findByUsername("admin").isEmpty()) {
				User admin=new User();
				admin.setUsername("admin");
	            admin.setPassword(encode.encode("123"));
	            admin.getRoles().add(adminRole);
	            userRepository.save(admin);
			}
		};
	}
		
	@Bean
	UserDetailsService userDetailsService(CustomUserDetailService custom) {
	    return custom;
	}

}
