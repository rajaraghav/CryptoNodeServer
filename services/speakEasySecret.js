const speakeasy = require("speakeasy");

const generateSecret = () => speakeasy.generateSecret({ length: 20 });
const generateSecret32 = () => speakeasy.generateSecret({ length: 20 }).base32;
module.exports = generateSecret;
module.exports.speakEasyValueGenerator = generateSecret32;
