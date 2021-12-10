/*=======================================================
  FileName: /server/models/surveyanswer.ts
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
  
  const surveyOptionSchema = new Schema({    
      optionText: String,  
      answerCount: Number
  },
  {
      collection: "intheLoopOptions"
  });
  
  const Model = mongoose.model("Option", surveyOptionSchema)
  
  export default Model