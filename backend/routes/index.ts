import express from 'express';
import { auth } from 'express-oauth2-jwt-bearer';

const router = express.Router();

const jwtCheck = auth({
  audience: 'https://rh206api/',
  issuerBaseURL: 'https://dev-877imlccjsw0uj8x.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

router.get('/', (req, res) => {
  res.send('Hello from Express!');
});

router.get('/authorized', jwtCheck, (req, res) => {
  res.json({ authorized: true });
});

export default router;
