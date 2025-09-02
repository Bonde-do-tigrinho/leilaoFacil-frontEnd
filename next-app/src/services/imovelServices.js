import api from './api';

export const listarImoveis = () => {
    return api.get('/api/imoveis');
};

export const listarImoveisFavoritos = () =>{
    return api.get('/api/imoveis/favoritos');
}

export const listarBairrosDisponiveis = () => {
    return api.get('/api/imoveis/bairros');
};

export const listarImoveisFiltrados = (filtros) =>{
    return api.post('/api/imoveis/filtros', filtros)
}