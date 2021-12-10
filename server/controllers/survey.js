"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplaySurveyResultPage = exports.ProcessTakeSurvey = exports.DisplayTakeSurvey = exports.ProcessQuestionDeletePage = exports.ProcessQuestionAddPage = exports.DisplayQuestionAddPage = exports.ProcessSurveyDeletePage = exports.ProcessSurveyAddPage = exports.DisplaySurveyAddPage = exports.ProcessSurveyEditPage = exports.DisplaySurveyEditPage = exports.DisplaySurveyActivePage = exports.DisplaySurveyManagePage = void 0;
const survey_1 = __importDefault(require("../models/survey"));
const survey_answer_1 = __importDefault(require("../models/survey_answer"));
const question_1 = __importDefault(require("../models/question"));
const utils_1 = require("../utils");
function DisplaySurveyManagePage(req, res, next) {
    survey_1.default.find({ user: req.user }, function (err, intheLoopSurveys) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index-sub', { title: 'Manage Your Surveys', page: 'survey/survey-manage', surveyList: intheLoopSurveys, displayName: (0, utils_1.UserDisplayName)(req) });
    }).sort('date');
}
exports.DisplaySurveyManagePage = DisplaySurveyManagePage;
;
function DisplaySurveyActivePage(req, res, next) {
    survey_1.default.find({ active: true }).
        populate('user').
        populate('questions').sort('date').exec(function (err, surveyItem) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index-sub', { title: 'Active Surveys', page: 'survey/survey-active', surveyList: surveyItem, displayName: (0, utils_1.UserDisplayName)(req) });
    });
}
exports.DisplaySurveyActivePage = DisplaySurveyActivePage;
;
function DisplaySurveyEditPage(req, res, next) {
    let id = req.params.id;
    survey_1.default.findById({ _id: id }).populate('questions').exec(function (err, surveyItem) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index-sub', { title: "Manage Your Survey", page: "survey/survey-edit", item: surveyItem, displayName: (0, utils_1.UserDisplayName)(req) });
    });
}
exports.DisplaySurveyEditPage = DisplaySurveyEditPage;
function ProcessSurveyEditPage(req, res, next) {
    let id = req.params.id;
    let activeStatus = req.body.isActive;
    let isActive = false;
    if (activeStatus == "active") {
        isActive = true;
    }
    let title = req.body.title;
    let remarks = req.body.remarks;
    survey_1.default.updateOne({ _id: id }, { title: title, remarks: remarks, active: isActive }, {}, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/survey/manage');
    });
}
exports.ProcessSurveyEditPage = ProcessSurveyEditPage;
function DisplaySurveyAddPage(req, res, next) {
    res.render('index-sub', { title: 'Create Survey', page: 'survey/survey-create', item: '', displayName: (0, utils_1.UserDisplayName)(req) });
}
exports.DisplaySurveyAddPage = DisplaySurveyAddPage;
function ProcessSurveyAddPage(req, res, next) {
    let newSurvey = new survey_1.default({
        "user": req.user,
        "title": req.body.title,
        "remarks": req.body.remarks,
        "date": new Date(),
        "active": false,
    });
    let id = newSurvey._id;
    survey_1.default.create(newSurvey, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        ;
        res.redirect('/survey/manage/' + id);
    });
}
exports.ProcessSurveyAddPage = ProcessSurveyAddPage;
function ProcessSurveyDeletePage(req, res, next) {
    let id = req.params.id;
    survey_1.default.remove({ _id: id }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        ;
        res.redirect('/survey/manage');
    });
}
exports.ProcessSurveyDeletePage = ProcessSurveyDeletePage;
function DisplayQuestionAddPage(req, res, next) {
    let id = req.params.id;
    survey_1.default.findOne({ _id: id }, {}, {}, (err, surveyItem) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index-sub', { title: "Add Survey Questions", page: "survey/survey-question-edit", item: surveyItem, displayName: (0, utils_1.UserDisplayName)(req) });
    });
}
exports.DisplayQuestionAddPage = DisplayQuestionAddPage;
function ProcessQuestionAddPage(req, res, next) {
    let fields = ["option1", "option2", "option3", "option4", "option5"];
    let optionTexts = [];
    let options = [];
    for (let i = 0; i < fields.length; i++) {
        let option = req.body[fields[i]];
        if (option != "") {
            optionTexts.push(option);
        }
    }
    let newQuestion = new question_1.default({
        "question": req.body.question,
        "options": options
    });
    question_1.default.create(newQuestion, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        ;
    });
    let id = req.params.id;
    survey_1.default.updateOne({ _id: id }, { $push: { questions: newQuestion } }, {}, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        ;
        res.redirect('/survey/manage/' + id);
    });
}
exports.ProcessQuestionAddPage = ProcessQuestionAddPage;
function ProcessQuestionDeletePage(req, res, next) {
    let id = req.params.id;
    let qid = req.params.qid;
    survey_1.default.updateOne({ _id: id }, { $pullAll: { questions: [{ _id: qid }] } }, {}, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        ;
        res.redirect('/survey/manage/' + id);
    });
    question_1.default.deleteOne({ _id: qid }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        ;
    });
    console.log(qid);
}
exports.ProcessQuestionDeletePage = ProcessQuestionDeletePage;
function DisplayTakeSurvey(req, res, next) {
    let id = req.params.id;
    survey_1.default.findById({ _id: id }).populate('questions').exec(function (err, surveyItem) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index-sub', { title: surveyItem.title, page: "survey/survey-take", item: surveyItem, displayName: (0, utils_1.UserDisplayName)(req) });
    });
}
exports.DisplayTakeSurvey = DisplayTakeSurvey;
function ProcessTakeSurvey(req, res, next) {
    let id = req.params.id;
    let fields = ["answer1", "answer2", "answer3", "answer4", "answer5"];
    let answers = [];
    for (let i = 0; i < fields.length; i++) {
        if (req.body[fields[i]] != null) {
            let answer = req.body[fields[i]];
            answers.push(answer);
        }
    }
    console.log(answers);
    let surveyAnswer = new survey_answer_1.default({
        "user": req.user,
        "survey": id,
        "answers": answers
    });
    console.log(surveyAnswer);
    survey_answer_1.default.create(surveyAnswer, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        ;
        res.redirect('/survey/active');
    });
}
exports.ProcessTakeSurvey = ProcessTakeSurvey;
function DisplaySurveyResultPage(req, res, next) {
    res.render('index-sub', { title: "", page: "survey/survey-result", item: "", displayName: (0, utils_1.UserDisplayName)(req) });
}
exports.DisplaySurveyResultPage = DisplaySurveyResultPage;
//# sourceMappingURL=survey.js.map