import elliptic from "elliptic"
const ec = new elliptic.ec('secp256k1');

export function generatePair() {
  const keypair = ec.genKeyPair()
  return {
    publicKey: keypair.getPublic('hex'),
    privateKey: keypair.getPrivate('hex')
  }
}
