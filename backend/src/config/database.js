import mongoose from 'mongoose';
import winston from 'winston';

if (process.env.NODE_ENV !== 'test') {
  mongoose
    .connect(`${process.env.DB_CONNECTION}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .catch((error) => winston.error(error));
  mongoose.connection.on('open', () => winston.info('MongoDB connected'));
}

export default mongoose;
