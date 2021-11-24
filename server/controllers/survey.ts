/*=============================================
  FileName: controllers/Survey.ts
  ProjectName: COMP229-005, Assignment #2
  CompanyName: Centennial Collge, Fall 2021
  Author: Jiwoong Hong, 301153138
  Date: 2021-10-22
  ============================================*/

import express from 'express';
import SurveyModel from '../models/survey';
import { UserDisplayName } from '../utils';

// ===========================
//   Survey-list : DISPLAY 
// ===========================
export function DisplaySurveyListPage(req: express.Request, res: express.Response, next: express.NextFunction) {
    SurveyModel.find(
        function (err, intheLoopSurveys) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index-sub', {title: 'Survey List', page: 'survey/survey-list', survey: intheLoopSurveys, displayName: UserDisplayName(req)})
        }
    ).sort('name'); 
};

// ===========================
//   Survey-edit : DISPLAY
// ===========================  
export function DisplaySurveyEditPage(req: express.Request, res: express.Response, next: express.NextFunction) {
    let id = req.params.id;
    SurveyModel.findById(id, {}, {}, (err, SurveyListItemToEdit) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index-sub', { title: "Survey Update", page: "survey/survey-edit", item: SurveyListItemToEdit, displayName: UserDisplayName(req)})
    })
};

// ===========================
//   Survey-edit : PROCESS
// ===========================
export function ProcessSurveyEditPage(req: express.Request, res: express.Response, next: express.NextFunction) {
    let id = req.params.id;
    let updatedItem = new SurveyModel({
        "_id": id,
        "name": req.body.name,
        "phone": req.body.phone,
        "email": req.body.email,
        "remarks": req.body.remarks
    });
    SurveyModel.updateOne({ _id: id }, updatedItem, {}, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/survey/list');
    })
}

// ====================================
//   Survey-edit : Create - DISPLAY
// ====================================
export function DisplaySurveyAddPage(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.render('index-sub', { title: 'Add Survey', page: 'survey/survey-edit', item: '', displayName: UserDisplayName(req) });
}

// ====================================
//   Survey-edit : Create - PROCESS 
// ====================================
export function ProcessSurveyAddPage(req: express.Request, res: express.Response, next: express.NextFunction): void {

    let newContact = new SurveyModel({
        "name": req.body.name,
        "phone": req.body.phone,
        "email": req.body.email,
        "remarks": req.body.remarks
    });

    SurveyModel.create(newContact, (err: any) => {
        if (err) {
            console.error(err);
            res.end(err);
        };
        res.redirect('/survey/list');
    }) 
}

// ====================================
//   Survey-edit : Delete - PROCESS 
// ====================================
export function ProcessSurveyDeletePage(req: express.Request, res: express.Response, next: express.NextFunction) {
    let id = req.params.id;
    SurveyModel.remove({ _id: id }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/survey/list');
    })
}