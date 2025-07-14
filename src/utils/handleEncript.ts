import argon2 from "argon2";

export async function hash(text: string) {
  const hash = await argon2.hash(text);
  return hash;
}

export async function verifyHash(hash: string, text: string) {
  return await argon2.verify(hash, text);
}
