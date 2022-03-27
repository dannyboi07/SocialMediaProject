import React from 'react';
import "./loadingcomp.css";

function LoadingComp({ mini }) {

    return (
        <div className={ `loader-ctn ${mini ? "smaller-ctn" : ""}` }>
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