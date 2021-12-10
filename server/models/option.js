"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const surveyAnswerSchema = new Schema({
    optionText: String,
    answerCount: Number
}, {
    collection: "intheLoopOptions"
});
const Model = mongoose_1.default.model("Option", surveyAnswerSchema);
exports.default = Model;
//# sourceMappingURL=option.js.map