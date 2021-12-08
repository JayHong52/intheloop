"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessSurveyDeletePage = exports.ProcessSurveyAddPage = exports.DisplaySurveyAddPage = exports.ProcessSurveyEditPage = exports.DisplaySurveyEditPage = exports.DisplaySurveyActivePage = exports.DisplaySurveyListPage = void 0;
const survey_1 = __importDefault(require("../models/survey"));
const utils_1 = require("../utils");
function DisplaySurveyListPage(req, res, next) {
    survey_1.default.find(function (err, intheLoopSurveys) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index-sub', { title: 'Manage Survey', page: 'survey/survey-list', survey: intheLoopSurveys, displayName: (0, utils_1.UserDisplayName)(req) });
    }).sort('name');
}
exports.DisplaySurveyListPage = DisplaySurveyListPage;
;
function DisplaySurveyActivePage(req, res, next) {
    survey_1.default.find(function (err, intheLoopSurveys) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index-sub', { title: 'Active Surveys', page: 'survey/survey-active', survey: intheLoopSurveys, displayName: (0, utils_1.UserDisplayName)(req) });
    });
}
exports.DisplaySurveyActivePage = DisplaySurveyActivePage;
;
function DisplaySurveyEditPage(req, res, next) {
    let id = req.params.id;
    survey_1.default.findById(id, {}, {}, (err, SurveyListItemToEdit) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index-sub', { title: "Survey Update", page: "survey/survey-edit", item: SurveyListItemToEdit, displayName: (0, utils_1.UserDisplayName)(req) });
    });
}
exports.DisplaySurveyEditPage = DisplaySurveyEditPage;
;
function ProcessSurveyEditPage(req, res, next) {
    let id = req.params.id;
    let updatedItem = new survey_1.default({
        "_id": id,
        "userName": req.body.userName,
        "question": req.body.question,
        "answer": req.body.answer,
        "remarks": req.body.remarks
    });
    survey_1.default.updateOne({ _id: id }, updatedItem, {}, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/survey/list');
    });
}
exports.ProcessSurveyEditPage = ProcessSurveyEditPage;
function DisplaySurveyAddPage(req, res, next) {
    res.render('index-sub', { title: 'Add Survey', page: 'survey/survey-edit', item: '', displayName: (0, utils_1.UserDisplayName)(req) });
}
exports.DisplaySurveyAddPage = DisplaySurveyAddPage;
function ProcessSurveyAddPage(req, res, next) {
    let newSurvey = new survey_1.default({
        "userName": req.body.userName,
        "question": req.body.question,
        "answer": req.body.answer,
        "remarks": req.body.remarks
    });
    survey_1.default.create(newSurvey, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        ;
        res.redirect('/survey/list');
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
        res.redirect('/survey/list');
    });
}
exports.ProcessSurveyDeletePage = ProcessSurveyDeletePage;
//# sourceMappingURL=survey.js.map