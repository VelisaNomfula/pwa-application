/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodoListItem = /* GraphQL */ `
  mutation CreateTodoListItem(
    $input: CreateTodoListItemInput!
    $condition: ModelTodoListItemConditionInput
  ) {
    createTodoListItem(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateTodoListItem = /* GraphQL */ `
  mutation UpdateTodoListItem(
    $input: UpdateTodoListItemInput!
    $condition: ModelTodoListItemConditionInput
  ) {
    updateTodoListItem(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteTodoListItem = /* GraphQL */ `
  mutation DeleteTodoListItem(
    $input: DeleteTodoListItemInput!
    $condition: ModelTodoListItemConditionInput
  ) {
    deleteTodoListItem(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      owner
    }
  }
`;
