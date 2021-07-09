/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodoListItem = /* GraphQL */ `
  query GetTodoListItem($id: ID!) {
    getTodoListItem(id: $id) {
      id
      name
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listTodoListItems = /* GraphQL */ `
  query ListTodoListItems(
    $filter: ModelTodoListItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodoListItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
