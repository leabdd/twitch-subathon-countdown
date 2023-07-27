const timeText = document.getElementById("timeText");

var initialHours;
var initialMinutes;
var initialSeconds;
var paused = false;
var happy_hour_active = false;
var random_hour_active = false;
let countdownEnded = false;
let countdownUpdater = null;

var initialHoursLocal = window.localStorage.getItem('initialHours')
if (initialHoursLocal !== null) {
	initialHours  = initialHoursLocal;
	logMessage("Core", "Found initialHours in localStorage.")
} else {
	initialHours = initialHoursConfig;
}
var initialMinutesLocal = window.localStorage.getItem('initialMinutes')
if (initialMinutesLocal !== null) {
	initialMinutes = initialMinutesLocal;
	logMessage("Core", "Found initialMinutes in localStorage.")
} else {
	initialMinutes = initialMinutesConfig;
}
var initialSecondsLocal = window.localStorage.getItem('initialSeconds')
if (initialSecondsLocal !== null) {
	initialSeconds  = initialSecondsLocal;
	logMessage("Core", "Found initialSeconds in localStorage.")
} else {
	initialSeconds = initialSecondsConfig;
}

resetBtn.addEventListener("click", function(){
	
	if (happy_hour_active) specialHourHandler('Happy');
	if (random_hour_active) specialHourHandler('Random');
	countdownEnded = false;
	
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

	if (paused){
		var initialHoursLocal = window.localStorage.getItem('initialHours')
		if (initialHoursLocal !== null) {
			initialHours  = initialHoursLocal;
			logMessage("Core", "Found initialHours in localStorage.")
		} else {
			initialHours = initialHoursConfig;
		}
		var initialMinutesLocal = window.localStorage.getItem('initialMinutes')
		if (initialMinutesLocal !== null) {
			initialMinutes = initialMinutesLocal;
			logMessage("Core", "Found initialMinutes in localStorage.")
		} else {
			initialMinutes = initialMinutesConfig;
		}
		var initialSecondsLocal = window.localStorage.getItem('initialSeconds')
		if (initialSecondsLocal !== null) {
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
	
	countdownUpdater = setInterval(() => {
	getNextTime();
	}, 1); 
	
});

Mousetrap.bind(pauseShort, function(e) {
	paused = true;
	logMessage("Core", "Timer was paused");
	document.getElementById("startPage").style.visibility = "visible";
	document.getElementById("container").style.visibility = "hidden";
	clearInterval(countdownUpdater);
});

Mousetrap.bind(happyHourShort, async function(e){
	specialHourHandler('Happy');
});

Mousetrap.bind(randomHourShort, async function(e){
	specialHourHandler('Random');
});

async function specialHourHandler(type){
	if ((type === 'Happy' && happy_hour) || (type === 'Random' && random_hour)){
		specialHourFunc(type)
	}
	else {
		logMessage("Core", `${type} Hour is not available`)
		document.getElementById("SpecialHourText").innerHTML = `${type} Hour error`;
		document.getElementById("SpecialHourText").animate({opacity: [ 0, 1 ], easing: [ 'ease-in', 'ease-out' ],}, 500);
		document.getElementById("SpecialHourText").style.opacity = "1";
		document.getElementById("SpecialHourHTML").animate({top: [ "-200px", "-250px" ], easing: [ 'ease-in', 'ease-out' ],}, 500);
		document.getElementById("SpecialHourHTML").style.top = "-250px";
		await sleep(5000)
		document.getElementById("SpecialHourText").animate({opacity: [ 1, 0 ], easing: [ 'ease-in', 'ease-out' ],}, 500);
		document.getElementById("SpecialHourText").style.opacity = "0";
	}
}

async function specialHourFunc(type){
	let activate = ((type === 'Happy' && !happy_hour_active) || (type === 'Random' && !random_hour_active));
	let toggleText = activate ? 'Activated' : 'Deactivated';

	logMessage("Core", `${type} Hour ${toggleText}`);

	if (type === 'Happy') happy_hour_active = activate;
	if (type === 'Random') random_hour_active = activate;

	let animation = (happy_hour_active || random_hour_active) ? ', url(https://www.dropbox.com/scl/fi/izqqceg8dh9oquq02bqfz/Subathon-Gradient-Animation-Small.webp?rlkey=ggcuagax92dqyovj7lsdyq137&dl=1)' : '';

	document.getElementById("SpecialHourText").innerHTML = `${type} Hour ${toggleText}!`;
	document.getElementById("SpecialHourText").animate({opacity: [ 0, 1 ], easing: [ 'ease-in', 'ease-out' ],}, 500);
	document.getElementById("SpecialHourText").style.opacity = "1";

	document.getElementById("SpecialHourHTML").animate({top: [ "-200px", "-250px" ], easing: [ 'ease-in', 'ease-out' ],}, 500);
	document.getElementById("SpecialHourHTML").style.top = "-250px";

	document.getElementById("container").style.backgroundImage = `-webkit-linear-gradient(-45deg, transparent 33%, rgba(0, 0, 0, .1) 33%, rgba(0,0, 0, .1) 66%, transparent 66%), -webkit-linear-gradient(top, rgba(255, 255, 255, .25), rgba(0, 0, 0, .25))${animation}, -webkit-linear-gradient(left, #0074cc, #a700cc)`;

	await sleep(activate ? 5000 : 10000);

	document.getElementById("SpecialHourText").animate({opacity: [ 1, 0 ], easing: [ 'ease-in', 'ease-out' ],}, 500);
	document.getElementById("SpecialHourText").style.opacity = "0";
}

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
		time = "00:00:00";
		if (differenceTime <= (syncTime * 1000 * -1)) {
		clearInterval(countdownUpdater);
		countdownEnded = true;
		logMessage("Core", "Timer Ended");
		}
	}
	if (!paused){
		window.localStorage.setItem('initialHours', timeFunc.getHours(differenceTime));
		window.localStorage.setItem('initialMinutes', timeFunc.getMinutes(differenceTime));
		window.localStorage.setItem('initialSeconds', timeFunc.getSeconds(differenceTime));

		if (randHappy && happy_hour && !randomHappyBool){
			randomHappyBool = true
			setTimeout(randomHappy,1000)
		}
		if (scheduleHappy && happy_hour && !scheduleHappyBool){
			scheduleHappyBool = true
			scheduleHappyFunc()
		}
	}
	timeText.innerText = time;
	
};

