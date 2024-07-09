package com.example.interviewmatching.service;

import net.dv8tion.jda.api.JDA;
import net.dv8tion.jda.api.JDABuilder;
import net.dv8tion.jda.api.entities.TextChannel;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
public class DiscordService {

    @Value("${discord.bot.token}")
    private String botToken;

    private JDA jda;

    @PostConstruct
    public void init() throws Exception {
        jda = JDABuilder.createDefault(botToken).build();
        jda.awaitReady();
    }

    public void sendMessageToChannel(String channelId, String message) {
        TextChannel channel = jda.getTextChannelById(channelId);
        if (channel != null) {
            channel.sendMessage(message).queue();
        }
    }

    public String mentionUser(String discordUserId) {
        return "<@" + discordUserId + ">";
    }
}
