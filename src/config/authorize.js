const { google } = require("googleapis");
const { GoogleAuth } = require("google-auth-library");

const getAuthSheets = async () => {
  const auth = new GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  const client = await auth.getClient();
  const googleSheets = google.sheets({
    version: "v4",
    auth: client,
  });

  const spreadsheetId = "1JnWhD20fBvYBWwN0e3qORsOUVaIJLWQNF15l-zOnM2k";

  return {
    auth,
    client,
    googleSheets,
    spreadsheetId,
  };
};

module.exports = getAuthSheets;
