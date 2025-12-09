package com.example.demo.usermodel;

import org.springframework.security.core.GrantedAuthority;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="roles")
public class Role implements GrantedAuthority {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	@Column(nullable=false, unique=true)
	private String role;
	@Override
	public String getAuthority() {
		return role;
	}
	public Role(String role) {
		super();
		this.role = role;
	}
	public Role() {
		super();
	}
	

}
