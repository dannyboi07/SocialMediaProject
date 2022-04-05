import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFailure } from '../../reducers/failureReducer';
import { useHistory } from 'react-router-dom';
import "./failurecomp.css";

function FailureComp() {
    const failureState = useSelector(state => state.failure);
    const dispatch = useDispatch();
    const history = useHistory();
    
    console.log(failureState);

    if (failureState) {
        
        function handleRelClick() {
            if (typeof(failureState?.param) !== "object") {
                dispatch((failureState?.func)(failureState?.param));
            }
            else {
                dispatch((failureState?.func)(Object.values(failureState?.param)[0], Object.values(failureState?.param)[1]));
            }
            dispatch(setFailure("CLEAR", null));
        }

        function ReloadBtn({ onClick, children }) {

            if (children) return (
                <button className="frnd-btn" onClick={onClick}>
                    {
                        children
                    }
                </button>
            )

            return (
                <button className="frnd-btn" onClick={onClick}>
                    Retry
                </button>
            )
        };

        if (failureState.type === "CONTENT") {
            return (
                <div className="fail-ctn">
                    <p>
                        Failed to load content
                    </p>
                    <ReloadBtn onClick={ handleRelClick } />
                </div>
            )
        }
        else if (failureState.type === "USER_PROF") {
            return (
                <div className="fail-ctn">
                    <p>
                        Failed to find user or user doesn't exist
                    </p>
                    <ReloadBtn onClick={ handleRelClick } />
                </div>
            )
        }
        else if (failureState.type === "POST") {
            return (
                <div className="fail-ctn">
                    <img src="/error-404.svg" alt="404-icon" />
                    <p>
                        Failed to retrieve resource or it doesn't exist
                    </p>
                    <ReloadBtn onClick={ () => dispatch(setFailure("CLEAR", null)) }>
                        Ok
                    </ReloadBtn>
                </div>
            )
        }
        else if (failureState.type === "ONLY_POST") {
            return (
                <div className="fail-ctn">
                    <img src="/error-404.svg" alt="404-icon" />

                    <p>
                        Failed to retrieve resource or it doesn't exist
                    </p>

                    <ReloadBtn onClick={() => {history.push("/home")}}>
                        Back to home
                    </ReloadBtn>
                </div>
            )
        }
    };
};

export default FailureComp