<h1 align="center">@fwd/sheets 📊</h1>

> A NodeJS library for programmatically using Google Spreadsheets.

### 🏠 [Homepage](https://github.com/fwd/sheets)

## Description

This package is under active development. Probably not ready for production.

## Install

```sh
npm install fwd/sheets
# or
yarn add fwd/sheets
```

## Before Using

Before you can use this, you'll need a few things. 

#### 1. Get Google Cloud Credentials as JSON

See this: [https://cloud.google.com/docs/authentication/getting-started](https://cloud.google.com/docs/authentication/getting-started)

#### 2. Get the spreadsheetId of the Google Spreadsheet you want to use.

That's easy, every Google Spreadsheet has it in the URL.

See this: [https://stackoverflow.com/questions/36061433/how-to-do-i-locate-a-google-spreadsheet-id](https://stackoverflow.com/questions/36061433/how-to-do-i-locate-a-google-spreadsheet-id)

#### 3. You need to add the 'client_email' of your Google Cloud API Key as an editor in the Google Spreadsheet.

Just click Share in the top right of the Google Spreadsheet, and add the email as if it was a person's email.

See this: [https://support.google.com/docs/answer/9331169?hl=en#6.1](https://support.google.com/docs/answer/9331169?hl=en#6.1)


## Usage

```javascript

const spreadsheets = require('@fwd/sheets')

// init __GOOGLE_API_KEY__
const spreadsheet = spreadsheets({
	"type": "service_account",
	"project_id": "",
	"private_key_id": "",
	"private_key": "",
	"client_email": "",
	"client_id": "",
	"auth_uri": "",
	"token_uri": "",
	"auth_provider_x509_cert_url": "",
	"client_x509_cert_url": ""
})

;(async() => {

	var sheet = await spreadsheets.init("spreadsheetId")

	// Available methods
	 
	sheet.getWorksheets() 
	sheet.addRow(worksheetName, value) 
	sheet.addRows(worksheetName, values) 
	sheet.getRows(worksheetName) 
	sheet.getWorksheet(worksheetName) 
	sheet.setWorksheet(worksheetName, headerValues) 

})()

```