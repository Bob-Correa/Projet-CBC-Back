import { Router } from 'express';
import { getActualites, createActualite} from '../controllers/actualiteController'

const actualiteRouter = Router()

actualiteRouter.get('/', getActualites);
actualiteRouter.post('', createActualite);

export {actualiteRouter}
