const timeText = document.getElementById("timeText");

var initialHours;
var initialMinutes;
var initialSeconds;
var paused = false;
var happy_hour_active = false;

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

	if(paused){
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
	}
	
	let timeNow = new Date(Date.now());
	
	document.getElementById("startPage").style.visibility = "hidden";
	document.getElementById("container").style.visibility = "visible";
	
	endingTime = timeFunc.addHours(timeNow, initialHours);
	endingTime = timeFunc.addMinutes(timeNow, initialMinutes);
	endingTime = timeFunc.addSeconds(timeNow, initialSeconds); 

	paused = false;
	
});


Mousetrap.bind(pauseShort, function(e) {
	paused = true;
	logMessage("Core", "Timer was paused");
	document.getElementById("startPage").style.visibility = "visible";
	document.getElementById("container").style.visibility = "hidden";
});

Mousetrap.bind(happyHourShort, async function(e){
	if(happy_hour){
		happyHourFunc()
	}
	else {
		logMessage("Core", "Happy Hour is not available")
		document.getElementById("HappyHourText").innerHTML = "Happy Hour error";
		document.getElementById("HappyHourText").animate({opacity: [ 0, 1 ], easing: [ 'ease-in', 'ease-out' ],}, 500);
		document.getElementById("HappyHourText").style.opacity = "1";
		document.getElementById("HappyHourHTML").animate({top: [ "-200px", "-250px" ], easing: [ 'ease-in', 'ease-out' ],}, 500);
		document.getElementById("HappyHourHTML").style.top = "-250px";
		await sleep(5000)
		document.getElementById("HappyHourText").animate({opacity: [ 1, 0 ], easing: [ 'ease-in', 'ease-out' ],}, 500);
		document.getElementById("HappyHourText").style.opacity = "0";
	}
});

async function happyHourFunc(){
	if(!happy_hour_active){
		logMessage("Core","Happy Hour activated");
		happy_hour_active = true;
		document.getElementById("HappyHourText").innerHTML = "Happy Hour Activated!";
		document.getElementById("HappyHourText").animate({opacity: [ 0, 1 ], easing: [ 'ease-in', 'ease-out' ],}, 500);
		document.getElementById("HappyHourText").style.opacity = "1";
		document.getElementById("HappyHourHTML").animate({top: [ "-200px", "-250px" ], easing: [ 'ease-in', 'ease-out' ],}, 500);
		document.getElementById("HappyHourHTML").style.top = "-250px";
		document.getElementById("container").style.backgroundImage = "-webkit-linear-gradient(-45deg, transparent 33%, rgba(0, 0, 0, .1) 33%, rgba(0,0, 0, .1) 66%, transparent 66%), -webkit-linear-gradient(top, rgba(255, 255, 255, .25), rgba(0, 0, 0, .25)), url(https://drive.google.com/uc?id=1oduFlPg84O1DliM5FsLvJJsnwZ4m1Vpm), -webkit-linear-gradient(left, #0074cc, #a700cc)";
		await sleep(10000)
		document.getElementById("HappyHourText").animate({opacity: [ 1, 0 ], easing: [ 'ease-in', 'ease-out' ],}, 500);
		document.getElementById("HappyHourText").style.opacity = "0";
	}
	else if(happy_hour_active){
		logMessage("Core", "Happy Hour deactivated")
		clearTimeout(happyHourFunc)
		happy_hour_active = false;
		document.getElementById("HappyHourText").innerHTML = "Happy Hour Deactivated";
		document.getElementById("HappyHourText").animate({opacity: [ 0, 1 ], easing: [ 'ease-in', 'ease-out' ],}, 500);
		document.getElementById("HappyHourText").style.opacity = "1";
		document.getElementById("HappyHourHTML").animate({top: [ "-200px", "-250px" ], easing: [ 'ease-in', 'ease-out' ],}, 500);
		document.getElementById("HappyHourHTML").style.top = "-250px";
		document.getElementById("container").style.backgroundImage = "-webkit-linear-gradient(-45deg, transparent 33%, rgba(0, 0, 0, .1) 33%, rgba(0,0, 0, .1) 66%, transparent 66%), -webkit-linear-gradient(top, rgba(255, 255, 255, .25), rgba(0, 0, 0, .25)), -webkit-linear-gradient(left, #0074cc, #a700cc)";
		await sleep(5000)
		document.getElementById("HappyHourText").animate({opacity: [ 1, 0 ], easing: [ 'ease-in', 'ease-out' ],}, 500);
		document.getElementById("HappyHourText").style.opacity = "0";
	}
}


