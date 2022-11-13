<template>
  <div class="search-bar">
    <input type="text" v-model="search" placeholder="Search" @input="filterUsers"/>
  </div>

  <table v-if="users.length > 0">
    <thead>
      <tr>
        <th>ID</th>
        <th>Prénom</th>
        <th>Nom</th>
        <th>Age</th>
        <th>E-mail</th>
        <th>Date de naissance</th>
        <th>Niveau d'étude</th>
        <th>Fonction</th>
        <th>Compétences</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.ID" >
        <td>{{ user.ID }}</td>
        <td>{{ user.Prénom }}</td>
        <td>{{ user.Nom }}</td>
        <td>{{ user.Age }}</td>
        <td>{{ user.Email }}</td>
        <td>{{ user['Birth Year'] }}</td>
        <td>{{ user['Level of study'] }}</td>
        <td>{{ user.Job }}</td>
        <td>
          <ul class="skillList">
            <li v-for="skill in user.Skills" :key="skill">{{ skill }}</li>
          </ul>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import type {UserInterface} from '../dist/Interfaces/UserInterface'

  export default defineComponent({
    data() {
      return {
        users: [] as UserInterface[],
        allUsers: [] as UserInterface[],
        search: "" as String,
      }
    },
    methods: {
      getAllData() {
        // @ts-ignore
        google.script.run.withSuccessHandler((data) => {
          console.log(data)
          this.users = data.users
          this.allUsers = data.users
        }).getData() 
      },
      filterUsers(){

        this.users = this.allUsers.filter((user) => {
          // any information in the object is a thing we can filter on
          return Object.values(user).some((value: any) => {
            if (typeof value === 'string') {
              return value.toLowerCase().includes(this.search.toLowerCase())
            }
            if (Array.isArray(value)) {
              return value.some((skill) => skill.toLowerCase().includes(this.search.toLowerCase()))
            }
            return false
          })
        })
      }
    },
    created () {
      this.getAllData()
    },
  })
</script>

<style scoped>
  table {
    border-collapse: collapse;
    width: 100%;
    color: white;
  }

  th{
    background-color: darkblue;
    color: white;
    border-bottom: 1px solid lightblue;
    text-align: center;
    padding: 8px;
  }

  td {
    text-align: center;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: rgba(0, 0, 139, 0.825);
  }

  tr:nth-child(odd) {
    background-color: rgba(0, 0, 139, 0.704);
  }

  .skillList{
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .skillList li{
    display: flex;
    margin: 0 5px;
    padding: 5px;
    color: black;
    background-color: aliceblue;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
  }

  .search-bar{
    margin: 0 auto;
  }

  .search-bar input{
    width: 100%;
    padding: 10px;
    border: 1px solid lightblue;
    border-radius: 5px;
    font-size: 16px;
    box-sizing: border-box;
    outline: none;
  }
</style>