import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    completed: {
        type: String,
        required: true,
    },
});
export const Task = mongoose.model('Task', taskSchema);
//# sourceMappingURL=Task.js.map