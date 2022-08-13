import * as yup from 'yup';

export const productValidator = yup.object().shape({
  name: yup.string().required('Product name is required'),
  quantity: yup.number().required('Product quantity is required'),
  price: yup.number().required('Product Price is required'),
  sellerId: yup.string().required('Product seller is required')
});
