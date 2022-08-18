import { Router } from 'express';

const LoginRoutes = Router();

LoginRoutes.post('/login', (req, res) => { res.status(201).send('Hello World!'); });

export default LoginRoutes;
