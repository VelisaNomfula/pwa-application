import { DataStore, Predicates } from "@aws-amplify/datastore";
import { Todo } from "./models";

await DataStore.save(new Todo({
  user: "amplify-user",
  toDo: "Hi everyone!",
  createdAt: new Date().toISOString()
}))

const messages = await DataStore.query(Chatty, Predicates.ALL);

console.log(messages)