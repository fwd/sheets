const server = require('@fwd/server')
const { GoogleSpreadsheet } = require('google-spreadsheet')

module.exports = async (config) => {

  const doc = new GoogleSpreadsheet(config.spreadsheetId);

  await doc.useServiceAccountAuth(config);

  await doc.loadInfo();

  return {

    // async getHeaderValues() {},
    // async getHeaderValues(array) {},

    async getProperties() {
      return doc
    },

    async setProperties(properties) {
      await doc.updateProperties(properties);
    },

    async getWorksheets() {
      var list = await doc.sheetsById
      var worksheets = []
      for (index in list) {
        worksheets.push(list[index]._rawProperties)
      }
      return worksheets
    },

    async setRow(worksheetName, rowId, object) {
      
      var sheet = await this.getWorksheet(worksheetName)

      if (!sheet) {
        return false
      }

      var rows = await sheet.getRows()
      
      var row = rows.find(a => a._rowNumber === rowId)

      if (row) {
          
          for (var i in object) {
              row[i] = object[i];
          }

          await row.save();

      }

    },

    async addRow(worksheetName, value) {

      var sheet = this.getWorksheet(worksheetName)

      if (!sheet) {
        return false
      }

      sheet.addRow(value)

    },
    
    async addRows(worksheetName, values) {

      var sheet = this.getWorksheet(worksheetName)

      if (!sheet) {
        return false
      }

      sheet.addRows(values)

    },

    async getRows(worksheetName) {

      var sheet = await this.getWorksheet(worksheetName)

      var rows = await sheet.getRows()
      
      var data = []

      rows.map((row) => {
          var item = {}
          Object.keys(row).map(a => {
              if (a !== '_sheet' && a !== '_rawData') {
                  item[a] = row[a]
              }
          })
          data.push(item)
      })

      return data

    },

    async getWorksheet(worksheetName) {

      var sheets = await this.getWorksheets()

      var sheet = sheets.find(a => a.title === worksheetName || a.sheetId === worksheetName)

      if (!sheet) {
        return false
      }

      return doc.sheetsById[sheet.sheetId]

    },

    async setWorksheet(worksheetName, headerValues) {

      const newSheet = await doc.addSheet({
          title: worksheetName,
          headerValues: headerValues
      });

      return newSheet

    },

  }
  
}