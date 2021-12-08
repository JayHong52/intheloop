/*=======================================================
  FileName: /server/models/question.ts
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
  
  const questionSchema = new Schema({
      question: String,
      options: [{option: String}] 
  },
  {
      collection: "intheLoopQuestions"
  });
  
  const Model = mongoose.model("Question", questionSchema)
  
  export default Model