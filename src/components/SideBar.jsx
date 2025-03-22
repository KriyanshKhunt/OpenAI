import React from 'react';
import '../App.css';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SettingsIcon from '@mui/icons-material/Settings';
import { useDispatch, useSelector } from 'react-redux';
import { setRecentClick, toggleSideBar } from './slices/sideBarSlice';
import { newChat, onChangeText, setOpen, startChat } from './slices/MainSlice';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

export default function SideBar() {

      const { isOpen, allAsk } = useSelector(state => state.sideBarSlice);
      const { open } = useSelector(state => state.mainSlice);

      const dispatch = useDispatch();

      const handleToggleSideBar = () => {
            dispatch(toggleSideBar());
      }

      const handleClick = () => {
            dispatch(newChat());
            dispatch(startChat(false));
            dispatch(setOpen(false));
      }

      const handleRecetClick = (ask) => {
            dispatch(onChangeText(ask));
            dispatch(setRecentClick());
            dispatch(setOpen(false));
      }

      return <>
            <section className={`sideBar ${open ? 'showSideBar' : ''} `} style={{ width: isOpen ? '250px' : 'auto' }}>
                  <div className="sideBarContainer">
                        <div className="menuIconBox">
                              <div className='menuIconContaner' onClick={handleToggleSideBar}>
                                    <MenuIcon className='menuIcon' />
                              </div>
                        </div>

                        <div className="newChat" onClick={handleClick}>
                              <AddIcon />
                              <p className={`${isOpen ? '' : 'hide'}`} >New Chat</p>
                        </div>

                        <div className={`recent ${isOpen ? '' : 'hide'}`}>
                              <h1>Recent</h1>
                              <div className="recentItem">
                                    {
                                          allAsk.length
                                                ?
                                                (
                                                      <div className="allAsk">
                                                            {
                                                                  allAsk.map((ask, idx) => {
                                                                        return (
                                                                              <div key={idx} className="askItem" onClick={() => handleRecetClick(ask)}>
                                                                                    <ChatBubbleIcon />
                                                                                    <p>{ask.slice(0, 20)}{ask.length >= 20 ? '...' : ''}</p>
                                                                              </div>
                                                                        )
                                                                  })
                                                            }
                                                      </div>
                                                )
                                                :
                                                (
                                                      <div className="defaultMessage">
                                                            <p>No recent prompt</p>
                                                      </div>
                                                )
                                    }
                              </div>
                        </div>

                        <div className="bottomItems">
                              <div className="bottomItem" style={{ width: isOpen ? '100%' : 'auto' }}>
                                    <HelpOutlineIcon />
                                    <p className={`${isOpen ? '' : 'hide'}`}>Help</p>
                              </div>
                              <div className="bottomItem" style={{ width: isOpen ? '100%' : 'auto' }}>
                                    <AccessTimeIcon />
                                    <p className={`${isOpen ? '' : 'hide'}`}>Activity</p>
                              </div>
                              <div className="bottomItem" style={{ width: isOpen ? '100%' : 'auto' }}>
                                    <SettingsIcon />
                                    <p className={`${isOpen ? '' : 'hide'}`}>Help</p>
                              </div>
                        </div>
                  </div>
            </section>
            <div className={`mobileScreen ${open ? 'showSide' : ''}`} onClick={() => dispatch(setOpen(false))}></div>
      </>
}
