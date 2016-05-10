(function() {
    var viewModel = function(storedData) {
        var self = this;

        // Properties
        self.systemDate = ko.observable(storedData.systemDate);
        self.statementLines = ko.observableArray(ko.utils.arrayMap(storedData.statementLines.sort(function(a,b){return new Date(a.date) - new Date(b.date);}), function(line) {
            return new statementLineViewModel(line);
        }));
        self.displayBalance = ko.computed(function () {
            var total = 0;
            ko.utils.arrayForEach(self.statementLines(), function(item) {
                total +=  item.amount();
            });
            return "£" + total.format();
        });
        self.filterText = ko.observable();
        self.providers = ko.observableArray(ko.utils.arrayMap(storedData.providers, function (provider) {
            return new providerViewModel(provider);
        }));
        self.filteredProviders = ko.computed(function () {
            if (!self.filterText()) {
                return self.providers();
            } else {
                return ko.utils.arrayFilter(self.providers(), function (provider) {
                    return provider.providerName().toLowerCase().indexOf(self.filterText().toLowerCase()) > -1;
                });
            }
        });

        // Methods
        self.saveData = function () {
            console.log('saveData');
            storeData(self);
        };
        self.addLine = function () {
            self.statementLines.push(new statementLineViewModel());
        };
        self.removeLine = function (line) {
            self.statementLines.remove(line);
        };
        self.addProvider = function() {
            self.providers.push(new providerViewModel());
        }
        self.removeProvider = function(provider) {
            self.providers.remove(provider);
        }
    };
    var statementLineViewModel = function(storedData) {
        var self = this;

        if(!storedData) {
            storedData = {amount:0};
        }

        self.date = ko.observable(storedData.date);
        self.description = ko.observable(storedData.description);
        self.amount = ko.observable(parseInt(storedData.amount));
        self.displayAmount = ko.computed(function(){
            var total = self.amount();
            if(total <= 0){
                total = total * -1;
            }
            return '£' + total.format();
        });
    };
    var providerViewModel =function(storedData) {
        var self = this;

        if(!storedData) {
            storedData = {};
        }

        self.providerName = ko.observable(storedData.providerName);
        self.reference = ko.observable(storedData.reference);
        self.standards = ko.observable(storedData.standards);
    }


    $(document).ready(function () {
        ko.applyBindings(new viewModel(getStoredData()));
    });

    function storeData(viewModel) {
        var data = {
            systemDate: viewModel.systemDate(),
            statementLines: convertStatementLines(viewModel),
            providers: convertProviders(viewModel)
        };

        localStorage.dasData = JSON.stringify(data);
        alert('Saved');
    }
    function convertStatementLines(viewModel) {
        var vmLines = viewModel.statementLines();
        var lines = [];
        for(var i = 0; i < vmLines.length; i++) {
            var line = vmLines[i];
            lines.push({
                date: line.date(),
                description: line.description(),
                amount: line.amount()
            });
        }
        return lines;
    }
    function convertProviders(viewModel) {
        var vmProviders = viewModel.providers();
        var providers = [];
        for(var i = 0; i < vmProviders.length; i++) {
            var provider = vmProviders[i];
            providers.push({
                providerName: provider.providerName(),
                reference: provider.reference(),
                standards: provider.standards()
            });
        }
        return providers;
    }
    function getStoredData() {
        if(!localStorage.dasData) {
            return makeDefaultData();
        }
        return JSON.parse(localStorage.dasData);
    }

    function makeDefaultData() {
        return {
            systemDate: moment().format('YYYY-MM-DD'),
            statementLines: [
                {
                    date: moment().format('YYYY-MM-DD'),
                    description: 'Levy declaration',
                    amount: 130269
                },
                {
                    date: moment().format('YYYY-MM-DD'),
                    description: 'Payment to provider XXX',
                    amount: -1325
                }
            ],
            providers: [
                {providerName:"Hackney Skills and Training Ltd",reference:"98HGS3F", standards:"14 Aerospace engineering standards"},
                {providerName:"Learning management, skills and business training Ltd",reference:"HGHN734557", standards:"1 Aerospace engineering standards"},
                {providerName:"Lots of skills Ltd",reference:"NMJ786563", standards:"1 Aerospace engineering standards"}
            ]
        }
    }
})();