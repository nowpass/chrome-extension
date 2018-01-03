/**
 * Entry point in to the frontend application (run in the website)
 */

import Login from './login/Login'
import Generator from './generator/Generator'

// Store / Global item
window.nowpass = {
    clickedElement: null
};

// Login events
window.nowpass.login = new Login();
window.nowpass.generator = new Generator();

// Set the global clicked item (to position popups and insert items)
document.addEventListener('mousedown', function(event){
    if (event.button === 2 && window.nowpass) {
        window.nowpass.clickedElement = event.target;
    }
});
