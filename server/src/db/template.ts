import { Schema, Model } from "mongoose";
import { conn } from "./conn";
import { ITemplate } from "../model/ITemplate";

// Define the schema
const templateSchema: Schema = new Schema({
  _id:{
    type: String,
    required: true
  },//Ta bort, sätts automatiskt
  category: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  info: {
    type: String,
    required: true
  },
  checkboxQuestions: [{
    questionType: { type: String, required: true },
    question: { type: String, required: true }
  }],
  textfieldQuestions: [{
    questionType: { type: String, required: true },
    question: { type: String, required: true }
  }]
});


export const templateModel = conn.model<ITemplate>("Template", templateSchema);