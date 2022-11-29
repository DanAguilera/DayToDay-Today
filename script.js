// updates time on the webpage
function updateTime() {
    let today = moment();

    // updates the time element in the header
    $("#currentDay").text(today.format("dddd, MMMM Do YYYY, h:mm:ss"));

    // For coloring the past, present, and future time blocks
    let now = moment().format("kk");
    for (let i = 0; i < scheduleElArray.length; i++) {
        scheduleElArray[i].removeClass("future past present");

        if (now > scheduleElArray[i].data("hour")) {
            scheduleElArray[i].addClass("past");

        } else if (now === scheduleElArray[i].attr("data-hour")) {
            scheduleElArray[i].addClass("present");

        } else {

            scheduleElArray[i].addClass("future");
        }
    }
}

// textarea elements
let saveBttn = $(".save-icon");
let containerEl = $(".container");
let sched9am = $("#9AM");
let sched10am = $("#10AM");
let sched11am = $("#11AM");
let sched12pm = $("#12PM");
let sched1pm = $("#1PM");
let sched2pm = $("#2PM");
let sched3pm = $("#3PM");
let sched4pm = $("#4PM");
let sched5pm = $("#5PM");

let scheduleElArray = [
    sched9am,
    sched10am,
    sched11am,
    sched12pm,
    sched1pm,
    sched2pm,
    sched3pm,
    sched4pm,
    sched5pm,
];

renderLastRegistered();
updateTime();
setInterval(updateTime, 1000); 

// render schedule saved in local storage
function renderLastRegistered() {
    for (let el of scheduleElArray) {
        el.val(localStorage.getItem("time block " + el.data("hour")));

    }
}


// function for handling clicks
function handleFormSubmit(event) {
    event.preventDefault();

    let btnClicked = $(event.currentTarget);

    let targetText = btnClicked.siblings("textarea");
 
    let targetTimeBlock = targetText.data("hour");

    localStorage.setItem("time block " +  targetTimeBlock, targetText.val());
}

saveBttn.on("click", handleFormSubmit);