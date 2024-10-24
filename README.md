Project Structure Overview
The LWC is made up of four core components:

HTML Template: Defines the structure and layout of the user interface.
JavaScript Controller: Handles user input, communication with the backend API, and response processing.
CSS (Optional): Custom styles for improving the appearance of the component.
ShippingStatusController (Apex) The backend logic is handled by an Apex REST service.



1. HTML Template
The HTML template provides the user interface for the component. It contains:

A custom label that replaces the default Lightning Input label for better styling control.
An input field for the user to enter their tracking number.
A submit button that triggers an API call to fetch the shipping status.
A section that displays the shipping status or error message, depending on the response.
Key functionalities:

A lightning-card is used to wrap the input and button elements to provide a visually appealing layout.
Input and button elements are centered and styled using SLDS to maintain a clean and responsive layout.
Status or error messages are conditionally displayed depending on the API response.

2. JavaScript Controller
The JavaScript controller manages the logic for the component. It handles:

Capturing the Shipment tracking number on Shipment record detail page.
Sending a request to the mock shipping status service via Apex.
Processing the API response and updating the UI with the shipping status or an error message.
Key points:

State management: Tracking the shipment tracking number, shipping status, and any error messages.
Input handling: Shipment tracking number is taken by component.
API call: Upon submission, the tracking number is sent to the backend, and the response is processed to update the UI accordingly.

3. CSS (Optional)
Custom CSS can be used to improve the appearance and user experience of the component. Key visual elements that can be customized include:

The custom label for the tracking number input.
The input field width and layout.
The container box for displaying the shipment status, including padding, background color, and border radius for better UX.

4. ShippingStatusController (Apex)

The backend logic is handled by an Apex REST service. The mock shipping status service:

Accepts a tracking number via an HTTP GET request.
Returns a mock response indicating whether the shipment is "Shipped - On Time".
Returns an error message if no tracking number is provided.

How It Works
The user enters a tracking number in the input field.
The user clicks the "Get Shipping Status" button.
The component sends the tracking number to the mock API.
The API responds with either:
The shipment status, if the tracking number is valid.
An error message if the tracking number is missing or incorrect.
The result (status or error) is displayed to the user in real time.

Installation and Setup
Clone this repository to your local environment.
Deploy the Apex class (MockShippingStatusService) to your Salesforce Org.
Deploy the LWC (ShipmentTracking) to your Salesforce Org.
Deploy ShipmentTracking.remoteSite-meta.xml to your Salesforce Org (We need to deploy this to enable the connection to a mock endpoint.)
Add the LWC component to a Lightning App or Record Page.
Test by entering a tracking number and submitting it.