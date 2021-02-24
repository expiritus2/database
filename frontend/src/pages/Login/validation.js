import * as Yup from 'yup';

export const ValidationSchema = (translate) => Yup.object({
    email: Yup.string().email(translate.EmailError).required(translate.FieldRequired),
    password: Yup.string().required(translate.FieldRequired),
});
