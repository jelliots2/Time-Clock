# Time-Clock
A web-based timeclock app for Sunken Treasure Aquatics, my friends small business. This can also be used for general use, and will be open source so anyone can reference the code, or use this for their own business.


# To-Do

Settings page should allow a user to change their name, password, and email address if needed.

When a user clicks the clock in/clock out button, text should appear telling them what time they clocked in or out

create pages: timesheet, admin, settings

Connect backend and frontend functionality for: clock in and clock out, timesheet, admin privs

Mobile-friendly

# Completed:
log in and register functionality.

# Maybe
Add random message to homepage each day

const messages = [
  "Stay hydrated!",
  "Don't forget to stretch.",
  "You're doing great!",
  "Remember to clock out!",
  "Mondays aren't so bad!"
];

const getMessageOfTheDay = () => {
  const today = new Date();
  const daySeed = today.getFullYear() + today.getMonth() + today.getDate();
  const index = daySeed % messages.length;
  return messages[index];
};

const message = getMessageOfTheDay();

Or each logon

const messages = [
  "You got this!",
  "Welcome back!",
  "Let’s make today productive.",
  "Don’t work too hard 😉",
  "Crush it out there!"
];

const message = messages[Math.floor(Math.random() * messages.length)];

Maybe integrate this into backend so no code needed for new messages