@isTest
public with sharing class ShippingStatusControllerTest {
    
   
    public class MockHttpResponse implements HttpCalloutMock {
        public HTTPResponse respond(HTTPRequest req) { 
            HttpResponse res = new HttpResponse();
            res.setBody('Shipped- On Time');
            res.setStatusCode(200);
            return res;
        }
    }
   
    @isTest
    static void testGetShippingStatus() {
        Test.setMock(HttpCalloutMock.class, new MockHttpResponse());

        String trackingNumber = '12345';

        String result = ShippingStatusController.getShippingStatus(trackingNumber);

        System.assertEquals('Shipped- On Time', result, 'The shipping status should match the mock response.');
    }
    
}
