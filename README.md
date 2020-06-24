# Foodfy

Oi, pessoal!
Esse é o código que fui desafiada a fazer durante as aulas do bootcamp de programação da Rocketseat.
Ele consiste em um protótipo de site de receitas, chamado <strong>Foodfy</strong>.

</br>

<h2> Sobre o site</h2>
 <p>O site possui duas áreas principais. A área de <strong>visualização</strong> das receitas e chefs criados por usuários e a área de <strong>administração</strong>, onde são   criados os usuários, receitas e chefs.</p>
 
 <p>A ideia é que um usuário administrador comece criando os usuários e os chefs. A partir disso, os novos usuários têm a capacidade de criar receitas, podendo escolher algum dos chefs previamente criado pelo Admin. Depois de criadas, as receitas ficarão disponíveis para todos os visualizadores do site e para os outros usuários.</p>

</br>

<h3>Algumas condições especiais são:</h3>
<ul>
  <li> Apenas os usuários administradores podem criar, atualizar e deletar os chefs.</li>
  <li> Apenas os usuários administradores podem apagar outros usuários e ter acesso de edição e exclusão de receitas não criadas por eles</li>
  <li> Usuários não administradores não podem deletar sua própria conta e usuários administradores não podem ser deletados</li>
</ul>
 
</br></br>

<h3>Testando o site</h3>
<strong>1. Antes de executar a aplicação são necessários alguns programas:</strong>
<ul>
 <li>Node_modules (npm install)</li>
 <li>Express (npm install express)</li>
  <li>Nodemon (npm install -D nodemon)</li>
  <li>Nunjucks (npm install nunjucks)</li>
  <li>Browsersync (npm install browser-sync)</li>
  <li>Method Override (npm install method-override)</li>
  <li>PostgreSQL (npm install pg)</li>
  <li>Multer (npm install multer)</li>
  <li>Express session (npm install express-session connect-pg-simple)</li>
  <li>NodeMailer (npm install nodemailer)</li>
</ul>

Sei que são muitos programas, mas eles vão permitir que o site faça tudo o que deve fazer.

</br>

<strong>2. Crie o Database e as Tabelas em um banco de dados</strong>
Aqui no repositório há um esqueleto para toda a estrutuda do database utilizado nesse projeto, o <strong>databasedbCerto.sql</strong>.
Eu utilizei o PostBird.

</br>

<strong>3. Começando com dados</strong>
Depois de já ter criado o database, no teminal onde rodará o programas, rodar o <strong>seeds.js</strong> (node seeds.js), para assim já começar com alguns dados no site.
<strong>Obs:</strong> A senha dos primeiros usuários, criados pelo seeds, é a mesma: <strong>1234</strong>

  
  
  
 
  
