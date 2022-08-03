import * as yup from 'yup';

export const registration = yup.object().shape({
  fullname: yup.string().required('Fullname is required'),
  username: yup.string().required('Username is required'),
  email: yup.string().required('E-mail is required'),
  password: yup.string().required('Password is required').min(6)
});

export const login = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required').min(6)
});
