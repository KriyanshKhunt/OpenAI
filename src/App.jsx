import React from 'react';
import SideBar from './components/SideBar';
import Main from './components/Main';

export default function App() {
      return <>
            <section className='openAI'>
                  <div className="openAIContainer">
                        <SideBar />
                        <Main />
                  </div>
            </section>
      </>
}
