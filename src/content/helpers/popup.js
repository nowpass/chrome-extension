/**
 * Popup helper
 *
 * TODO make class, could be called multiple times
 */
export default {
    POPUP_WIDTH: '400px',
    POPUP_HEIGHT: '350px',

    /**
     * Show an Popup containing an iframe and insert it at the end of the body
     *
     * @param element {Node}
     * @param iframeSrc {string} The src to be included
     */
    showIframe(element, iframeSrc) {
        // Hardcoded for now
        let elementPosition = {top: -35, right: 20};

        if (element) {
            elementPosition = this.getElementPositions(element);
        }

        // Create a new container
        let div = document.createElement("div");
        div.id = 'nowpass-overlay-' + Math.round(Math.random() * 1000);
        div.style.position = 'absolute';

        // Hardcoded for now
        div.style.top = (elementPosition.top + 35) + 'px';

        if (elementPosition.left) {
            div.style.left = (elementPosition.left + 20) + 'px';
        }

        if (elementPosition.right) {
            div.style.right = (elementPosition.right) + 'px';
        }

        div.style.width = this.POPUP_WIDTH;
        div.style.height = this.POPUP_HEIGHT;
        div.style.zIndex = '2147483647';
        div.style.overflow = 'hidden';
        div.style.borderRadius = '5px';
        div.style.border = '1px solid #ccc';

        let iframe = document.createElement('iframe');

        iframe.src = iframeSrc;

        // iframe style
        iframe.style.width = this.POPUP_WIDTH;
        iframe.style.height = this.POPUP_HEIGHT;
        iframe.style.border = 'none';

        div.append(iframe);

        // Append to body
        this.popup = document.body.appendChild(div);
    },

    /**
     * Close a popup
     */
    closePopup() {
        if (!this.popup) {
            return;
        }

        try {
            document.body.removeChild(this.popup);
        } catch (err) {
            // Ignore, blur event issue that can happen
        }
    },

    /**
     * Get the positions of the element where we are showing the dialog
     *
     * @param element
     * @returns {{top: number, left: number}}
     */
    getElementPositions(element) {
        let box = element.getBoundingClientRect();
        let body = document.body;
        let docEl = document.documentElement;

        let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        let scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

        let clientTop = docEl.clientTop || body.clientTop || 0;
        let clientLeft = docEl.clientLeft || body.clientLeft || 0;

        let top  = box.top +  scrollTop - clientTop;
        let left = box.left + scrollLeft - clientLeft;

        return { top: Math.round(top), left: Math.round(left) };
    }
}
