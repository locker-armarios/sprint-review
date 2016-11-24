var sprintApp = angular.module("sprintApp", []);

sprintApp.controller("reviewController", ["$scope", "$http", function($scope, $http){
	
	$scope.titleWeekReview;

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


	//Pegue deste address para mim https://trello.com/b/o9YfxrIj.json


	var sprintDoneCards = []; 

	$http.get("https://trello.com/b/o9YfxrIj.json")
	.success(function(quadro) {
		console.log("Olha o quadro", quadro);
		$scope.titleWeekReview = (quadro.lists[11].name).substring(8,10);
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
					if(card.idLabels.indexOf("57079f92b0dfecc6d1d041c1") !== -1){
						$scope.middleSprintOccurrencesDelivered.occurrencesTitles.push(card.name);
						$scope.middleSprintOccurrencesDelivered.totalPoints += sumPoints(card.name);
						}				
					else {
						$scope.plannedOccurrencesDelivered.occurrencesTitles.push(card.name);
						$scope.plannedOccurrencesDelivered.totalPoints += sumPoints(card.name);
					}
				}
				else
				{
					//Se nao estava no planejado
					if(card.idLabels.indexOf("57079f92b0dfecc6d1d041c1") !== -1){
						$scope.middleSprintStoriesDelivered.storiesTitles.push(card.name);
						$scope.middleSprintStoriesDelivered.totalPoints += sumPoints(card.name);	
					}			
					else {
						if(card.id !== "5707af5d8bb608cd58aa2ab5"){ //Não incluir o -Definitions of done
							$scope.plannedStoriesDelivered.storiesTitles.push(card.name);
							$scope.plannedStoriesDelivered.totalPoints += sumPoints(card.name);
						}
					}
				}
				
				
			}
			//Na coluna Doing ou Sprint
			else if(card.idList == "57079ef1b8b39c2443769dc3" || card.idList == "57079f06cce9731681c74564")
			{
				//Se for ocorrencia
				if(card.idLabels.indexOf("57079faeb0dfecc6d1d0420f") !== -1)
				{
					//Se nao estava no planejado
					if(card.idLabels.indexOf("57079f92b0dfecc6d1d041c1") !== -1){
						$scope.middleSprintOccurrencesNotDelivered.occurrencesTitles.push(card.name);
						$scope.middleSprintOccurrencesNotDelivered.totalPoints += sumPoints(card.name);				
					}
					else {
						$scope.plannedOccurrencesNotDelivered.occurrencesTitles.push(card.name);
						$scope.plannedOccurrencesNotDelivered.totalPoints += sumPoints(card.name);	
					}
				}
				else
				{
					//Se nao estava no planejado
					if(card.idLabels.indexOf("57079f92b0dfecc6d1d041c1") !== -1){
						$scope.middleSprintStoriesNotDelivered.storiesTitles.push(card.name);
						$scope.middleSprintStoriesNotDelivered.totalPoints += sumPoints(card.name);
					}
					else{
						$scope.plannedStoriesNotDelivered.storiesTitles.push(card.name);
						$scope.plannedStoriesNotDelivered.totalPoints += sumPoints(card.name);
					}
				}

			}
			//Na coluna Blocked
			else if (card.idList == "57079f0301084abe023db3a2") {
				//Se for ocorrencia
				if(card.idLabels.indexOf("57079faeb0dfecc6d1d0420f") !== -1){
					$scope.middleSprintOccurrencesBlockedNotDelivered.occurrencesTitles.push(card.name);
					$scope.middleSprintOccurrencesBlockedNotDelivered.totalPoints += sumPoints(card.name);
				}
				else {
					$scope.middleSprintStoriesBlockedNotDelivered.storiesTitles.push(card.name);
					$scope.middleSprintStoriesBlockedNotDelivered.totalPoints += sumPoints(card.name);
				}
			}
			
		});


	});


}]);

function sumPoints(cardname) {
	var cutCardName = (cardname).substring((cardname).indexOf("(")+1,(cardname).indexOf(")"));
	var intCutCardName = parseFloat(cutCardName);
	if (!isNaN(intCutCardName)) {
		return intCutCardName;
	}
	else {
		return 0;
	}
}