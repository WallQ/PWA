import React from 'react';
import {Outlet} from "react-router-dom";
  
const MinimalLayout = () => {
    return (
        <div>
            <main>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="px-4 py-8 sm:px-0">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default MinimalLayout;