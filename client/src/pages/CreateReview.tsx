import Container from "react-bootstrap/esm/Container";
import { ChangeEvent, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import { useNavigate } from "react-router-dom";
import "./stylesheets/CreateReview.css";
import { Row } from "react-bootstrap";
import AddCodeLink from "../components/AddCodeLink";
import { CodeFile } from "../components/CodePreview";
import axios from "axios";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { CreateReviewPage } from "../interfaces/ICreateReviewPage";
import ReviewFormEditor from "../components/ReviewFormEditor";
import ReviewPreview from "../components/ReviewPreview";
import CreateReviewWizardButtons from "../components/CreateReviewWizardButtons";

const initialPagesState: CreateReviewPage[] = [
  {
    currentStep: 1,
    binaryQuestions: [{ questionType: "binary", question: "" }],
    textFieldQuestions: [{ questionType: "text", question: "" }],
    reviewTitle: "",
    urls: [""],
    cachedFiles: {},
    triedToSubmit: false,
    invalidURLExists: true,
    formErrorMessage: "",
  },
];

function CreateReview() {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [pagesData, setPagesData] =
    useState<CreateReviewPage[]>(initialPagesState);
  const amountSteps = 3;
  const navigate = useNavigate();

  const updateCachedFiles = (url: string, fileData: CodeFile) => {
    setPagesData((prevPagesData) => {
      const updatedPagesData = [...prevPagesData]; // Create a copy of the array of page states
      const currentPage = updatedPagesData[currentPageIndex]; // Get the current page state
      const updatedCurrentPage = {
        ...currentPage,
        cachedFiles: { ...currentPage.cachedFiles, [url]: fileData },
      }; // Update the cachedFiles of the current page
      updatedPagesData[currentPageIndex] = updatedCurrentPage; // Update the current page state in the copied array
      return updatedPagesData; // Return the updated array of page states
    });
  };

  const getNonEmptyQuestions = (questions: { questionType: string; question: string }[]) => {
    return questions.filter((question) => question.question.trim() !== "");
  };

  const setTriedToSubmit = (value: boolean) => {
    setPagesData((prevPageData) => {
      const updatedPageData = [...prevPageData];
      updatedPageData[currentPageIndex].triedToSubmit = value;
      return updatedPageData;
    });
  };

  const setFormErrorMessage = (message: string) => {
    setPagesData((prevPageData) => {
      const updatedPageData = [...prevPageData];
      updatedPageData[currentPageIndex].formErrorMessage = message;
      return updatedPageData;
    });
  };

  const setCurrentStep = (step: number) => {
    setPagesData((prevPageData) => {
      const updatedPageData = [...prevPageData]; // Create a copy of the array of page states
      updatedPageData[currentPageIndex].currentStep = step; // Update current step of the current page
      return updatedPageData; // Return the updated array of page states
    });
  };

  const nextStep = () => {
    if (pagesData[currentPageIndex].currentStep === 1) {
      setTriedToSubmit(true); // Kom på nytt variabelnamn
      if (pagesData[currentPageIndex].invalidURLExists) {
        return;
      }
    } else if (pagesData[currentPageIndex].currentStep === 2) {
      if (getNonEmptyQuestions([...pagesData[currentPageIndex].binaryQuestions, ...pagesData[currentPageIndex].textFieldQuestions]).length === 0) {
        setFormErrorMessage("At least one question is required to continue.");
        return;
      } else {
        setFormErrorMessage("");
      }
    }
    setCurrentStep(pagesData[currentPageIndex].currentStep + 1);
  };

  const previousStep = () => {
    if (pagesData[currentPageIndex].currentStep === 1) {
      navigate("/");
    }
    setCurrentStep(pagesData[currentPageIndex].currentStep - 1);
  };



  const addNewPage = () => {
    setPagesData((prevPageData) => [
      ...prevPageData,
      {
        currentStep: 1,
        binaryQuestions: [{ questionType: "binary", question: "" }],
        textFieldQuestions: [{ questionType: "text", question: "" }],
        reviewTitle: "",
        urls: [""],
        cachedFiles: {},
        triedToSubmit: false,
        invalidURLExists: false,
        formErrorMessage: "",
      },
    ]);
    setCurrentPageIndex((currentPageIndex) => currentPageIndex + 1);
  };

  const submitReview = async () => {
    const reviewPages = pagesData.map((pageData) => {
      const codeSegments: { filename: string; content: string }[] = [];
      Object.entries(pageData.cachedFiles).forEach((record) => {
        codeSegments.push({
          filename: record[1].name,
          content: record[1].content,
        });
      });

      return {
        formName: pageData.reviewTitle,
        codeSegments: codeSegments,
        questions: [
          ...getNonEmptyQuestions(pageData.binaryQuestions),
          ...getNonEmptyQuestions(pageData.textFieldQuestions),
        ],
      };
    });
    console.log(reviewPages);
    await axios.post("http://localhost:8080/review/", {
      name: "temporaryName",
      createdBy: "username",
      pages: reviewPages,
    });
  };

  const [collapsed, setCollapsed] = useState(false);

  // Function to toggle the collapse state
  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <Container fluid className="container-create m-0 p-0 d-flex flex-column justify-content-center">
      <Row className="mx-0">
        <Col className="sidebar-col" md={2}>
          <Sidebar className="sidebar" collapsed={collapsed} backgroundColor="rgb(242, 242, 242, 1)">
            <Menu>
              <MenuItem
                onClick={() => toggleSidebar()}
                icon={<MenuOutlinedIcon />}
                className="d-flex justify-content-center align-items-center"
              />
              {!collapsed &&
                pagesData.map((page, index) => {
                  return (
                    <MenuItem onClick={() => setCurrentPageIndex(index)}>
                      {page.reviewTitle}
                    </MenuItem>
                  );
                })}
            </Menu>
          </Sidebar>
          ;
        </Col>

        {pagesData[currentPageIndex].currentStep === 1 && (
          <Col md={12} className="first-step">
            <AddCodeLink
               currentPageIndex={currentPageIndex}
               pagesData={pagesData}
               setPagesData={(e) => setPagesData(e)}
               setTriedToSubmit={(e) => setTriedToSubmit(e)}
            />
          </Col>
        )}

        {pagesData[currentPageIndex].currentStep === 2 && (
          <Col md={7} className="second-step">
            <ReviewFormEditor
              currentPageIndex={currentPageIndex}
              pagesData={pagesData}
              setPagesData={(e) => setPagesData(e)}
            />
          </Col>
        )}

        {pagesData[currentPageIndex].currentStep === 3 && (
          <Col md={12} className="px-0">
            <ReviewPreview 
            pagesData={pagesData} 
            currentPageIndex={currentPageIndex} 
            updateCachedFiles={updateCachedFiles}
            submitReview={() => submitReview()}
            addNewPage={() => addNewPage()}
            previousStep={() => previousStep()}
            />
          </Col>
        )}

        {pagesData[currentPageIndex].currentStep !== 3 && (
          <Row className="first-step">
           <CreateReviewWizardButtons 
            pagesData={pagesData}
            currentPageIndex={currentPageIndex}
            amountSteps={amountSteps}
            previousStep={() => previousStep()}
            nextStep={() => nextStep()}
           />
          </Row>
        )}
      </Row>
    </Container>
  );
}

export default CreateReview;