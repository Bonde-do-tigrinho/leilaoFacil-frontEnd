import api from './api';

export const getImoveis = () => {
    return api.get('/api/imoveis');
};

export const cadastrarUsuario = (dadosUsuarios) => {
      // dadosUsuario deve ser um objeto, ex: { nome, email, senha }
    return api.post('/api/usuarios', dadosUsuarios);
};

export const login = (credentials) => {
      // credenciais deve ser um objeto, ex: { email, senha }
    return api.post('/api/auth/login', credentials);
};

export const trocarSenha = (dados) => {
      // dados deve ser um objeto, ex: { email, novaSenha }
    return api.patch('/api/usuario', dados)
}