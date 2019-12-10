import User from '../models/User';
import Notification from '../schemas/Notification';

class NotificationController {
  async index(req, res) {
    // rota só pode ser vista por prestadores de serviços
    const checkIsProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkIsProvider) {
      return res
        .status(401)
        .json({ error: 'Only providers can load Notifications' });
    }

    // listar notificações
    const notifications = await Notification
      .find({
        user: req.userId,
      })
      .sort({ createdAt: 'desc' })
      .limit(20);
    // mostra ordem decrescente

    return res.json(notifications);
  }
}

export default new NotificationController();
