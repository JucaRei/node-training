// verifica se o usuário está logado

import jwt from 'jsonwebtoken'
// biblioteca padrão do node ( pega uma função de callback e transforma em uma função async await)
import { promisify } from 'util';

import authConfig from '../../config/auth'

export default async (req, res, next) => {
  // pegar o token no header
  const authHeader = req.headers.authorization

  // console.log(authHeader);

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' })
  }

  // dividir a partir do espaço, pega so o bearer e o token em arrays separados
  // const token = authHeader.split(' ');

  // como preciso do token, não pega o bearer(desestruturação)
  const [, token] = authHeader.split(' ');

  try {
    // coloca qual função você quer transformar
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    // console.log(decoded);

    // incluir o id do usuário dentro do req
    req.userId = decoded.id;

    return next();

  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
}
