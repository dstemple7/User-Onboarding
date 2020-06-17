import * as Yup from 'yup'

const formSchema = Yup.object().shape({
    name: Yup
    .string()
    .min(3, "Must be at least 3 characters long")
    .required("Must include email"),
    email: Yup
    .string()
    .email("Must be a valid email.")
    .required("Must include email"),
    password: Yup
    .string()
    .min(6, "Must be at least 6 characters long")
    .required("Must include password"),
    spiritAnimal: Yup
    .string()
    .required("Must include spirit animal"),
})

export default formSchema