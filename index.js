const server = require('@fwd/server')
const { GoogleSpreadsheet } = require('google-spreadsheet')
module.exports = (config) => {

  // config = {
  //     "type": "service_account",
  //     "project_id": "",
  //     "private_key_id": "",
  //     "private_key": "",
  //     "client_email": "",
  //     "client_id": "",
  //     "auth_uri": "",
  //     "token_uri": "",
  //     "auth_provider_x509_cert_url": "",
  //     "client_x509_cert_url": ""
  // }

  return {
      db: null,
      async init(databaseId) {
          this.db = new GoogleSpreadsheet(databaseId);
          await this.db.useServiceAccountAuth(config);
          return this
      },
      async listTitles() {
          try {
              var list = []
              var worksheets = await this.list()
              for (var i in worksheets) {
                  list.push(worksheets[i]._rawProperties.title)
              }
              return list
          } catch (e) {
              return e.message
          }
      },
      async list() {
          try {
              await this.db.loadInfo();
              return this.db.sheetsById
          } catch (e) {
              return e.message
          }
      },
      async find(worksheet) {
          await this.db.loadInfo();
          var list = await this.list()
          for (index in list) {
              if (index === worksheet || list[index]._rawProperties && list[index]._rawProperties.title === worksheet) {
                  worksheet = list[index]
              }
          }
          if (typeof worksheet === 'string') {
              return false
          }
          return worksheet
      },
      async get(worksheet) {
          try {
              await this.db.loadInfo();
              var response = []
              worksheet = await this.find(worksheet)
              if (!worksheet) {
                  return false
              }
              var rows = await worksheet.getRows()
              rows.map((row) => {
                  var item = {}
                  Object.keys(row).map(a => {
                      if (a !== '_sheet' && a !== '_rawData') {
                          item[a] = row[a]
                      }
                  })
                  response.push(item)
              })
              return response
          } catch (e) {
              return {
                  error: true,
                  message: e.message
              }
          }
      },
      async add(worksheet, values) {
          await this.db.loadInfo();
          if (typeof worksheet === 'string') {
              worksheet = await this.find(worksheet)
          }
          if (!worksheet) {
              return false
          }
          values.uuid = server.uuid().slice(0, 7)
          var row = await worksheet.addRow(values)
          return row
      },
      async update(worksheet, row, change) {
          await this.db.loadInfo()
          if (typeof worksheet === 'string') {
              worksheet = await this.find(worksheet)
          }
          if (!worksheet) {
              return false
          }
          var rows = await worksheet.getRows();
          var row = rows.find(a => a.uuid === row) || rows.find(a => a._rowNumber === row) || rows.find(a => a.username === row) || rows.find(a => a.email === row)
          if (row) {
              for (var i in change) {
                  row[i] = change[i];
              }
              await row.save(); // save updates
          }
      },
      async create(worksheet, headerValues) {
          await this.db.loadInfo();
          headerValues = headerValues
          if (!headerValues.find(a => a === 'uuid')) {
              headerValues.unshift('uuid')
          }
          try {
              const newSheet = await this.db.addSheet({
                  title: worksheet,
                  headerValues: headerValues
              });
              return newSheet
          } catch (e) {
              console.log(e.message)
              return
          }
      }
  }
  
}