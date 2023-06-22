import {
  Admin,
  ArrayInput,
  Create,
  CreateProps,
  Datagrid,
  List,
  ListProps,
  Resource,
  SimpleForm,
  SimpleFormIterator,
  TextField,
  TextInput,
} from "react-admin";
import { useFormState } from "react-final-form";
import simpleRestProvider from "ra-data-simple-rest";

import "./App.css";

function App() {
  return (
    <Admin
      dataProvider={simpleRestProvider("https://jsonplaceholder.typicode.com")}
    >
      <Resource name="posts" list={ListPost} create={CreatePost} />
    </Admin>
  );
}

export default App;

function ListPost(props: ListProps) {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="name" />
      </Datagrid>
    </List>
  );
}

function CreatePost(props: Omit<CreateProps, "children">) {
  return (
    <Create {...props}>
      <SimpleForm>
        <ArrayInput source="lines">
          <SimpleFormIterator>
            <TextInput label="Name" source="name" />
            <ArrayInput label="Blocks" source="blocks">
              <SimpleFormIterator>
                <TextInput label="Value" source="value" />
              </SimpleFormIterator>
            </ArrayInput>
          </SimpleFormIterator>
        </ArrayInput>
        <Debug />
      </SimpleForm>
    </Create>
  );
}

function Debug() {
  const { values } = useFormState();

  return <pre>{JSON.stringify(values, null, 2)}</pre>;
}
