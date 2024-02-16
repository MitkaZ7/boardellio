import React, { useState, useEffect } from 'react';
import packageJson from '../../../package.json';
import ReactMarkdown from 'react-markdown';
const Changelog = () => {
    const [changelog, setChangelog] = useState('');      
    const version = packageJson.version; 

    useEffect(() => {
        async function fetchChangeLog() {
            const response = await fetch('CHANGELOG.md');
            const text = await response.text();
            setChangelog(text);
        }
        fetchChangeLog();
    }, []);
  return (
    <>  
      <div>Changelog {version}</div>
          <ReactMarkdown>{changelog}</ReactMarkdown>
    </>
      
      
    
  )
}

export default Changelog