import React from "react";

function Skeleton() {
  return (
    /*
    <div className="loader">
       <div className="wrapper">
         <div className="circle"></div>
         <div className="line-1"></div>
         <div className="line-2"></div>
         <div className="line-3"></div>
         <div className="line-4"></div>
       </div>
     </div>
    */
    <div className="loader-wrapper">
      <div className="loader">
        <div className="wrapper loader-img">
          <div className="img">
            <img />
          </div>
          <div className="load-info">
            <div className="">
              <h3 className="c1"></h3>
              <p className="c2"></p>
              <div className="c3">
                <div>
                  <div>
                    <span></span>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Skeleton;
