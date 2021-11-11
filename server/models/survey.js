"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const surveySchema = new Schema({
    userName: String,
    question: String,
    answer: String,
    remarks: String
}, {
    collection: "intheLoopSurveys"
});
const Model = mongoose_1.default.model("survey", surveySchema);
exports.default = Model;
//# sourceMappingURL=survey.js.map