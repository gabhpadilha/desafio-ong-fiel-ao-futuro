// modal.js
export function abrirModalConfirmacao({ substituir = false } = {}) {
    // Se o hash já for #modalConfirmacao, atribuí-lo de novo é ignorado.
    // replaceState troca o fragmento sem navegar nem disparar hashchange,
    // garantindo que a próxima atribuição seja uma mudança real.
    history.replaceState(null, '', '#cadastro');

    if (substituir) {
        window.location.replace('#modalConfirmacao'); // F5: não empilha entrada no histórico
    } else {
        window.location.hash = 'modalConfirmacao';    // submit: "Voltar" fecha o modal
    }
}