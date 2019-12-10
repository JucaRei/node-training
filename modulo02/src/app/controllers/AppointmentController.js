import { startOfHour, parseISO, isBefore } from 'date-fns'; // somente alguns métodos
import * as Yup from 'yup';
import User from '../models/User';
import File from '../models/File';
import Appointment from '../models/Appointment';

class AppointmentController {
  // listagem do agendamentos do usuário(comum) logado
  async index(req, res) {
    // paginação dos agendamentos | se não for informado, por padrão esta na pagina 1
    const { page = 1 } = req.query;

    // todos os agendamentos
    const appointments = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null },
      // ordernar (é um array), por data
      order: ['date'],
      // listar numero de registros por vez
      limit: 20,
      // quantos registros se quer pular (não vai pular nenhum registro)
      offset: (page - 1) * 20,
      attributes: ['id', 'date'],
      // incluir os dados do prestador de serviços
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          // incluir o avatar do usuário
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            }
          ]
        }
      ]
    });

    return res.json(appointments);
  }

  // criar agendamento
  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { provider_id, date } = req.body;

    /**
     * Check if provider_id is a provider
     */
    const checkIsProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    // se não for provider
    if (!checkIsProvider) {
      return res
        .status(401)
        .json({ error: 'You can only create appointments with providers' });
    }

    // verificar a hora do agendamento(pega sempre o inicio da hora), tranforma em um objeto date do JS
    const hourStart = startOfHour(parseISO(date));

    // Check for past dates
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    /**
     * verifica se o prestador de serviços ja não agendamento marcado pro mesmo horário
     * (Check date availability)
     */
    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });

    if (checkAvailability) {
      return res
        .status(400)
        .json({ error: 'Appointment date is not available' });
    }

    /**
     * Passando por essa verificação, cria o agendamento
     */
    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date: hourStart,
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
