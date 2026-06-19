# Briefing Parametrizado - Wee Make

Formulário interativo para gerar briefings parametrizados de chatbot WhatsApp com **Omnacoes**.

## 📋 Sobre

Este projeto é uma aplicação React que facilita o mapeamento de informações de empresas para a criação de chatbots WhatsApp inteligentes. O formulário coleta dados sobre:

- Identidade da empresa
- Tom de voz e valores
- Produtos e serviços
- Configuração de pricing
- Conhecimentos específicos
- Restrições e guidelines
- Configurações do chatbot
- Preferências de agendamento

A saída é gerada automaticamente em **8 blocos de texto plano** prontos para serem copiados diretamente nos campos de configuração da plataforma Omnacoes.

## 🎨 Design

- **Paleta**: Roxo Wee Make (#7C3AED) + Magenta (#EC4899)
- **Tipografia**: Inter
- **Framework CSS**: Tailwind CSS
- **Responsivo**: Mobile-first, otimizado para desktop

## 🚀 Setup Local

### Pré-requisitos
- Node.js 14+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/wee-make-briefing-form.git
cd wee-make-briefing-form

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm start
```

A aplicação abrirá automaticamente em `http://localhost:3000`.

## 📦 Build para Produção

```bash
npm run build
```

Isso criará uma pasta `build/` otimizada pronta para deploy.

## 📁 Estrutura de Pastas

```
wee-make-briefing-form/
├── public/
│   ├── index.html
├── src/
│   ├── components/
│   │   └── WeeMakeForm.jsx
│   ├── hooks/
│   │   └── useSupabaseBriefing.js
│   ├── services/
│   │   └── supabaseService.js
│   ├── index.css
│   └── index.js
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── .gitignore
└── README.md
```

## 🔧 Tecnologias

- **React 18** - UI library
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **React Scripts** - Build tool

## 📝 Como Usar

1. Preencha o formulário com as informações da sua empresa
2. Veja a prévia dos 8 blocos em tempo real no painel lateral
3. Clique em **"Exportar para Omnacoes"** para baixar um arquivo `.txt`
4. Abra o arquivo e copie cada bloco para seu campo correspondente em Omnacoes:
   - **Bloco 1** → Role Definition
   - **Bloco 2** → About Company, Products and Services
   - **Bloco 3** → Conversation Tone
   - **Bloco 4** → Knowledge Base Guidelines
   - **Bloco 5** → Hallucination Control
   - **Bloco 6** → Human Escalation
   - **Bloco 7** → Relevant Links
   - **Bloco 8** → Interaction Examples

## 🎯 Campos Principais

### Seção 1: Identidade
- Nome da empresa
- Segmento/indústria
- Descrição breve

### Seção 2: Tom de Voz
- Tom principal (Formal, Descontraído, Técnico, Consultivo, Misto)
- Personalidade da marca (até 5 opções)
- Valores principais
- Frases representativas

### Seção 3: Produtos & Serviços
- Lista de produtos/serviços
- Produto/serviço estrela
- Detalhes importantes

### Seção 4: Pricing (condicional)
- Estratégia de preço
- Faixas de preço
- Parcelamento

### Seção 5: Conhecimentos Específicos
- Cliente ideal
- Integrações
- Sazonalidade
- Histórias de sucesso

### Seção 6: Concorrência & Restrições
- Concorrentes
- Diferencial competitivo
- Tópicos proibidos
- Palavras a evitar

### Seção 7: Configuração do Chatbot
- Mostrar preços?
- Oferecer agendamento?
- Coletar leads?
- Escalar para humano?
- Velocidade de resposta

### Seção 8: Agendamento (condicional)
- Ferramenta de agendamento
- Link para agendamento
- Horários disponíveis

### Seção 9: Informações Adicionais
- Informações extras
- Melhor forma de contato

## 📊 Limites de Caracteres

Cada bloco gerado respeita os limites da plataforma Omnacoes:

- Role Definition: 5.000 caracteres
- About Company: 10.000 caracteres
- Conversation Tone: 5.000 caracteres
- Knowledge Base Guidelines: 5.000 caracteres
- Hallucination Control: 5.000 caracteres
- Human Escalation: 5.000 caracteres
- Relevant Links: 5.000 caracteres
- Interaction Examples: 5.000 caracteres

## 🔄 Exemplos Dinâmicos

O formulário mostra exemplos genéricos e **específicos por segmento** em cada pergunta. Quando você seleciona um segmento (SaaS, E-commerce, Serviços, etc), os exemplos se atualizam automaticamente para ser mais relevantes.

## 🎁 Features

✅ Formulário adaptativo com campos condicionais  
✅ Preview em tempo real dos 8 blocos  
✅ Exportação automática para `.txt`  
✅ Exemplos genéricos + por segmento  
✅ Validação de limites de caracteres  
✅ Design responsivo (mobile + desktop)  
✅ Paleta Wee Make com Tailwind CSS  
✅ Tipografia Inter  

## 📱 Responsividade

- **Mobile (< 768px)**: Layout com 1 coluna, preview abaixo
- **Tablet (768px - 1024px)**: Layout com 2 colunas, preview ao lado
- **Desktop (> 1024px)**: Layout com 3 colunas, preview sticky

## 🤝 Contribuindo

Sugestões e pull requests são bem-vindos! Por favor:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

Desenvolvido para **Wee Make** - Automação de WhatsApp com IA

## 📞 Suporte

Para dúvidas ou problemas, entre em contato através:
- 📧 Email: contato@weemake.com.br
- 🌐 Website: https://weemake.com.br
- 💬 WhatsApp: [Seu WhatsApp]

---

**Versão**: 1.0.0  
**Última atualização**: 2024
