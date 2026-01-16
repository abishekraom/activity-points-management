import mongoose from 'mongoose';

const pointSchema = new mongoose.Schema({
  date: String,
  points: Number
});

const Point = mongoose.model('Point', pointSchema);

export default Point;
