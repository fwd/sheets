const { GoogleSpreadsheet } = require('google-spreadsheet')

module.exports = (credentials) => {

  if (!credentials) {
    console.log("Error: No credentials provided.")
    return
  }

  return {

    doc: null,

    async init(databaseId) {
      this.doc = new GoogleSpreadsheet(databaseId);
      await this.doc.useServiceAccountAuth(credentials);
      await this.doc.loadInfo();
      return this
    },  

    async getProperties() {
      return this.doc
    },

    async setProperties(properties) {
      await this.doc.updateProperties(properties);
    },

    async getWorksheets() {
      var list = await this.doc.sheetsById
      var worksheets = []
      for (index in list) {
        worksheets.push(list[index]._rawProperties)
      }
      return worksheets
    },

    async setRow(worksheetName, rowId, object) {
        
      rowId = parseInt(rowId)

      var sheet = await this.getWorksheet(worksheetName)

      if (!sheet) {
        return false
      }

      var rows = await sheet.getRows()

      var keys = Object.keys(object)

      for (var i in keys) {
        if (rows[rowId] && rows[rowId][keys[i]]) {
          rows[rowId][keys[i]] = object[keys[i]]
          rows[rowId].save()
        } else {
          console.log(`Row ${rowId} does not exists.`)
        }
      }

    },

    async addRow(worksheetName, value) {

      var sheet = await this.getWorksheet(worksheetName)

      if (!sheet) {
        return false
      }

      await sheet.addRow(value)

    },
    
    async addRows(worksheetName, values) {

      var sheet = await this.getWorksheet(worksheetName)

      if (!sheet) {
        return false
      }

      await sheet.addRows(values)

    },

    async getRows(worksheetName) {

      var sheet = await this.getWorksheet(worksheetName)

      var rows = await sheet.getRows()
      
      var data = []

      rows.map((row, index) => {
          var item = {}
          item.id = index
          Object.keys(row).map(a => {
              if (a !== '_sheet' && a !== '_rawData' && a !== 'id') {
                  item[a] = row[a]
              }
          })
          delete item._rowNumber
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

      return this.doc.sheetsById[sheet.sheetId]

    },

    async setWorksheet(worksheetName, headerValues) {

      const newSheet = await this.doc.addSheet({
          title: worksheetName,
          headerValues: headerValues
      });

      return newSheet

    },

  }
  
}
