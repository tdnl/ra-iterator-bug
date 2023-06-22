import {
  Admin,
  ArrayInput,
  Create,
  Datagrid,
  List,
  Resource,
  SimpleForm,
  SimpleFormIterator,
  TextField,
  TextInput,
} from "react-admin";
import { useWatch } from "react-hook-form";
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

function ListPost() {
  return (
    <List>
      <Datagrid>
        <TextField source="name" />
      </Datagrid>
    </List>
  );
}

function CreatePost() {
  return (
    <Create>
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
  const value = useWatch();
  return <pre>{JSON.stringify(value, null, 2)}</pre>;
}
