package com.example.interviewmatching.controller;

import com.example.interviewmatching.model.User;
import com.example.interviewmatching.service.UserService;

import org.hibernate.mapping.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // GET /api/users/discord/{discordId} - Get a user by Discord ID
    @GetMapping("/discord/{discordId}")
    public ResponseEntity<User> getUserByDiscordId(@PathVariable String discordId) {
        Optional<User> user = userService.getUserByDiscordId(discordId);
        return user.isPresent() ? new ResponseEntity<>(user.get(), HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // POST /users - Create a new user
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody java.util.Map<String, String> requestBody) {
        String discordId = requestBody.get("discordId");
        Optional<User> existingUser = userService.getUserByDiscordId(discordId);
        if (!existingUser.isPresent()) {
            User user = new User();
            user.setDiscordId(discordId);
            User savedUser = userService.saveUser(user);
            return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
