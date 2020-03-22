import React from 'react';
import {Col} from 'antd'

const GridCard = (props) => {
    if (props.actor) {
        return (
          <Col lg={6} md={8} xs={24}>
            <div style={{ position: "relative" }}>
            
                <img
                  src={props.image}
                  style={{ width: "100%", height: "320px" }}
                  alt="img"
                />
            
            </div>
          </Col>
        );
    } else {
         return (
           <Col lg={6} md={8} xs={24}>
             <div style={{ position: "relative" }}>
               <a href={`/movie/${props.movieId}`}>
                 <img
                   src={props.image}
                   style={{ width: "100%", height: "320px" }}
                   alt=""
                 />
               </a>
             </div>
           </Col>
         );
    }
   
}
export default GridCard