const getAuthSheets = require("./authorize");

async function sendData(data) {
  try {
    const { auth, googleSheets, spreadsheetId } = await getAuthSheets();
    const getRows = await googleSheets.spreadsheets.values.update({
      auth,
      spreadsheetId,
      range: "engenharia_de_software!A4:H",
      resource: data,
      valueInputOption: "USER_ENTERED",
    });
    return getRows.data.values;
  } catch (error) {
    console.error("Failed to obtain metadata:", error);
  }
}

module.exports = sendData;
