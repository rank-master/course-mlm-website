import mongoose, { Schema } from 'mongoose';

const courseSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);
export default Course;