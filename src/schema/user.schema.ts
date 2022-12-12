import {object, string, TypeOf} from 'zod'

export const createUserSchema = object({
    body: object({
        name: string({
            required_error: 'Name is required'
        }),
        password: string({
            required_error: 'Password is required'
        }),
        passwordConfirmation: string({
            required_error: 'Passwordconfirmation is required'
        }),
        email: string({
            required_error: 'Email is required'
        }).email('Not a valid email'),

    }).refine((data) => data.password === data.passwordConfirmation, {
        message: 'Password do not match',
        path: ['passwordConfirmation'],
    }),
});

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>,'body.passwordConfirmation'>;