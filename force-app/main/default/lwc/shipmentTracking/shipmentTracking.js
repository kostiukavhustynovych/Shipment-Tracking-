import { LightningElement, track } from 'lwc';
import getShippingStatus from '@salesforce/apex/ShippingStatusController.getShippingStatus';
import ShipmentTrackerEmptyTrackingNumber from "@salesforce/label/c.ShipmentTrackerEmptyTrackingNumber";
import ShipmentTrackerRetrieveStatusError from "@salesforce/label/c.ShipmentTrackerRetrieveStatusError";
import ShipmentTrackerEnterTrackingNumber from "@salesforce/label/c.ShipmentTrackerEnterTrackingNumber";
import ShipmentTrackerGetShippingStatus from "@salesforce/label/c.ShipmentTrackerGetShippingStatus";
import ShipmentTrackerTrackYourShipment from "@salesforce/label/c.ShipmentTrackerTrackYourShipment";

export default class ShipmentTracking extends LightningElement {

    label = {
        ShipmentTrackerEmptyTrackingNumber,
        ShipmentTrackerRetrieveStatusError,
        ShipmentTrackerEnterTrackingNumber,
        ShipmentTrackerGetShippingStatus,
        ShipmentTrackerTrackYourShipment
    }

     trackingNumber= '';
     shippingStatus = '';
     error= '';

    handleInputChange(event) {
        this.trackingNumber = event.target.value;
    }

    handleGetStatus() {
        this.shippingStatus = null;
        this.error = null;
        if (this.trackingNumber === '') {
            
            this.error = this.label.ShipmentTrackerEmptyTrackingNumber;
            return;
        }
        
        getShippingStatus({ trackingNumber: this.trackingNumber })
            .then(result => {
                this.shippingStatus = result;
                this.error = '';
            })
            .catch(error => {
                this.error = this.label.ShipmentTrackerRetrieveStatusError;
                this.shippingStatus = '';
            });
    }

    get hasResult() {
            return this.error || this.shippingStatus ;
    }
}