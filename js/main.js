// Telas de cada projeto. A primeira é a imagem principal (fixa no HTML, data-indice="0");
// as demais viram miniaturas. Cada imagem tem uma versão "-thumb" em assets/img.
// tipo: 'desktop' ou 'celular' define em qual grade a miniatura aparece.
const galerias = {
    encontrei: [
        {
            nome: 'encontrei-home',
            tipo: 'desktop',
            alt: 'Página inicial do Encontrei para Você com busca, categorias populares e destaque de produtos',
            legenda: 'Página inicial: busca com atalhos para as categorias mais procuradas.',
        },
        {
            nome: 'encontrei-ofertas',
            tipo: 'desktop',
            alt: 'Grade de ofertas com opções de ordenação e selos de desconto',
            legenda: 'Lista de ofertas, ordenada por mais recente, menor preço ou maior desconto.',
        },
        {
            nome: 'encontrei-filtros',
            tipo: 'desktop',
            alt: 'Lista de ofertas com painel lateral de filtros por categoria, loja, preço e desconto',
            legenda: 'Filtros por categoria, loja, faixa de preço e desconto mínimo.',
        },
        {
            nome: 'encontrei-favoritos',
            tipo: 'desktop',
            alt: 'Página de favoritos mostrando o total que o usuário vai economizar',
            legenda: 'Favoritos: soma quanto o usuário economiza nas ofertas salvas.',
        },
        {
            nome: 'encontrei-produto',
            tipo: 'desktop',
            alt: 'Página de produto com galeria de fotos, preço, valor no PIX e botão para a loja',
            legenda: 'Página do produto: galeria de fotos, preço no PIX e parcelado, e link para a loja.',
        },
        {
            nome: 'encontrei-admin-ofertas',
            tipo: 'desktop',
            alt: 'Tabela de ofertas no painel admin com loja, categoria, preço, status, destaque e cliques',
            legenda: 'Painel admin: ofertas cadastradas, com busca, filtros, destaque, cliques e ações.',
        },
        {
            nome: 'encontrei-nova-oferta',
            tipo: 'desktop',
            alt: 'Formulário de nova oferta em 4 etapas com prévia do card ao lado',
            legenda: 'Cadastro de oferta em 4 etapas, com prévia do card atualizada enquanto o admin preenche.',
        },
        {
            nome: 'encontrei-dashboard',
            tipo: 'desktop',
            alt: 'Dashboard do painel admin com métricas e gráfico de ofertas cadastradas',
            legenda: 'Dashboard do painel admin: ofertas, categorias, lojas e cliques, lidos do banco.',
        },
        {
            nome: 'encontrei-admin-categorias',
            tipo: 'desktop',
            alt: 'Lista de categorias no painel admin com ordem, proporção de ofertas, cliques e status',
            legenda: 'Categorias: reordenação por arrastar, ativação e quantidade de ofertas e cliques.',
        },
        {
            nome: 'encontrei-admin-lojas',
            tipo: 'desktop',
            alt: 'Lista de lojas parceiras no painel admin com descrição, data de cadastro, ofertas e cliques',
            legenda: 'Lojas parceiras: link de afiliado, ordem de exibição e desempenho de cada loja.',
        },
        {
            nome: 'encontrei-mobile-home',
            tipo: 'celular',
            alt: 'Página inicial do site no celular, com busca e barra de navegação inferior',
            legenda: 'Página inicial no celular, com navegação pela barra inferior.',
        },
        {
            nome: 'encontrei-mobile-ofertas',
            tipo: 'celular',
            alt: 'Lista de ofertas no celular em duas colunas',
            legenda: 'Lista de ofertas no celular.',
        },
        {
            nome: 'encontrei-mobile-menu',
            tipo: 'celular',
            alt: 'Menu lateral aberto no celular com links e lista de categorias',
            legenda: 'Menu lateral no celular, com acesso às categorias.',
        },
        {
            nome: 'encontrei-mobile-favoritos',
            tipo: 'celular',
            alt: 'Página de favoritos no celular com o total economizado',
            legenda: 'Favoritos no celular.',
        },
    ],
};

const visor = document.querySelector('.visor');
const visorImagem = visor.querySelector('.visor__imagem');
const visorLegenda = visor.querySelector('.visor__legenda');
const visorContador = visor.querySelector('.visor__contador');

let galeriaAtual = [];
let indiceAtual = 0;

