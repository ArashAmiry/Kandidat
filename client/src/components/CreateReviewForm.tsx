import Tab from "react-bootstrap/esm/Tab";
import Tabs from "react-bootstrap/esm/Tabs";
import './stylesheets/CreateReviewForm.css';
import { Col } from 'react-bootstrap';
import Question from "./Question";
import PresetQuestions from "./PresetQuestions";
import Textfields from "./Textfields";
import RangeQuestions from "./RangeQuestions";
import Template from "./Template";

type AddFormQuestionsProps = {
  questions: { questionType: string, question: string }[], 
  setQuestions: (questions: { questionType: string, question: string }[]) => void,
}


function AddFormQuestions({ questions, setQuestions}: AddFormQuestionsProps) {
  return (
    <Col md={12} className="box border-radius: 0 0 25px 25px; bg-body">
      <Tabs
        defaultActiveKey="binaryQuestions"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="binaryQuestions" title="Questions" ><Question questions={questions} setQuestions={(questions) => setQuestions(questions)} /></Tab>
        <Tab eventKey="textQuestions" title="Textfields"><Textfields questions={questions} setQuestions={(questions) => setQuestions(questions)} /></Tab>
        <Tab eventKey="rangeQuestions" title="Range" ><RangeQuestions questions={questions} setQuestions={(rangeQuestions) => setQuestions(rangeQuestions)} /></Tab>
        <Tab eventKey="contact" title="Templates">
          <Template questions={questions} setQuestions={(questions) => setQuestions(questions)}></Template>
        </Tab>
        <Tab eventKey="PresetQuestions" title="Preset questions">
          <PresetQuestions questions={questions} setQuestions={(questions) => setQuestions(questions)} categories={[
            {
              name: "Code Structure",
              questions: [
                { questionType: "binary", question: "Is the code modular and organized logically?" },
                { questionType: "binary", question: "Are appropriate naming conventions followed for variables, functions, and classes?" },
                { questionType: "binary", question: "Does the code adhere to the specified style guide (e.g., PEP 8 for Python, ESLint rules for JavaScript)?" }
              ]
            },
            {
              name: "Error Handling",
              questions: [
                { questionType: "binary", question: "Are errors handled gracefully?" },
                { questionType: "binary", question: "Is there appropriate error logging or error reporting mechanisms?" },
                { questionType: "binary", question: "Are potential edge cases and error scenarios accounted for?" }
              ]
            },
            {
              name: "Performance",
              questions: [
                { questionType: "binary", question: "Are there any potential performance bottlenecks?" },
                { questionType: "binary", question: "Are expensive operations optimized?" },
                { questionType: "binary", question: "Is the codebase memory-efficient?" }
              ]
            },
            {
              name: "Security",
              questions: [
                { questionType: "binary", question: "Are there any security vulnerabilities (e.g., SQL injection, XSS) present?" },
                { questionType: "binary", question: "Is sensitive data handled securely?" },
                { questionType: "binary", question: "Are authentication and authorization mechanisms implemented correctly?" }
              ]
            },
            // Add more categories and questions as needed
          ]} />
        </Tab>
      </Tabs>
    </Col>
  );
}

export default AddFormQuestions;