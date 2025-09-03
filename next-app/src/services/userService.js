import api from './api';

export const ListarUsuario = () =>{
  return api.get('/api/usuario');
}

export const cadastrarUsuario = (dadosUsuarios) => {
    return api.post('/api/usuario', dadosUsuarios);
};

export const atualizarUsuario = (dados) => {
  return api.patch('/api/usuario', dados);
};

export const login = (credentials) => {
    return api.post('/api/usuario/login', credentials);
};

export const trocarSenha = (dados) => {
    return api.patch('/api/usuario', dados)
}

export const adicionarFavorito = (imovelId) => {
    return api.patch(`/api/usuario/favoritos`, { imovelId });
};

export const removerFavorito = (imovelId) => {
    return api.patch(`/api/usuario/favoritos/remover`, { imovelId });
};