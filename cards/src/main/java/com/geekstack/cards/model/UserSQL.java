package com.geekstack.cards.model;

public class UserSQL {
    private String userId;
    private String email;
    private String name;
    private String displaypic;
    private String fcmToken;

    public UserSQL(){}
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDisplaypic() {
        return displaypic;
    }
    public void setDisplaypic(String displaypic) {
        this.displaypic = displaypic;
    }
    public String getFcmToken() {
        return fcmToken;
    }
    public void setFcmToken(String fcmToken) {
        this.fcmToken = fcmToken;
    }

    
}
