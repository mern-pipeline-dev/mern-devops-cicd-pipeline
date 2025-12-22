import mongoose, { Schema, Document } from 'mongoose';

export interface ICar extends Document {
    name: string;
    brand: string;
    type: 'Sedan' | 'SUV' | 'Luxury' | 'Sport';
    transmission: 'Automatic' | 'Manual';
    fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
    seats: number;
    pricePerDay: number;
    images: string[];
    description?: string;
    features: string[];
    availability: boolean;
    rating: number;
    reviewsCount: number;
}

const CarSchema: Schema = new Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  type: { type: String, enum: ['Sedan', 'SUV', 'Luxury', 'Sport'], required: true },
  transmission: { type: String, enum: ['Automatic', 'Manual'], default: 'Automatic' },
  fuelType: { type: String, enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'] },
  seats: { type: Number, required: true },
  pricePerDay: { type: Number, required: true },
  images: [{ type: String }],
  description: { type: String },
  features: [{ type: String }],
  availability: { type: Boolean, default: true },
  rating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model<ICar>('Car', CarSchema);