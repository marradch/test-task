import { useForm, useField } from "vee-validate";
import * as yup from "yup";

export function useTaskForm(initialValues = {}) {
    const schema = yup.object({
        title: yup.string().min(6).required(),
        description: yup.string().required(),
    });

    const { handleSubmit, isSubmitting } = useForm({
        validationSchema: schema,
        initialValues,
    });

    const { value: title, errorMessage: titleError } = useField("title");
    const { value: description, errorMessage: descriptionError } = useField("description");

    return {
        title,
        description,
        titleError,
        descriptionError,
        handleSubmit,
        isSubmitting
    };
}
