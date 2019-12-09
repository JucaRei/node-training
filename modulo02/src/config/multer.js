/* Configuração da parte de upload de arquivos */

import multer from 'multer';
import crypto from 'crypto'; // biblioteca que vem por padrão no node, para gerar caracteres aleátorios
import { extname, resolve } from 'path';
/* importado do próprio node
extname - retorna baseado no nome de uma imagem ou um arquivo, qual que é a extensão
resolve - percorrer um proprio caminho dentro da aplicação
*/

export default {
  // como o multer vai guardar os arquivos de imagem
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'), // caminho ate a pasta uploads
    filename: (req, file, callback) => {
      // como vai formatar o arquivo do nome de imagem (vai adicionar um código unico)
      crypto.randomBytes(16, (err, res) => {
        if (err) return callback(err);

        // hex - tranforma em hexadecimal  |  us1838405.png
        return callback(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
