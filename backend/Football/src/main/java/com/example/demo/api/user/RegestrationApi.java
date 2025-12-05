package com.example.demo.api.user;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

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

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path = "/api")
@AllArgsConstructor
public class RegestrationApi {

	private PasswordEncoder encoder;
	private UserRepository userRepository;
	private RoleRepository roleRepository;

	@PostMapping(path="/register")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<?> registerPost(@RequestBody User user) {

		Optional<User> existingUserOpt = userRepository.findByUsername(user.getUsername());

	    if (existingUserOpt.isPresent()) {
	        User existingUser = existingUserOpt.get();
	        if (encoder.matches(user.getPassword(), existingUser.getPassword())) {
	            return ResponseEntity.status(HttpStatus.CONFLICT)
	                    .body("User with same username and password already exists");
	        } else {
	            return ResponseEntity.status(HttpStatus.CONFLICT)
	                    .body("Username already taken");
	        }
	    }
		if(user.getAuthorities().isEmpty() || user.getAuthorities()==null) {
			
			Role role=roleRepository.findByRole("ROLE_USER").get();
			user.getRoles().add(role);
		}else {
			Set<Role> resolvedRoles = user.getRoles().stream()
		            .map(role -> roleRepository.findByRole(role.getRole())
		                .orElseThrow(() -> new RuntimeException("Role not found: " + role.getRole())))
		            .collect(Collectors.toSet());
		        user.setRoles(resolvedRoles);
		}
		user.setPassword(encoder.encode(user.getPassword()));
		userRepository.save(user);
		return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
		
		
	}

	@PostMapping(path = "/login")
	public ResponseEntity<?> loginPost(@RequestBody User user) {
		Optional<User> findUser = userRepository.findByUsername(user.getUsername());
		if (!findUser.isEmpty()) {
			User existingUser = findUser.get();
				if (encoder.matches(user.getPassword(), existingUser.getPassword())) {
					return ResponseEntity.status(HttpStatus.OK).body("Login successful");
			}
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
	}

}
