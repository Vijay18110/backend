class ApiEncryptDecrypt {
  static async encryptString(key = process.env.ENCRYPTION_KEY, plainText) {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(key.padEnd(16, " ")); // Ensure key is 16 bytes
    const iv = new Uint8Array(16); // 16-byte IV (all zeros)
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "AES-CBC" },
      false,
      ["encrypt"]
    );
    const encrypted = await crypto.subtle.encrypt(
      { name: "AES-CBC", iv },
      cryptoKey,
      encoder.encode(plainText)
    );
    return btoa(String.fromCharCode(...new Uint8Array(encrypted))); // Convert to Base64
  }
  static async decryptString(key, cipherText) {
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();
    const keyData = encoder.encode(key.padEnd(16, " ")); // Ensure key is 16 bytes
    const iv = new Uint8Array(16); // 16-byte IV (all zeros)
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "AES-CBC" },
      false,
      ["decrypt"]
    );

    const encryptedData = Uint8Array.from(atob(cipherText), (c) =>
      c.charCodeAt(0)
    );
    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-CBC", iv },
      cryptoKey,
      encryptedData
    );

    return decoder.decode(decrypted);
  }
}

module.exports = ApiEncryptDecrypt