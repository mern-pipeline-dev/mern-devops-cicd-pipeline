import { Router } from 'express';
import { getAllCars, createCar } from '../controllers/car.controller';

const router = Router();

router.get('/', getAllCars);
router.post('/', createCar);

export default router;