/**
 * Entry point in to the frontend application (run in the website)
 */

import Login from './login/Login'
import Generator from './generator/Generator'
import Store from "./store/Store";

// Store / Global item
window.nowpass = {
    clickedElement: null
};

// Listen to store message
window.nowpass.store = new Store();

// Context events
window.nowpass.login = new Login();
window.nowpass.generator = new Generator();

// Set the global last clicked (right mouse) item (to position popups and insert items)
document.addEventListener('mousedown', function(event){
    if (event.button === 2 && window.nowpass) {
        window.nowpass.clickedElement = event.target;
    }
});

// Inform the backend we are set
chrome.extension.sendMessage({type: 'notification', options: {message: "ready"}}, function(response) {
    // We don't respond to generic notifications here atm
});
