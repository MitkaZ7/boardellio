import React from 'react'

const FoldButton = ({ expanded, onClick }) => {
    return (
        <div className={`fold-button expanded`} onClick={onClick}>
            {/* <div className="triangle"></div> */}
           
        </div>
    );
};

export default FoldButton