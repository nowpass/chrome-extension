/**
 * Preset of common websites (big object)
 */
export default {
    /* Social*/
    'facebook.com': {
        user: {
            id: 'email'
        },
        password: {
            id: 'pass'
        },
        form_id: [
            // Could be multiple
            {id: 'login_form'}
        ]
    },

    'twitter.com': {
        user: {
            id: 'signin-email'
        },
        password: {
            id: 'signin-password'
        },
    },

    'linkedin.com': {
        user: {
            id: 'login-email'
        },
        password: {
            id: 'login-password'
        },
    },

    'xing.com': {
        user: {
            name: 'login_form[username]'
        },
        password: {
            name: 'login_form[password]'
        },
    },

    'instagram.com': {
        user: {
            name: 'username'
        },
        password: {
            name: 'password'
        },
    },

    'reddit.com': {
        user: {
            id: 'user_login'
        },
        password: {
            id: 'passwd_login'
        },
    },


    /* Common Websites */
    'accounts.google.com': {
        style: 'multiple',
        user: {
            id: 'identifierId'
        },
        password: {
            name: 'password'
        }
    },
}
