/*=======================================================
  FileName: /server/models/surveyAnswer.ts
  ProjectName: IntheLoop - Survey 
  CompanyName: Centennial Collge, Fall 2021
  Author: Hong, Jiwoong - 301153138
          Vargas, Joel  - 301161522
          Zheng, Ziwei  - 301180464
  Date: 2021-11-26
  Remarks: Survey Model
  ======================================================*/

  import mongoose from 'mongoose';
  const Schema = mongoose.Schema;
  
  const surveyAnswerSchema = new Schema({
        
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      survey: { type: mongoose.Schema.Types.ObjectId, ref: 'Survey' },
      answers: [{ String }]
  },
  {
      collection: "intheLoopSurveyAnswers"
  });
  
  const Model = mongoose.model("Survey", surveyAnswerSchema)
  
  export default Model