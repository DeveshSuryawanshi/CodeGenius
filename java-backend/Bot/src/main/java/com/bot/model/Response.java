package com.bot.model;

import java.util.List;

public class Response {
    private List<Choice> choices;

    public Response() {
    }

    public Response(List<Choice> choices) {
        this.choices = choices;
    }

    public List<Choice> getChoices() {
        return choices;
    }

    public void setChoices(List<Choice> choices) {
        this.choices = choices;
    }
}