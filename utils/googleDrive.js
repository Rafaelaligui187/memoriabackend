const { google } = require("googleapis");
const stream = require("stream");

const credentialsBase64 = process.env.GOOGLE_CREDENTIALS;
const credentialsJSON = Buffer.from(credentialsBase64, "base64").toString("utf-8");
const credentials = JSON.parse(credentialsJSON);

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/drive.file"],
});

const drive = google.drive({ version: "v3", auth });

async function uploadFile(fileBuffer, fileName, mimeType) {
  try {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileBuffer);

    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        parents: [process.env.GOOGLE_DRIVE_FOLDER_ID], // Ensure this env variable is set
      },
      media: {
        mimeType,
        body: bufferStream,
      },
    });

    if (!response.data.id) {
      console.error("Google Drive upload failed:", response);
      return null;
    }

    const fileId = response.data.id;

    // ✅ Make the file publicly accessible
    await drive.permissions.create({
      fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    return `https://drive.google.com/uc?id=${fileId}`;
  } catch (error) {
    console.error("Error uploading file:", error);
    return null;
  }
}

module.exports = { uploadFile };
