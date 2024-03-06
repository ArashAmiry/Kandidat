import { Button, Tab } from "react-bootstrap";
import QuestionRow from "./QuestionRow";
import { ChangeEvent } from "react";

function Question({questions, setQuestions}: {questions: {questionType: string, question: string}[], setQuestions: (questions: {questionType: string, question: string}[]) => void}) {
    const addQuestion = () => {
        setQuestions([...questions, {questionType: "binary", question: ""}]);
      }
    
      const deleteQuestion = (index: number) => {
        const updatedList = [...questions];
        updatedList.splice(index, 1);
        if (updatedList.length === 0) {
          setQuestions([{questionType: "binary", question: ""}]);
        }
        else {
          setQuestions(updatedList);
        }
      }
    
      const handleChangeQuestion = (e: ChangeEvent, index: number) => {
        const { value } = e.target as HTMLInputElement;
        const list = [...questions];
        list[index].question = value;
        setQuestions(list);
      }

    return (
        <>
            {questions.map((question, index) => (
                <QuestionRow key={index} question={question.question} index={index} deleteQuestion={() => deleteQuestion(index)} handleChangeQuestion={(e) => handleChangeQuestion(e, index)} />
            ))}
            <Button variant="outline-secondary" className="btn-outline-secondary mt-3 mb-3" onClick={() => addQuestion()}>
                Add new question
            </Button>
        </>
    )
}

export default Question;