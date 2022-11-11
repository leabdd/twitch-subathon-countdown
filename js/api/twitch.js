if (twitch_channel_name !== "") {
    const client = new tmi.client({
        connection: {
            reconnect: true,
            secure: true,
        },
        channels: [twitch_channel_name],
    });

    client.connect();
    logMessage("Twitch", `Client Connected`);

    client.on('subscription', (channel, username, methods, message, userstate) => {
        if (!countdownEnded && subEnable) {
            if(!happy_hour_active){
                switch (methods['plan']) {
                    case "Prime":
                        addTime(endingTime, seconds_added_per_sub_prime);
                        logMessage("Twitch", `Added ${seconds_added_per_sub_prime} Seconds Because ${username} Subscribed With Prime`);
                        break;
                    case "1000":
                        addTime(endingTime, seconds_added_per_sub_tier1);
                        logMessage("Twitch", `Added ${seconds_added_per_sub_tier1} Seconds Because ${username} Subscribed With Tier 1`);
                        break;
                    case "2000":
                        addTime(endingTime, seconds_added_per_sub_tier2);
                        logMessage("Twitch", `Added ${seconds_added_per_sub_tier2} Seconds Because ${username} Subscribed With Tier 2`);
                        break;
                    case "3000":
                        addTime(endingTime, seconds_added_per_sub_tier3);
                        logMessage("Twitch", `Added ${seconds_added_per_sub_tier3} Seconds Because ${username} Subscribed With Tier 3`);
                        break;
                }
            }
            else if(happy_hour_active){
                switch (methods['plan']) {
                    case "Prime":
                        addTime(endingTime, seconds_added_per_sub_prime_happy);
                        logMessage("Twitch", `Added ${seconds_added_per_sub_prime_happy} Seconds Because ${username} Subscribed With Prime`);
                        break;
                    case "1000":
                        addTime(endingTime, seconds_added_per_sub_tier1_happy);
                        logMessage("Twitch", `Added ${seconds_added_per_sub_tier1_happy} Seconds Because ${username} Subscribed With Tier 1`);
                        break;
                    case "2000":
                        addTime(endingTime, seconds_added_per_sub_tier2_happy);
                        logMessage("Twitch", `Added ${seconds_added_per_sub_tier2_happy} Seconds Because ${username} Subscribed With Tier 2`);
                        break;
                    case "3000":
                        addTime(endingTime, seconds_added_per_sub_tier3_happy);
                        logMessage("Twitch", `Added ${seconds_added_per_sub_tier3_happy} Seconds Because ${username} Subscribed With Tier 3`);
                        break;
                }
            }
            if (!users.includes(username)) {
                users.push(username);
            }
        }
    });

    client.on('resub', (channel, username, months, message, userstate, methods) => {
        if (!countdownEnded && subEnable) {
            if(!happy_hour_active){
                switch (methods['plan']) {
                    case "Prime":
                        addTime(endingTime, seconds_added_per_resub_prime);
                        logMessage("Twitch", `Added ${seconds_added_per_resub_prime} Seconds Because ${username} ReSubscribed With Prime`);
                        break;
                    case "1000":
                        addTime(endingTime, seconds_added_per_resub_tier1);
                        logMessage("Twitch", `Added ${seconds_added_per_resub_tier1} Seconds Because ${username} ReSubscribed With Tier 1`);
                        break;
                    case "2000":
                        addTime(endingTime, seconds_added_per_resub_tier2);
                        logMessage("Twitch", `Added ${seconds_added_per_resub_tier2} Seconds Because ${username} ReSubscribed With Tier 2`);
                        break;
                    case "3000":
                        addTime(endingTime, seconds_added_per_resub_tier3);
                        logMessage("Twitch", `Added ${seconds_added_per_resub_tier3} Seconds Because ${username} ReSubscribed With Tier 3`);
                        break;
                }
            }
            else if(happy_hour_active){
                switch (methods['plan']) {
                    case "Prime":
                        addTime(endingTime, seconds_added_per_resub_prime_happy);
                        logMessage("Twitch", `Added ${seconds_added_per_resub_prime_happy} Seconds Because ${username} ReSubscribed With Prime`);
                        break;
                    case "1000":
                        addTime(endingTime, seconds_added_per_resub_tier1_happy);
                        logMessage("Twitch", `Added ${seconds_added_per_resub_tier1_happy} Seconds Because ${username} ReSubscribed With Tier 1`);
                        break;
                    case "2000":
                        addTime(endingTime, seconds_added_per_resub_tier2_happy);
                        logMessage("Twitch", `Added ${seconds_added_per_resub_tier2_happy} Seconds Because ${username} ReSubscribed With Tier 2`);
                        break;
                    case "3000":
                        addTime(endingTime, seconds_added_per_resub_tier3_happy);
                        logMessage("Twitch", `Added ${seconds_added_per_resub_tier3_happy} Seconds Because ${username} ReSubscribed With Tier 3`);
                        break;
                }
            }
            if (!users.includes(username)) {
                users.push(username);
            }
        }
    });

    client.on('subgift', (channel, username, months, recipient, methods, userstate) => {
        if (!countdownEnded && subEnable) {
            if(!happy_hour_active){
                switch (methods['plan']) {
                    case "Prime":
                        addTime(endingTime, seconds_added_per_giftsub_prime);
                        logMessage("Twitch", `Added ${seconds_added_per_giftsub_prime} Seconds Because ${username} gifted Sub With Prime`);
                        break;
                    case "1000":
                        addTime(endingTime, seconds_added_per_giftsub_tier1);
                        logMessage("Twitch", `Added ${seconds_added_per_giftsub_tier1} Seconds Because ${username} gifted Sub With Tier 1`);
                        break;
                    case "2000":
                        addTime(endingTime, seconds_added_per_giftsub_tier2);
                        logMessage("Twitch", `Added ${seconds_added_per_giftsub_tier2} Seconds Because ${username} gifted Sub With Tier 2`);
                        break;
                    case "3000":
                        addTime(endingTime, seconds_added_per_giftsub_tier3);
                        logMessage("Twitch", `Added ${seconds_added_per_giftsub_tier3} Seconds Because ${username} gifted Sub With Tier 3`);
                        break;
                }
            }
            else if(happy_hour_active){
                switch (methods['plan']) {
                    case "Prime":
                        addTime(endingTime, seconds_added_per_giftsub_prime_happy);
                        logMessage("Twitch", `Added ${seconds_added_per_giftsub_prime_happy} Seconds Because ${username} gifted Sub With Prime`);
                        break;
                    case "1000":
                        addTime(endingTime, seconds_added_per_giftsub_tier1_happy);
                        logMessage("Twitch", `Added ${seconds_added_per_giftsub_tier1_happy} Seconds Because ${username} gifted Sub With Tier 1`);
                        break;
                    case "2000":
                        addTime(endingTime, seconds_added_per_giftsub_tier2_happy);
                        logMessage("Twitch", `Added ${seconds_added_per_giftsub_tier2_happy} Seconds Because ${username} gifted Sub With Tier 2`);
                        break;
                    case "3000":
                        addTime(endingTime, seconds_added_per_giftsub_tier3_happy);
                        logMessage("Twitch", `Added ${seconds_added_per_giftsub_tier3_happy} Seconds Because ${username} gifted Sub With Tier 3`);
                        break;
                }
            }
            if (!users.includes(username)) {
                users.push(username);
            }
        }
    });

    client.on('cheer', (channel, userstate, message) => {
        if (!countdownEnded && bitEnable) {
            if(!happy_hour_active){
                if (userstate.bits >= min_amount_of_bits) {
                    let times = Math.floor(userstate.bits/min_amount_of_bits);
                    addTime(endingTime, seconds_added_per_bits * times);
                    logMessage("Twitch", `Added ${seconds_added_per_bits * times} Seconds Because ${userstate['display-name']} Donated ${userstate.bits} Bits`);
                    if (!users.includes(userstate['display-name'])) {
                        users.push(userstate['display-name']);
                    }
                }
            }
            if(happy_hour_active){
                if (userstate.bits >= min_amount_of_bits) {
                    let times = Math.floor(userstate.bits/min_amount_of_bits);
                    addTime(endingTime, seconds_added_per_bits_happy * times);
                    logMessage("Twitch", `Added ${seconds_added_per_bits_happy * times} Seconds Because ${userstate['display-name']} Donated ${userstate.bits} Bits`);
                    if (!users.includes(userstate['display-name'])) {
                        users.push(userstate['display-name']);
                    }
                }
            }
        }
    });
}
