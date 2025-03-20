const ApiHandler = (handler) => {
    return async (req, res, next) => {
        try {
            await handler(req, res, next);
        }
        catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message
            });
        }
    };
};
export default ApiHandler;
