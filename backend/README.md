# Exemplos de Backend

## 🚀 Que diabéisso?

Os exemplos de backend providos nesta páginas tem finalidade didática e podem ser usados de exemplo para outras
implementações. Eles podem ser usados como um guia para você entender como o frontend pode se comunicar com um backend.
Bem como podem ser implementadas as melhores práticas de desenvolvimento backend moderno usando PHP em diferentes
frameworks.

## 📚 O que temos por aqui?

- [Symfony](#symfony)

### Symfony

O Symfony é um framework PHP de código aberto e de alto desempenho para desenvolver aplicações web. Ele foi criado por
Fabien Potencier em 2005 sendo mantido por uma comunidade ativa de desenvolvedores. O Symfony é um framework de
componentes sendo usado por muitos projetos de código aberto e empresas de renome.

#### 🚀 Como começar

Instale o Symfony CLI para poder simplificar sua vida. Acesse a página oficial
do [componente](https://symfony.com/download) e siga as instruções para instalar o Symfony CLI.
Eu usei o `brew` para instalar o Symfony CLI como pode ser visto no comando abaixo.

```bash
brew install symfony-cli/tap/symfony-cli
```

No Windows, você pode usar o `scoop` para instalar o Symfony CLI como pode ser visto no comando abaixo.

```bash
scoop install symfony-cli
```

#### 🖥 Criando um novo projeto Symfony

Crie um novo projeto Symfony usando o comando abaixo.

```bash
symfony new symfony
```

O comando acima terá criado uma pasta chamada symfony (ou outro nome de sua preferência) com a estrutura de um projeto
Symfony. Acesse a pasta do projeto usando o comando abaixo.

```bash
cd symfony
```

Como instalamos o Symfony CLI, podemos usar o comando abaixo para iniciar o servidor web embutido.

#### 🚀 Rodando nossa aplicação com o Symfony

```bash
symfony server:start
```

Na primeira vez que rodei foi gerado um WARNING semelhante ao que está aqui abaixo.

```
[WARNING] run "symfony server:ca:install" first if you want to run the web server with TLS support, or use "--p12" or  
  "--no-tls" to avoid this warning       
```

Para resolver o problema, rodei o comando abaixo e tive a resposta que pode ser vista a seguir.

```bash
symfony server:ca:install
```

```
You might have to enter your root password to install the local Certificate Authority certificate
The local CA is now installed in the system trust store!
Generating a default certificate for HTTPS support
                                                                                                                        
 [OK] The local Certificate Authority is installed and trusted  
```

Ao executar novamente o comando de `start` a saída parece apropriada e será parecida como o conteúdo abaixo

```
Following Web Server log file (/Users/william/.symfony5/log/384fd699bd61a76be3b972d39c0c32e78cd665c2.log)
Following PHP log file (/Users/william/.symfony5/log/384fd699bd61a76be3b972d39c0c32e78cd665c2/7daf403c7589f4927632ed3b6af762a992f09b78.log)
                                                                                                                        
 [WARNING] The local web server is optimized for local development and MUST never be used in a production setup.        
                                                                                                                        

                                                                                                                        
 [OK] Web server listening                                                                                              
      The Web server is using PHP CLI 8.3.3                                                                             
      https://127.0.0.1:8000                                                                                            
                                                                                                                        

[Web Server ] Apr 15 19:03:31 |DEBUG  | PHP    Reloading PHP versions 
[Web Server ] Apr 15 19:03:31 |DEBUG  | PHP    Using PHP version 8.3.3 (from default version in $PATH) 
[Web Server ] Apr 15 19:03:31 |INFO   | PHP    listening path="/Users/william/Library/Application Support/Herd/bin/php83" php="8.3.3" port=50437
[PHP        ] [Mon Apr 15 19:03:31 2024] PHP 8.3.3 Development Server (http://127.0.0.1:50437) started
```

Tem uma referência ali a um diretório que o server usa para manter alguns logs com o nome symfony5, mas é possível ver
no composer.json que todos os componentes instalados são do Symfony 7. 

#### 🚀 Rodando nossa aplicação com o Docker

A documentação oficial do Symfony no direciona para esta página [aqui](https://symfony.com/doc/current/setup/docker.html).


```bash
composer require symfony/maker-bundle --dev
```
