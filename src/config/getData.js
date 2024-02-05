const getAuthSheets = require("./authorize");

async function getData() {
  try {
    const { auth, googleSheets, spreadsheetId } = await getAuthSheets();
    const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "engenharia_de_software",
    });
    console.log(getRows.data.values);
    return getRows.data.values;
  } catch (error) {
    console.error("Erro ao obter metadados:", error);
  }
}

module.exports = getData;
