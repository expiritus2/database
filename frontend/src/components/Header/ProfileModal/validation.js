import * as Yup from 'yup';

export const ValidationSchema = (translate) => Yup.object({
    username: Yup.string().email(translate.EmailError).required(translate.FieldRequired),
    newPassword: Yup.string()
        .min(8, translate.PasswordLength)
        .matches(/[0-9]/, translate.PasswordNumber)
        .matches(/[A-Z]/, translate.PasswordUpperChar)
        .matches(/[a-z]/, translate.PasswordLowerChar)
        .required(translate.FieldRequired),
    displayName: Yup.string().required(translate.FieldRequired),
});

export const ValidationSchemaLight = (translate) => Yup.object({
    username: Yup.string().email(translate.EmailError).required(translate.FieldRequired),
    displayName: Yup.string().required(translate.FieldRequired),
});
