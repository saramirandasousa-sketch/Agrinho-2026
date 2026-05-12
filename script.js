// Variáveis de estado inicial
let producao = 50;
let ambiente = 50;
let rodadas = 0;

// Elementos da interface (DOM)
const prodText = document.getElementById('prod-val');
const envText = document.getElementById('env-val');
const msgText = document.getElementById('msg');

/**
 * Função principal para atualizar o simulador
 * @param {number} p - Valor a somar/subtrair da Produção
 * @param {number} a - Valor a somar/subtrair do Ambiente
 * @param {string} txt - Mensagem descritiva da ação
 */
function update(p, a, txt) {
    // Incrementa o contador de rodadas
    rodadas++;

    // Aplica os valores e garante que fiquem entre 0 e 100
    producao = Math.min(Math.max(producao + p, 0), 100);
    ambiente = Math.min(Math.max(ambiente + a, 0), 100);

    // Atualiza os números na tela
    prodText.innerText = producao;
    envText.innerText = ambiente;
    
    // Define a cor baseada no desempenho
    updateColors();

    // Mostra o texto da ação
    msgText.innerText = txt;

    // Verifica se houve uma condição especial
    checkStatus();
}

// Muda a cor dos números conforme os valores baixam (alerta visual)
function updateColors() {
    prodText.style.color = producao < 30 ? "#d32f2f" : "#1565c0";
    envText.style.color = ambiente < 30 ? "#d32f2f" : "#2e7d32";
}

function checkStatus() {
    // Vitória: Equilíbrio alto
    if (producao >= 85 && ambiente >= 85) {
        msgText.innerHTML = "<strong>🌟 SAFRA DE OURO!</strong> Você atingiu o equilíbrio perfeito entre lucro e natureza. Exemplo de sustentabilidade!";
        msgText.style.backgroundColor = "#e8f5e9";
    } 
    // Derrota: Desastre ambiental
    else if (ambiente <= 10) {
        msgText.innerHTML = "<strong>❌ CRISE AMBIENTAL:</strong> O solo e a água da fazenda estão exauridos. A produção parou por falta de recursos naturais.";
        lockButtons();
    }
    // Derrota: Falência
    else if (producao <= 10) {
        msgText.innerHTML = "<strong>💸 FALÊNCIA:</strong> Sua produção foi insuficiente para manter a fazenda. O agro precisa ser forte para ser sustentável!";
        lockButtons();
    }
}

// Desabilita os botões quando o jogo acaba
function lockButtons() {
    const buttons = document.querySelectorAll('.options button');
    buttons.forEach(btn => btn.disabled = true);
}

// Reinicia o jogo
function reset() {
    producao = 50;
    ambiente = 50;
    rodadas = 0;
    
    prodText.innerText = producao;
    envText.innerText = ambiente;
    msgText.innerText = "Simulação reiniciada. Escolha sua estratégia!";
    msgText.style.backgroundColor = "#fafafa";
    
    const buttons = document.querySelectorAll('.options button');
    buttons.forEach(btn => btn.disabled = false);
    
    updateColors();
}