// Happy Hour
var happy_hour = true // set to true or false, to enable/disable the happy hours function
var randHappy = false // only works if happy_hour = true
var scheduleHappy = false // only works if happy_hour = true

// needs scheduleHappy to be true
var scheduleHappyDay = 5 // Weekdays from 0 to 6 from Sunday to Saturday | Default 5 is Friday
var scheduleHappyHour = 18 // Hours in 24 format UTC Time | Default 18 is 20:00 CEST

// Bulk (if you want multiple subs to add to a big sum or each alone)
var bulk_enabled = false

//Shortcuts
var pauseShort = "ctrl+alt+p"
var happyHourShort = "ctrl+alt+h"

// Login Data
var twitch_channel_name = ""
var streamlabs_token = ""
var streamelements_token = ""
var streamloots_token = ""

// Initial Counter Config
var initialHoursConfig = 2
var initialMinutesConfig = 0
var initialSecondsConfig = 0

// Enable/Disable Subs, Bits, Donations, Chests
var subEnable = true
var bitEnable = false
var donationEnable = false
var chestEnable = false

// General Twitch, Streamlabs And StreamElements Config
var seconds_added_per_sub_prime = 60
var seconds_added_per_sub_tier1 = 60
var seconds_added_per_sub_tier2 = 180
var seconds_added_per_sub_tier3 = 480

var seconds_added_per_resub_prime = 60
var seconds_added_per_resub_tier1 = 60
var seconds_added_per_resub_tier2 = 180
var seconds_added_per_resub_tier3 = 480

var seconds_added_per_giftsub_tier1 = 60
var seconds_added_per_giftsub_tier2 = 180
var seconds_added_per_giftsub_tier3 = 480

var min_amount_of_bits = 50
var seconds_added_per_bits = 30

// Streamlabs And StreamElements Config
var min_donation_amount = 1
var seconds_added_per_donation = 30

// Streamloots Config
var min_amount_of_chests = 1
var seconds_added_per_chests = 30


// General Twitch, Streamlabs And StreamElements Config for Happy Hour
var seconds_added_per_sub_prime_happy = 85
var seconds_added_per_sub_tier1_happy = 85
var seconds_added_per_sub_tier2_happy = 300
var seconds_added_per_sub_tier3_happy = 960

var seconds_added_per_resub_prime_happy = 85
var seconds_added_per_resub_tier1_happy = 85
var seconds_added_per_resub_tier2_happy = 300
var seconds_added_per_resub_tier3_happy = 960

var seconds_added_per_giftsub_tier1_happy = 85
var seconds_added_per_giftsub_tier2_happy = 300
var seconds_added_per_giftsub_tier3_happy = 960

var seconds_added_per_bits_happy = 60

// Streamlabs And StreamElements Config
var seconds_added_per_donation_happy = 60

// Streamloots Config
var seconds_added_per_chests_happy = 60
