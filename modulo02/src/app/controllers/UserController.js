// importação do Yup tem que ser assim, porque ele não tem nenhum export default
import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    // Validações - Yup segue o schema validation
    const schema = Yup.object().shape({
      // validando um objeto(req.body é um objeto - shape (formato que o objeto tenha))
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(), // verifica se o email esta correto: @, etc
      password: Yup.string()
        .required()
        .min(6), // mínimo 6 digitos
    });

    // verificar se o req.body está passando com o schema de validações
    // if (!(await schema.isValid(req.body))) {
    //   return res.status(400).json({ error: 'Validation failed' });
    // }

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

  // alteração dos dados cadastrados
  async update(req, res) {
    // console.log(req.userId);

    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6), // se informar a senha antiga a nova precisa estar presente
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) => {  // validação condicional em cima da variavel oldPassword
          oldPassword ? field.required() : field; // se oldPassword estiver preenchido, é requirido o campo password
        }),
      confirmPassword: Yup.string()
        .when('password', (password, field) => { // quando tiver o campo senha preenchido, vai requerer o campo confirmar
          password ? field.required().oneOf([Yup.ref('password')]) : field;
        }), // igual ao password metodo do Yup, comparar | ref - referindo ao campo password, seja igual ao password
    });

    // verificar se o req.body está passando com o schema de validações
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    // vai mostrar a senha antiga/atual para atualizar (oldPassword)
    const { email, oldPassword } = req.body;

    // procurar pelo primary key
    const user = await User.findByPk(req.userId);

    // verifica se o email que vai alterar é diferente do email, que o usuário ja tem
    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    // verifica se a senha antiga/atual bate com que já tem
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, provider } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
