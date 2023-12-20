import React from 'react';
import '@/styles/page.css';
import Sidebar from '@/components/Sidebar';


const About = () => {
    return (
        <div className='page'>
            <Sidebar />
            <div className="content-page">
            <h1>About</h1> <br />
            </div>

        </div>
    );
};

export default About;
