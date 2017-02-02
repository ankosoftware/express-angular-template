import api from './api/routes';
import {ERROR_MESSAGES} from './errors';

export default function (app) {
  app.use('/api/v1/', api);
  app.use((req, res) => {
    res.status(404).json({error: ERROR_MESSAGES.NOT_FOUND});
  })
};
