import React from 'react';
import {
    Link,
    useLocation,
    Outlet,
    useRoutes,
    matchRoutes,
    useResolvedLocation,
    useParams,
  } from "react-router-dom";
  
const NavLink = ({
    to,
    exact,
    className,
    activeClassName,
    inactiveClassName,
    ...rest
  }) => {
    let location = useLocation();
    //let resolvedLocation = useResolvedLocation(to);
    //let routeMatches = matchRoutes(routes, location);
  
    let isActive;
    if (exact) {
      //isActive = location.pathname === resolvedLocation.pathname;
    } else {
      //isActive = routeMatches.some(
      //  (match) => match.pathname === resolvedLocation.pathname
      //);
    }
  
    let allClassNames =
      className + (isActive ? ` ${activeClassName}` : ` ${inactiveClassName}`);
  
    return <Link className={allClassNames} to={to} {...rest} />;
  }

export default NavLink;
