# url-shortener-microservice

## Overview
This is a URL Shortener Microservice built with **Node.js**, **Express**, and **MongoDB/Mongoose**. It allows users to submit a valid URL and receive a shortened numeric URL. Visiting the shortened URL will redirect the user to the original URL.

This project fulfills the [freeCodeCamp Back End Development and APIs URL Shortener Microservice project requirements](https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/url-shortener-microservice).

## Features
- Validate submitted URLs with **DNS lookup**
- Save URLs in **MongoDB** using **Mongoose**
- Generate **incrementing numeric IDs** for short URLs
- Redirect users when accessing the short URL
- Return JSON responses for API requests

## API Endpoints

### POST `/api/shorturl`
- **Description:** Shortens a valid URL
- **Request:** Form data with key `url`
- **Response (JSON):**
```json
{
  "original_url": "https://www.example.com",
  "short_url": 1
}
```
- Error response:
```json
{ "error": "invalid url" }
```

### GET `/api/shorturl/:id`
- Description: Redirects to the original URL corresponding to the `short_url` ID
- Response: Redirect to original URL
- Error response:
```json
{ "error": "No short URL found" }
```

## Example Usage

Shorten a URL:
```bash
POST /api/shorturl
url=https://www.freecodecamp.org
```

Response:
```json
{
  "original_url": "https://www.freecodecamp.org",
  "short_url": 1
}
```

Redirect using short URL:
```bash
GET /api/shorturl/1
```
Redirects to https://www.freecodecamp.org

## Technology Stack
- Node.js
- Express
- MongoDB & Mongoose
- DNS module for hostname validation
- Body-parser for form data parsing
- CORS for cross-origin requests

## Notes
- Numeric IDs increment based on the number of stored URLs
- Database and collection are automatically created on first URL submission
- Fully compatible with the freeCodeCamp testing suite

## Author
Brendan Harrington
