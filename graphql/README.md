- 在terminal中执行下列语句，可以模拟正常的http请求。


```
curl -X POST \
 -H "Content-Type: application/json" \
 -d '{"query": "{ hello }"}' \
 http://localhost:4000/graphql
```

- 在localhost:4000下打开控制台。

```
var xhr = new XMLHttpRequest();
xhr.responseType = 'json';
xhr.open('POST', '/graphql');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.setRequestHeader('Accept', 'application/json');
xhr.onload = function() {
    console.log('data returned: ', xhr.response);
}
xhr.send(JSON.stringify({query: "{ hello }"}));
```

**请求方式不影响返回结果。**
**注意：访问localhost:4000不能，但是127.0.0.1:4000可行。**
**但是访问localhost:4000/graphql没问题。orz...**


- 带参数的query请求。

```
var dice = 3;
var sides = 6;
var xhr = new XMLHttpRequest();
xhr.responseType = 'json';
xhr.open('POST', '/graphql');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.setRequestHeader('Accept', 'application/json');
xhr.onload = function() {
    console.log('data returned: ', xhr.response);
}
var query = `query RollDice($dice: Int!, $sides: Int) {
    rollDice(numDice: $dice, numSides: $sides)
}`;

xhr.send(JSON.stringify({
    query: query,
    variables: {dice: dice, sides: sides},
}));
```

