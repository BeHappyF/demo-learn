import { mockServer, MockList } from 'graphql-tools';
import casual from 'casual-browserify';

// The GraphQL schema. Described in more detail here:
// https://medium.com/apollo-stack/the-apollo-server-bc68762e93b
const schema = `
  type User {
    id: ID!
    name: String
    lists: [List]
  }
  type List {
    id: ID!
    name: String
    owner: User
    incomplete_count: Int
    tasks(completed: Boolean): [Task]
  }
  type Task {
    id: ID!
    text: String
    completed: Boolean
    list: List
  }
  type RootQuery {
    user(id: ID): User
  }
  schema {
    query: RootQuery
  }
`;

// Mock functions are defined per type and return an
// object with some or all of the fields of that type.
// If a field on the object is a function, that function
// will be used to resolve the field if the query requests it.
const server = mockServer(schema, {
  RootQuery: () => ({
    user: (o, { id }) => ({ id }),
  }),
  List: () => ({
    name: () => casual.word,
    tasks: () => new MockList(4, (o, { completed }) => ({ completed })),
  }),
  Task: () => ({ text: casual.words(10) }),
  User: () => ({ name: casual.name }),
});

mockServer.query(`
query tasksForUser{
  user(id: 6) {
    id
    name
    lists {
      name
      completeTasks: tasks(completed: true) {
        completed
        text
      }
      incompleteTasks: tasks(completed: false) {
        completed
        text
      }
      anyTasks: tasks {
        completed
        text
      }
    }
  }
}`);
