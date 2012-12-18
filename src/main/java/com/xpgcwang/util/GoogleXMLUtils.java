package com.xpgcwang.util;

import java.io.StringReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

public class GoogleXMLUtils {

    public static List parseContacts(String contactXML) {
        List list = new ArrayList();
        if(contactXML == null){
            return list;
        }
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder = null;
        try {
            builder = factory.newDocumentBuilder();
            InputSource is = new InputSource(new StringReader(contactXML));
            Document doc = builder.parse(is);
            NodeList nl = doc.getElementsByTagName("entry");
            for (int i = 0; i < nl.getLength(); i++) {
                Map map = new HashMap();
                Element element = (Element) nl.item(i);
                String id = element.getElementsByTagName("id").item(0).getFirstChild().getNodeValue();
                id = id.substring(id.lastIndexOf("/") + 1,id.length());
                map.put("id", id);
                Node nameObj = element.getElementsByTagName("title").item(0).getFirstChild();
                map.put("name", nameObj == null ? "" : nameObj.getNodeValue());
                Node emailObj = element.getElementsByTagName("gd:email").item(0).getAttributes().getNamedItem("address");
                map.put("email", emailObj == null ? "" : emailObj.getNodeValue());
                
                List groupIds = new ArrayList();
                NodeList gnodes = element.getElementsByTagName("gContact:groupMembershipInfo");
                if(gnodes != null){
                    for(int j = 0; j < gnodes.getLength(); j++){
                        String groupId = gnodes.item(j).getAttributes().getNamedItem("href").getNodeValue();
                        groupIds.add(groupId);
                    }
                }
                map.put("groupIds", groupIds);
                list.add(map);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }

    public static List parseGroups(String groupXML) {
        List list = new ArrayList();
        if(groupXML == null){
            return list;
        }
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder = null;
        try {
            builder = factory.newDocumentBuilder();
            InputSource is = new InputSource(new StringReader(groupXML));
            Document doc = builder.parse(is);
            NodeList nl = doc.getElementsByTagName("entry");
            for (int i = 0; i < nl.getLength(); i++) {
                Map map = new HashMap();
                Element element = (Element) nl.item(i);
                String id = element.getElementsByTagName("id").item(0).getFirstChild().getNodeValue();
                map.put("fullId", id);
                id = id.substring(id.lastIndexOf("/") + 1,id.length());
                map.put("id", id);
                Node nameObj = element.getElementsByTagName("title").item(0).getFirstChild();
                map.put("name", nameObj == null ? "" : nameObj.getNodeValue());
                list.add(map);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }
}
