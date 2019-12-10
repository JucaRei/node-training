import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize'; // operador do sequelize (between)
import Appointment from '../models/Appointment';
import User from '../models/User';

// listagem do Prestador de serviços
class ScheduleController {
  async index(req, res) {
    // verificar se é prestador de serviço ou não
    const checkUserProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkUserProvider) {
      return res.status(401).json({ error: 'User is not a provider' });
    }

    const { date } = req.query;
    const parsedDate = parseISO(date);

    // 2019-12-11 00:00:00
    // 2019-12-11 23:59:59
    // utilizar apenas os dias e não os horários (lista os agendamentos do dia)
    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.userId, // listar todos os agendamentos, que o prestador é igual ao usuário logado
        canceled_at: null,
        // comparação entre dois valores
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      order: ['date'],
    });

    return res.json(appointments);
  }
}

export default new ScheduleController();
