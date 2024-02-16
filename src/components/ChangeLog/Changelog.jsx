import React from 'react'
import packageJson from '../../../package.json';
const Changelog = () => {
    
  const version = packageJson.version; 

  return (
      <div>Changelog {version}</div>
    
  )
}

export default Changelog