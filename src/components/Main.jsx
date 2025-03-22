import React, { useEffect, useRef, useState } from 'react';
import '../App.css';
import NavBar from './NavBar';
import ExploreIcon from '@mui/icons-material/Explore';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import CodeIcon from '@mui/icons-material/Code';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import { onChangeText, setLoading, startChat } from './slices/MainSlice';
import gemini from '../geminiAPI/gemini';
import geminiLogo from '../assets/gemini.png';
import userLogo from '../assets/p3.jpeg';
import { Skeleton } from '@mui/material';
import { setAllAsk } from './slices/sideBarSlice';

export default function Main() {

      const { inputValue, isStartChat, loading, newChat } = useSelector(state => state.mainSlice);
      const { recentClick } = useSelector(state => state.sideBarSlice);
      const scrollDown = useRef(null);
      const subButton = useRef(null);
      const dispatch = useDispatch();

      const [data, setData] = useState([]);

      useEffect(() => {
            if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 0 && isStartChat) {
                  scrollDown.current.scrollIntoView({
                        behavior: 'smooth'
                  });
            }
      }, [data]);

      useEffect(() => {
            setData([]);
      }, [newChat])

      useEffect(() => {
            if (subButton.current) {
                  subButton.current.click();
            }
      }, [recentClick])


      const handleChange = (event) => {
            dispatch(onChangeText(event.target.value));
      }

      const wordDelay = (index, word) => {
            setTimeout(() => {
                  setData((prev) => {
                        const newText = index != 0 ? prev[prev.length - 1].text : '';
                        if (index) {
                              prev.pop();
                        }
                        return [...prev, { text: newText + word, isBot: true }];
                  })
            }, 55 * index);
      }

      const handleChat = async (e) => {
            e.preventDefault();

            if (inputValue) {
                  dispatch(startChat(true));
                  dispatch(onChangeText(''));
                  dispatch(setLoading(true));
                  dispatch(setAllAsk(inputValue));
                  if (isStartChat) {
                        scrollDown.current.scrollIntoView({
                              behavior: 'smooth'
                        });
                  }
                  setData((prev) => {
                        return [...prev, { text: inputValue, isBot: false }];
                  })
                  const ansRes = await gemini(inputValue);

                  const forBoldArray = ansRes.split('**');
                  let withBoldString = '';

                  forBoldArray.forEach((word, idx) => {
                        if (idx % 2 == 1) {
                              withBoldString += '<b>' + word + '</b>';
                        } else {
                              withBoldString += word;
                        }
                  })
                  const nextLineAdded = withBoldString.split('*').join('</br></br>');
                  dispatch(setLoading(false));
                  nextLineAdded.split(' ').map((word, idx) => {
                        wordDelay(idx, word + ' ');
                  })
            }
      }

      return <>
            <section className='main'>
                  <div className="mainContainer">
                        <NavBar />

                        <div className="defaultShow">
                              <div className="defaultContentWrapper">
                                    {
                                          isStartChat
                                                ?
                                                <div className='ChatWrapper' style={{ overflowY: 'clip', flex: 1 }}>
                                                      {
                                                            data.map((dataObj, idx) => {
                                                                  return (
                                                                        <div key={idx} className="chatBoxContainer" style={{ display: 'flex', justifyContent: dataObj.isBot ? 'flex-start' : 'flex-end', alignItems: 'center' }}>
                                                                              <div key={idx} className="chatBox" style={{ width: dataObj.isBot ? "100%" : "auto" }}>
                                                                                    <img style={{ width: 30, height: 30, borderRadius: '50%', left: dataObj.isBot ? '-40px' : 'unset', right: dataObj.isBot ? 'unset' : '-40px' }} src={dataObj.isBot ? geminiLogo : userLogo} alt="" />
                                                                                    <p style={{ backgroundColor: dataObj.isBot ? '#d0d2d7' : '#E8EBF490', padding: '10px', borderRadius: '10px', width: '100%' }} dangerouslySetInnerHTML={{ __html: dataObj.text }} ></p>
                                                                              </div>
                                                                        </div>
                                                                  );
                                                            })
                                                      }
                                                      {
                                                            loading && (
                                                                  <div className="showLoading">
                                                                        <Skeleton variant="circular" width={30} height={30} sx={{ position: 'absolute', top: 7, left: '-40px' }} />
                                                                        <Skeleton variant="text" sx={{ fontSize: '35px', borderRadius: '10px', width: '100%' }} />
                                                                        <Skeleton variant="text" sx={{ fontSize: '35px', borderRadius: '10px', width: '100%' }} />
                                                                  </div>
                                                            )
                                                      }
                                                      <div ref={scrollDown} className="scrollDown"></div>
                                                </div>
                                                :
                                                <div className="defaultContent">
                                                      <div className="defaultScreenTitle">
                                                            <h1>Hello, Dev.</h1>
                                                            <h2>How can i help you today?</h2>
                                                      </div>

                                                      <div className="cardContainer">
                                                            <div className="card">
                                                                  <p>Suggest beautiful places to see on an upcoming road trip</p>
                                                                  <div className="cardIcon">
                                                                        <ExploreIcon />
                                                                  </div>
                                                            </div>

                                                            <div className="card">
                                                                  <p>Briefly summarize this concept: urban planning</p>
                                                                  <div className="cardIcon">
                                                                        <TipsAndUpdatesIcon />
                                                                  </div>
                                                            </div>

                                                            <div className="card">
                                                                  <p>Brainstorm team bonding activities for our work retreat</p>
                                                                  <div className="cardIcon">
                                                                        <ChatBubbleIcon />
                                                                  </div>
                                                            </div>

                                                            <div className="card">
                                                                  <p>Improve the readability of the following code</p>
                                                                  <div className="cardIcon">
                                                                        <CodeIcon />
                                                                  </div>
                                                            </div>
                                                      </div>
                                                </div>
                                    }

                                    <div className="inputWrapperPro">
                                          <div className="inputBox">
                                                <form className="inputWrapper" onSubmit={(e) => handleChat(e)}>
                                                      <input
                                                            value={inputValue}
                                                            onChange={(event) => handleChange(event)}
                                                            type="text"
                                                            placeholder='Enter a prompt here'
                                                            id="input"
                                                      />
                                                      <div className="inputIcon">
                                                            <div style={{ display: 'flex', cursor: 'pointer' }}>
                                                                  <KeyboardVoiceIcon />
                                                            </div>
                                                            <div ref={subButton} style={{ display: 'flex', cursor: 'pointer' }} onClick={(e) => handleChat(e)}>
                                                                  <SendIcon />
                                                            </div>
                                                      </div>
                                                </form>
                                                <p className='inputBoxText'>Gemini may display inaccurate info, including about people, so double check its responses . Your privacy and Gemini Apps</p>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </section>
      </>
}
