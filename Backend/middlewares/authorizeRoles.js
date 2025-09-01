import ErrorHandler from "./error.js";

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        // We assume that the `isAuthenticated` middleware has already run
        // and attached the user object to the request (req.user).
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(
                    `Role (${req.user.role}) is not allowed to access this resource.`, 403
                )
            );
        }
        // If the user's role is in the allowed list, proceed to the next middleware/controller.
        next();
    };
};
