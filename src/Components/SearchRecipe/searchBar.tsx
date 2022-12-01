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
      initialValues={{ input: null }}
      onSubmit={({ input }) => {
        const searchRes = {
          method: "GET",
          params: { query: input, apiKey: "751b372b3e384e0c83f569d60f12b42f" },
          url: `http://localhost:8000/search`,
        };

        axios.request(searchRes).then((response) => {
          console.log(response.data);
          localStorage.setItem("searchRecipe", JSON.stringify(response.data)); //@ts-ignore
          SetSearchRecipe(JSON.parse(localStorage.getItem("searchRecipe")));
          setShowRecipe(2);
        });
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
