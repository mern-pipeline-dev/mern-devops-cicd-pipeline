import { Request, Response } from 'express';
import Car from '../models/Car';

export const getAllCars = async (req: Request, res: Response): Promise<void> => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cars" });
  }
};

export const createCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const newCar = new Car(req.body);
    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
  } catch (error) {
    res.status(400).json({ message: "Invalid car data" });
  }
};