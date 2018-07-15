import React, {Component} from 'react';
import Signup from "./pages/Signup";
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./pages/Home";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/signup" component={Signup}/>
                    <Route exact path="/home" component={Home}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
