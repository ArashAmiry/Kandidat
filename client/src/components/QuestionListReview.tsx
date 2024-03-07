import { Col, Form, FormLabel, Row } from "react-bootstrap";

function QuestionListReview({ questions }: { questions: { id: string, question: string }[] }) {
    return (
        <>
            {questions
                .filter(question => question.question !== "")
                .map((question, index) => (

                    <Form>
                        <Row>
                            <Col md={12}>
                                <FormLabel><p>{question.question}</p></FormLabel>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Check
                                    inline
                                    name="grup"
                                    key={index}
                                    id={`step-${index}`} // Add a unique id for each checkbox
                                    type="radio"
                                    label={<p>Ja</p>}
                                    className="text-start custom-checkbox"
                                />
                            </Col>
                            <Col md={6}>
                                <Form.Check
                                    inline
                                    name="grup"
                                    key={index}
                                    id={`step-${index}`} // Add a unique id for each checkbox
                                    type="radio"
                                    label={<p>Nej</p>}
                                    className="text-start custom-checkbox"
                                />
                            </Col>
                        </Row>
                    </Form>
                ))
            }
        </>
    )
}

export default QuestionListReview;