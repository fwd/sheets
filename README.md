<h1 align="center">@fwd/sheets 📊</h1>

> A NodeJS library for programmatically using Google Spreadsheets.

### 🏠 [Homepage](https://github.com/fwd/sheets)

## Description

This package is under active development. 

## Install

```sh
npm install @fwd/sheets
# or
yarn add @fwd/sheets
```

## Usage

```javascript

const spreadsheets = require('@fwd/sheets')

var config = {
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
}

config["spreadsheetId"] = ""

;(async() => {

	// init
	const spreadsheet = await spreadsheets(config)

	// Available methods
	spreadsheet.addRow(worksheetName, value) {}
	spreadsheet.addRows(worksheetName, values) {}
	spreadsheet.getRows(worksheetName) {}
	spreadsheet.getWorksheet(worksheetName) {}
	spreadsheet.setWorksheet(worksheetName, headerValues) {}

})()

```

## Author

👤  **Forward Miami**

* Website: [https://forward.miami](https://forward.miami)
* Github: [@fwd](https://github.com/fwd)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/fwd/render/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2020 [Forward Miami](https://forward.miami).
