import React, {useState, useEffect} from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import {Row, Col, Alert, Button} from "react-bootstrap";
import axios from "axios";


function ReviewAnswersController() {

    /**
     *Search button related Data
     * */
    const columns = [
        {
            dataField: 'questionDes',
            text: 'Question'
        },
        {
            dataField: 'time',
            text: 'Time Spent (min)'
        },
        {
            dataField: 'attempts',
            text: 'Number Of Attempts'
        },
        {
            dataField: 'ansStatus',
            text: 'You Answer Status'
        }
    ];


    /**
     * Dropdown related data
     */
    const [course, setCourse] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const [assignment, setAssignment] = useState([]);
    const [selectedAssignment, setSelectedAssignment] = useState(null);

    const [results, setResult] = useState( []);

    useEffect(() => {
        getAllCourses();
        getAllAssignments();
    }, []);

    /**
     * get All course API Call
     */
    const getAllCourses = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_FUN_STUDENT_COURCE}`)
            .then(response => {
                console.log("get all --->", response.data.data);

                if (response.status === 200) {
                    setCourse(response.data.data);
                }

            }).catch(error => {

        }).finally(() =>{

        });
    };

    /**
     * Get All Assignments API call
     */
    const getAllAssignments = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_FUN_STUDENT_ASSIGNMENT}`)
            .then(response => {
                console.log("get all 22222--->", response.data.data);

                if (response.status === 200) {
                    setAssignment(response.data.data);
                }

            }).catch(error => {

        }).finally(() =>{

        });
    };


    /**
     * Search button
     */

    const [isLoading, setLoading] = useState(false);
    /**
     * Search button API call
     */
    useEffect(() => {
        if (isLoading) {
            if(selectedAssignment != null && selectedCourse != null){

                /**
                 * API call
                 */
                axios.get(`${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_FUN_STUDENT_RESULT_REVIEW}${10}${/assignment/}${selectedAssignment}${/course/}${selectedCourse}`)
                    .then(response => {
                        console.log("get data --->", response.data.data);
                        if (response.status === 200) {
                            setResult(response.data.data);
                        }else{
                            setResult([]);
                        }
                        setLoading(false);
                    }).catch(error => {
                    setResult([]);
                    setLoading(false);
                }).finally(() =>{
                    setLoading(false);
                });
            }else{
                setResult([]);
                setLoading(false);
            }
        }
    }, [isLoading]);

    const handleClick = () => setLoading(true);


    useEffect(() => {
        console.log("selectedCourse",selectedCourse);
        console.log("selectedAssignment",selectedAssignment);
    }, [selectedCourse,selectedAssignment]);



    return (
        <div>
            <h1>  Review Questions </h1>
            <hr />
            <Row>
                <div>
                    <Col lg={12} sm={6}>
                        <div>
                            <select className="browser-default custom-select" onChange={e => setSelectedCourse(e.currentTarget.value)}>
                                <option value="" disabled selected >
                                    {"Select a course"}
                                </option>
                                {course.map(( course ) => (
                                    <option key={course.id} value={course.id}>
                                        {course.description}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </Col>
                </div>

                <div>
                    <Col lg={12} sm={12}>
                        <div>
                            <select className="browser-default custom-select" onChange={e => setSelectedAssignment(e.currentTarget.value)}>
                                <option value="" disabled selected >
                                    {"Select a Assignment"}
                                </option>
                                {assignment.map(( assignment ) => (
                                    <option key={assignment.id} value={assignment.id}>
                                        {assignment.description}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </Col>
                </div>
                <div>

                    <Col lg={12} sm={12}>
                        <Button
                            variant="primary"
                            disabled={isLoading}
                            onClick={!isLoading ? handleClick : null}
                        >
                            {isLoading ? 'Loading…' : 'Search'}
                        </Button>
                    </Col>

                </div>
            </Row>

            <hr />

            <BootstrapTable
                striped
                hover
                keyField='id'
                data={results}
                columns={columns}/>

        </div>
    )
}

export default ReviewAnswersController;