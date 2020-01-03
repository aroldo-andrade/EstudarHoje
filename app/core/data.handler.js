const jsonfile = require('jsonfile-promised');
const fs = require('fs');
var mkdirp = require('mkdirp');
const databasePath = __dirname + '/database/EH.json'
const databaseFolder = __dirname + '/database'
const TRY_CRIAR_ARQUIVO_MAX_COUNT = 5
let tryCriarArquivoCount = 0
module.exports = {

    salvaDados(obj, callback) {
        if (fs.existsSync(databasePath)) {
            tryCriarArquivoCount = 0;
            jsonfile.writeFile(databasePath, obj, { spaces: 2 })
                .then(x => {
                    if (callback)
                        callback()
                })

        } else {
            tryCriarArquivoCount++
            if (tryCriarArquivoCount < TRY_CRIAR_ARQUIVO_MAX_COUNT)
                this.criaArquivo().then(x => {
                    salvaDados(curso, tempoEstudado)
                })
        }
    },
    criaArquivo() {
        return new Promise((accept, reject) => {

            let database = {
                segunda: '', terca: '',
                quarta: '', quinta: '',
                sexta: '', sabado: '',
                domingo: ''
            }
            mkdirp(databaseFolder, (err) => {
                if (err) {
                    alert(err);
                    reject(err)
                }
                jsonfile.writeFile(databasePath, database, { spaces: 2 })
                    .then(x => {
                        accept(x)
                    })
                    .catch(erro => {
                        alert(erro)
                        reject(erro)
                    })
            });

        })
    },
    pegaDados() {
        return new Promise((acc, rej) => {

            jsonfile.readFile(databasePath).then(data => {
                tryCriarArquivoCount = 0;
                acc(data)
            }).catch(erro => {
                tryCriarArquivoCount++
                if (tryCriarArquivoCount < TRY_CRIAR_ARQUIVO_MAX_COUNT)
                    this.criaArquivo().then(x => {
                        this.pegaDados()
                    })
                else
                    rej(erro)
            });

        })

    },

}