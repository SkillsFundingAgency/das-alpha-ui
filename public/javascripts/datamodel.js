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
			 self.displayAmount = ko.computed(function(){
				var total = self.amount;
				return '£' + parseInt(total).format();
		     });
			 self.runningTotal = ko.computed(function(){
				var total = 0;
				ko.utils.arrayForEach(self.parent.statementLines(), function(item, index) {
					
				  if (index < self.index) {
					total += item.amount();
				  }
				});
				return total; 
			 });
		});
	
	das.ProviderEntry = (function(data){
		providerName = data.providerName;
		reference = data.reference;
		standards = data.standards;
	});
	
	das.Data = (function(){
		
		self = this;
		
		self.systemDate = ko.observable(dataObject.systemDate);
		
		
		var statementLines = ko.utils.arrayMap(dataObject.statementLines.sort(function(a,b){return new Date(a.date) - new Date(b.date);}), function(line) {
			return { 
				date: ko.observable(line.date),
				description: ko.observable(line.description),
				amount: ko.observable(line.amount),
				displayAmount : ko.computed(function(){
					var total = line.amount;
					if(total <=0){
						total = total * -1;
					}
					return '£' + parseInt(total).format();
				}),
				runningTotal : ko.computed(function(){
					var total = 0;
					var index = dataObject.statementLines.indexOf(line);
					
					if(index === 0 ){
						return "£0";
					}
					
					for(var i=0; i<=index; i++ ){
						total +=  parseInt(dataObject.statementLines[i].amount);	
					}					
					return '£' + parseInt(total).format();
				})
			}
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
		  
		self.filterText = ko.observable();
			
		
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
		
		var providers = [
				{providerName:"Hackney Skills and Training Ltd",providerReferemce:"98HGS3F", standards:"14 Aerospace engineering standards"},
				{providerName:"Learning management, skills and business training Ltd",providerReferemce:"HGHN734557", standards:"1 Aerospace engineering standards"},
				{providerName:"Lots of skills Ltd",providerReferemce:"NMJ786563", standards:"1 Aerospace engineering standards"},
			];
		
		console.log(providers);
		
		self.searchItems = ko.utils.arrayMap(providers, function(provider){
			return {
				providerName : provider.providerName,
				reference: provider.providerReferemce,
				standards: provider.standards
			}
		});
		
		
			
		self.filteredProviders = ko.computed(function () {
			 
			if (!self.filterText()) {
				return self.searchItems;
			 } else {
				 return ko.utils.arrayFilter(self.searchItems, function (provider) {
					 return provider.providerName.toLowerCase().indexOf(self.filterText().toLowerCase()) > -1;
				});
			 }
		});
		
		
		
		
	});

	
	
	

	//store details entered into the form in local storage
	$(document).ready(function () {
		ko.applyBindings(new das.Data());
	});
	
})();