// Global variables 

var tasks = [] // empty taskArr array; used to push the new task object to the array:
var options = 'add description, toggle number, show all, show active, show completed'
var listOfValidCommands = '[add, toggle, show all, show active or show completed]';

//-------------------------------------FUNCTIONS-------------------------------------------

/**
 * @function showSpecified
 * @param  {array} taskArr {passes entire task array}
 * @param  {num} num     {determines which values gets printed out
 *                         1 - prints out entire tasks array
 *                         2 - prints out array with tasks that have yet to be completed
 *                         3 - prints out array with tasks that are completed}
 * @return  {Prints out secified values of the tasks array}
 */
function showSpecified(taskArr, num) {
    if (num === 1) {
        console.log(
            padLeft('ID', 2),
            '...',
            padTo('Tasks', 30),
            ' ',
            padLeft('Completion', 15)
        );
        for (var i = 0; i < taskArr.length; i++) {
            if (taskArr[i]) {
                var counter = i + 1;
                console.log(
                    padLeft(counter.toString(), 2),
                    '...',
                    padTo(taskArr[i].title, 30),
                    ' ',
                    padLeft(taskCompleted(taskArr[i].completed), 15)
                );
            }
        }
    } else if (num === 2) {
        console.log(
            padLeft('ID', 2),
            '...',
            padTo('Tasks', 30),
            ' ',
            padLeft('Completion', 15)
        );
        for (var i = 0; i < taskArr.length; i++) {
            if (taskArr[i].completed === false) {
                var counter = i + 1;
                console.log(
                    padLeft(counter.toString(), 2),
                    '...',
                    padTo(taskArr[i].title, 30),
                    ' ',
                    padLeft(taskCompleted(taskArr[i].completed), 15)
                );
            }
        }

    } else if (num === 3) {
        console.log(
            padLeft('ID', 2),
            '...',
            padTo('Tasks', 30),
            ' ',
            padLeft('Completion', 15)
        );
        for (var i = 0; i < taskArr.length; i++) {
            if (taskArr[i].completed === true) {
                var counter = i + 1;
                console.log(
                    padLeft(counter.toString(), 2),
                    '...',
                    padTo(taskArr[i].title, 30),
                    ' ',
                    padLeft(taskCompleted(taskArr[i].completed), 15)
                );
            }
        }

    }
}


/**  BUG: CANNOT TOGGLE UNDEFINED
 * @function toggle
 * @param  {num} num {ID number of task}
 * @return {void} {toggles boolean value}
 */
function toggle(num) {
    if (tasks[num - 1].completed !== undefined) {
        tasks[num - 1].completed = !tasks[num - 1].completed;
    } else {
        console.log("Cannot toggle this item");
    }
}


/** 
 * @function taskCompleted
 * @param  {bool} taskCompletion {task from the tasks array (completed : false/true) determines whether the task was completed or not}
 * @return {void} {prints message of task completion}
 */
function taskCompleted(taskCompletion) {
    if (taskCompletion) {
        return "completed"
    } else {
        return "Not completed"
    }
}


/** complete doc
 * @function padLeft
 * @param  {type} str {description}
 * @param  {type} len {description}
 * @return {type} {description}
 */
function padLeft(str, len) {
    var task = str
    if (task.length > len) {
        return task.slice(0, len - 2) + '...'
    } else {
        while (task.length < len) {
            task = ' ' + task
        }
        return task;
    }
}


/** complete doc
 * @function padTo
 * @param  {type} str {description}
 * @param  {type} len {description}
 * @return {type} {description}
 */
function padTo(str, len) {
    if (str.length > len) {
        return str.slice(0, len - 3) + '...'
    } else {
        while (str.length < len) {
            str += ' '
        }
        return str;
    }
}


/** complete doc
 * @function list
 * @param  {type} callback {description}
 * @return {type} {description}
 */
function list(taskArr) {
    console.log(
        padLeft('ID', 2),
        '...',
        padTo('Tasks', 30),
        ' ',
        padLeft('Completion', 15)
    );
    for (var i = 0; i < taskArr.length; i++) {
        if (taskArr[i]) {
            var counter = i + 1;
            console.log(
                padLeft(counter.toString(), 2),
                '...',
                padTo(taskArr[i].title, 30),
                ' ',
                padLeft(taskCompleted(taskArr[i].completed), 15)
            );
        }
    }
}


/**
 * @function createTask
 * @param  {string} title {string argument for title of task}
 * @param  {type} completed {boolean argument: determines whether task is complete}
 * @return {object} {returns object literal}
 */
function createTask(title, completed) {
    var task = {
        title: title,
        completed: completed
    }
    return task
}


/**
 * @function forEachElem
 * @param  {array} arr      {aray argument; contains array of task objects}
 * @param  {function} taskArr {callback function }
 * @return {console logs task names in array}
 */
function forEachElem(arr, callback) {
    for (var i = 0; i < arr.length; i++) {
        callback(arr[i], i)
    }
}


/**
 * @function push 
 * @param  {string} str {takes string parameter to push to task array}
 * @return {void} {pushes task to task array}
 */
function push(str) {
    tasks.push(str);
}


//------------------------------------READLINE--------------------------------------------

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('\n\nPlease chose one of [' + options + '] $') //Prompt user

rl.on('line', function (input) {
    var inputArr = input.split(' ')
    var command = inputArr[0].toLowerCase(); // First index of the array will always be a command
    var inputCommand = inputArr.slice(1).join(' ');

    if (command === 'add') {
        push(createTask(inputCommand, false));
        list(tasks);
    } else if (command === 'toggle') {
        toggle(inputCommand);
        console.log('Task toggled')
        list(tasks);
    } else if (command === 'show') {
        if (inputCommand === 'all') {
            showSpecified(tasks, 1);
        } else if (inputCommand === 'active') {
            showSpecified(tasks, 2);
        } else if (inputCommand === 'completed') {
            showSpecified(tasks, 3);
        }
    } else {
        console.log('Please input valid command:', listOfValidCommands);
    }
    //console.log(inputArr, inputCommand, tasks); //Debug 
    console.log('\n\nPlease chose one of [' + options + '] $')
}); //End of anonimous function