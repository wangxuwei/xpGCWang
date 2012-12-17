package com.xpgcwang.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.httpclient.Header;
import org.apache.commons.httpclient.HttpMethod;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.StringRequestEntity;

import com.britesnow.snow.web.RequestContext;
import com.britesnow.snow.web.handler.annotation.WebActionHandler;
import com.britesnow.snow.web.handler.annotation.WebModelHandler;
import com.britesnow.snow.web.param.annotation.WebModel;
import com.britesnow.snow.web.param.annotation.WebParam;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.xpgcwang.oauth.OAuthManager;
import com.xpgcwang.util.Client;
import com.xpgcwang.util.GoogleXMLUtils;

@Singleton
public class GGContactWebHandlers {

    private static final String GG_URL = "http://www.google.com/m8/feeds/contacts/default/full";

    @Inject
    private OAuthManager        oauthManager;

    @WebModelHandler(startsWith = "/listContacts")
    public void listContacts(@WebModel Map m, @WebParam("groupId") String groupId, RequestContext rc) {
        String token = rc.getUser(String.class);
        String url = GG_URL;
        if(groupId != null){
            url = url + "?group="+"Family";
        }
        HttpMethod method = new GetMethod(url);
        method.addRequestHeader("GData-Version", "3.0");
        method.addRequestHeader("Authorization", "Bearer " + token);
        String response = null;
        try {
            response = Client.send(method);
        } catch (Exception e) {
            e.printStackTrace();
        }
        List contacts = GoogleXMLUtils.parseContacts(response);
        m.put("result", contacts);
        Header etag = method.getResponseHeader("ETag");
        setEtag(etag.getValue().toString(),rc);
    }

    @WebModelHandler(startsWith = "/getContact")
    public void getContact(@WebModel Map m, @WebParam("id") String id, RequestContext rc) {
        String token = rc.getUser(String.class);
        HttpMethod method = new GetMethod(GG_URL + "/" + id);
        method.addRequestHeader("Authorization", "Bearer " + token);
        String response = null;
        try {
            response = Client.send(method);
        } catch (Exception e) {
            e.printStackTrace();
        }
        List contacts = GoogleXMLUtils.parseContacts(response);
        Map contact = new HashMap();
        if (contacts != null && contacts.size() > 0) {
            contact = (Map) contacts.get(0);
        }
        m.put("result", contact);
        Header etag = method.getResponseHeader("ETag");
        setEtag(etag.getValue().toString(),rc);
    }

    @WebActionHandler
    public Object saveContact(@WebModel Map m, @WebParam("id") String id, @WebParam("name") String name,
                            @WebParam("email") String email, RequestContext rc) {
        String token = rc.getUser(String.class);
        PostMethod method = null;

        StringBuilder xml = new StringBuilder();
        xml.append("<atom:entry xmlns:atom='http://www.w3.org/2005/Atom'" + " xmlns:gd='http://schemas.google.com/g/2005'>"
                                + " <atom:category scheme='http://schemas.google.com/g/2005#kind'"
                                + " term='http://schemas.google.com/contact/2008#contact'/>");
        if (name != null) {
            xml.append("<atom:title type='text'>"+name+"</atom:title>");
        }

        if (email != null) {
            xml.append("<gd:email rel='http://schemas.google.com/g/2005#work' primary='true' address='"+email+"' />");
        }
        xml.append("</atom:entry>");
        if (id == null || "".equals(id)) {
            method = new PostMethod(GG_URL);
        } else {
            method = new PostMethod(GG_URL + "/" + id);
            method.addRequestHeader("If-Match", "*");
        }
        try {
            method.addRequestHeader("Authorization", "Bearer " + token);
            method.addRequestHeader("GData-Version", "3.0");
            method.setRequestEntity(new StringRequestEntity(xml.toString(),"application/atom+xml", "UTF-8"));
            String response = Client.send(method);
        } catch (Exception e) {
            e.printStackTrace();
        }
        Header etag = method.getResponseHeader("ETag");
        setEtag(etag.getValue().toString(),rc);
        return null;
    }

    @WebActionHandler
    public Object deleteContact(@WebModel Map m, @WebParam("id") String id, RequestContext rc) {
        String token = rc.getUser(String.class);
        String etagStr = getEtag(rc);
        PostMethod method = new PostMethod(GG_URL + "/" + id);
        method.addRequestHeader("GData-Version", "3.0");
        method.addRequestHeader("If-Match", "*");
        method.addRequestHeader("Authorization", "Bearer " + token);
        method.addRequestHeader("X-HTTP-Method-Override", "DELETE");
        try {
            Client.send(method);
        } catch (Exception e) {
            e.printStackTrace();
        }
        Header etag = method.getResponseHeader("ETag");
        setEtag(etag.getValue().toString(),rc);
        return null;
    }
    
    private void setEtag(String etags,RequestContext rc){
        rc.setCookie("etag", etags);
    }
    private String getEtag(RequestContext rc){
        String etag = rc.getCookie("etag");
        etag = etag.replaceAll("&quot;", "\"");
        return etag;
    }
}
