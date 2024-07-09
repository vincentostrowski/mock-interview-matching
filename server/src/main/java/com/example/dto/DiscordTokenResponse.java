package com.example.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DiscordTokenResponse {
    private String access_token;
    private String token_type;
    private String expires_in;
    private String refresh_token;
    private String scope;

    public DiscordTokenResponse() {
    }
}
