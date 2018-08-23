export default {
    // checkoutStatus: state => state.checkoutStatus,

    // cartProducts: (state, getters, rootState) => {
    //     return state.added.map(({ id, quantity }) => {
    //         const product = rootState.products.all.find(product => product.id === id)
    //         return {
    //             title: product.title,
    //             price: product.price,
    //             quantity
    //         }
    //     })
    // },

    // cartTotalPrice: (state, getters) => {
    //     return getters.cartProducts.reduce((total, product) => {
    //         return total + product.price * product.quantity
    //     }, 0)
    // }

    getUserDetails: state => state.data,
    getNotificationCount: state => state.notification_count,
    pendingMessages: state => state.pending_messages,
    getLogoutStatus: state => state.logout_user,
    getLoginError: state => state.loading_error_message,
    getSignupSource: state => state.signup_source,
    getLoginSource: state => state.login_source,
    getLoginLoadingState: state => state.loading_state,
    getForgotPasswordUpdateState: state => state.forgot_password_update_state,
    getFirebaseGrowthDBLoadingState: state => state.growth_db_initialized,
    getReadStats: state => state.read_stats,
    getReaderLevel: state => {
        if (state.read_stats.read_count < 3) {
            return 0
        } else if (state.read_stats.read_count < 8) {
            return 1
        } else if (state.read_stats.read_count < 16) {
            return 2
        } else {
            return 3
        }
    },
    getEmailCheckingStatus: state => state.email_check,
    getPostLoginAction: state => state.post_login_action
}
