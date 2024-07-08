package com.example.interviewmatching.service;

import com.example.interviewmatching.model.User;
import com.example.interviewmatching.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public Optional<User> getUserByDiscordId(String discordId) {
        return userRepository.findByDiscordId(discordId);
    }

    public boolean existsByDiscordId(String discordId) {
        return userRepository.existsByDiscordId(discordId);
    }
}
