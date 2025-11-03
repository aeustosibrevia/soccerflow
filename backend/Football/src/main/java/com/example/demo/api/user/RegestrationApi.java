package com.example.demo.api.user;

import java.util.List;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.usermodel.Role;
import com.example.demo.usermodel.User;

@RestController
@RequestMapping(path="/api")
public class RegestrationApi {

   
	private PasswordEncoder encoder;
	private UserRepository userRepository;
	private RoleRepository roleRepository;
	
	
	public RegestrationApi(PasswordEncoder encoder, UserRepository userRepository, 
		 RoleRepository roleRepository) {
		super();
		this.roleRepository=roleRepository;
		this.encoder = encoder;
		this.userRepository = userRepository;
	}


	@PostMapping(path="/register")
	@ResponseStatus(HttpStatus.CREATED)
	public User registerPost(@RequestBody User user) {
		user.setPassword(encoder.encode(user.getPassword()));
		if(user.getAuthorities().isEmpty() || user.getAuthorities()==null) {
			
			Role role=roleRepository.findByRole("ROLE_USER").get();
			user.getRoles().add(role);
		}
		return userRepository.save(user);
		
	}
	
	@PostMapping(path="/login")
	public ResponseEntity<?> loginPost(@RequestBody User user) {
		List<User> findUser=userRepository.findByUsername(user.getUsername());
		if(!findUser.isEmpty()) {
			for(User userIter: findUser) {
				if(encoder.matches(user.getPassword(), userIter.getPassword())) {
					return  ResponseEntity.status(HttpStatus.OK).body("Login successful");
				}
			}
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
	}

}
