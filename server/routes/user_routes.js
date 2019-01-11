import userController from '../controllers/user_controller';
import express from 'express'
const router = express.Router();

router.route('/data-to-xml')
      .post(userController.dataToXml);

export default router;
