const getAuthSheets = require("./authorize");

async function getData() {
  try {
    const { auth, googleSheets, spreadsheetId } = await getAuthSheets();
    const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "engenharia_de_software",
    });
    return getRows.data.values;
  } catch (error) {
    console.error("Failed to obtain metadata:", error);
  }
}

module.exports = getData;
