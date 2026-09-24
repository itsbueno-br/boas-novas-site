document.addEventListener('DOMContentLoaded', () => {
    // URL centralizada da API
    const API_URL = 'http://localhost:8080/api/contato';

    const formContato = document.getElementById('form-contato');
    const feedbackMsg = document.getElementById('feedback-mensagem');
    const btnEnviar = document.getElementById('btn-enviar');

    formContato.addEventListener('submit', async (event) => {
        event.preventDefault();

        // 1. Limpeza de espaços em branco nas extremidades
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();

        // 2. Validação de campos obrigatórios
        if (!nome || !email || !mensagem) {
            feedbackMsg.textContent = 'Por favor, preencha todos os campos.';
            feedbackMsg.className = 'erro';
            return;
        }

        // 3. Validação do formato de e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            feedbackMsg.textContent = 'Por favor, insira um e-mail válido.';
            feedbackMsg.className = 'erro';
            return;
        }

        // Desabilita o botão e exibe estado de envio
        btnEnviar.disabled = true;
        btnEnviar.textContent = 'Enviando...';
        feedbackMsg.textContent = '';
        feedbackMsg.className = '';

        const dadosFormulario = { nome, email, mensagem };

        try {
            // Requisição para a API
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosFormulario)
            });

            if (response.ok) {
                feedbackMsg.textContent = 'Mensagem enviada com sucesso!';
                feedbackMsg.className = 'sucesso';
                formContato.reset();
            } else {
                const erroTexto = await response.text();
                feedbackMsg.textContent = 'Erro ao enviar: ' + erroTexto;
                feedbackMsg.className = 'erro';
            }
        } catch (error) {
            feedbackMsg.textContent = 'Erro de conexão com o servidor backend.';
            feedbackMsg.className = 'erro';
            console.error('Erro na requisição:', error);
        } finally {
            // Reabilita o botão de envio
            btnEnviar.disabled = false;
            btnEnviar.textContent = 'Enviar Mensagem';
        }
    });
});