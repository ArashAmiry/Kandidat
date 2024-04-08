import Slider from "@mui/material/Slider/Slider";
import { FormLabel } from "react-bootstrap";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import '../stylesheets/review_details/TextfieldListAnswer.css'


function RangeQuestionListAnswer({ rangeQuestion, answer }: { rangeQuestion: string, answer: string }) {
    const maxValue = 5;
    
    function valuetext(value: number, max: number) {
        return `${value}/${max}`;
    };
    
    const marks = Array.from({ length: maxValue }, (_, index) => ({
        value: index + 1,
        label: `${index + 1}`
    }));

    return (
        <>
            <Form.Group  className="mb-3 individual-range p-3">
                <Form.Label>{rangeQuestion}</Form.Label>
                <Slider
                    aria-label="Rating"
                    value={parseInt(answer)}
                    getAriaValueText={valuetext}
                    shiftStep={1}
                    step={1}
                    marks={marks}
                    min={1}
                    max={maxValue}
                    className="range-slider"
                />
            </Form.Group>
        </>
    )
}

export default RangeQuestionListAnswer