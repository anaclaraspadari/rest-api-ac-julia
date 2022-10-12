const livros = [];

class LivrosRepository {
    constructor() {

    }

    save(ex) {
        livros.push(ex);
    }

    random() {
        let randomIdx = Math.floor( Math.random()*livros.length);
        return livros[randomIdx];
    }

    detail(id) {
        const ex = livros.find(e => e.id == id);
        return ex;
    }

    list(disciplina) {
        const lista = livros.filter(e => e.disciplina == disciplina);
        return lista;
    }
}

module.exports = LivrosRepository;