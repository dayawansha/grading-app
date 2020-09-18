import React from 'react';
import './App.css';
import DetailResultsController from "./components/student/DetailResultsController";
import ReviewAnswersController from "./components/student/ReviewAnswersController";
import OverallGradeController from "./components/teacher/OverallGradeController";
import QuestionsStatisticsController from "./components/teacher/QuestionsStatisticsController";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">


        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/details">Detail results for a student</Link>
                    </li>
                    <li>
                        <Link to="/review">Review answers</Link>
                    </li>
                    <li>
                        <Link to="/statics">Statics on Questions</Link>
                    </li>
                    <li>
                        <Link to="/grade">Overall Grade Details</Link>
                    </li>
                </ul>

                <hr/>

                <Switch>
                    <Route exact path="/details">
                        <DetailResultsController/>
                    </Route>

                    <Route path="/review">
                        <ReviewAnswersController/>
                    </Route>

                    <Route path="/statics">
                        <QuestionsStatisticsController/>
                    </Route>

                    <Route exact path="/grade">
                        <OverallGradeController/>
                    </Route>

                </Switch>
            </div>
        </Router>



    </div>
  );
}

export default App;