let countdownEnded = false;
let users = [];
let time;


let endingTime = new Date(Date.now());
endingTime = timeFunc.addHours(endingTime, initialHours);
endingTime = timeFunc.addMinutes(endingTime, initialMinutes);
endingTime = timeFunc.addSeconds(endingTime, initialSeconds);

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

var randomHappyBool = false
var scheduleHappyBool = false

const getNextTime = () => {
	
	let currentTime = new Date(Date.now());
	let differenceTime = endingTime - currentTime;
	time = `${timeFunc.getHours(differenceTime)}:${timeFunc.getMinutes(differenceTime)}:${timeFunc.getSeconds(differenceTime)}`;
	if (differenceTime <= 0) {
		clearInterval(countdownUpdater);
		countdownEnded = true;
		time = "00:00:00";
	}
	if(!paused){
		window.localStorage.setItem('initialHours', timeFunc.getHours(differenceTime));
		window.localStorage.setItem('initialMinutes', timeFunc.getMinutes(differenceTime));
		window.localStorage.setItem('initialSeconds', timeFunc.getSeconds(differenceTime));

		if(randHappy && happy_hour && !randomHappyBool){
			randomHappyBool = true
			setTimeout(randomHappy,1000)
		}
		if(scheduleHappy && happy_hour && !scheduleHappyBool){
			scheduleHappyBool = true
			scheduleHappyFunc()
		}
	}
	timeText.innerText = time;
	
};

let countdownUpdater = setInterval(() => {
	getNextTime();
}, 1); 

function randomHappy(){
	if(!happy_hour_active){
		if((getRandomInt(0,10000) == 127)){
			logMessage("RandomHappy","It's not rigged!")
			happyHourFunc()
			setTimeout(happyHourFunc, 3600000)
		}
	setTimeout(randomHappy,1000)
	}
}

function scheduleHappyFunc(){
	let now = new Date()
	if(now.getDay() == scheduleHappyDay){
		if(now.getUTCHours() == scheduleHappyHour){
			if(now.getUTCMinutes() == 00){
				logMessage("Schedule","It's time!")
				happyHourFunc()
				setTimeout(happyHourFunc, 3600000)
				setTimeout(scheduleHappyFunc, 36000000)
			}
		}
	}
}

var firstSub = true;
var endingTimeBeforeCounter;
var addedTimeCounter;
var timeoutID;

const addTime = async (time, s) => {
    if(!bulk_enabled) {
        endingTimeBeforeCounter = time;
        addedTimeCounter = s;
        addTimeInternal();
        return;
    }
    if(firstSub) {
        firstSub = false;
        endingTimeBeforeCounter = time;
        addedTimeCounter = s;
    } else {
        addedTimeCounter += s;
        window.clearTimeout(timeoutID);
    }
    timeoutID = window.setTimeout(addTimeInternal, 1000);
};

const addTimeInternal = async () => {
    let time = endingTimeBeforeCounter;
    let s = addedTimeCounter;
    addedTimeCounter = 0;
    firstSub = true;
    
    let addedTime = document.createElement("p");
	if(happy_hour_active) {
		addedTime.classList = "gold";
	}
	else {
		addedTime.classList = "addedTime";
	}
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
}

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
