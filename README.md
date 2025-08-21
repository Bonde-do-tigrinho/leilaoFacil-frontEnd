<div align="center">
  <img src="./public/next.svg" width="120" alt="Next.js Logo" />
  <img src="./public/globe.svg" width="60" alt="Globe" />
  <img src="./public/file.svg" width="60" alt="File" />
  <img src="./public/window.svg" width="60" alt="Window" />
  <img src="./public/vercel.svg" width="120" alt="Vercel Logo" />
</div>

# Lastrear - Buscador de Imóveis 🏡

![Badge](https://img.shields.io/badge/Next.js-15.5.0-blue?logo=nextdotjs)
![Badge](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react)
![Badge](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC?logo=tailwindcss)
![Badge](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)
![Badge](https://img.shields.io/badge/ESLint-9.0-4B32C3?logo=eslint)

Projeto acadêmico da **FATEC Zona Leste** em parceria com uma empresa imobiliária.

---

## 📌 Descrição

Este repositório contém o código-fonte do frontend do projeto **Lastrear**. Desenvolvido com Next.js, é a interface de usuário para uma plataforma inovadora de busca de imóveis em leilão ou venda direta.

A interface consome dados de uma API externa, que realiza web scraping em sites de grandes instituições financeiras (Caixa, Santander, etc.), exibindo oportunidades de forma clara, organizada e intuitiva.

---

## 🚀 Funcionalidades

- **Dashboard Intuitiva:** Imóveis em destaque logo na página inicial, com informações essenciais.
- **Busca e Filtros Avançados:** Refine por localidade, tipo, valor e outros critérios.
- **Sistema de Favoritos:** Salve imóveis de interesse para fácil acesso e comparação.
- **Página de Detalhes Completa:** Endereço, valor, descrição, fotos e link original.
- **Design Responsivo:** Experiência fluida em desktops e dispositivos móveis.

---

## 📚 Tecnologias Utilizadas

- **Framework:** Next.js
- **UI:** React
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS
- **API:** SWR ou Axios
- **Ambiente:** Node.js
- **Qualidade:** ESLint e Prettier

---

## ⚙️ Como Executar Localmente

### 1. Pré-requisitos
- Node.js (>= 18.17)
- Git
- Gerenciador de pacotes: npm, yarn ou pnpm

### 2. Clone o Repositório
```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio
```

### 3. Instale as Dependências
```bash
npm install # ou yarn install # ou pnpm install
```

### 4. Configure as Variáveis de Ambiente
Crie `.env.local` a partir de `.env.example`:
```bash
cp .env.example .env.local
```
Edite `.env.local` e configure a URL da API:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### 5. Rode o Servidor de Desenvolvimento
```bash
npm run dev
```
Acesse [http://localhost:3000](http://localhost:3000) no navegador.

---

## 🏫 Sobre o Projeto

Este projeto é parte de um trabalho acadêmico da FATEC Zona Leste, em parceria com uma empresa do ramo imobiliário. O objetivo é aplicar conhecimentos técnicos em um contexto real, resolvendo uma dor do mercado.

---

## 📄 Licença

Este projeto é apenas para fins acadêmicos e não possui licença comercial.

---

## 🤝 Contribuição

Sinta-se à vontade para abrir issues e pull requests!
