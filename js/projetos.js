import { dadosProjetos } from './dados.js';

export function renderizarProjetos() {
    const grid = document.getElementById('grid-projetos');
    
    if (grid) {
        const cartoesHTML = dadosProjetos.map(projeto => `
            <article class="project-card" data-aos="fade-up">
                <img src="${projeto.imagem}" alt="${projeto.titulo}">
                <h3>${projeto.titulo}</h3>
                <p>${projeto.descricao}</p>
            </article>
        `).join(''); 
        
        grid.innerHTML = cartoesHTML;
    }
}