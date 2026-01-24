<div align="center">
<h1>🥋 Fight Performance Studio</h1>
<p><strong>Treinamento de Lutas Personalizado | Personal Fight</strong></p>
</div>

---

## 📋 Sobre

**Fight Performance Studio** é uma landing page moderna e responsiva para um serviço de treinamento personalizado de lutas. O site apresenta os serviços de **Personal Fight** com foco em:

- 🥊 Defesa Pessoal
- 💪 Condicionamento Físico
- ⚖️ Emagrecimento
- 🎯 Performance e Técnica

O treinamento é oferecido por **Alisson**, atleta profissional de MMA com:
- ✅ Faixa Preta 2º Dan em Karatê
- ✅ Faixa Marrom em Kickboxing
- ✅ Mais de 10 anos de experiência
- ✅ Experiência internacional (Japão 2019 e 2023)

---

## 🎯 Características

### ✨ Design Moderno
- Interface limpa e intuitiva
- Totalmente responsivo (mobile, tablet, desktop)
- Animações suaves
- Tema em tons vermelho e preto (marca forte)

### 🔧 Tecnologias
- **React 19** - Framework JavaScript
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Styling utilitário
- **Lucide React** - Ícones de alta qualidade
- **Vite** - Bundler rápido

### 📱 Seções
1. **Header** - Navegação fixa com logo e CTA
2. **Hero** - Banner principal com proposta de valor
3. **Authority** - Credibilidades e experiência do treinador
4. **Features** - Benefícios do treino
5. **Process** - Como funciona o atendimento
6. **Audience** - Para quem é o serviço
7. **Footer** - Contato e links

---

## 🚀 Como Rodar Localmente

### Pré-requisitos
- **Node.js** (v18 ou superior)
- **npm** (geralmente vem com Node.js)

### Instalação

1. **Clone ou baixe o projeto**
   ```bash
   cd fight-performance-studio
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Abra no navegador**
   ```
   http://localhost:3000
   ```

---

## 📦 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento (com hot reload) |
| `npm run build` | Compila o projeto para produção |
| `npm run preview` | Visualiza a build de produção localmente |

### Exemplo de uso:

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Testar produção localmente
npm run preview
```

---

## 📁 Estrutura do Projeto

```
fight-performance-studio/
├── components/
│   ├── Authority.tsx      # Seção de autoridade e credibilidades
│   ├── Audience.tsx       # Público-alvo
│   ├── Features.tsx       # Benefícios e diferenciais
│   ├── Footer.tsx         # Rodapé
│   ├── Header.tsx         # Cabeçalho com navegação
│   ├── Hero.tsx           # Seção principal
│   ├── Process.tsx        # Como funciona
│   ├── StickyWhatsApp.tsx # Botão flutuante do WhatsApp
│   └── ui/
│       └── Icons.tsx      # Ícones reutilizáveis
├── App.tsx               # Componente principal
├── constants.ts          # Constantes (links, imagens)
├── index.tsx             # Ponto de entrada
├── index.html            # HTML base
├── vite.config.ts        # Configuração do Vite
├── tsconfig.json         # Configuração TypeScript
├── package.json          # Dependências e scripts
└── README.md             # Este arquivo
```

---

## 🎨 Customização

### Alterar Cores
Edite as cores no `index.html`:
```html
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          brand: {
            red: '#DC2626',    // Cor primária
            dark: '#18181B',   // Fundo escuro
            gray: '#27272A',   // Cinza
            light: '#F4F4F5',  // Cinza claro
          }
        }
      }
    }
  }
</script>
```

### Alterar Textos e Links
Edite o arquivo `constants.ts`:
```typescript
export const WHATSAPP_NUMBER = "5514996190682";
export const INSTAGRAM_LINK = "https://www.instagram.com/alissonmlpereira/";
export const IMAGES = {
  hero: "https://i.imgur.com/RayY6uU.jpeg",
  // ... mais imagens
};
```

### Adicionar Novas Imagens
Atualize as URLs em `constants.ts` com suas próprias imagens.

---

## 📞 Integração com WhatsApp

O site usa a API do WhatsApp Web para facilitar o contato:
- **Botão Flutuante** - Canto inferior direito
- **CTAs** - Espalhados pela página
- **Link**: `https://wa.me/5514996190682?text=Olá!...`

Para mudar o número, edite `constants.ts`:
```typescript
export const WHATSAPP_NUMBER = "SEU_NÚMERO_AQUI";
```

---

## 🌐 Deploy

### Opções de Deploy:
1. **Vercel** (Recomendado para React)
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Netlify**
   - Conecte seu repositório no [Netlify](https://netlify.com)
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **GitHub Pages**
   - Faça build: `npm run build`
   - Faça upload da pasta `dist`

---

## 🔒 Sem Dependências Externas de API

✅ O projeto **não requer nenhuma API key ou serviço externo** para funcionar.

- ❌ Sem Gemini API
- ❌ Sem Firebase
- ❌ Sem banco de dados
- ✅ Totalmente estático e funcional

---

## 📊 Performance

- ⚡ **Build otimizado** com Vite
- 📦 **Bundle pequeno** (~50KB gzipped)
- 🚀 **Fast refresh** durante desenvolvimento
- 📱 **100% Responsivo**

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| React | 19.2.3 | Framework principal |
| TypeScript | 5.8.2 | Tipagem estática |
| Vite | 6.2.0 | Build tool |
| Tailwind CSS | Latest | Estilos |
| Lucide React | 0.563.0 | Ícones |

---

## 📝 Licença

Este projeto é de uso privado/comercial. Todos os direitos reservados © 2026 Fight Performance Studio.

---

## 📧 Contato

- **WhatsApp**: [+55 14 99619-0682](https://wa.me/5514996190682)
- **Instagram**: [@alissonmlpereira](https://www.instagram.com/alissonmlpereira/)
- **Local**: Bauru e região - SP, Brasil

---

<div align="center">
<p><strong>Desenvolvido com ❤️ para Fight Performance Studio</strong></p>
<p>Performance não é improviso. É método. 🥋</p>
</div>
