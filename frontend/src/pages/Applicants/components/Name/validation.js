import * as Yup from 'yup';

export const ValidationSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
});
