const response = (statusCode, data, message, res) => {
    res.status(statusCode).json({
        payload: {
            status: statusCode,
            datas: data,
        },
        message: message,
        pagination: {
            prev: "",
            next: "",
            max: "",
        }
    })
}
module.exports = response;
// // id: 0,
// // first_name: "",
// // last_name: "",
// // email: "",
// // alt_email: "",
// // phone: "",
// // alt_phone: "",
// // country_code_main: "",
// // country_code_alt: "",
// // gender: "",
// // birthdate: "",
// // home_address: "",
// // work_address: "",
// // profile_image: "",
// // captured_image: "",
// // is_profile_complete: "",
// // is_email_verified: "",
// // is_phone_verified: "",
// // is_alt_email_verified: "",
// // is_alt_phone_verified: "",