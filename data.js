const jsonfile = require('jsonfile-promised');
const fs = require('fs');

module.exports = {
    salvarDados(curso, tempoEstudado) {
        let arquivoDoCurso = `${__dirname}\\data\\${curso}.json`;
        if (fs.existsSync(arquivoDoCurso)) {
            this.adicionaTempoAoCurso(arquivoDoCurso, tempoEstudado);
        } else {
            this.criarArquivoDeCurso(arquivoDoCurso, {}).then(() => {
                this.adicionaTempoAoCurso(arquivoDoCurso, tempoEstudado);
            });
        }
    },
    adicionaTempoAoCurso(arquivoCurso, tempoEstudado) {
        let dados = {
            ultimoEstudo: new Date().toString(),
            tempo: tempoEstudado
        }
        jsonfile.writeFile(arquivoCurso, dados, { spaces: 2 })
            .then(() => console.log('Tempo salvo com sucesso'))
            .catch(error => console.log(error));
    },
    criarArquivoDeCurso(nomeArquivo, conteudoArquivo) {
        return jsonfile.writeFile(nomeArquivo, conteudoArquivo)
            .then(() => console.log('Arquivo criado'))
            .catch(error => console.log('Erro ao criar arquivo', error));

    },
    pegaDados(curso) {
        let arquivoDoCurso = `${__dirname}\\data\\${curso}.json`;
        return jsonfile.readFile(arquivoDoCurso);

    }
}