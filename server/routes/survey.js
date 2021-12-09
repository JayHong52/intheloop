"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const survey_1 = require("../controllers/survey");
const router = express_1.default.Router();
router.get('/manage', survey_1.DisplaySurveyManagePage);
router.get('/active', survey_1.DisplaySurveyActivePage);
router.get('/edit/:id', survey_1.DisplaySurveyEditPage);
router.post('/edit/:id', survey_1.ProcessSurveyEditPage);
router.get('/add', survey_1.DisplaySurveyAddPage);
router.post('/add', survey_1.ProcessSurveyAddPage);
router.get('/delete/:id', survey_1.ProcessSurveyDeletePage);
router.get('/manage/:id/question/add', survey_1.DisplayQuestionAddPage);
router.post('/manage/:id/question/add', survey_1.ProcessQuestionAddPage);
exports.default = router;
//# sourceMappingURL=survey.js.map