import React from 'react';
import './App.css';
import ManagerForm from './components/managerForm/managerForm.component';

function App() {
    return (
        <div className="live_search">
            <ManagerForm placeholder="Choose Manager" />
        </div>
    );
}

export default App;
