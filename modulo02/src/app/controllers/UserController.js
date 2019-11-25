import User from '../models/User';

class UserController {
  async store(req, res) {
    // verificar se já não existe usuário com o email
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    // const user = await User.create(req.body);
    // retornar pro frontend se os campos necessários e não todos
    const { id, name, email, provider } = await User.create(req.body);

    // return res.json(user);
    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
