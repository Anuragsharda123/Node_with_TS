import { Router } from 'express';
import { getAllUser, addUser, loginUser, updatUser, getUser } from '../controller/userController';

const router: Router = Router();

router.get('/', getAllUser);
router.post('/adduser', addUser);
router.post('/user', loginUser);

router.put('/user/:id', updatUser)
      .get('/user/:id', getUser);

export default router;
