import

    function ProtectedRoute({ user, children }) {

        if (!user) {
            return (
                <Navigate to="/" replace />
            );
        }

        return children;
    }

export default ProtectedRoute;