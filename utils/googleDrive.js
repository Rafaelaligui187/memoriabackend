const { google } = require("googleapis");
const stream = require("stream");

const KEYFILEPATH = "./config/credentials.json"; // Adjust the path if needed
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
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
