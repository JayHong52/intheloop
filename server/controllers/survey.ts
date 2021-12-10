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
import surveyAnswerModel from '../models/survey_answer';
import questionModel from '../models/question' 
import { UserDisplayName } from '../utils';
import { findSourceMap } from 'module';
import { Mongoose } from 'mongoose';
import { RequestHeaderFieldsTooLarge } from 'http-errors';
import { brotliDecompressSync } from 'zlib';

// ===========================
//  Manage Survey List : DISPLAY 
// ===========================
export function DisplaySurveyManagePage(req: express.Request, res: express.Response, next: express.NextFunction) {
    surveyModel.find(
        { user: req.user },
        function (err, intheLoopSurveys) {
            if (err) {
                console.error(err);
                res.end(err);
            }
            res.render('index-sub', { title: 'Manage Your Surveys', page: 'survey/survey-manage', surveyList: intheLoopSurveys, displayName: UserDisplayName(req) })
        }
    ).sort('date');
};

// ===========================
//   Active Survey List : DISPLAY 
// ===========================
export function DisplaySurveyActivePage(req: express.Request, res: express.Response, next: express.NextFunction) {

    surveyModel.find({ active: true }).
                populate('user').
                populate('questions').sort('date').exec( function (err, surveyItem) { 
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index-sub', { title: 'Active Surveys', page: 'survey/survey-active', surveyList: surveyItem, displayName: UserDisplayName(req) })
    })
};

// ===========================
//   Edit Survey : DISPLAY
// ===========================  
export function DisplaySurveyEditPage(req: express.Request, res: express.Response, next: express.NextFunction) {
    let id = req.params.id;
    
    surveyModel.findById({ _id: id}).populate('questions').exec( function (err, surveyItem) { 
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index-sub', { title: "Manage Your Survey", page: "survey/survey-edit", item: surveyItem, displayName: UserDisplayName(req) })
    })
}    

// ===========================
//   Edit Survey : PROCESS
// ===========================
export function ProcessSurveyEditPage(req: express.Request, res: express.Response, next: express.NextFunction) {
    
    let id = req.params.id
    let activeStatus = req.body.isActive
    let isActive = false;

    if (activeStatus == "active") {
        isActive = true;
    }

    let title = req.body.title
    let remarks = req.body.remarks

    surveyModel.updateOne({ _id: id }, {title: title, remarks: remarks, active: isActive}, {}, (err) => {
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
        "date": new Date(),
        "active": false,
        
    });

    let id = newSurvey._id;

    surveyModel.create(newSurvey, (err: any) => {
        if (err) {
            console.error(err);
            res.end(err);
        };
        res.redirect('/survey/manage/' + id);
    });
}

// ====================================
//   Delete Survey - PROCESS 
// ====================================
export function ProcessSurveyDeletePage(req: express.Request, res: express.Response, next: express.NextFunction) {
    let id = req.params.id;
    surveyModel.remove({ _id: id }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        };
        res.redirect('/survey/manage');
    })
}


// ====================================
//   Question: ADD - Display 
// ====================================
export function DisplayQuestionAddPage(req: express.Request, res: express.Response, next: express.NextFunction) {
    let id = req.params.id

    surveyModel.findOne({ _id: id }, {}, {}, (err, surveyItem) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index-sub', { title: "Add Survey Questions", page: "survey/survey-question-edit", item: surveyItem, displayName: UserDisplayName(req) })
    })
}

// ====================================
//   Question: ADD - Process 
// ====================================
export function ProcessQuestionAddPage(req: express.Request, res: express.Response, next: express.NextFunction) {
    // Create Question 
    let fields = ["option1", "option2", "option3", "option4", "option5"];
    let options: Array<String> = [];

    for (let i = 0; i < fields.length; i++) {
        let option = req.body[fields[i]];
        if (option != "") {
            options.push(option);
        }
    }

    let newQuestion = new questionModel({
        "question": req.body.question,
        "options": options
    });

    questionModel.create(newQuestion, (err: any) => {
        if (err) {
            console.error(err);
            res.end(err);
        };
    });

    let id = req.params.id;
    surveyModel.updateOne({ _id: id }, { $push: { questions: newQuestion }}, {}, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        };
        res.redirect('/survey/manage/' + id);
    })
}

// ====================================
//   Question: DELETE - Process 
// ====================================

export function ProcessQuestionDeletePage(req: express.Request, res: express.Response, next: express.NextFunction){
    let id = req.params.id;
    let qid = req.params.qid;

    // questionModel.remove({ _id: qid }, (err) => {
    //     if (err) {
    //         console.error(err);
    //         res.end(err);
    //     };
    // })

    // surveyModel.updateOne({ _id: id }, { $pullAll: { questions: qid }}, {}, (err) => {
    //     if (err) {
    //         console.error(err);
    //         res.end(err);
    //     };
        // res.redirect('/survey/manage/' + id);
    // })
    console.log(qid);
}

// ====================================
//   Take Survey: - DISPLAY 
// ====================================

export function DisplayTakeSurvey(req: express.Request, res: express.Response, next: express.NextFunction){
    let id = req.params.id
    surveyModel.findById({ _id: id}).populate('questions').exec( function (err, surveyItem) { 
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index-sub', { title: surveyItem.title , page: "survey/survey-take", item: surveyItem, displayName: UserDisplayName(req) })
    })
}
// ====================================
//   Take Survey: - Process 
// ====================================

export function ProcessTakeSurvey(req: express.Request, res: express.Response, next: express.NextFunction){
    let id = req.params.id;
    let fields = ["answer1", "answer2", "answer3", "answer4", "answer5"];
    let answers: Array<String> = [];

    for (let i = 0; i < fields.length; i++){
        if ( req.body[fields[i]] != null )
        {
            let answer = req.body[fields[i]];
            answers.push(answer);
        }
    }

    console.log(answers);

    let surveyAnswer = new surveyAnswerModel({
        "user": req.user,
        "survey": id,
        "answers": answers
    })
    console.log(surveyAnswer);

    surveyAnswerModel.create(surveyAnswer, (err: any) => {
        if (err) {
            console.error(err);
            res.end(err);
        };
        res.redirect('/survey/active');
    });
}    