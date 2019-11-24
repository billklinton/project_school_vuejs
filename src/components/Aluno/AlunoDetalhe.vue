<template>
  <div v-if="!isLoading">
    <titulo :text="`Aluno: ${aluno.nome}`" :btnVoltar="isEditing">
      <button v-show="!isEditing" class="btn btnEditar" @click="btnEditar()">Editar</button>
    </titulo>
    <table>
      <tbody>
        <tr>
          <td class="colPequeno">Matrícula:</td>
          <td>
            <label>{{ aluno.id }}</label>
          </td>
        </tr>
        <tr>
          <td class="colPequeno">Nome:</td>
          <td>
            <label v-if="!isEditing">{{ aluno.nome }}</label>
            <input v-else v-model="aluno.nome" type="text" />
          </td>
        </tr>
        <tr>
          <td class="colPequeno">Sobrenome:</td>
          <td>
            <label v-if="!isEditing">{{ aluno.sobrenome }}</label>
            <input v-else v-model="aluno.sobrenome" type="text" />
          </td>
        </tr>
        <tr>
          <td class="colPequeno">Data Nascimento:</td>
          <td>
            <label v-if="!isEditing">{{ aluno.dataNasc }}</label>
            <input v-else v-model="aluno.dataNasc" type="text" />
          </td>
        </tr>
        <tr>
          <td class="colPequeno">Professor:</td>
          <td>
            <label v-if="!isEditing">{{ aluno.professor.nome }}</label>
            <select v-else v-model="aluno.professor.id">
              <option
                v-for="(professor, index) in professores"
                :key="index"
                v-bind:value="professor.id"
              >{{ professor.nome }}</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
    <div style="margin-top: 10px">
      <div v-if="isEditing">
        <button class="btn btnSalvar" @click="salvar()">Salvar</button>
        <button class="btn btnCancelar" @click="cancelar()">Cancelar</button>
      </div>
    </div>
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
      professores: [],
      aluno: {},
      id: this.$route.params.aluno_id,
      isEditing: false,
      isLoading: true
    };
  },
  created() {
    this.carregarProfessor();
  },
  methods: {
    carregarProfessor() {
      this.$http
        .get("http://localhost:5000/api/professor")
        .then(res => res.json())
        .then(profs => {
          this.professores = profs;
          this.carregaAluno();
        });
    },
    carregaAluno() {
      this.$http
        .get(`http://localhost:5000/api/aluno/${this.id}`)
        .then(res => res.json())
        .then(aluno => {
          this.aluno = aluno;
          this.isLoading = false;
        });
    },
    btnEditar() {
      this.isEditing = !this.isEditing;
    },
    salvar() {
      let alunoEditado = {
        id: this.aluno.id,
        nome: this.aluno.nome,
        sobrenome: this.aluno.sobrenome,
        dataNasc: this.aluno.dataNasc,
        professorId: this.aluno.professor.id
      };
      this.$http
        .put(`http://localhost:5000/api/aluno/${alunoEditado.id}`, alunoEditado)
        .then(retorno => retorno.json())
        .then(aluno => (this.aluno = aluno));
      this.isEditing = !this.isEditing;
    },
    cancelar() {
      this.isEditing = !this.isEditing;
    }
  }
};
</script>

<style scoped>
.btnEditar {
  float: right;
  background-color: rgb(76, 186, 249);
}

.btnSalvar {
  float: right;
  background-color: rgb(79, 196, 68);
}

.btnCancelar {
  float: left;
  background-color: rgb(249, 186, 92);
}

.colPequeno {
  width: 20%;
}

input,
select {
  margin: 0;
  padding: 5px 10px;
  font-size: 0.9em;
  border: 1px solid silver;
  border-radius: 5px;
  font-family: "Montserrat";
  width: 95%;
  background-color: rgb(245, 245, 245);
}

select {
  width: 100%;
  height: 38px;
}
</style>