const response = (statusCode, data, message, res) => {
    res.status(statusCode).json({
        payload: {
            status: statusCode,
            data: data || null, 
        },
        message: message || "",
        pagination: {
            prev: "",
            next: "",
            current: "",
        }
    });
};

module.exports = response;