"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const taskSchema = new mongoose_1.default.Schema({
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
exports.Task = mongoose_1.default.model('Task', taskSchema);
//# sourceMappingURL=Task.js.map