function randomHappy(){
	if (!happy_hour_active){
		if ((getRandomInt(0,10000) == 127)){
			logMessage("RandomHappy","It's not rigged!")
			specialHourFunc()
			setTimeout(specialHourFunc, 3600000)
		}
	setTimeout(randomHappy,1000)
	}
}

function scheduleHappyFunc(){
	let now = new Date()
	if (now.getDay() == scheduleHappyDay){
		if (now.getUTCHours() == scheduleHappyHour){
			if (now.getUTCMinutes() == 00){
				logMessage("Schedule","It's time!")
				specialHourFunc()
				setTimeout(specialHourFunc, 3600000)
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
    let addedTime = Math.floor(s);
    if (!bulk_enabled) {
        endingTimeBeforeCounter = time;
        addedTimeCounter = addedTime;
        addTimeInternal();
        return;
    }
    if (firstSub) {
        firstSub = false;
        endingTimeBeforeCounter = time;
        addedTimeCounter = addedTime;
    } else {
        addedTimeCounter += addedTime;
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
	
	happy_hour_active ? addedTime.classList = "gold" : addedTime.classList = "addedTime";
	
    addedTime.innerText = `+${s}s`;
    document.body.appendChild(addedTime);
    addedTime.style.display = "block";
    await sleep(50);
    addedTime.style.left = `${randomInRange(35, 65)}%`;
    addedTime.style.top = `${randomInRange(15, 40)}%`;
    addedTime.style.opacity = "1";
    while (s > 0){
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
