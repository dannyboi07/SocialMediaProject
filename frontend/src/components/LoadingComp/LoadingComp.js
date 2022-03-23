import React from 'react';
import "./loadingcomp.css";

function LoadingComp() {
    return (
        <div className="loader-ctn">
            <div className="loader">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    )
}

export default LoadingComp;