function mostrar(indice) {
    indiceAtual = (indice + galeriaAtual.length) % galeriaAtual.length;
    const tela = galeriaAtual[indiceAtual];
    visorImagem.src = `assets/img/${tela.nome}.webp`;
    visorImagem.alt = tela.alt;
    visorLegenda.textContent = tela.legenda;
    visorContador.textContent = `${indiceAtual + 1} de ${galeriaAtual.length}`;
}

// Monta as miniaturas (todas menos a primeira, que é a imagem principal)
document.querySelectorAll('[data-miniaturas]').forEach((galeria) => {
    const id = galeria.dataset.miniaturas;
    galerias[id].forEach((tela, indice) => {
        if (indice === 0) return;
        const [largura, altura] = tela.tipo === 'celular' ? [240, 520] : [480, 229];
        galeria.querySelector(`[data-tipo="${tela.tipo}"]`).insertAdjacentHTML(
            'beforeend',
            `<li>
                <button type="button" data-galeria="${id}" data-indice="${indice}"
                    aria-label="Ampliar: ${tela.legenda}">
                    <img src="assets/img/${tela.nome}-thumb.webp" width="${largura}" height="${altura}"
                        alt="" loading="lazy">
                </button>
            </li>`,
        );
    });

    // Mostra só as primeiras miniaturas; o botão abre e fecha as demais
    const visiveis = 3;
    const extras = [...galeria.querySelectorAll('li')].slice(visiveis);
    const grades = galeria.querySelectorAll('.galeria__grade');
    const botaoMais = galeria.querySelector('.galeria__mais');
    if (!extras.length) return;

    function alternar(aberta) {
        extras.forEach((item) => (item.hidden = !aberta));
        // Esconde a grade inteira quando todas as miniaturas dela estão fechadas
        grades.forEach((grade) => (grade.hidden = ![...grade.children].some((item) => !item.hidden)));
        botaoMais.setAttribute('aria-expanded', aberta);
        botaoMais.textContent = aberta ? 'Mostrar menos' : `Ver mais ${extras.length} telas`;
    }

    botaoMais.hidden = false;
    botaoMais.addEventListener('click', () => alternar(botaoMais.getAttribute('aria-expanded') !== 'true'));
    alternar(false);
});

document.querySelectorAll('[data-galeria]').forEach((botao) => {
    botao.addEventListener('click', () => {
        galeriaAtual = galerias[botao.dataset.galeria];
        mostrar(Number(botao.dataset.indice));
        visor.showModal();
    });
});

visor.addEventListener('click', (evento) => {
    const acao = evento.target.closest('[data-visor]')?.dataset.visor;
    if (acao === 'anterior') mostrar(indiceAtual - 1);
    if (acao === 'proxima') mostrar(indiceAtual + 1);
    if (acao === 'fechar') visor.close();

    // Clique fora da imagem (no fundo escurecido) fecha o visor
    if (evento.target === visor) visor.close();
});

visor.addEventListener('keydown', (evento) => {
    if (evento.key === 'ArrowLeft') mostrar(indiceAtual - 1);
    if (evento.key === 'ArrowRight') mostrar(indiceAtual + 1);
});

// Copiar e-mail
document.querySelectorAll('[data-copiar]').forEach((botao) => {
    const rotulo = botao.textContent;
    botao.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(botao.dataset.copiar);
            botao.textContent = 'Copiado';
        } catch {
            botao.textContent = 'Não foi possível copiar';
        }
        setTimeout(() => (botao.textContent = rotulo), 2000);
    });
});

document.querySelector('[data-ano]').textContent = new Date().getFullYear();

// Tema claro/escuro: segue o sistema até o visitante escolher; a escolha fica salva neste navegador
const raiz = document.documentElement;
const botaoTema = document.querySelector('.tema');
const sistemaEscuro = window.matchMedia('(prefers-color-scheme: dark)');
const corDaBarra = document.querySelector('meta[name="theme-color"]');

function temaAtual() {
    return raiz.dataset.theme || (sistemaEscuro.matches ? 'dark' : 'light');
}

function atualizarBotaoTema() {
    const tema = temaAtual();
    botaoTema.dataset.tema = tema;
    botaoTema.setAttribute('aria-label', tema === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro');
    corDaBarra.content = tema === 'dark' ? '#0C1210' : '#EEF1EE';
}

botaoTema.addEventListener('click', () => {
    const novo = temaAtual() === 'dark' ? 'light' : 'dark';
    raiz.dataset.theme = novo;
    try {
        localStorage.setItem('tema', novo);
    } catch {
        // Sem armazenamento (ex.: janela anônima): o tema vale só até fechar a página
    }
    atualizarBotaoTema();
});

sistemaEscuro.addEventListener('change', atualizarBotaoTema);
atualizarBotaoTema();
