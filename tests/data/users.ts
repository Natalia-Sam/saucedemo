import User from '../../api/interfaces/user';

export const users: Record<string, User> = {
    validUser: {
        email: process.env.AIRPORT_EMAIL!,
        password: process.env.AIRPORT_PASSWORD!,
    },
    userWithInvalidPassword: {
        email: process.env.AIRPORT_EMAIL!,
        password: 'wrongpassword123',
    },
};
