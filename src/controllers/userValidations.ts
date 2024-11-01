import User from "../entities/User";

type validateUserType = {
    valid: boolean,
    message?: string
}

export const validateUser = (user: User): validateUserType => {
    if (typeof user.name !== 'string' || user.name.trim() === '') {
        return {
          valid: false,
          message: 'Invalid name'
        };
    }

    if (typeof user.email !== 'string' || !validateEmail(user.email)) {
        return {
          valid: false,
          message: 'Invalid email'
        };
    }

    if (typeof user.password !== 'string' || user.name.length < 6) {
        return {
          valid: false,
          message: "Invalid password. It must be at least 6 characters long."
        };
    }

    return {
      valid: true,
      message: 'User is valid'
    };
};

export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};