package com.bot.model;

public class Choice {
    private Integer index;
    private Message message;

    public Choice() {
    }

    public Choice(Integer index, Message message) {
        this.index = index;
        this.message = message;
    }

    public Integer getIndex() {
        return index;
    }

    public void setIndex(Integer index) {
        this.index = index;
    }

    public Message getMessage() {
        return message;
    }

    public void setMessage(Message message) {
        this.message = message;
    }
}