import { auth } from 'express-oauth2-jwt-bearer';

const jwtCheck = auth({
  audience: 'https://rh206api/',
  issuerBaseURL: 'https://dev-877imlccjsw0uj8x.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

export default jwtCheck;