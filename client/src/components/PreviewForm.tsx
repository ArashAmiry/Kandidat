import { Card, Form } from "react-bootstrap";
import './stylesheets/PreviewForm.css';
import TextfieldList from "./TextfieldListPreview";
import QuestionList from "./QuestionListPreview";
import RangeQuestionListPreview from "./RangeQuestionList";

type PreviewFormProps = {
    reviewTitle: string,
    questions: {questionType: string, question: string}[], 
    textfields: {questionType: string, question: string}[],
    rangeQuestions: {questionType: string, question: string}[],
    errorMessage : string}

function PreviewForm({reviewTitle, questions, textfields, rangeQuestions, errorMessage }: PreviewFormProps) {
    return (
        <Card className="preview-box">
            <Card.Title className="m-3">{reviewTitle}</Card.Title>
            <Card.Body className="mx-5 mt-2">
                <QuestionList questions={questions} />
                <TextfieldList textfields={textfields}/>
                <RangeQuestionListPreview rangeQuestions={rangeQuestions }/>
            </Card.Body>
            {errorMessage && (  
                <Card.Text className="fs-5 fw-bold text-danger">{errorMessage}</Card.Text>
            )}
        </Card>
    )
}

export default PreviewForm;