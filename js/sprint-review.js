var sprintApp = angular.module("sprintApp", []);

sprintApp.controller("reviewController", ["$scope", "$http", function($scope, $http){
	
	$scope.summary = {
		newFeatures: 0,
		solvedBugs: 0,
		improvments: 0,
		studies: 0,
		occurrences: 0,
		testCoveragePercentage: 0
	};

	//Stories

	$scope.plannedStoriesDelivered = {
		totalPoints: 0,
		storiesTitles: []
	};

	$scope.middleSprintStoriesDelivered = {
		totalPoints: 0,
		storiesTitles: []
	};

	$scope.plannedStoriesNotDelivered = {
		totalPoints: 0,
		storiesTitles: []
	};

	$scope.middleSprintStoriesNotDelivered = {
		totalPoints: 0,
		storiesTitles: []
	};

	$scope.middleSprintStoriesBlockedNotDelivered = {
		totalPoints: 0,
		storiesTitles: []
	};

	//Ocurrences

	$scope.plannedOccurrencesDelivered = {
		totalPoints: 0,
		occurrencesTitles: []
	};

	$scope.middleSprintOccurrencesDelivered = {
		totalPoints: 0,
		occurrencesTitles: []
	};

	$scope.plannedOccurrencesNotDelivered = {
		totalPoints: 0,
		occurrencesTitles: []
	};

	$scope.middleSprintOccurrencesNotDelivered = {
		totalPoints: 0,
		occurrencesTitles: []
	};

	$scope.middleSprintOccurrencesBlockedNotDelivered = {
		totalPoints: 0,
		occurrencesTitles: []
	};

}]);