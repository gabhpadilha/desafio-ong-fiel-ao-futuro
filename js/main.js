import { renderizarProjetos } from './projetos.js';
import { configurarFormulario } from './formulario.js';
import { abrirModalConfirmacao } from './modal.js';

const app = document.getElementById('app');
const rotasValidas = ['inicio', 'projetos', 'cadastro'];

// Estados/âncoras que pertencem a uma página, sem serem rotas próprias
const ancorasDePagina = {
    modalConfirmacao: 'cadastro'
};

let rotaAtual = null; // guarda qual página está atualmente no DOM

function resolverRota() {
    const hash = window.location.hash.substring(1) || 'inicio';
    return ancorasDePagina[hash] || hash;
}

function carregarRota() {
    const rota = resolverRota();

    if (!rotasValidas.includes(rota)) return;

    // Já estamos nessa página: não refaz o fetch nem destrói o DOM
    if (rota === rotaAtual) return;
     else if (rota === 'cadastro') {
    configurarFormulario();

    // F5 (ou Voltar/Avançar) com o modal na URL: reaplica o :target no conteúdo recém-injetado
    if (window.location.hash === '#modalConfirmacao') {
        abrirModalConfirmacao({ substituir: true });
    }
}

    rotaAtual = rota;

    fetch(`html/${rota}.html`)
        .then(resposta => {
            if (!resposta.ok) throw new Error('Erro na requisição');
            return resposta.text();
        })
        .then(html => {
            // Evita race condition: se o usuário já mudou de rota, descarta
            if (rota !== rotaAtual) return;
            
            app.innerHTML = html;

            if (rota === 'projetos') {
                renderizarProjetos();
            } else if (rota === 'cadastro') {
                configurarFormulario();
            }

            if (typeof AOS !== 'undefined') {
                AOS.init({ once: true });
            }
        })
        .catch(() => {
            rotaAtual = null; // permite tentar de novo
            app.innerHTML = '<h2 style="text-align:center; padding: 40px;">Página não encontrada.</h2>';
        });
}

window.addEventListener('hashchange', carregarRota);
window.addEventListener('load', carregarRota);