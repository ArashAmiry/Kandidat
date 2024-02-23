import React, { useState, useEffect } from 'react';
import axios from 'axios';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // or another style of your choice
import { Col, Row } from 'react-bootstrap';
import './stylesheets/CodePreview.css';
import GITHUB_TOKEN from '../github_token';

interface File {
    url: string;
    content: string;
    name: string;
}

interface CodePreviewPageProps {
    urls: string[]
}

const CodePreviewPage = ({ urls }: CodePreviewPageProps) => {
    //const urls = ['https://api.github.com/repos/arashamiry/smasko/contents/client/src/App.tsx', 'https://api.github.com/repos/dinohromic/PayMe2.0/contents/app/src/main/java/com/example/payme20/model/Member.java'];
    const [files, setFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    /* useEffect(() => {
        if (files.length !== 0) {
            setFiles([])
        }
        const fetchCode = async (url: string, index: number) => {
            try {
                const response = await axios.get(url, {
                    headers: {
                        'Accept': 'application/vnd.github.v3.raw',
                        'Authorization': 'Bearer ' + GITHUB_TOKEN,
                    },
                });

                setFiles(prevFiles => {
                    const updatedFiles = [...prevFiles];
                    updatedFiles[index] = {
                        url: url,
                        content: response.data,
                        name: extractFileName(url)
                    };
                    return updatedFiles;
                });

            } catch (error) {
                console.error('Error fetching file content:', error);
            } finally {
                setLoading(false);
            }
        };
        urls.forEach((url, index) => {
            fetchCode(url, index);
        });

    }, []); */

    /* useEffect(() => {
        const fetchCode = async (url: string): Promise<File> => {
            try {
                const response = await axios.get(url, {
                    headers: {
                        'Accept': 'application/vnd.github.v3.raw',
                        'Authorization': 'Bearer ' + GITHUB_TOKEN,
                    },
                });
    
                return {
                    url: url,
                    content: response.data,
                    name: extractFileName(url)
                };
            } catch (error) {
                console.error('Error fetching file content:', error);
                return {
                    url: "",
                    content: "",
                    name: "File not found"
                }
            }
        };
    
        const fetchAllFiles = async () => {
            const filesPromises = urls.map(url => fetchCode(url));
            const fetchedFiles = await Promise.all(filesPromises);
            setFiles(fetchedFiles);
            setLoading(false);
            
        };
    
        fetchAllFiles();
    }, []); */

    useEffect(() => {
        const fetchCode = async (url: string): Promise<File> => {
            try {
                console.log(url)
                const response = await axios.get('http://localhost:8080/create', {
                    params: {
                        path: url
                    }
                });
                return {
                    url: url,
                    content: response.data,
                    name: extractFileName(url)
                };
            } catch (error) {
                console.error('Error fetching file content:', error);
                return {
                    url: "",
                    content: "",
                    name: "File not found"
                }
            }
        };

        const fetchAllFiles = async () => {
            const filesPromises = urls.map(url => fetchCode(url));
            const fetchedFiles = await Promise.all(filesPromises);
            setFiles(fetchedFiles);
            setLoading(false);

        };

        fetchAllFiles();
    }, [urls]);

    useEffect(() => {
        // Highlight code when the 'files' state updates
        files.forEach(({ content }) => {
            if (content) {
                document.querySelectorAll('pre code').forEach((block) => {
                    hljs.highlightAll();
                });
            }
        });
    }, [files]);

    const extractFileName = (url: string): string => {
        const parts = url.split('/');
        return parts[parts.length - 1];
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    console.log(files)
    return (
        <Row className='code-container'>
            {files.length === 2 &&
                files.map((file, index) => (
                    <Col key={index} md="6" className='p-0'>
                        <h1 className='code-header'>{file.name}</h1>
                        <pre>
                            <code>{file.content}</code>
                        </pre>
                    </Col>
                ))}
            {files.length === 1 &&
                files.map((file, index) => (
                    <Col key={index} md="12" className='p-0'>
                        <h1 className='code-header'>{file.name}</h1>
                        <pre>
                            <code>{file.content}</code>
                        </pre>
                    </Col>
                ))}
        </Row>
    );
}

export default CodePreviewPage;
