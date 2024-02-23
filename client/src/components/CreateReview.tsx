import CreateReviewForm from "./CreateReviewForm";
import Container from "react-bootstrap/esm/Container";
import { ChangeEvent, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import './stylesheets/CreateReview.css'
import PreviewForm from "./PreviewForm";
import { Form, Row } from "react-bootstrap";
import AddCodeLink from "./AddCodeLink";
import CodePreviewPage from "./CodePreview";
import { CodeFile } from './CodePreview';

function CreateReview() {
    const [currentStep, setCurrentStep] = useState(1);
    const [questions, setQuestions] = useState<string[]>([""]);
    const [textfields, setTextfields] = useState<string[]>([""]);
    const [reviewTitle, setReviewTitle] = useState<string>("");
    const [urls, setUrls] = useState<string[]>([""]);
    const [cachedFiles, setCachedFiles] = useState<Record<string, CodeFile>>({});

    const updateCachedFiles = (url: string, fileData: CodeFile) => {
        setCachedFiles(prevState => ({
            ...prevState,
            [url]: fileData
        }));
    };

    const amountSteps = 3;
    const navigate = useNavigate();

    const nextStep = () => {
        if (currentStep === amountSteps) {
            // Todo
        }
        setCurrentStep(currentStep + 1);
    };

    const previousStep = () => {
        if (currentStep === 1) {
            navigate("/")
            return;
        }
        setCurrentStep(currentStep - 1);
    };

    const handleChangeReviewTitle = (e: ChangeEvent) => {
        const { value } = e.target as HTMLInputElement;
        setReviewTitle(value);
    }
    return (
        <Container fluid className="m-0 p-0">
            {currentStep === 1 &&
                    <Row className="first-step">
                    <AddCodeLink urls={urls} setUrls={(urls: string[]) => setUrls(urls)} />
                </Row>
            }
            {currentStep === 2 &&
                <Row className="second-step">
                    <Col md={7} className="form-box px-0">

                        <Row className="pb-3">
                            <Col md={12}><Form.Control name="desc" type="text" placeholder={`Title of review form...`} onChange={(e) => handleChangeReviewTitle(e)} />
                            </Col>
                        </Row>
                        <Row>
                            {currentStep === 2 && <CreateReviewForm
                                questions={questions} setQuestions={(questions) => setQuestions(questions)}
                                textfields={textfields} setTextfields={(textfields) => setTextfields(textfields)} />}
                        </Row>
                    </Col>

                    <Col md={5}>
                        <PreviewForm reviewTitle={reviewTitle} questions={questions} textfields={textfields} />
                    </Col>
                </Row>
            }

            {currentStep === 3 &&
                <Row className="code-row">
                    <Col className="code-preview" md={9}><CodePreviewPage urls={urls} cachedFiles={cachedFiles} updateCachedFiles={updateCachedFiles} /></Col>
                    <Col md={3} className="p-0">
                        <PreviewForm reviewTitle={reviewTitle} questions={questions} textfields={textfields} />
                    </Col>
                </Row>
            }
            <Row className="first-step second-step">
                <Col md={4} id="navButtons" className="my-4 d-flex justify-content-start px-0">
                    {currentStep === 1 && <Button size="lg" variant="danger" onClick={() => previousStep()}>Exit</Button>}
                    {currentStep !== 1 && <Button size="lg" variant="light" onClick={() => previousStep()}>Back</Button>}

                    {currentStep !== amountSteps && <Button size="lg" variant="light" onClick={() => nextStep()}>Continue</Button>}
                    {currentStep === amountSteps && <Button size="lg" variant="success" onClick={() => nextStep()}>Create form</Button>}
                </Col>
            </Row>
        </Container>
    );
}

export default CreateReview;