"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const surveyAnswerSchema = new Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    survey: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Survey' },
    answers: [{ String }]
}, {
    collection: "intheLoopSurveyAnswers"
});
const Model = mongoose_1.default.model("Survey", surveyAnswerSchema);
exports.default = Model;
//# sourceMappingURL=surveyAnswer.js.map