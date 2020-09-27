import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import MyForm from "./Form.js";

class App extends React.Component {
    render() {
        return (
            <div>
                <main className="">
                    <MyForm/>
                </main>
            </div>
        );
    }
}

export default App;

