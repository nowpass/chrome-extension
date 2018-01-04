/**
 * Helper for Notifications
 */
export default {
    name: 'notification',

    show(title, message, icon='/static/img/48-nowpass.png', priority=0) {
        chrome.notifications.create({
            type: 'basic',
            iconUrl: icon,
            title: title,
            message: message,
            priority: priority
        })
    }
}

