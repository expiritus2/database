import * as Yup from 'yup';

export const ValidationSchemaEnroll = (translate) => Yup.object({
    // username: Yup.string().email(translate.EmailError).required(translate.FieldRequired),
    password: Yup.string()
        .min(8, translate.PasswordLength)
        .matches(/[0-9]/, translate.PasswordNumber)
        .matches(/[A-Z]/, translate.PasswordUpperChar)
        .matches(/[a-z]/, translate.PasswordLowerChar)
        .required('Required'),
    confirmPassword: Yup.string().required('Required')
        .oneOf([Yup.ref('password'), null], translate.PasswordsMustMatch),
    displayName: Yup.string().required(translate.FieldRequired),
});

export const ValidationSchemaSuperAdmin = (translate) => Yup.object({
    username: Yup.string().email(translate.EmailError).required(translate.FieldRequired),
});
