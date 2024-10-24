import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import getShippingStatus from '@salesforce/apex/ShippingStatusController.getShippingStatus';
import ShipmentTrackerEmptyTrackingNumber from "@salesforce/label/c.ShipmentTrackerEmptyTrackingNumber";
import ShipmentTrackerRetrieveStatusError from "@salesforce/label/c.ShipmentTrackerRetrieveStatusError";
import ShipmentTrackerTrackingNumber from "@salesforce/label/c.ShipmentTrackerTrackingNumber";
import ShipmentTrackerGetShippingStatus from "@salesforce/label/c.ShipmentTrackerGetShippingStatus";
import ShipmentTrackerTrackYourShipment from "@salesforce/label/c.ShipmentTrackerTrackYourShipment";

import TrackingNumber from "@salesforce/schema/Shipment.TrackingNumber"

const FIELDS = [TrackingNumber];

export default class ShipmentTracking extends LightningElement {

    @api recordId;
    label = {
        ShipmentTrackerEmptyTrackingNumber,
        ShipmentTrackerRetrieveStatusError,
        ShipmentTrackerTrackingNumber,
        ShipmentTrackerGetShippingStatus,
        ShipmentTrackerTrackYourShipment
    }

     trackingNumber= '';
     shippingStatus = '';
     error= '';

     @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
     getShipment({data,error}){
        if (data) {
            this.trackingNumber= data.fields?.TrackingNumber?.value;
        }
     };

     connectedCallback() {
        console.log('Connected:', this.recordId);
    }

    handleInputChange(event) {
        this.trackingNumber = event.target.value;
    }

    handleGetStatus() {
        this.shippingStatus = null;
        this.error = null;
        if (!this.trackingNumber) {
            
            this.error = this.label.ShipmentTrackerEmptyTrackingNumber;
            return;
        }
        
        getShippingStatus({ trackingNumber: this.trackingNumber })
            .then(result => {
                this.shippingStatus = result;
                this.error = '';
            })
            .catch(error => {
                console.error(error);
                this.error = this.label.ShipmentTrackerRetrieveStatusError;
                this.shippingStatus = '';
            });
    }

    get hasResult() {
            return this.error || this.shippingStatus ;
    }
}