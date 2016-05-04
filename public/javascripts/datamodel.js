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

	das.Data = (function(){
		
		self = this;
		self.openingBalance = ko.observable(dataObject.openingBalance);
		self.displayBalance = ko.computed(function(){
			return '£' + parseInt(self.openingBalance()).format();
		})
		self.saveData = function(){
			
			var someit = JSON.stringify(getDataForStorage());
			localStorage.siteData = someit;
		}
		
		function getDataForStorage() {
			return {
				openingBalance: self.openingBalance()
			};
		}
	});



	//store details entered into the form in local storage
	$(document).ready(function () {
		ko.applyBindings(new das.Data());
	});
	
})();