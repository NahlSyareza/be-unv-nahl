const cloudinary = require("cloudinary");

exports.uploadResult = async (f) => {
  return await cloudinary.uploader
    .upload(`data:${f.mimetype};base64,${f.buffer.toString("base64")}`, {
      public_id: `${f.originalname}`,
    })
    .catch((error) => {
      console.log(error);
    });
};
