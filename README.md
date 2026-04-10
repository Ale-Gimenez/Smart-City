# Smart-City

## Regras de Negócio
- Registro de sensores com os campos:
    - Id sensor
    - Sensor (temperatura, umidade, luminosidade, contador)  
    (Os dados dos sensores devem incluir: 
        ▪ Temperatura (°C) 
        ▪ Luminosidade (lux) 
        ▪ Umidade (%) 
        ▪ Contador(num) )
    - Identificação (mac-address) 
    - Localização (latitude e longitude) 
    - Status operacional (ativo/inativo)
- Registrar medições vindas dos sensores:
    - ID do sensor relacionado
    - Ambiente (relacionado com a tabela de ambientes) 
    - Valor da medição 
    - Data e hora da leitura (timestamp) 
- Registrar os ambientes da escola:
    - Local  
    - Descrição 
    - Responsável 
- Registrar os locais onde os sensores estarão localizados na escola:
    - Local
- Registrar os responsáveis pelos ambientes da escola:
    - nome
- A API deve fornecer endpoints para:
    - Cadastrar, editar, listar e apagar sensores da tabela Sensores. 
    - Cadastrar e listar medições por sensor 
    - Listar as medições mais recentes (últimas 24h, por exemplo)