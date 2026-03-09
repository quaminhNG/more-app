import { useState } from "react";
export default function useFormValidated(initialValues, validate) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value;

        setValues({
            ...values,
            [name]: val
        });

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    }

    const handleSubmit = (callback, additionalArgs = {}) => (e) => {
        e.preventDefault();
        const validationErrors = validate(values, additionalArgs.isLogin);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            callback();
            setValues(initialValues);
        }
    };
    return {
        values,
        errors,
        handleChange,
        handleSubmit
    }
}
export function validate(values, isLogin = false) {
    let errors = {};
    if (!isLogin) {
        if (!values.name || !values.name.trim()) {
            errors.name = "Name is required";
        } else if (values.name.trim().length < 2) {
            errors.name = "Name must be at least 2 characters";
        }
    }

    if (!values.email) {
        errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Email is invalid";
    }

    if (!values.password) {
        errors.password = "Password is required";
    } else if (values.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
    }

    return errors;
}