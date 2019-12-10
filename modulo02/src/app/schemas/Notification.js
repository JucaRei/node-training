import mongoose, { Mongoose } from 'mongoose';

// schema pro mongo
const NotificationSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: Number,
      required: true,
    },
    // se a notificação foi lida ou não
    read: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    // pegar a data de criação, etc
    timestamps: true,
  }
);

export default mongoose.model('Notification', NotificationSchema);

// Notificar a cada agendamento realizado
