
<script src="https://wzrd.in/standalone/expect@latest"></script>
<script src="https://wzrd.in/standalone/deep-freeze@latest"></script>

## add to an existing array

### NOT SAFE
```
list.push(0);    
```

### SAFE
```
return list.concat([0]);    // returns a new array
```

### Safe and easier to read
```
return [...list, 0];
```

----------------

## remove an item from an array

### UNSAFE
```
list.splice(index, 1);
return list;
```

### SAFE
```
return list
    .slice(0, index)
    .concat(list.slice(index + 1));
```

### Safe and easier to read
```
return [
   ...list.slice(0,index),
   ...list.slice(index + 1)
];    
```

## Increment one item in an array (w/o mutation)
```
return [
  ...list.slice(0, index),
  list[index] + 1,
  ...list.slice(index + 1)
]
```

## return a new object with just one of the fields changed (w/o mutation)
```
const toggleTodo = (todo) => {
  return {
    id: todo.id,
    text: todo.text,
    completed: !todo.completed
  };
};
```

even better  (Object.assign is new in ES6)

```
const toggleTodo = (todo) => {
  return Object.assign({}, todo,
    { completed: !todo.completed }
    );
};
```
because this allows for more fields to be added and this code will not need to be modified.

even mo-better (if you have babel stage 2 preset)
```
const toggleTodo = (todo) => {
  return {
    ...todo,
    completed: !todo.completed
    };
};
```
