import userRoutes from './userRoutes';
import productRoutes from './productRoutes';

const routes = (app) => {
  app.use('/api/v1', userRoutes);
  app.use('/api/v1', productRoutes);
};

export default routes;
