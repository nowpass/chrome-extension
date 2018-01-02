class NowPass {
    constructor(elements) {
        this.password = '';
    }

    setClickedElement(element) {
        // DOM Element!
        this.clickedElement = element;
    }

    setPassword(password) {
        this.password = password;
    }

    fill() {
        const element = this.clickedElement || document.activeElement;

        console.log('Fill called -- data needs to be set first');
        console.log('Inserting into ' );
        console.log(this.clickedElement);

        var tag = this.clickedElement.tagName;


        if (tag === 'INPUT') {
            this.clickedElement.value = 'blabla ' + this.password;
        } else if (tag === 'TEXTAREA') {
            this.clickedElement.innerHTML = 'blablubtext' + this.password;
        } else {
            console.log('Unknown Element ' + tag);
        }

        if (window.Event && window.dispatchEvent) {
            element.dispatchEvent(new Event('input'));
            element.dispatchEvent(new Event('change'));
            element.dispatchEvent(new Event('blur'));
        }

        this.setClickedElement(null);
    }
}

window.nowpass = new NowPass(null);

document.addEventListener('mousedown', function(event){
    if (event.button === 2 && window.nowpass) {
        console.log('setting clicked element');
        window.nowpass.setClickedElement(event.target);
    }
});

// Get Elements on load
chrome.runtime.sendMessage({task: 'getElements'}, function (response) {
    console.log('Chrome response on load ' + response)
});

// Receive message
chrome.runtime.onMessage.addListener(function(msg, _, sendResponse) {
    console.log("Got message from background page: " + JSON.stringify(msg));
    window.nowpass.setPassword(msg.message);
    window.nowpass.fill();
});

