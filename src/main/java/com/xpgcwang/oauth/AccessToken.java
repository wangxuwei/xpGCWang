package com.xpgcwang.oauth;



public class AccessToken {

    private String accessToken;
    private String expireIn;
    
    
    
    public String getAccessToken() {
        return accessToken;
    }



    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }



    public String getExpireIn() {
        return expireIn;
    }



    public void setExpireIn(String expireIn) {
        this.expireIn = expireIn;
    }



    @Override
    public String toString() {
        return "AccessToken [" +
        "accessToken=" + accessToken + 
        ", expireIn=" + expireIn + 
        "]";
    }








}
