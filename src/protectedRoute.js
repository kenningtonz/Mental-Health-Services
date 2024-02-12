import { Navigate } from 'react-router-dom';
import { currentUser } from './index.js';

function ProtectedRoute({ children }) {
    console.log(currentUser.value);
    if (Object.keys(currentUser.value).length === 0) {
        return (
            <Navigate to="/" replace />
        );
    }

    return children;
}

export default ProtectedRoute;