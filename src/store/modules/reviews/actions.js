import DataAccessor from '@/utils/DataAccessor'

export default {

    fetchPratilipiReviews({ commit, state }, { resultCount, pratilipiId, userPratilipiData }) {
        commit('setReviewLoadingTrue');
        DataAccessor.getReviewList(pratilipiId, state.cursor, null, resultCount, function(reviewsData) {
            if (reviewsData.status === 200) {
                let userReviewFetched = false;
                reviewsData.response.reviewList.forEach((eachReview) => {
                    if (eachReview.userId == userPratilipiData.userId) {
                        userReviewFetched = true;
                    }
                });
                if ( !userReviewFetched && userPratilipiData.reviewDateMillis != null ) {
                    commit('setReviewLoadingSuccess', { data: reviewsData.response, userReview: userPratilipiData });
                }
                else {
                    commit('setReviewLoadingSuccess', { data: reviewsData.response, userReview: null });
                }
            } else {
                commit('setReviewLoadingError');
            }
        });
    },

    loadMoreReviews({ commit, state }, { resultCount, pratilipiId }) {
        commit('setMoreReviewLoadingTrue');
        DataAccessor.getReviewList(pratilipiId, state.cursor, null, resultCount, function(data) {
            if (data.status === 200) {
                commit('setMoreReviewLoadingSuccess', data.response);
            } else {
                commit('setMoreReviewLoadingError');
            }
        });
    },

    loadCommentsOfReview({ commit, state }, { resultCount, parentId }) {
        commit('setCommentLoadingTrue', parentId);
        DataAccessor.getReviewCommentList(parentId, null, resultCount, function(data) {
            if (data.status === 200) {
                commit('setCommentLoadingSuccess', { data: data.response, parentId });
            } else {
                commit('setCommentLoadingError', parentId);
            }
        });
    },

    likeOrDislikeReview({ commit, state }, userPratilipiId) {

        const concernedReview = state.data.find((eachReview) => eachReview.userPratilipiId ===  userPratilipiId);
        DataAccessor.likeOrDislikeReview(userPratilipiId, !concernedReview.isLiked, function(data) {
            commit('setReviewLikeSuccess', { userPratilipiId, isLiked: !concernedReview.isLiked });
        });
    },

    likeOrDislikeComment({ commit, state }, { commentId, isLiked }) {
        DataAccessor.likeOrDislikeComment(commentId, !isLiked, function(data) {
            commit('setCommentLikeSuccess', { commentId, isLiked: !isLiked });
        });
    },

    updateRatingInStore({ commit, state, dispatch }, { review, pratilipiId, pageName, rating }) {
        if (pageName === 'pratilipipage') {
            dispatch('pratilipipage/updateRatingInStore', { review, pratilipiId, rating }, { root: true });
        }

        if (pageName === 'readerpage') {
            dispatch('readerpage/updateRatingInStore', { review, pratilipiId, rating }, { root: true });
        }

        if (pageName === 'readerv2page') {
            dispatch('readerv2page/updateRatingInStore', { review, pratilipiId, rating }, { root: true });
        }
    },

    setPratilipiRating({ commit, state, dispatch }, { rating, pratilipiId, pageName }) {
        if (pageName === 'pratilipipage') {
            dispatch('pratilipipage/setPratilipiRating', { rating, pratilipiId }, { root: true });
        }

        if (pageName === 'readerpage') {
            dispatch('readerpage/setPratilipiRating', { rating, pratilipiId }, { root: true });
        }
        if (pageName === 'readerv2page') {
            dispatch('readerv2page/setPratilipiRating', { rating, pratilipiId }, { root: true });
        }
        commit('alert/triggerAlertView', '__("success_generic_message")', { root: true });
        setTimeout(() => {
            commit('alert/triggerAlertHide', null, { root: true });
        }, 3000);
    },

    saveOrUpdateReview({ commit, state, dispatch }, { review, pratilipiId, pageName, rating }) {
        if (pageName === 'pratilipipage') {
            if (rating === null || rating === undefined) {
                commit('alert/triggerAlertView', 'need_rating', { root: true });
                setTimeout(() => {
                    commit('alert/triggerAlertHide', null, { root: true });
                }, 3000);
                console.log('okay, i wont give review');
                return;
            }
            commit('setPratilipiReviewUpdateLoading');
            DataAccessor.createOrUpdateReview(pratilipiId, rating, review, function(successData) {
                commit('setPratilipiReviewRatingUpdateSuccess', successData);
                commit('pratilipipage/setPratilipiReviewRatingUpdateSuccess', {review : review, rating: rating}, { root: true });
            }, (errorData) => {
                commit('setPratilipiReviewUpdateError');
            });
        }

        if (pageName === 'readerpage') {
            dispatch('readerpage/saveOrUpdateReview', { review, pratilipiId, rating }, { root: true });
        }

        if (pageName === 'readerv2page') {
            dispatch('readerv2page/saveOrUpdateReview', { review, pratilipiId, rating }, { root: true });
        }
    },

    createComment({ commit, state }, { userPratilipiId, content }){
        DataAccessor.createOrUpdateReviewComment(userPratilipiId, null, content, function(data) {
            commit('addNewCommentSuccess', { userPratilipiId, data });
        }, () => {
            commit('addNewCommentError');
        });
    },

    deleteReview({ commit, state, dispatch }, { pratilipiId, pageName }) {
        if (pageName === 'pratilipipage') {
            commit('setPratilipiReviewUpdateLoading');
            DataAccessor.deleteReview(pratilipiId, function(successData) {
                commit('setPratilipiReviewDeleteSuccess', successData);
                commit('pratilipipage/setPratilipiReviewUpdateSuccess', '', { root: true });
                commit('pratilipipage/setPratilipiRatingUpdateSuccess', null, { root: true });
            }, (errorData) => {
                commit('setPratilipiReviewUpdateError');
            });
        }

        if (pageName === 'readerpage') {
            dispatch('readerpage/deleteReview', pratilipiId, { root: true });
        }

        if (pageName === 'readerv2page') {
            dispatch('readerv2page/deleteReview', pratilipiId, { root: true });
        }
    },

    updateComment({ commit, state }, { commentId, content }){
        DataAccessor.createOrUpdateReviewComment(null, commentId, content, function(data) {
            commit('updateCommentSuccess', { commentId, data });
        }, () => {
            commit('updateCommentError');
        });
    },

    deleteComment({ commit, state }, commentId) {
        DataAccessor.deleteComment(commentId, (data) => {
            commit('deleteCommentSuccess', { commentId });
        }, (error) => {
            console.log('failed to delete comment');
        });
    }
}
