# Node CLI Tools

A command-line interface (CLI) application built with Node.js and Commander.js that combines two useful utilities:
1. Todo List Manager
2. File Word Counter

## Features
### Word Counter
- Count total characters (including spaces)
- Count total words in any text file
- Simple file path input

### Todo Manager
- Add, view, update, and delete todos
- Batch delete all todos
- View numbered todo list
- JSON-based storage

## Installation
1. Clone this repository
2. Run `npm install` to install dependencies

## Usage

### Help Command
```bash
$ node index.js help

# Output:
Usage: my-cli-App [options] [command]

Our first CLI program

Options:
  -V, --version               output the version number
  -h, --help                  display help for command

Commands:
  count <filePath>           Count the number of words in file
  add <newtodo>             add todo
  update <oldTodo> <newTodo> update existing todo
  delete [options] [todo]    delete todo
  view                      view todos
  help [command]            display help for command
```

## Word Counter
```bash
$ node index.js count test.txt 
```
```bash
Output:
Your file name is test.txt
you have 25 characters including spaces in this file
& you have 5 words in this file
```

# Add Todo
$ node index.js add "buy milk"
Output: buy milk todo added

# View Todos
$ node index.js view
Output:
1. [ ] buy milk
2. [ ] do laundry
3. [✓] finish homework

# Mark Todo as done
$ node index.js done "buy milk"
Output: "buy milk" has been marked as done

# Update Todo
$ node index.js update "buy milk" "buy almond milk"
Output: Todo updated from 'buy milk' to 'buy almond milk'

# Delete Specific Todo
$ node index.js delete "buy milk"
Output: "buy milk" has been deleted

# Delete All Todos
$ node index.js delete --all
Output: All todos deleted

# View Current Todos
$ node index.js delete
Output:
Current todos:
 1.  [] do laundry
 2.  [✓] finish homework

### Dependencies

* Commander.js
* Node.js fs module





