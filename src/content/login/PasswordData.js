/**
 * Just fill the clicked Element
 *
 * @param params {object}
 * @returns {boolean}
 */
export default function(params) {
    let login = params.login;
    let clickedElement = params.clickedElement;

    let tag = clickedElement.tagName;

    if (tag === 'INPUT') {
        clickedElement.value = login.password;
    } else if (tag === 'TEXTAREA') {
        clickedElement.innerHTML = login.password;
    } else {
        console.log('Unknown clickedElement ' + tag);
    }

    // Make sure the input gets updated
    if (window.Event && window.dispatchEvent) {
        clickedElement.dispatchEvent(new Event('input'));
        clickedElement.dispatchEvent(new Event('change'));
        clickedElement.dispatchEvent(new Event('blur'));
    }

    return true;
}
