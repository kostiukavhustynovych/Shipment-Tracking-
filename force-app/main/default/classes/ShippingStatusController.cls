public with sharing class ShippingStatusController {
  
    
    @AuraEnabled
    public static String getShippingStatus(String trackingNumber) {
        HttpRequest req = new HttpRequest();
        Http http = new Http();       
        req.setEndpoint('callout:ShipmentTracker'+'?trackingNumber='+String.escapeSingleQuotes(trackingNumber));
        req.setMethod('GET');
    
        try {
            HttpResponse res = http.send(req);
            return res.getBody();
        } catch (Exception e) {
            return System.label.ShipmentTrackerHttpError;
        }
    }
}
