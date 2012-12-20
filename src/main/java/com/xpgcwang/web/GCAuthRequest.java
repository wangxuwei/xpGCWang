package com.xpgcwang.web;

import java.util.Map;

import javax.servlet.http.Cookie;

import org.apache.commons.httpclient.HttpMethod;
import org.apache.commons.httpclient.methods.GetMethod;

import com.britesnow.snow.web.RequestContext;
import com.britesnow.snow.web.auth.AuthRequest;
import com.britesnow.snow.web.auth.AuthToken;
import com.britesnow.snow.web.handler.annotation.WebModelHandler;
import com.britesnow.snow.web.param.annotation.WebModel;
import com.xpgcwang.util.Client;

public class GCAuthRequest implements AuthRequest {

    @Override
    public AuthToken authRequest(RequestContext rc) {
        String userIdStr = rc.getCookie("userId");

        if (userIdStr != null) {
            // if valid, then, we create the AuthTocken with our User object
            
            String token = userIdStr;
            String url = "http://www.google.com/m8/feeds/contacts/default/full";
            HttpMethod method = new GetMethod(url);
            method.addRequestHeader("GData-Version", "3.0");
            method.addRequestHeader("Authorization", "Bearer " + token);
            AuthToken<String> authToken = new AuthToken<String>();
            try {
                Client.send(method);
                authToken.setUser(userIdStr);
            }catch(Exception e){
                if(e.getMessage().indexOf("401") == 0){
                    for(Cookie c : rc.getReq().getCookies()){
                        String uId = "userId";
                        if(uId.equals(c.getName())){
                            c.setPath("/");
                            c.setMaxAge(0);
                            rc.getRes().addCookie(c);
                        }
                    }
                }else{
                    e.printStackTrace();
                }
                return null;
            }
            return authToken;
        } else {
            return null;
        }
    }

    @WebModelHandler(startsWith = "/")
    public void pageIndex(@WebModel Map m, RequestContext rc) {
        // gameTestManager.init();
        m.put("user", rc.getUser(String.class));
    }
}