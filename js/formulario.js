import { abrirModalConfirmacao } from './modal.js';
function mostrarErro(input, mensagem) {
    input.classList.add('input-error');
    const span = document.createElement('span');
    span.className = 'msg-error';
    span.textContent = mensagem;
    input.parentElement.appendChild(span);
}

function limparErros() {
    document.querySelectorAll('.msg-error').forEach(el => el.remove());
    document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
}

export function configurarFormulario() {
    const form = document.getElementById('formCadastro');
    
    if (form) {
        const dadosGuardados = localStorage.getItem('dadosVoluntario');
        const telefoneInput = document.getElementById('telefone');
        
        if (dadosGuardados) {
            const dadosConvertidos = JSON.parse(dadosGuardados);
            if (dadosConvertidos.nome) document.getElementById('nome').value = dadosConvertidos.nome;
            if (dadosConvertidos.email) document.getElementById('email').value = dadosConvertidos.email;
            if (dadosConvertidos.telefone) telefoneInput.value = dadosConvertidos.telefone;
        }

        telefoneInput.addEventListener('input', function(e) {
            let valor = e.target.value.replace(/\D/g, '');
            if (valor.length > 11) valor = valor.slice(0, 11);
            valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
            valor = valor.replace(/(\d)(\d{4})$/, '$1-$2');
            e.target.value = valor;
        });

        form.addEventListener('submit', function(evento) {
            evento.preventDefault(); 
            limparErros();
            
            const nomeInput = document.getElementById('nome');
            const emailInput = document.getElementById('email');
            
            const nome = nomeInput.value.trim();
            const email = emailInput.value.trim();
            const telefone = telefoneInput.value.trim();
            
            let formValido = true;
            
            const regexNome = /^[a-zA-ZÀ-ÿ]+\s+[a-zA-ZÀ-ÿ]+/;
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const regexTelefone = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
            
            if (nome === '') {
                mostrarErro(nomeInput, 'O nome é obrigatório.');
                formValido = false;
            } else if (!regexNome.test(nome)) {
                mostrarErro(nomeInput, 'Digite seu nome completo (nome e sobrenome).');
                formValido = false;
            }
            
            if (email === '') {
                mostrarErro(emailInput, 'O e-mail é obrigatório.');
                formValido = false;
            } else if (!regexEmail.test(email)) {
                mostrarErro(emailInput, 'Digite um e-mail válido.');
                formValido = false;
            }
            
            if (telefone !== '' && !regexTelefone.test(telefone)) {
                mostrarErro(telefoneInput, 'Use o formato (00) 00000-0000.');
                formValido = false;
            }
            
            if (!formValido) return;
            
            const dadosVoluntario = {
                nome: nome,
                email: email,
                telefone: telefone
            };
            
            localStorage.setItem('dadosVoluntario', JSON.stringify(dadosVoluntario));
            abrirModalConfirmacao();
            window.location.hash = 'modalConfirmacao';
        });
    }
}