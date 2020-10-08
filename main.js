let allTasks = [];


//Clear form on clear click button
function clearForm() {
    const taskBox = document.getElementById("mainForm").reset();

}

//validate and save new task by task, date task, and future assignment. 
function saveTask() {


    //Getting inputs
    var taskBox = document.getElementById("taskBox");
    var dateBox = document.getElementById("dateBox");
    var timeBox = document.getElementById("timeBox");

    var task = taskBox.value;
    var date = dateBox.value;
    var time = timeBox.value;


    //clear inputs after filled validate
    taskBox.style.backgroundColor = "";
    dateBox.style.backgroundColor = "";

    if (task === "") {
        alert("Please enter a task");
        taskBox.style.backgroundColor = "pink";
        return false;
    }
    if (date === "") {
        alert("Please enter a legal date");
        dateBox.style.backgroundColor = "pink";
        return false;
    }

    var taskInfo = {
        task: task,
        date: date,
        time: time
    };

    //Futured assignment validate

    if (timeValidate(taskInfo) === true) {
        allTasks.push(taskInfo);
        localStorage.setItem("tasks", JSON.stringify(allTasks));
        document.getElementById("mainForm").reset();
        displayTasks("new");
        return true;

    }



    else {
        alert("Please enter a future assignment");
        return false;

    }

}
//Push object to Array, loop it inside an outsider div

function displayTasks(loadOrNew) {
    var containerDiv = document.getElementById("containerDiv");
    containerDiv.innerHTML = "";//clear previous info

    if (loadOrNew === "new") {//Animation term - new task case
        var index = 0;
        for (var taskInfo of allTasks) {
            //Convert date display format to european
            const dateArray = taskInfo.date.split("-");
            const fixedDay = dateArray[2];
            const fixedMonth = dateArray[1];
            const fixedYear = dateArray[0];

            var div = `<div id="t${index}" class="addNewTaskAnimation">
        <div id="removeGhyp"><div id="remover">
        <button onclick="removeTask(${index})" type="button" id="removeButton" class="glyphicon glyphicon-remove">
        </button></div></div>
        <div id="taskArea">${taskInfo.task}</div><br>
        <div id="dateArea">${fixedDay}-${fixedMonth}-${fixedYear}</div><br>
        <div id="timeArea">${taskInfo.time}</div>
        </div>`;

            containerDiv.innerHTML += div;
            index++;

        }
    }

    else if (loadOrNew === "load") {//Animation term - load the page case
        var index = 0;
        for (var taskInfo of allTasks) {
            const dateArray = taskInfo.date.split("-");
            const fixedDay = dateArray[2];
            const fixedMonth = dateArray[1];
            const fixedYear = dateArray[0];


            var div = `<div id="t${index}" class="onLoadAnimation">
            <div id="removeGhyp"><div id="remover">
            <button onclick="removeTask(${index})" type="button" id="removeButton" class="glyphicon glyphicon-remove">
            </button></div></div>
            <div id="taskArea">${taskInfo.task}</div><br>
            <div id="dateArea">${fixedDay}-${fixedMonth}-${fixedYear}</div><br>
            <div id="timeArea">${taskInfo.time}</div>
            </div>`;

            containerDiv.innerHTML += div;
            index++;

        }
    }

}
//Remove function by button
function removeTask(index) {
    var result = confirm("Are you sure?");
    if (result) {
        allTasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(allTasks));
        displayTasks("load");
    }
}
//Clear all board function 
function clearAllBoard(index) {
    console.log(localStorage.getItem('tasks')); //logs null as string
    console.log(typeof localStorage.getItem('tasks')); //logs string

    var result = confirm("Are you sure you want to delete all tasks?");
    if (result) {
        allTasks.splice(index, allTasks.length);
        localStorage.setItem("tasks", JSON.stringify(allTasks));
        displayTasks("load");
    }
}

//Save updated info while loading the page
function loadAllTasks() {

    if (localStorage.getItem("tasks") !== null) {
        var index = 0;
        allTasks = JSON.parse(localStorage.getItem("tasks"));
        for (const taskInfo of allTasks) {
            if (timeValidate(taskInfo) === false) {
                allTasks.splice(index, 1);
            }
            index++;

        }
    }
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    displayTasks("load");

    

}


function timeValidate(taskInfo) {
    //Current date & time variables
    let today = new Date;
    let currentDate = today.toLocaleDateString();
    const currentDateArray = currentDate.split(".");
    const onlyMonth = currentDateArray[1];
    if (onlyMonth < 10) {
        var currentMonth = +("0" + onlyMonth);
    }
    if (onlyMonth <= 10) {
        var currentMonth = +(onlyMonth);
    }
    const currentYear = today.getFullYear();
    const currentDay = today.getDate();


    var clock = today.toLocaleTimeString();
    var clockArray = clock.split(":");
    var currentHours = +(clockArray[0]);
    var currentMinutes = +(clockArray[1]);

    const taskTime = taskInfo.time;
    const taskTimeArray = taskTime.split(":");
    const taskHours = +(taskTimeArray[0]);
    const taskMinutes = +(taskTimeArray[1]);


    //Task date & time variables
    const taskDate = taskInfo.date;
    const taskDateArray = taskDate.split("-");
    const taskDay = +(taskDateArray[2]);
    const taskMonth = +(taskDateArray[1]);
    const taskYear = +(taskDateArray[0]);

    //Date validate
    if (taskYear < currentYear) {
        return false;
    }
    if (taskYear === currentYear) {
        if (taskMonth < currentMonth) {
            return false;
        }
        if (taskMonth === currentMonth) {
            if (taskDay < currentDay) {
                return false;
            }
        }
    }

    //Hours validate
    if (taskDay === currentDay && taskMonth === currentMonth && taskYear === currentYear) {
        if (taskHours < currentHours) {
            if (taskTime !== "00:00" && taskTime !== "") {
                return false;
            }
        }
    }

    //Minutes validate
    if (taskDay === currentDay && taskMonth === currentMonth && taskYear === currentYear) {
        if (taskHours === currentHours) {
            if (taskMinutes < currentMinutes) {
                if (taskTime !== "00:00" && taskTime !== "") {
                    return false;
                }
            }
        }
    }
    return true;
}


