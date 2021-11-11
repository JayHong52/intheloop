/*=============================================
  FileName: models/business.ts
  ProjectName: COMP229-005, Assignment #2
  CompanyName: Centennial Collge, Fall 2021
  Author: Jiwoong Hong, 301153138
  Date: 2021-10-22
  ============================================*/

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const surveySchema = new Schema({
    userName: String,
    question: String,
    answer: String,
    remarks: String
},
{
    collection: "intheLoopSurveys"
});

const Model = mongoose.model("survey", surveySchema)

export default Model