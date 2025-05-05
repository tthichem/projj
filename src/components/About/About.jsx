import React, { useState } from 'react'
import './About.css'
import ReportsPopUp from '../ReportsPopUp/ReportsPopUp'
import { FaGithub } from 'react-icons/fa'

const About = ({theme}) => {
  const [showReport,setShowReport] = useState(false);

  return (
    <div className='about'>
      <h2>About us</h2>
      <p>
      This website was created as part of an academic project by 2nd-year engineering students at the University of Exact Sciences CPR.<br/>
      More than just a technical exercise, this project is meant to be a صدقة جارية , a continuous
      good deed. By using our skills to help the university community, we hope this work will be 
      useful for students, teachers, and visitors for a long time.
      The site was fully developed with React, using modern tools 
      and simple, accessible, and scalable design principles. It shows our desire
      to contribute positively to our university and leave something helpful and open for future generations.<br/>
      If you notice a bug, a display issue, or if you have a suggestion, report it here - it helps us to improve the site and make it even better for everyone!
      </p>
      <button className='report-button' onClick={() => setShowReport(true)}>Report a problem</button>
      {showReport && <ReportsPopUp onClose={() => setShowReport(false)} theme={theme}/>}
      <div style={{marginTop: 24, textAlign: 'center'}}>
        <span style={{fontSize: '1rem', color: '#666'}}>and you can take a look here...</span>
        <br/>
        <div style={{display:'flex', justifyContent:'center', gap:'18px', marginTop:8}}>
          <a href="https://github.com/abdelhak46/prj" target="_blank" rel="noopener noreferrer" style={{display:'inline-block'}}>
            <FaGithub size={30} title="View on GitHub 1" style={{color: theme === 'dark' ? '#fff' : '#222'}}/>
          </a>
          <a href="https://github.com/tthichem/projj" target="_blank" rel="noopener noreferrer" style={{display:'inline-block'}}>
            <FaGithub size={30} title="View on GitHub 1" style={{color: theme === 'dark' ? '#fff' : '#222'}}/>
          </a>
        </div>
      </div>
    </div>
  )
}

export default About