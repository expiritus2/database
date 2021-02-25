import * as Yup from 'yup';

export const ValidationSchema = (translate) => Yup.object({
    username: Yup.string().email(translate.EmailError).required(translate.FieldRequired),
    password: Yup.string().required(translate.FieldRequired),
});
