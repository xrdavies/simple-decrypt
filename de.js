const crypto = require('crypto');

function decrypt2(text, originalKey) {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');

  const derivedKey = crypto.pbkdf2Sync(originalKey, 'salt', 100000, 32, 'sha512');

  try {
    const decipher = crypto.createDecipheriv('aes-256-cbc', derivedKey, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } catch (error) {
    console.error(`Decryption failed: ${error}`);
    throw new Error('Decryption failed');
  }
}

const text = ''; // 待解密的文本
const originalKey = ''; // 盐

try {
  const decryptedText = decrypt2(text, originalKey);
  console.log(decryptedText);
} catch (error) {
  console.error(error);
}