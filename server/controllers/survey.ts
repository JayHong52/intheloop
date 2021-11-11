/*=============================================
  FileName: controllers/survey.ts
  ProjectName: COMP229-005, Assignment #2
  CompanyName: Centennial Collge, Fall 2021
  Author: Jiwoong Hong, 301153138
  Date: 2021-10-22
  ============================================*/

import express from 'express';
import surveyModel from '../models/survey';

// ===========================
//   survey-list : DISPLAY 
// ===========================
export function DisplaySurveyListPage(req: express.Request, res: express.Response, next: express.NextFunction) {
    surveyModel.find(
        function (err, surveyCollection) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index-sub', {title: 'Survey List', page: 'survey/survey-list', survey: surveyCollection})
        }
    ).sort('name'); 
};

// ===========================
//   survey-edit : DISPLAY
// ===========================  
export function DisplaySurveyEditPage(req: express.Request, res: express.Response, next: express.NextFunction) {
    let id = req.params.id;
    surveyModel.findById(id, {}, {}, (err, surveyListItemToEdit) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index-sub', { title: "Survey Update", page: "survey/survey-edit", item: surveyListItemToEdit})
    })
};

// ===========================
//   survey-edit : PROCESS
// ===========================
export function ProcessSurveyEditPage(req: express.Request, res: express.Response, next: express.NextFunction) {
    let id = req.params.id;
    let updatedItem = new surveyModel({
        "_id": id,
        "userName": req.body.userName,
        "question": req.body.question,
        "answer": req.body.answer,
        "remarks": req.body.remarks
    });
    surveyModel.updateOne({ _id: id }, updatedItem, {}, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/survey/list');
    })
}

// ====================================
//   survey-edit : Create - DISPLAY
// ====================================
export function DisplaySurveyAddPage(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.render('index-sub', { title: 'Create Survey', page: 'survey/survey-edit', item: ''});
}

// ====================================
//   survey-edit : Create - PROCESS 
// ====================================
export function ProcessSurveyAddPage(req: express.Request, res: express.Response, next: express.NextFunction): void {

    let newContact = new surveyModel({
        "userName": req.body.userName,
        "question": req.body.question,
        "answer": req.body.answer,
        "remarks": req.body.remarks
    });

    surveyModel.create(newContact, (err: any) => {
        if (err) {
            console.error(err);
            res.end(err);
        };
        res.redirect('/survey/list');
    }) 
}

// ====================================
//   survey-edit : Delete - PROCESS 
// ====================================
export function ProcessSurveyDeletePage(req: express.Request, res: express.Response, next: express.NextFunction) {
    let id = req.params.id;
    surveyModel.remove({ _id: id }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/survey/list');
    })
}