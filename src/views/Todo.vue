<template>
  <div class="home">

    <v-text-field
      v-model="newTaskTitle"
      @click:append="addTask"
      @keyup.enter="addTask"
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
          v-for="task in tasks"
          :key="task.id"
        >
        <v-list-item
          @click="doneTask(task.id)"
          :class="{ 'blue lighten-5' : task.done}"
        >
          <template v-slot:default>
            <v-list-item-action>
              <v-checkbox
                :input-value="task.done"
                color="primary"
              ></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title> {{task.title}} </v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn 
                @click.stop="deleteTask(task.id)"
                icon
              >
                <v-icon color="primary lighten-1">mdi-delete</v-icon>
              </v-btn>
          </v-list-item-action>

          </template>
        </v-list-item>
        <v-divider></v-divider>
        </div>
        {{"This is it"}}
        <div v-for="toDo of sorted" :key="toDo.id">
          <div>{{ "Todo"+ toDo.user }} - {{ moment(toDo.createdAt).format('YYYY-MM-DD HH:mm:ss')}})</div>
          <div>{{ "List "+toDo.toDo }}</div>
        </div>

    </v-list>

    
  </div>

</template>

<script>
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { Todo } from "../models";
//import moment from "moment";


  export default {
    name: 'Home',
  data() {
    return {
      user: {},
      toDos: [],

      newTaskTitle : "",
      tasks: [
        {
          id: 1,
          title: "wake up",
          done : false
        },
        {
          id: 2,
           title: "Bath",
          done : false
        },{
          id: 3,
          title: "Make breakfast",
          done : false
        },
        {
          id: 4,
          title: "Go to work",
          done : false
        }
      ]
    }
  },
  computed : {
    sorted() {
      return [...this.toDos].sort((a, b) => -a.createdAt.localeCompare(b.createdAt));
    }
  },
  methods: {
    addTask(){
      let newTask = {
        id: Date.now(),
        title: this.newTaskTitle,
        done: false
      }
      this.tasks.push(newTask)
      this.newTaskTitle = ''
    },
    doneTask(id){
      let task = this.tasks.filter(task => task.id === id)[0]
      task.done = !task.done
    },

    deleteTask(id){
      this.tasks = this.tasks.filter(task => task.id != id)
    },

    toDoList(){
      const messages = DataStore.query(Todo, Predicates.ALL);
      return messages.user;
    },

    loadMessages() {
      DataStore.query(Todo, Predicates.ALL).then(toDos => {
        this.toDos = toDos;
      });
    },
  }
    
}
</script>
