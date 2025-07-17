const validate = (schema) => async (req, res, next) => {
    try {
        const parsedBody = await schema.parseAsync(req.body);
        req.body = parsedBody;
        next();
    } catch (err) {
        // console.log(error);
        const massege =err.errors[0].message;

        res.status(400).json({ msg: massege });
    }
};

module.exports = validate;