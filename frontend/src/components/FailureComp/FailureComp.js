import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFailure } from '../../reducers/failureReducer';
import "./failurecomp.css";

function FailureComp() {
    const failureState = useSelector(state => state.failure);
    const dispatch = useDispatch();
    
    // console.log(failureState);
    // console.log(typeof(failureState?.param))

    if (failureState) {
        
        function ReloadBtn() {
            function handleRelClick() {
                if (typeof(failureState?.param) !== "object") {
                    dispatch((failureState?.func)(failureState?.param));
                }
                else {
                    dispatch((failureState?.func)(Object.values(failureState?.param)[0], Object.values(failureState.param)[1]));
                }
                dispatch(setFailure("CLEAR", null));
            }

            return (
                <button className="fail-rel-btn" onClick={ handleRelClick }>
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
                    <ReloadBtn />
                </div>
            )
        }
        else if (failureState.type === "USER_PROF") {
            return (
                <div className="fail-ctn">
                    <p>
                        Failed to find user or user doesn't exist
                    </p>
                    <ReloadBtn />
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
                    <button className="fail-rel-btn" onClick={ () => dispatch(setFailure("CLEAR", null)) }>
                        Ok
                    </button>
                </div>
            )
        }
    };
};

export default FailureComp