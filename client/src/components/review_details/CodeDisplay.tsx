import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import hljs from "highlight.js";
import 'highlight.js/styles/github.css'

import '../stylesheets/review_details/CodeDisplay.css'

interface CodeDisplayProps {
    files: { name: string, content: string }[];
    isDarkMode: boolean
}

function CodeDisplay({ files, isDarkMode}: CodeDisplayProps) {

    useEffect(() => {
        if (isDarkMode) {
            require('highlight.js/styles/github-dark.css')
        } else {
            require('highlight.js/styles/github.css')
        }
    }, [isDarkMode]);


    useEffect(() => {
        files.forEach(({ content }) => {
            if (content) {
                document.querySelectorAll('pre code').forEach((block) => {
                    hljs.highlightAll();
                });
            }
        });
    }, [files]);

    return (
        <Row className='container-code bg-body'>
            {files.length === 2 &&
                files.map((file, index) => (
                    <Col key={index} md="6" className='p-0'>
                        <h1 className='header-code'>{file.name}</h1>
                        <pre>
                            <code>{typeof file.content === "object" ? JSON.stringify(file.content, null, 2) : file.content}</code>
                        </pre>
                    </Col>
                ))}
            {files.length === 1 &&
                files.map((file, index) => (
                    <Col key={index} md="12" className='p-0'>
                        <h1 className='header-code'>{file.name}</h1>
                        <pre>
                            <code>{typeof file.content === "object" ? JSON.stringify(file.content, null, 2) : file.content}</code>
                        </pre>
                    </Col>
                ))}
        </Row>
    )
}

export default CodeDisplay;