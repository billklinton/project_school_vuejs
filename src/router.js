import Vue from 'vue';
import Router from 'vue-router';
import Alunos from "./components/Aluno/Alunos.vue";
import AlunoDetalhe from "./components/Aluno/AlunoDetalhe.vue";
import Professor from "./components/Professor/Professor.vue";
import Sobre from "./components/Sobre/Sobre.vue";

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/professores',
            name: 'Professores',
            component: Professor
        },
        {
            path: '/alunos/:prof_id',
            name: 'Alunos',
            component: Alunos
        },
        {
            path: '/todosalunos',
            name: 'Alunos',
            component: Alunos
        },
        {
            path: '/alunoDetalhe/:aluno_id',
            name: 'AlunoDetalhe',
            component: AlunoDetalhe
        },
        {
            path: '/alunos/alunoDetalhe/:aluno_id',
            name: 'AlunoDetalhe',
            component: AlunoDetalhe
        },
        {
            path: '/sobre',
            name: 'Sobre',
            component: Sobre
        }
    ]
})