import React from 'react';
import './name.css';

function Name({namesDetail}) {
    return (
        <>
          <div className="Name">
                <div className="name_inner">
                  {namesDetail.name!==''?namesDetail.name:"No Name Choosen"}
                </div>
          </div>
        </>
    );
  }
  
  export default Name;
  