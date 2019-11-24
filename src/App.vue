<template>
  <div id="app">
    <Nav />
    <div class="marginPrincipal">
      <router-view :key="$route.fullPath"></router-view>
    </div>
  </div>
</template>

<script>
// import Alunos from "./components/Aluno/Alunos.vue";
import Nav from "./components/_nav/Nav.vue";
// import Professor from "./components/Professor/Professor.vue";
// import Sobre from "./components/Sobre/Sobre.vue";

export default {
  name: "app",
  components: {
    Nav
    // Alunos,
    // Professor,
    // Sobre
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,700");

body {
  background-color: #eee;
  font-family: "Montserrat", sans-serif;
  display: grid;
  justify-items: center;
}
body,
html {
  margin: 0;
  height: 100%;
}

.marginPrincipal {
  width: 50%;
  margin: auto;
}

#app {
  width: 100%;
}

.btn_Danger {
  background-color: #fa4430;
  font-size: 0.8em !important;
}

.btn {
  border: 1px solid #000;
  padding: 10px 20px;
  cursor: pointer;
  color: white;
  font-weight: bold;
  font-size: 1.0em;
  border-radius: 5px;
  border-bottom: 2px solid black;
}

.btn:hover {
  text-shadow: 1px 1px 1px black;
  margin-top: 2px;
  border-bottom: 1px solid black;
}

table {
  margin: 0px;
  padding: 0px;
  list-style-type: none;
  width: 100%;
}
table tr td {
  padding: 20px;
  font-size: 1.3em;
  background-color: #e0edf4;
  margin-bottom: 2px;
  color: #3e5252;
}
table thead th {
  background-color: rgb(116, 196, 223) !important;
  font-size: 1.2em;
  padding: 10px 0px;
  text-align: center !important;
}
.colPequeno {
  width: 5%;
  text-align: right;
  background-color: rgb(125, 217, 245);
  font-weight: bold;
}
</style>
