import {Route, Navigate} from 'react-router-dom';

const RequireAuth = ({isAuthenticated, children}) => {
    return (
        isAuthenticated ? <>{children}</> : <Navigate to='/cityjail/auth' />
    )
}

export default RequireAuth;