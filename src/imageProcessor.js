const Jimp = require('jimp');
const { v4: uuidv4 } = require('uuid');

exports.processImage = async function(imageUrl) {
    let image = await Jimp.read(imageUrl);
    image.grayscale().resize(350, Jimp.AUTO);
    let newImageUrl = `processed/${uuidv4().slice(0, 8)}.jpg`;
    await image.writeAsync(newImageUrl);
    return newImageUrl;
};
