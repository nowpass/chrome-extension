/**
 * Preset (big object)
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
