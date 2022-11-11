const timeText = document.getElementById("timeText");

var initialHours;
var initialMinutes;
var initialSeconds;

var initialHoursLocal = window.localStorage.getItem('initialHours')
if(initialHoursLocal !== null) {
	initialHours  = initialHoursLocal;
	logMessage("Core", "Found initialHours in localStorage.")
} else {
	initialHours = initialHoursConfig;
}
var initialMinutesLocal = window.localStorage.getItem('initialMinutes')
if(initialMinutesLocal !== null) {
	initialMinutes = initialMinutesLocal;
	logMessage("Core", "Found initialMinutes in localStorage.")
} else {
	initialMinutes = initialMinutesConfig;
}
var initialSecondsLocal = window.localStorage.getItem('initialSeconds')
if(initialSecondsLocal !== null) {
	initialSeconds  = initialSecondsLocal;
	logMessage("Core", "Found initialSeconds in localStorage.")
} else {
	initialSeconds = initialSecondsConfig;
}

resetBtn.addEventListener("click", function(){
	
	initialHours = initialHoursConfig;
	initialMinutes = initialMinutesConfig;
	initialSeconds = initialSecondsConfig;
	
	let timeNow = new Date(Date.now());
		
	endingTime = timeFunc.addHours(timeNow, initialHours);
	endingTime = timeFunc.addMinutes(timeNow, initialMinutes);
	endingTime = timeFunc.addSeconds(timeNow, initialSeconds); 
	
	window.localStorage.removeItem('initialHours');
	window.localStorage.removeItem('initialMinutes');
	window.localStorage.removeItem('initialSeconds');
	
	logMessage("Core", "Timer Reset.");
});


startBtn.addEventListener("click", function(){
	
	let timeNow = new Date(Date.now());
	
	document.getElementById("startPage").style.visibility = "hidden";
	document.getElementById("container").style.visibility = "visible";
	
	endingTime = timeFunc.addHours(timeNow, initialHours);
	endingTime = timeFunc.addMinutes(timeNow, initialMinutes);
	endingTime = timeFunc.addSeconds(timeNow, initialSeconds); 
	
});


let countdownEnded = false;
let users = [];
let time;


let endingTime = new Date(Date.now());
endingTime = timeFunc.addHours(endingTime, initialHours);
endingTime = timeFunc.addMinutes(endingTime, initialMinutes);
endingTime = timeFunc.addSeconds(endingTime, initialSeconds);

const getNextTime = () => {
	
	let currentTime = new Date(Date.now());
	let differenceTime = endingTime - currentTime;
	time = `${timeFunc.getHours(differenceTime)}:${timeFunc.getMinutes(differenceTime)}:${timeFunc.getSeconds(differenceTime)}`;
	if (differenceTime <= 0) {
		clearInterval(countdownUpdater);
		countdownEnded = true;
		time = "00:00:00";
	}
	window.localStorage.setItem('initialHours', timeFunc.getHours(differenceTime));
	window.localStorage.setItem('initialMinutes', timeFunc.getMinutes(differenceTime));
	window.localStorage.setItem('initialSeconds', timeFunc.getSeconds(differenceTime));
	timeText.innerText = time;
	
};

let countdownUpdater = setInterval(() => {
	getNextTime();
}, 1); 


const addTime = async (time, s) => {
    let addedTime = document.createElement("p");
    addedTime.classList = "addedTime";
    addedTime.innerText = `+${s}s`;
    document.body.appendChild(addedTime);
    addedTime.style.display = "block";
    await sleep(50);
    addedTime.style.left = `${randomInRange(35, 65)}%`;
    addedTime.style.top = `${randomInRange(15, 40)}%`;
    addedTime.style.opacity = "1";
	while(s > 0){
        timeStep = s > 60 ? s/30 : 2
        endingTime = timeFunc.addSeconds(time, timeStep)
        await sleep(50);
        s -= timeStep
	}
    await sleep(200);
    addedTime.style.opacity = "0";
    await sleep(200);
    addedTime.remove();
};

const testAddTime = (times, delay, s) => {
	let addTimeInterval = setInterval(async () => {
		if (times > 0) {
			await sleep(randomInRange(50, delay-50));
			addTime(endingTime, s);
			--times;
		}
		else {
			clearInterval(addTimeInterval);
		}
	}, delay);
};
