export default {
    port: 8080,
    dbUri: "mongodb://localhost:27017/burgerdb",
    saltWorkFactor: 10,
    accessTokenTtl: '15m',
    refreshTokenTtl: '1y',
    publicKey: `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQChQVvdmFCsxQxXa0VZsC/yzzVr
TbMyHfT/9+enadoNv1HfPVFQImCFVNpivaMPT07U2S6odvpWfLhyZelE/BHlMbad
3/PRKMqPZkQAjMsmx4fdypga6aQLpclDp/OTU8JyWzcs82qtHue3+L+pMWMosvfy
lvo9gJ12cPG5awD+hQIDAQAB
-----END PUBLIC KEY-----`,
    privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQChQVvdmFCsxQxXa0VZsC/yzzVrTbMyHfT/9+enadoNv1HfPVFQ
ImCFVNpivaMPT07U2S6odvpWfLhyZelE/BHlMbad3/PRKMqPZkQAjMsmx4fdypga
6aQLpclDp/OTU8JyWzcs82qtHue3+L+pMWMosvfylvo9gJ12cPG5awD+hQIDAQAB
AoGBAIntVZ5cweSFRuEfJ9pnERwmkBKQC046wWyPpt1TdOd9VZIU6JAaV2S0B3ed
rPNTaqI0gewmmEmRtFJlSPlwgfykzIoYey6qRPJHsRc8cywupVehR3exEWYf6rRB
nih3Zm2scCEEqSrhNBQ10zwOHCRs8+0qeapr+M1quw84BGihAkEAzDeIjsgIeaV2
cupPzWDhSiSlYY9wN9PTDV9yoaNtNo3HZqDpDcS/RHmNfhspXRH0tAMwJLtGcTGo
eZeY6G+NUwJBAMolB6FN8qyk4DDSvER21ijgGsAQaGGdQjKySF1KqLzLkf0uxgMx
5XnWOqfEBTZNib0CTehCTc4Lo2xoXd/l8ccCQQCNolJenJNsMvrUtneEfJWjw4jE
AiSVQ59T3gf13Q+oz2olXqJkPzlcd2VPuezVNNffZXqlbxFq/kLXmfGd+4grAkBS
GTH9IERUO+5VxfDyuXUHSuVyZfeO1ajCIEhlo2Hes6sKMgn32DcEAa723hTj1h//
5MSxdORWr8Fi0Qx3V9OXAkBRPSG77026EZuUriFkWGx61T2IsgjccWM7TXDKDhca
mL7lZqR56anUEPICFE6vfttXlgtnZahfFbdCvoooSG1z
-----END RSA PRIVATE KEY-----`
};