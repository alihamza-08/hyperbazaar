// signup-schema

const { z } = require("zod");

const signupSchema = z.object({
    username: z.string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "Name must be at least 3 characters" })
        .max(25, { message: "Name must not be more than 25 characters" }),

    email: z.string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Email must be at least 3 characters" })
        .max(255, { message: "Email must not be more than 255 characters" }),

    phone: z.string({ required_error: "Phone Number is required" })
        .trim()
        .min(10, { message: "Phone must be at least 10 characters" })
        .max(20, { message: "Phone must not be more than 20 characters" }),
 
    address: z.string({ required_error: "Address is required" })
        .trim()
        .min(10, { message: "Address must be at least 4 characters" })
        .max(20, { message: "Phone must not be more than 200 characters" }),

    password: z.string({ required_error: "Password is required" })
        .trim()
        .min(6, { message: "Password must be at least 6 characters" })
        .max(1024, { message: "Password can't be greater than 1024 characters" }),
});

module.exports = signupSchema;
