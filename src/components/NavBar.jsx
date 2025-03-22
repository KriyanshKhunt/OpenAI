import React from 'react';
import userIcon from '../assets/p3.jpeg';
import { useDispatch } from 'react-redux';
import { setOpen } from './slices/MainSlice';
import '../App.css';

export default function NavBar() {
      const dispatch = useDispatch();
      return <>
            <section className='navBar'>
                  <div className="navBarContainer">
                        <h1>Gemini</h1>
                        <img src={userIcon} alt="User" onClick={() => dispatch(setOpen(true))} />
                  </div>
            </section>
      </>
}
