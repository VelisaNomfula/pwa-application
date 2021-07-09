<template>
  <div class="home">
  <div>
    <amplify-sign-out></amplify-sign-out>
  </div>
    <v-text-field
      v-model="newItem"
      @click:append="addTodoitem"
      @keyup.enter="addTodoitem"
      class="pa-3"
      outlined
      label="Add task"
      append-icon="mdi-plus"
      hide-details
      clearable
    ></v-text-field>
  <v-list
    class="pt-0"
      flat
    >
        <div
          v-for="task in listItems"
          :key="task.id"
        >
        <v-list-item
          @click="doneTask(task.id)"
          :class="{ 'blue lighten-5' : task.done}"
        >
          <template v-slot:default>
            <v-list-item-content>
              <v-list-item-title> {{task.name}} </v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn 
                @click.stop="deleTodoItem(task.id)"
                icon
              >
                <v-icon color="primary lighten-1">mdi-delete</v-icon>
              </v-btn>
          </v-list-item-action>

          </template>
        </v-list-item>
        <v-divider></v-divider>
        </div>
  
    </v-list>
  </div>

</template>

<script>
  import { Auth, API, graphqlOperation } from "aws-amplify";

  import * as queries from "../graphql/queries";
  import * as mutations from "../graphql/mutations";
  import * as subscriptions from "../graphql/subscriptions";

  export default {
    name: 'Home',
  data() {
    return {
      listItems: [],
      newItem: "",
    }
  },

  async mounted() {
    const currentUser = await Auth.currentAuthenticatedUser();
    const that = this;

    API.graphql(
      graphqlOperation(subscriptions.onCreateTodoListItem, {
        owner: currentUser
      })
    ).subscribe({
      next: action => {
        that.listItems.push(action.value.data.onCreateTodoListItem);
      }
    });

    API.graphql(
      graphqlOperation(subscriptions.onDeleteTodoListItem, {
        owner: currentUser
      })
    ).subscribe({
      next: action => {
        const id = action.value.data.onDeleteTodoListItem.id;
        const index = that.listItems.map(x => x.id).indexOf(id);
        that.listItems.splice(index, 1)
      }
    });
  },
  async created() {
    const {data} = await API.graphql(
      graphqlOperation(queries.listTodoListItems)
    );

    data.listTodoListItems.items.forEach(item => {
      this.listItems.push(item);
    });
  },
  methods: {

    async addTodoitem() {
      await API.graphql(
        graphqlOperation(mutations.createTodoListItem,{
          input: { name: this.newItem }
        })
      );
      this.newItem = ""; 
    },

    async deleTodoItem(id) {
      await API.graphql(
        graphqlOperation(mutations.deleteTodoListItem,{
          input: { id: id}
        })
      );
    },
  }
  }
</script>
