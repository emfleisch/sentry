define([
    'app',
    'routes/eventDetails',
    'routes/groupDetails',
    'routes/index',
    'routes/projectDetails',
    'routes/projectStream',
    'routes/teamDetails',

    // registration via loader
    'filters/formatNumber'
], function(
    app,
    EventDetailsRoute,
    GroupDetailsRoute,
    IndexRoute,
    ProjectDetailsRoute,
    ProjectStreamRoute,
    TeamDetailsRoute
) {
    'use strict';

    app.config(function($locationProvider, $stateProvider, $httpProvider, $urlRouterProvider,
                        $uiViewScrollProvider) {
        // use html5 location rather than hashes
        $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise("/404");

        // revert to default scrolling behavior as autoscroll is broken
        $uiViewScrollProvider.useAnchorScroll();

        // on a 401 (from the API) redirect the user to the login view
        var logInUserOn401 = ['$window', '$q', function($window, $q) {
            function success(response) {
                return response;
            }

            function error(response) {
                if(response.status === 401) {
                    $window.location.href = '/login/';
                    return $q.reject(response);
                }
                else {
                    return $q.reject(response);
                }
            }

            return function(promise) {
                return promise.then(success, error);
            };
        }];
        $httpProvider.responseInterceptors.push(logInUserOn401);

        // and now our routes
        $stateProvider
            .state('event', EventDetailsRoute)
            .state('group', GroupDetailsRoute)
            .state('index', IndexRoute)
            .state('project', ProjectDetailsRoute)
            .state('project.stream', ProjectStreamRoute)
            .state('team', TeamDetailsRoute);
    });
});
