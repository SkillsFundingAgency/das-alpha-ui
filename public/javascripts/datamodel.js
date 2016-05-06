Number.prototype.format = function(n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};


(function() {
	var das = das || {};
	das.makeDefaultData = function() {
		return {
			openingBalance: 0
		};
	};
	
	var dataObject = localStorage.siteData ? JSON.parse(localStorage.siteData) : das.makeDefaultData();
	
	das.StatementEntry = (function(self){
			 self = this;
			 self.date = ko.observable();
			 self.description = ko.observable();
			 self.amount = ko.observable(0);
		});
	
	
	das.Data = (function(){
		
		self = this;
		
		self.systemDate = ko.observable(dataObject.systemDate);
		
		
		var statementLines = ko.utils.arrayMap(dataObject.statementLines, function(line) {
			return { 
				date: ko.observable(line.date),
				description: ko.observable(line.description),
				amount: ko.observable(line.amount) 
				}; 
		});
		
		
		self.statementLines = ko.observableArray(statementLines);
		
		self.displayBalance = ko.computed(function(){
			var total = 0;
			ko.utils.arrayForEach(self.statementLines(), function(item) {
				total +=  parseInt(item.amount());
			});
			
			return '£' + parseInt(total).format();
		})
		self.saveData = function(){
			var someit = JSON.stringify(getDataForStorage());
			localStorage.siteData = someit;
		}

		self.addLine = function() { 
			self.statementLines.push(new das.StatementEntry()) 
		}
        self.removeLine = function(line) { self.statementLines.remove(line) };

		
		function getDataForStorage() {
			var statement =[];
			for(var i=0; i< self.statementLines().length;i++)
			{
				var statementObject = {
					description : self.statementLines()[i].description(),
					amount : self.statementLines()[i].amount(),
					date : self.statementLines()[i].date()
				}
				statement.push(statementObject);
			}
			
			return {
				statementLines: statement,
				systemDate : self.systemDate()
			};
		}
	});

	

	//store details entered into the form in local storage
	$(document).ready(function () {
		ko.applyBindings(new das.Data());
	});
	
})();