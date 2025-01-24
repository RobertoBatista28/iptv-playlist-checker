# IPTV Playlist Checker
Script to check and validate IPTV playlists, including channel verification.

---

## 🌐 Languages
- [Português](#iptv-playlist-checker---português)
- [English](#iptv-playlist-checker---english)

---

## IPTV Playlist Checker - Português
> Um script para verificar o estado de playlists IPTV e confirmar se contêm os canais desejados.

### ⚡ Funcionalidades
- Verifica se playlists IPTV estão ativas.
- Confirma a presença de canais específicos nas playlists.
- Copia automaticamente links válidos para a área de transferência.
- Gera um relatório com as playlists válidas.

### 🛠️ Tecnologias Utilizadas
- **Node.js**: Para execução do script.
- **Axios**: Para requisições HTTP.
- **Chalk**: Para realçar mensagens no terminal.
- **Readline**: Para interação com o usuário.
- **Filesystem (fs)**: Para salvar relatórios.

### 📦 Instalação
1. Certifique-se de ter o **Node.js** instalado.
2. Clone o repositório:
   ```bash
   git clone https://github.com/RobertoBatista28/iptv-playlist-checker.git
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```

## 🚀 Como Usar
1. Edite o script para adicionar as URLs das playlists em **const playlistUrls** e adicionar os canais pretendidos obter das playlists em **const desiredChannel**.
2. Execute o script:
  ```bash
  node index.js
  ```
3. Os links válidos serão salvos em um ficheiro chamado **valid_playlists.txt**.

---

## IPTV Playlist Checker - English  
> A script to verify the status of IPTV playlists and check if they contain the desired channels.  

### ⚡ Features  
- Checks if IPTV playlists are active.  
- Confirms the presence of specific channels in the playlists.  
- Automatically copies valid links to the clipboard.  
- Generates a report with valid playlists.  

### 🛠️ Technologies Used  
- **Node.js**: To run the script.  
- **Axios**: For HTTP requests.  
- **Chalk**: To highlight messages in the terminal.  
- **Readline**: For user interaction.  
- **Filesystem (fs)**: To save reports.  

### 📦 Installation  
1. Make sure you have **Node.js** installed.  
2. Clone the repository:  
   ```bash  
   git clone https://github.com/RobertoBatista28/iptv-playlist-checker.git  
   ```  
3. Install dependencies:  
   ```bash  
   npm install  
   ```  

## 🚀 How to Use  
1. Edit the script to add the playlist URLs in **const playlistUrls** and the desired channels to retrieve in **const desiredChannel**.  
2. Run the script:  
   ```bash  
   node index.js  
   ```  
3. The valid links will be saved in a file named **valid_playlists.txt**.  

---

## 📝 Licença / License
Este projeto está sob a licença MIT.
This project is licensed under the MIT license.

---

## Autor / Author
Roberto Batista
- GitHub: RobertoBatista28

