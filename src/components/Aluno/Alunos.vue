<template>
  <div class="hello">
    <Titulo :text="professorid != undefined ? 'Professor: ' + professor.nome : 'Todos os alunos'" btnVoltar="true"/>
    <div v-if="professorid != undefined">
      <input type="text" placeholder="Nome de Aluno" v-model="nome" v-on:keyup.enter="addAluno()" />
      <button class="btn btnInput" @click="addAluno()">Adicionar</button>
    </div>
    <table>
      <thead>
        <th>Mat.</th>
        <th>Aluno</th>
        <th>Opções</th>
      </thead>
      <tbody v-if="alunos.length">
        <tr v-for="(aluno, index) in alunos" :key="index">
          <td class="colPequeno">{{ aluno.id }}</td>
          <router-link
            tag="td"
            :to="`alunoDetalhe/${aluno.id}`"
            style="cursor: pointer"
          >{{ aluno.nome }} {{aluno.sobrenome }}</router-link>
          <td>
            <button class="btn btn_Danger" @click="removerAluno(aluno)">Remover</button>
          </td>
        </tr>
      </tbody>
      <tfoot v-else>
        <tr>
          <td colspan="3" style="text-align: center">Nenhum Aluno encontrado!</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
<script>
import Titulo from "../_shared/Titulo.vue";

export default {
  components: {
    Titulo
  },
  data() {
    return {
      title: "Aluno",
      professorid: this.$route.params.prof_id,
      professor: {},
      nome: "",
      alunos: []
    };
  },
  created() {
    if (this.professorid) {
      this.carregaProfessores();
      this.$http
        .get(`http://localhost:5000/api/aluno/ByProfessor/${this.professorid}`)
        .then(res => res.json())
        .then(alunos => (this.alunos = alunos));
    } else {
      this.$http
        .get("http://localhost:5000/api/aluno")
        .then(res => res.json())
        .then(alunos => (this.alunos = alunos));
    }
  },
  props: {},
  methods: {
    addAluno() {
      let _aluno = {
        nome: this.nome,
        sobrenome: "",
        professorId: this.professor.id,
        dataNasc: ""
      };

      this.$http
        .post("http://localhost:5000/api/aluno", _aluno)
        .then(res => res.json())
        .then(aluno => {
          this.alunos.push(aluno);
          this.nome = "";
        });
    },
    removerAluno(aluno) {
      this.$http
        .delete(`http://localhost:5000/api/aluno/${aluno.id}`)
        .then(() => {
          let indice = this.alunos.indexOf(aluno);
          this.alunos.splice(indice, 1);
        });
    },
    carregaProfessores() {
      this.$http
        .get(`http://localhost:5000/api/professor/${this.professorid}`)
        .then(res => res.json())
        .then(prof => {
          this.professor = prof;
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
  width: calc(100% - 195px);
  border: 0;
  padding: 20px;
  font-size: 1.3em;
  color: #687f7f;
  display: inline;
}

.btnInput {
  width: 150px;
  border: 0;
  padding: 20px;
  font-size: 1.3em;
  display: inline;
  background-color: rgb(116, 115, 115);
}

.btnInput:hover {
  padding: 20px;
  margin: 0px;
  border: 0px;
}
</style>
