/*=======================================================
  FileName: /server/controllers/survey.ts
  ProjectName: IntheLoop - Survey 
  CompanyName: Centennial Collge, Fall 2021
  Author: Hong, Jiwoong - 301153138
          Vargas, Joel  - 301161522
          Zheng, Ziwei  - 301180464
  Date: 2021-11-26
  Remarks: Survey route controller 
  ======================================================*/

import express from 'express';
import surveyModel from '../models/survey';
import { UserDisplayName } from '../utils';

// ===========================
//   Manage Survey : DISPLAY 
// ===========================
export function DisplaySurveyManagePage(req: express.Request, res: express.Response, next: express.NextFunction) {
    surveyModel.find(
        {user: req.user},
        function (err, intheLoopSurveys) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index-sub', {title: 'Manage Your Surveys', page: 'survey/survey-manage', surveyList: intheLoopSurveys, displayName: UserDisplayName(req)})
        }
    ).sort('date'); 
};

// ===========================
//   Active Survey : DISPLAY 
// ===========================
export function DisplaySurveyActivePage(req: express.Request, res: express.Response, next: express.NextFunction) {
    
    surveyModel.find(
        // uncomment it when you're done working with 
        //{active: false},
        function (err, intheLoopSurveys) 
        {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index-sub', {title: 'Active Surveys', page: 'survey/survey-active', surveyList: intheLoopSurveys, displayName: UserDisplayName(req)})
        }
    ).sort('date')
};

// ===========================
//   Edit Survey : DISPLAY
// ===========================  
export function DisplaySurveyEditPage(req: express.Request, res: express.Response, next: express.NextFunction) {
    let id = req.params.id;
    surveyModel.findById(id, {}, {}, (err, SurveyListItemToEdit) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index-sub', { title: "Survey Update", page: "survey/survey-edit", item: SurveyListItemToEdit, displayName: UserDisplayName(req)})
    })
};

// ===========================
//   Edit Survey : PROCESS
// ===========================
export function ProcessSurveyEditPage(req: express.Request, res: express.Response, next: express.NextFunction) {
    let id = req.params.id;
    let updatedItem = new surveyModel({
        "_id": id,
        "userName": req.body.userName,
        "title": req.body.title,
        "answer": req.body.answer,
        "remarks": req.body.remarks
    });
    surveyModel.updateOne({ _id: id }, updatedItem, {}, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/survey/manage');
    })
}

// ====================================
//   Create Survey : DISPLAY
// ====================================
export function DisplaySurveyAddPage(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.render('index-sub', { title: 'Create Survey', page: 'survey/survey-create', item: '', displayName: UserDisplayName(req) });
}

// ====================================
//   Create Survey : PROCESS 
// ====================================
export function ProcessSurveyAddPage(req: express.Request, res: express.Response, next: express.NextFunction): void {

    let newSurvey = new surveyModel({
        "user": req.user,
        "title": req.body.title,
        "remarks": req.body.remarks,
        "active": false
    });

    let id = newSurvey._id;

    surveyModel.create(newSurvey, (err: any) => {
        if (err) {
            console.error(err);
            res.end(err);
        };
        res.redirect('/survey/edit/' + id);
    }) 
}

// ====================================
//   Survey-edit : Delete - PROCESS 
// ====================================
export function ProcessSurveyDeletePage(req: express.Request, res: express.Response, next: express.NextFunction) {
    let id = req.params.id;
    surveyModel.remove({ _id: id }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/survey/manage');
    })
}