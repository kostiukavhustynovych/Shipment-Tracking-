public with sharing class ShippingStatusController {
  
    private static final String MOCK_SERVICE_URL ='https://merzcommunities--tina.sandbox.my.salesforce-sites.com/services/apexrest/mockShipmentStatus?trackingNumber=';

    @AuraEnabled
    public static String getShippingStatus(String trackingNumber) {
        HttpRequest req = new HttpRequest();
        Http http = new Http();
        
        req.setEndpoint(MOCK_SERVICE_URL + String.escapeSingleQuotes(trackingNumber));
        req.setMethod('GET');
    
        try {
            HttpResponse res = http.send(req);
            return res.getBody();
        } catch (Exception e) {
            return System.label.ShipmentTrackerHttpError;
        }
    }
}
