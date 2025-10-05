// 404 Not Found Handler
export const notFound = (req, res, next) => {
    res.status(404).json({
        error: 'Route not found',
        path: req.originalUrl,
        method: req.method,
    });
};

// Global Error Handler
export const errorHandler = (err, req, res, next) => {
    console.error('Unhandled error:', err.stack || err.message);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
    });
};
