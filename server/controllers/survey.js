"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessSurveyDeletePage = exports.ProcessSurveyAddPage = exports.DisplaySurveyAddPage = exports.ProcessSurveyEditPage = exports.DisplaySurveyEditPage = exports.DisplaySurveyActivePage = exports.DisplaySurveyManagePage = void 0;
const survey_1 = __importDefault(require("../models/survey"));
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
    survey_1.default.find(function (err, intheLoopSurveys) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index-sub', { title: 'Active Surveys', page: 'survey/survey-active', surveyList: intheLoopSurveys, displayName: (0, utils_1.UserDisplayName)(req) });
    }).sort('date');
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
        "title": req.body.title,
        "answer": req.body.answer,
        "remarks": req.body.remarks
    });
    survey_1.default.updateOne({ _id: id }, updatedItem, {}, (err) => {
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
        "active": false
    });
    let id = newSurvey._id;
    survey_1.default.create(newSurvey, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        ;
        res.redirect('/survey/edit/' + id);
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
        res.redirect('/survey/manage');
    });
}
exports.ProcessSurveyDeletePage = ProcessSurveyDeletePage;
//# sourceMappingURL=survey.js.map