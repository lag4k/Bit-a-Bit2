/* Bit a Bit – JavaScript opcional */

// 1) Menu hambúrguer (celular)
const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');
menuBtn.addEventListener('click', () => {
  const aberto = menu.classList.toggle('aberto');
  menuBtn.setAttribute('aria-expanded', aberto);
});

// 2) Modo escuro com memória da escolha
const temaBtn = document.getElementById('temaBtn');
function aplicarTema(tema) {
  document.documentElement.dataset.theme = tema;
  temaBtn.textContent = tema === 'dark' ? 'Modo claro' : 'Modo escuro';
}
let temaSalvo = 'light';
try { temaSalvo = localStorage.getItem('tema') || 'light'; } catch (e) {}
aplicarTema(temaSalvo);
temaBtn.addEventListener('click', () => {
  const novo = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  aplicarTema(novo);
  try { localStorage.setItem('tema', novo); } catch (e) {}
});

// 3) Código "digitando" na página inicial
const alvo = document.getElementById('digitando');
if (alvo && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const texto = alvo.dataset.texto;
  alvo.textContent = '';
  let i = 0;
  const timer = setInterval(() => {
    alvo.textContent += texto[i++];
    if (i >= texto.length) clearInterval(timer);
  }, 45);
}

// 4) Filtro de tutoriais por nível
const filtros = document.querySelectorAll('.filtro');
const tutoriais = document.querySelectorAll('.tut');
filtros.forEach(botao => {
  botao.addEventListener('click', () => {
    filtros.forEach(b => b.classList.remove('ativo'));
    botao.classList.add('ativo');
    const nivel = botao.dataset.filtro;
    tutoriais.forEach(t => { t.hidden = nivel !== 'todos' && t.dataset.nivel !== nivel; });
  });
});

// 5) Validação do formulário de contato
const form = document.getElementById('formContato');
if (form) {
  const regras = {
    nome: v => v.trim().length >= 3 ? '' : 'Digite seu nome com pelo menos 3 letras.',
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Digite um e-mail válido, como nome@exemplo.com.',
    msg: v => v.trim().length >= 10 ? '' : 'A mensagem precisa ter pelo menos 10 caracteres.'
  };
  form.addEventListener('submit', e => {
    e.preventDefault();
    let valido = true;
    for (const campo in regras) {
      const input = form.elements[campo];
      const erro = regras[campo](input.value);
      document.getElementById('erro-' + campo).textContent = erro;
      input.classList.toggle('invalido', Boolean(erro));
      if (erro) valido = false;
    }
    const ok = document.getElementById('okForm');
    ok.textContent = valido ? 'Mensagem enviada! (simulação, nada foi enviado de verdade)' : '';
    if (valido) form.reset();
  });
}
