# giantcrm

[![Build Status](https://travis-ci.org/lanbau/giantcrm.svg?branch=master)](https://travis-ci.org/lanbau/giantcrm)

## Description

GiantCRM is a WDI Project 3 created by @lanbau & @shawnlimws. It is a customer relationship management tool for business users to operate their business from one integration platform that is aimed to improve business productivity & agility.

## Features (Brief Overview)

1. Auth0's Oauth Authentication
2. Fetch 10 Upcoming Events from Google Calendar API
3. Add Event to Calendar
4. Retrieve Latest Inbox Emails
5. Display a List of Names of Your Google Contacts
6. Send Push Notifications to Registered Users (Mobile & Web) (This is using endpoints collected by our sub project https://github.com/shawnlimws/push-notifications-app)
7. Upload & Read a Txt File. Edit & Save as New Txt File.
8. Retrieve Your TripAdvisor's Profile Page Reviews (Company), Using IBM Watson Personality Insights To Get an Alternative Feedback of Your Customer Reviews.
9. Using Concept Insights To Parse A News Article From Channel News Asia & Display a List of Relevant Wikipedia Topics Found Within the Article.

### Installation Instructions
1. clone this repo
2. ```npm install --save```
3. ```bower install```
4. ```npm start```
5. visit http://localhost:5000 in your browser

### Testing 
1. Run ```mocha``` in your cli

### Technologies Used
- Express
- Jade
- HTML
- CSS
- JavaScript
- Bootstrap
- Google Charts
- JQuery

### APIs
- Google Contacts
- Google Calendar
- Gmail
- IBM Watson Personality Insights
- IBM Watson Concept Insights
