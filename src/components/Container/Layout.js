import React from 'react';
import './layout.css'
import bg  from "../../assets/images/Rectangle 1.png"
const Layout = ({children}) => {
   return (
      <div className='layout'>
            <img src={bg} alt="" className="layout__bg" />
            
              <div className="layaout__body">
               {children}
              </div>
            
 
      </div>
   );
};

export default Layout;