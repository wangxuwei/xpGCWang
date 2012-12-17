package com.xpgcwang.oauth;

import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

import net.sf.json.JSONObject;

import org.apache.commons.httpclient.methods.PostMethod;

import com.britesnow.snow.util.JsonUtil;
import com.xpgcwang.util.Client;

public class OAuthManager {
    
    private static final String GG_CLIENT_ID     = "933291900481.apps.googleusercontent.com";
    private static final String GG_CLIENT_SEC    = "TGlst95iUS_PoUbDei4q2zB0";
    private static final String GG_CALLBACK_URL  = "http://www.google.com/oauth2callback";
    private static final String GG_AUTHORIZE_URL = "https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=" + GG_CLIENT_ID
                                                                         + "&client_serect="
                                                                         + GG_CLIENT_SEC
                                                                         + "&redirect_uri="
                                                                         + GG_CALLBACK_URL
                                                                         + "&scope=http://www.google.com/m8/feeds/";
    private static final String GG_TOKEN_URL     = "https://accounts.google.com/o/oauth2/token";

    public String authorize(String service) {
        return GG_AUTHORIZE_URL;
    }

    public AccessToken getToken(String code, String service) {

        PostMethod postMethod = null;
        AccessToken accessToken = new AccessToken();
        postMethod = new PostMethod(GG_TOKEN_URL);
        postMethod.addParameter("client_id", GG_CLIENT_ID);
        postMethod.addParameter("client_secret", GG_CLIENT_SEC);
        postMethod.addParameter("grant_type", "authorization_code");
        postMethod.addParameter("redirect_uri", GG_CALLBACK_URL);
        code = URLDecoder.decode(code);
        postMethod.addParameter("code", code);
        postMethod.addParameter("format", "json");
        String response = null;
        try {
            response = Client.send(postMethod);
        } catch (Exception e) {
            e.printStackTrace();
        }
        JSONObject opts = (JSONObject) JsonUtil.toMapAndList(response);
        accessToken.setAccessToken(opts.getString("access_token"));
        accessToken.setExpireIn(opts.getString("expires_in"));
        return accessToken;
    }

    public Map getMapByQueryString(String queryString) {
        Map map = new HashMap();
        String[] params = queryString.split("&");
        for (String entry : params) {
            if (entry != null && !entry.equals("")) {
                String[] keyValues = entry.split("=");
                if (keyValues[0] != null && !keyValues[0].equals("") && keyValues.length == 2 && keyValues[1] != null) {
                    map.put(keyValues[0], keyValues[1]);
                }
            }
        }

        return map;
    }

}
