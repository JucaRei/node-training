import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import authConfig from '../../config/auth';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required()
    });

    // verificar se o req.body está passando com o schema de validações
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { email, password } = req.body; // pega o email e a senha do corpo da requisição

    // verifica se existe um usuário com esse email ( email: email, no caso esta usando short syntax)
    const user = await User.findOne({ where: { email } });

    // verifica se usuário não exite
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // verifica se a senha NÃO está batendo...
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      // coloca dentro do token: id, qualquer coisa que so você vai saber, tempo de expiração (7 dias)
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
