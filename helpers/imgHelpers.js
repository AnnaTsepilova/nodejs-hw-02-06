const jimp = require("jimp");

const imageSize = async (imgPath) => {
  try {
    const image = await jimp.read(imgPath).resize(250, 250).writeAsync(imgPath);
    return image;
  } catch (error) {
    console.log(error);
  }
};

module.exports = imageSize;
