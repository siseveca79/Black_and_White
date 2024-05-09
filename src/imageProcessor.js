const Jimp = require('jimp');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

exports.processImage = async function(imageUrl) {
    let image = await Jimp.read(imageUrl);
    image.grayscale().resize(350, Jimp.AUTO);
    let newImageName = `${uuidv4().slice(0, 8)}.jpg`;
    let newImagePath = path.join(__dirname, '..', 'processed', newImageName);
    await image.writeAsync(newImagePath);
    return `http://localhost:${process.env.PORT || 3000}/processed/${newImageName}`;
};
