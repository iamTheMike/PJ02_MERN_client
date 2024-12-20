import React from 'react'
import { Link } from "react-router-dom";

const home = () => {
  console.log("HomePage")
  return (
    <main>
      <content>
        <section className='home'>
          <div className='home-content'>
                <div className='home-content-left'>
                    <h1>Jiraphat Pakdeputarak</h1>
                    <span >You can call me . . .<h1>MIKE</h1> </span>
                    <h3>And I'm a <span className="text-span">Web Devoloper. </span></h3>
                    <p>
                        Although I’m new to the development field
                    <br/>
                        I enjoy the challenge of combining creativity with technology, 
                    <br/>  
                        turning ideas into functional websites that solve real-world problems., 
                        Currently, I'm focused on learning full-stack development and exploring frameworks like React and Node.js.
                    </p>
                    <div className='home-sci'>
                      <Link to="https://www.facebook.com/THEMIKE.KMITL/"><i className='bx bxl-facebook'></i></Link>
                      <Link to="https://www.instagram.com/j_themike/"><i className='bx bxl-instagram'></i></Link>
                      <Link to=""><i className='bx bxl-whatsapp'></i></Link>
                    </div>    
                    
              </div>
              <div className='home-content-right'>
                 <img 
                    src={'https://storage.googleapis.com/mearn-app-01/S__8126497.jpg'} 
                     alt="User"
                      style={{ width: '18rem', height: '18rem', borderRadius: '100%' }} 
                  />
              </div>
           </div>
        </section>


        <section className='about' >
            <div className='about-img'>
               <img 
                  src={'https://storage.googleapis.com/mearn-app-01/9D6F68B7-49F6-4A4C-8FFA-9E04161B694C.jpg'} 
                  alt="User"
                  style={{ width: '18rem', height: '18rem', borderRadius: '100%' }} 
                />
            </div>
            <div className='about-text'>
              <h2>About<span>Me</span></h2>
              <h4>Full Stack Devoloper!</h4>
              <p>
              Hi, I'm Mike, and I fell in love with programming.
              With a background as a Control & Instrumentation Engineer,
              my work experience has equipped me with analytical thinking, 
              problem-solving skills, and a logical approach to handling challenges. 
              Transitioning into programming allows me to combine 
              my technical expertise with my passion for building efficient and effective solutions
              </p>   
            </div>
        </section>

        <section  className='myskill'>
          <div className='myskill-content' >
              <h1 className='headingskill'>My Skills</h1>
              <div className='Techincal-bars'>
                  <div className='bar'>
                    <div className='info'><i style={{color:"#c95d2e"}} className='bx bxl-html5'></i>
                      <span>HTML</span>
                    </div>
                    <div className='progress-line html'>
                      <span></span>
                    </div>
                  </div>
                  <div className='bar'>
                    <div className='info'><i style={{color:"#147bbc"}} className='bx bxl-css3'></i>
                      <span>CSS</span>
                    </div>
                    <div className='progress-line css'>
                      <span></span>
                    </div>
                  </div>
                  <div className='bar'>
                    <div className='info'><i style={{color:"#b0bc1e"}} className='bx bxl-javascript'></i>
                      <span>Javascript</span>
                    </div>
                    <div className='progress-line javascript'>
                      <span></span>
                    </div>
                  </div>
                  <div className='bar'>
                    <div className='info'><i style={{color:"#69bcbc"}} className='bx bxl-react'></i>
                      <span>React</span>
                    </div>
                    <div className='progress-line react'>
                      <span></span>
                    </div>
                  </div>
                  <div className='bar'>
                    <div className='info'><i style={{color:" #065e15"}} className='bx bxl-mongodb'></i>
                      <span>MongoDB</span>
                    </div>
                    <div className='progress-line mongodb'>
                      <span></span>
                    </div>
                  </div>
                  <div className='bar'>
                    <div className='info'><i style={{color:"#084484"}}className='bx bxs-data'></i>
                      <span>MySQL</span>
                    </div>
                    <div className='progress-line mysql'>
                      <span></span>
                    </div>
                  </div>
                  <div className='bar'>
                    <div className='info'><i className='bx bxl-nodejs'></i>
                      <span>ExpressJs</span>
                    </div>
                    <div className='progress-line expressjs'>
                      <span></span>
                    </div>
                  </div>
              </div>
          </div>
        </section>
    
        <section className='personalskill'>
          <div className='personalskill-content'>
           <h1 className='headingskill1'>Professional skill</h1>
           <div className='radial-bars'>
            <div className='radial-bar-1'>
              <div className='radial-bar'>
                  <svg x="0" y="0" viewBox='0 0 200 200'>
                    <circle className='progress-bar' cx="100" cy="100" r="80"></circle>
                    <circle className='path path-1' cx="100" cy="100" r="80"></circle>
                  </svg>
                  <div className='percentage'>75%</div>
                  <div className='text'>Creativity</div>
              </div>
              <div className='radial-bar'>
                  <svg x="0" y="0" viewBox='0 0 200 200'>
                    <circle className='progress-bar' cx="100" cy="100" r="80"></circle>
                    <circle className='path path-2' cx="100" cy="100" r="80"></circle>
                  </svg>
                  <div className='percentage'>70%</div>
                  <div className='text'>Communication</div>
              </div>
            </div>
            <div className='radial-bar-2'>
              <div className='radial-bar'>
                  <svg x="0" y="0" viewBox='0 0 200 200'>
                    <circle className='progress-bar' cx="100" cy="100" r="80"></circle>
                    <circle className='path path-3' cx="100" cy="100" r="80"></circle>
                  </svg>
                  <div className='percentage'>80%</div>
                  <div className='text'>Problem Solving</div>
              </div>
              <div className='radial-bar'>
                  <svg x="0" y="0" viewBox='0 0 200 200'>
                    <circle className='progress-bar' cx="100" cy="100" r="80"></circle>
                    <circle className='path path-4' cx="100" cy="100" r="80"></circle>
                  </svg>
                  <div className='percentage'>80%</div>
                  <div className='text'>TeamWork</div>
              </div>
            </div>
           </div> 
          </div>
        </section>
      </content>
    </main>
  )
}

export default home