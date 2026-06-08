# Explorando o MongoDB Atlas

## Passo a passo

### 1. Criar conta e cluster
1. Acesse https://www.mongodb.com/atlas
2. Crie uma conta gratuita
3. Crie um cluster **M0 (gratuito)**
4. Configure o usuário do banco e libere seu IP em "Network Access"

### 2. Criar banco e collection
- Banco: `escola`
- Collection: `alunos`

### 3. Queries praticadas no Atlas / Compass

**Inserir 5 alunos:**
```json
[
  { "nome": "Ana Silva", "email": "ana@email.com", "idade": 20, "curso": "Web", "notas": [8, 9, 7] },
  { "nome": "Bruno Costa", "email": "bruno@email.com", "idade": 22, "curso": "ADS", "notas": [6, 5, 7] },
  { "nome": "Carla Lima", "email": "carla@email.com", "idade": 19, "curso": "Web", "notas": [10, 9, 10] },
  { "nome": "Diego Matos", "email": "diego@email.com", "idade": 23, "curso": "BD", "notas": [7, 8, 6] },
  { "nome": "Eva Rocha", "email": "eva@email.com", "idade": 21, "curso": "Web", "notas": [9, 8, 9] }
]
```

**Buscar por nome:**
```json
{ "nome": "Ana Silva" }
```

**Filtrar por idade:**
```json
{ "idade": { "$gte": 21 } }
```

**Ordenar por nota (primeira nota):**
```json
db.alunos.find().sort({ "notas.0": -1 })
```

**Atualizar idade de um aluno:**
```json
db.alunos.updateOne(
  { "nome": "Bruno Costa" },
  { "$set": { "idade": 23 } }
)
```

**Adicionar nota ao array:**
```json
db.alunos.updateOne(
  { "nome": "Ana Silva" },
  { "$push": { "notas": 10 } }
)
```

**Remover por email:**
```json
db.alunos.deleteOne({ "email": "eva@email.com" })
```
