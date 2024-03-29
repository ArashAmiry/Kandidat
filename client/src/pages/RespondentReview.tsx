import CodeReview from "../components/CodeReview";
import { Container, Row, Col, Form, Button, InputGroup, Modal } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import ReviewFormSidebar from "../components/ReviewFormSidebar";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { IReview } from "../interfaces/IReview";
import PagesSidebar from "../components/PagesSidebar";
import "./stylesheets/RespondentReview.css";

export interface QuestionAnswer {
    id: string,
    question: string,
    answer: string
}

export interface AnswerPage {
    formName: string,
    binaryQuestions: QuestionAnswer[],
    textfieldQuestions: QuestionAnswer[],
    rangeQuestions: QuestionAnswer[],
    files: {
        name: string,
        content: string
    }[]
}

function RespondentReview() {
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [review, setReview] = useState<IReview>();
    const [answerPages, setAnswerPages] = useState<AnswerPage[]>([]);
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [accessCode, setAccessCode] = useState("");
    const [errorAccess, setErrorAccess] = useState<boolean>(false);
    const [errorAccessMessage, setErrorAccessMessage] = useState("");
    const [errorSubmit, setErrorSubmit] = useState<boolean>(false);
    const { reviewId } = useParams<{ reviewId: string }>();
    const navigate = useNavigate();

    const fetchReview = async (): Promise<IReview | undefined> => {
        try {
            const response = await axios.get(`http://localhost:8080/review/single/${reviewId}`);
            return response.data;
        } catch (e) {
            console.log(e);
        }
    };

    const handleAccessSubmit = async (e: any) => {
        e.preventDefault()
        try {
            const res = await axios.get(`http://localhost:8080/access/review?accessCode=${accessCode}`);
            console.log(res)
            setAuthenticated(res.data)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                if (axiosError.response) {
                    const status = axiosError.response.status;
                    if (status === 409 || status === 404 || status === 500) {
                        console.error("Code is either invalid or has already been used");
                        setErrorAccessMessage("Code is either invalid or has already been used!")
                    } else {
                        console.error("An unexpected error occurred:", axiosError.message);
                    }
                }
            } else {
                console.error("An unexpected error occurred:", error);
            }
            setErrorAccess(true);
        }

    }

    useEffect(() => {
        fetchReview().then((response) => {
            if (response) {
                setReview(response);

                const newAnswerPages: AnswerPage[] = response.pages.map(page => ({
                    formName: page.formName,
                    binaryQuestions: page.questions
                        .filter(question => question.questionType === 'binary')
                        .map(({ _id, question }) => ({
                            id: _id,
                            question,
                            answer: ''
                        })),
                    textfieldQuestions: page.questions
                        .filter(question => question.questionType === 'text')
                        .map(({ _id, question }) => ({
                            id: _id,
                            question,
                            answer: ''
                        })),
                    rangeQuestions: page.questions
                        .filter(question => question.questionType === 'range')
                        .map(({ _id, question }) => ({
                            id: _id,
                            question,
                            answer: ''
                        })),
                    files: page.codeSegments.map(segment => ({
                        name: segment.filename,
                        content: segment.content
                    }))
                }));

                setAnswerPages(newAnswerPages);
            }
        });
    }, [reviewId]); // This effect runs when `reviewId` changes

    const exitReview = () => {
        navigate("/");
    }

    if (typeof reviewId !== 'string' || reviewId.length == 0) {
        return <div>No review ID provided</div>;
    };

    if (!answerPages || !review) {
        return <div>Loading...</div>
    };

    if (!authenticated) {
        return (
            <Container className="access-container d-flex flex-column justify-content-center">
                <Form className="access-form" onSubmit={(e) => handleAccessSubmit(e)}>
                    <Form.Group className="access-input">
                        <Form.Control
                            className='mb-3 access-code-input'
                            type="text"
                            value={accessCode}
                            onChange={(e) => setAccessCode(e.target.value)}
                            placeholder="Enter your access code"
                            required
                        />
                        {errorAccess && <Form.Text className="error-text">{errorAccessMessage}</Form.Text>}
                    </Form.Group>
                    <Button variant="primary" type="submit" className="accessCode-button">
                        Submit Code
                    </Button>
                </Form>
            </Container>
        );
    }
    return (
        <Container fluid className="answer-container px-0">
            <Row className="code-row">
                <Col className="sidebar-col" md={1}>
                    <PagesSidebar pagesTitles={review.pages.map(page => page.formName)} setCurrentPageIndex={(index) => setCurrentPageIndex(index)} />
                </Col>
                <Col className="code-preview" md={9}><CodeReview files={answerPages[currentPageIndex].files} /></Col>
                <Col md={3} className="p-0">
                    <ReviewFormSidebar
                        // pageTitle={review.pages[currentPageIndex].formName}
                        // amountPages={review.pages.length - 1}
                        answerPages={answerPages}
                        setAnswerPages={(e) => setAnswerPages(e)}
                        currentPageIndex={currentPageIndex}
                        setCurrentPageIndex={(index) => setCurrentPageIndex(index)}
                        reviewId={reviewId}
                        setErrorPage={(isError: boolean) => setErrorSubmit(isError)}
                    />
                </Col>
            </Row>
            <Modal show={errorSubmit} onHide={() => exitReview()}>
                <Modal.Header closeButton>
                    <Modal.Title>Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>This code has already been used.</p>
                    <p>You will be directed to the home page.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => exitReview()}>
                        Exit
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>

    );
}

export default RespondentReview;