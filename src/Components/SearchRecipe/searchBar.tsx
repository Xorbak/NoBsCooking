import axios from "axios";
import { Field, Form, Formik } from "formik";
import { ComplexSearchRecipe, Recipe } from "../../App";
import { Myinput } from "./myInput";
interface Props {
  SetRecipe: React.Dispatch<React.SetStateAction<Recipe | undefined>>;
  SetSearchRecipe: React.Dispatch<
    React.SetStateAction<ComplexSearchRecipe | undefined>
  >;
  setShowRecipe: React.Dispatch<React.SetStateAction<number>>;
}
export const SearchBar = ({
  SetRecipe,
  SetSearchRecipe,
  setShowRecipe,
}: Props) => {
  return (
    <Formik
      initialValues={{ input: "" }}
      onSubmit={(values, { resetForm }) => {
        const searchRes = {
          method: "GET",
          params: {
            query: values.input,
            apiKey: `${process.env.REACT_APP_COMPLEX_SEARCH}`,
            addRecipeInformation: true,
            fillIngredients: true,
          },
          url: `https://api.spoonacular.com/recipes/complexSearch`,
        };
        setShowRecipe(4);
        axios
          .request(searchRes)
          .then((response) => {
            console.log(response.data);
            localStorage.setItem("searchRecipe", JSON.stringify(response.data)); //@ts-ignore
            SetSearchRecipe(JSON.parse(localStorage.getItem("searchRecipe")));
            setShowRecipe(2);
          })
          .catch(() => {
            setShowRecipe(3);
          });
        resetForm();
      }}
    >
      {() => (
        <Form>
          <Field name="input" type="input" component={Myinput}></Field>
        </Form>
      )}
    </Formik>
  );
};
