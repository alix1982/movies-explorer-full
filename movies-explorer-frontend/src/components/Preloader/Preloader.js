import React from 'react'
import './preloader.css'

const Preloader = (props) => {
    return (
        <div className="preloader">
            <div className={`preloader__container ${(props.isRequestPassed && 'preloader__container_disable')}`}>
                <span className="preloader__round"></span>
            </div>
            <p className={`preloader__text`}>
              {props.isSearchMovie}
            </p>
        </div>
    )
};

export default Preloader
