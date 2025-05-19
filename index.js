/*
Задача 1

Нужно написать Rest API с двумя методами:
generate() - отдаёт случайное число от 1 до 1000. Каждой генерации присваивается уникальный id и хранится в произвольном месте (проще - лучше)
retrieve(id) - получение результата генерации по id

Результат нужно положить в гитхаб/гитлаб репозиторий.
*/

const express = require("express");
const crypto = require("crypto");

const app = express();
const PORT = 3000;
const numbersMap = new Map();

app.use(express.json());

app.post('/generate', (req, res) => {
  const obj = {
    id: crypto.randomBytes(2).toString('hex'),
    number: crypto.randomInt(1000) + 1,
  };

  numbersMap.set(obj.id, obj);
  
  res.status(201).json(obj)
})

app.get('/retrieve/:id', (req, res) => {
  const  { id }  = req.params;

  if (numbersMap.has(id)) {
    res.status(200).json(numbersMap.get(id))
  }else {
  res.status(404).json({ error: 'Number not found' })
  }
})


app.listen(PORT, () => {
  console.log(`Server started at ${PORT} port`)
})

/*
Задача 2

Есть три таблицы
user
id | firstname | lastname | registration_date
1  | Nick      | Black    | 2023-04-05
2  | Alice     | White    | 2023-05-06
3  | Tom       | Yam      | 2023-06-07

purchase
sku  | price | user_id   | date
1001 | 29.99 | 1         | 2023-04-10
1002 | 15.49 | 1         | 2023-04-15
1003 | 45.00 | 2         | 2023-05-08
1004 | 22.99 | 2         | 2023-05-10
1005 | 18.75 | 3         | 2023-06-09
1006 | 33.50 | 3         | 2023-06-11

ban_list
user_id | date
2       | 2023-05-09
 
Найти пользователей, которые не совершали никаких покупок. Написать запрос в любой форме

Решение:

1) Этот запрос находит всех пользователей, которые никогда не совершали покупок. Таблица ban_list не учитывается.

SELECT
    "user".id,
    "user".firstname,
    "user".lastname
FROM
    "user"
LEFT JOIN
    purchase ON "user".id = purchase.user_id
WHERE
    purchase.user_id IS NULL;

2) Этот запрос находит всех пользователей, которые не совершали покупок и не забанены.

SELECT
    "user".id,
    "user".firstname,
    "user".lastname
FROM
    "user"
LEFT JOIN
    purchase ON "user".id = purchase.user_id
LEFT JOIN
    ban_list ON "user".id = ban_list.user_id
WHERE
    purchase.user_id IS NULL AND ban_list.user_id IS NULL;
    
*/