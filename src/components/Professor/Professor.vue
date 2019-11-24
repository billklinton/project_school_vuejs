<template>
  <div>
    <Titulo text="Professores" btnVoltar="true"/>
    <table>
      <thead>
        <th>Cód.</th>
        <th>Professor</th>
        <th>Alunos</th>
      </thead>
      <tbody v-if="professores.length">
        <tr v-for="(professor, index) in professores" :key="index">
          <td class="colPequeno" style="text-align: center; width: 15%">{{ professor.id }}</td>
          <router-link
            v-bind:to="`/alunos/${professor.id}`"
            tag="td"
            style="cursor: pointer"
          >{{ professor.nome }}</router-link>
          <td class="colPequeno" style="text-align: center; width: 20%">{{ professor.qtdAlunos }}</td>
        </tr>
      </tbody>
      <tfoot v-else>
        <tr>
          <td colspan="3" style="text-align: center">
            Nenhum Professor encontrado!
          </td>
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
      professores: [],
      alunos: []
    };
  },
  beforeCreate() {
    this.$http
      .get("http://localhost:5000/api/aluno")
      .then(res => res.json())
      .then(alunos => {
        this.alunos = alunos;
        this.carregaProfessores();
      });
  },
  methods: {
    pegarQtdAlunosPorProfessor() {
      this.professores.forEach((professor, index) => {
        professor = {
          id: professor.id,
          nome: professor.nome,
          qtdAlunos: this.alunos.filter(
            aluno => aluno.professor.id == professor.id
          ).length
        };
        this.professores[index] = professor;
      });
    },
    carregaProfessores() {
      this.$http
        .get("http://localhost:5000/api/professor")
        .then(res => res.json())
        .then(profs => {
          this.professores = profs;
          this.pegarQtdAlunosPorProfessor();
        });
    }
  }
};
</script>

<style scoped>
</style>