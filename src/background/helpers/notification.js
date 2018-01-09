/**
 * Helper for Notifications
 */
export default {
    name: 'notification',

    show(title, message, icon='/static/img/icon-64.png', priority = 0) {
        chrome.notifications.create({
            type: 'basic',
            iconUrl: icon,
            title: title,
            message: message,
            priority: priority
        })
    }
}

