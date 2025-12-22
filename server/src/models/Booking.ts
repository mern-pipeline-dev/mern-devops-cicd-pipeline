import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  car: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  bookedTimeSlots: { from: string; to: string };
  totalHours?: number;
  totalAmount: number;
  transactionId?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
}

const BookingSchema: Schema = new Schema({
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookedTimeSlots: {
    from: { type: String, required: true },
    to: { type: String, required: true }
  },
  totalHours: { type: Number },
  totalAmount: { type: Number, required: true },
  transactionId: { type: String },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled', 'completed'], 
    default: 'pending' 
  }
}, { timestamps: true });

export default mongoose.model<IBooking>('Booking', BookingSchema);