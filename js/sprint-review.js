var sprintApp = angular.module("sprintApp", []);

sprintApp.controller("reviewController", ["$scope", "$http", function($scope, $http){
	
	$scope.summary = {
		newFeatures: 3,
		solvedBugs: 2,
		improvments: 0,
		studies: 0,
		occurrences: 2,
		testCoveragePercentage: 59
	};

	//Stories

	$scope.plannedStoriesDelivered = {
		totalPoints: 16,
		storiesTitles: []
	};

	$scope.middleSprintStoriesDelivered = {
		totalPoints: 1.5,
		storiesTitles: []
	};

	$scope.plannedStoriesNotDelivered = {
		totalPoints: 5,
		storiesTitles: []
	};

	$scope.middleSprintStoriesNotDelivered = {
		totalPoints: 0,
		storiesTitles: []
	};

	$scope.middleSprintStoriesBlockedNotDelivered = {
		totalPoints: 2,
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
		totalPoints: 4,
		occurrencesTitles: []
	};


	//Pegue deste address para mim https://trello.com/b/o9YfxrIj.json


	var sprintDoneCards = []; 

	$http.get("https://trello.com/b/o9YfxrIj.json")
	.success(function(quadro) {
		console.log("Olha o quadro", quadro);
		quadro.cards.forEach(function(card){

			//Sprint 57079ef1b8b39c2443769dc3
			//Doing 57079f06cce9731681c74564
			//Sprint Done 57c98b47dfbcbfea5e898ef5
			if (card.closed) 				
				return;

			//Se estiver na coluna Sprint Done
			if (card.idList == "57c98b47dfbcbfea5e898ef5")
			{
				//Se for ocorrencia
				if(card.idLabels.indexOf("57079faeb0dfecc6d1d0420f") !== -1)
				{
					//Se nao estava no planejado
					if(card.idLabels.indexOf("57079f92b0dfecc6d1d041c1") !== -1)
						$scope.middleSprintOccurrencesDelivered.occurrencesTitles.push(card.name);				
					else
						$scope.plannedOccurrencesDelivered.occurrencesTitles.push(card.name)	
				}
				else
				{
					//Se nao estava no planejado
					if(card.idLabels.indexOf("57079f92b0dfecc6d1d041c1") !== -1)
						$scope.middleSprintStoriesDelivered.storiesTitles.push(card.name);				
					else
						$scope.plannedStoriesDelivered.storiesTitles.push(card.name)	
				}
				
				
			}
			//Na coluna Doing ou Sprint
			else if(card.idList == "57079ef1b8b39c2443769dc3" || card.idList == "57079f06cce9731681c74564")
			{
				//Se for ocorrencia
				if(card.idLabels.indexOf("57079faeb0dfecc6d1d0420f") !== -1)
				{
					//Se nao estava no planejado
					if(card.idLabels.indexOf("57079f92b0dfecc6d1d041c1") !== -1)
						$scope.middleSprintOccurrencesNotDelivered.occurrencesTitles.push(card.name);				
					else
						$scope.plannedOccurrencesNotDelivered.occurrencesTitles.push(card.name)	
				}
				else
				{
					//Se nao estava no planejado
					if(card.idLabels.indexOf("57079f92b0dfecc6d1d041c1") !== -1)
						$scope.middleSprintStoriesNotDelivered.storiesTitles.push(card.name);
					else
						$scope.plannedStoriesNotDelivered.storiesTitles.push(card.name)
				}

			}
			//Na coluna Blocked
			else if (card.idList == "57079f0301084abe023db3a2") {
				//Se for ocorrencia
				if(card.idLabels.indexOf("57079faeb0dfecc6d1d0420f") !== -1)
					$scope.middleSprintOccurrencesBlockedNotDelivered.occurrencesTitles.push(card.name);
				else
					$scope.middleSprintStoriesBlockedNotDelivered.storiesTitles.push(card.name)
			}


		});


	});


}]);