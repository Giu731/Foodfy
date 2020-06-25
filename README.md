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
 <li>Node_modules <em>(npm install)</em></li>
 <li>Express <em>(npm install express)</em></li>
  <li>Nodemon <em>(npm install -D nodemon)</em></li>
 <li>Nunjucks <em>(npm install nunjucks)</em></li>
  <li>Browsersync <em>(npm install browser-sync)</em></li>
 <li>Method Override <em>(npm install method-override)</em></li>
  <li>PostgreSQL <em>(npm install pg)</em></li>
 <li>Multer <em>(npm install multer)</em></li>
 <li>Express session <em>(npm install express-session connect-pg-simple)</em></li>
 <li>NodeMailer <em>(npm install nodemailer)</em></li>
</ul>

Sei que são muitos programas, mas eles vão permitir que o site faça tudo o que deve fazer.

</br>

<strong>2. Crie o Database e as Tabelas em um banco de dados</strong>
Aqui no repositório há um esqueleto para toda a estrutuda do database utilizado nesse projeto, o <strong>databasedbCerto.sql</strong>.
Eu utilizei o PostBird.

</br>

<strong>3. Começando com dados</strong>
Depois de já ter criado o database, no teminal onde rodará o programas, rodar o <strong>seeds.js</strong> (node seeds.js), para assim já começar com alguns dados no site.
<strong>
 </br>Obs:</strong> A senha dos primeiros usuários, criados pelo seeds, é a mesma: <strong>1234</strong>
 
 </br></br>
 
 <h3>Aviso Importante</h3>
 As primeiras fotos serão todas as mesmas, vindas de um mesmo path. Portanto, quando for feito o teste com as receitas e os chefs, caso a imagem seja apagada, todos ficarão sem imagem. Porém, isso não acontecerá quando você criar suas receitas e seus chefs, adicionando mais imagens ao banco de dados.
 

  
  
  
 
  
