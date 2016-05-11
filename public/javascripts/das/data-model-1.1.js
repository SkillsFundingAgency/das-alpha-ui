(function() {
    var viewModel = function(storedData) {
        var self = this;

        // Properties
        self.systemDate = ko.observable(storedData.systemDate);
        self.displaySystemDate = ko.computed(function() {
            return moment(self.systemDate()).format('Do MMMM YYYY');
        });

        self.quickCreateStartDate = ko.observable('2016-08-10');
        self.quickCreateNumberOfMonths= ko.observable(24);
        self.quickCreateMonthlyAmount = ko.observable();
        self.declarations = ko.observableArray(ko.utils.arrayMap(storedData.declarations, function (declaration) {
            return new declarationViewModel(declaration);
        }));
        self.commitments = ko.observableArray(ko.utils.arrayMap(storedData.commitments, function (commitment) {
            return new commitmentViewModel(commitment);
        }));
        self.statementLines = ko.computed(function() {
            var lines = [];

            for(var i = 0; i < self.declarations().length; i++) {
                lines.push(self.declarations()[i].createStatementLine());
            }

            for(var i = 0; i < self.commitments().length; i++) {
                var commitmentLines = self.commitments()[i].createStatementLines(self.systemDate());
                for(var j = 0; j < commitmentLines.length; j++) {
                    lines.push(commitmentLines[j]);
                }
            }

            return lines.sort(function(a,b){return new Date(b.date) - new Date(a.date);});
        });
        self.displayBalance = ko.computed(function () {
            var total = 0;
            for(var i = 0; i < self.statementLines().length; i++) {
                total += self.statementLines()[i].amount;
            }
            return "£" + total.format();
        });

        self.providers = ko.observableArray(ko.utils.arrayMap(storedData.providers, function (provider) {
            return new providerViewModel(provider);
        }));
        self.filterText = ko.observable();
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
        self.quickCreateDeclarations = function() {
            var date = moment(self.quickCreateStartDate());
            var amount = parseInt(self.quickCreateMonthlyAmount());
            var numberOfMonths = parseInt(self.quickCreateNumberOfMonths());

            for(var i = 0; i < numberOfMonths; i++) {
                self.declarations.push(new declarationViewModel({
                    date: date.format('YYYY-MM-DD'),
                    amount: amount
                }));
                date.add(1, 'M');
            }
        };
        self.addDeclaration = function() {
            self.declarations.push(new declarationViewModel({}));
        };
        self.removeDeclaration = function(declaration) {
            self.declarations.remove(declaration);
        };
        self.clearDeclarations = function() {
            self.declarations.removeAll();
        };
        self.addCommitment = function() {
            self.commitments.push(new commitmentViewModel({}));
        };
        self.removeCommitment = function(commitment) {
            self.commitments.remove(commitment);
        };

        self.addProvider = function() {
            self.providers.push(new providerViewModel());
        };
        self.removeProvider = function(provider) {
            self.providers.remove(provider);
        };

        self.calculateRunningTotal = function(toLineIndex) {
            var runningTotal = 0;
            var lines = self.statementLines();
            for(var i = lines.length - 1; i >= toLineIndex(); i--) {
                runningTotal += lines[i].amount;
            }
            return "£" + runningTotal.format();
        };

        self.saveData = function () {
            storeData(self);
        };
    };
    var declarationViewModel = function(storedData) {
        var self = this;

        if(!storedData) {
            storedData = {amount:0};
        }

        self.date = ko.observable(storedData.date);
        self.amount = ko.observable(storedData.amount);
        self.description = ko.computed(function() {
            return 'Levy declaration ' + moment(self.date()).format('MMMM YYYY');
        });


        self.createStatementLine = function() {
            var amount = parseInt(self.amount());
            if(isNaN(amount)){
                amount=0;
            }
            return {
                date: self.date(),
                displayDate: moment(self.date()).format('Do MMMM YYYY'),
                description: self.description(),
                amount: amount,
                displayCredit: amount > 0 ? '£' + amount.format() : '',
                displayDebit: amount < 0 ? '£' + amount.format() : ''
            };
        }
    };
    var commitmentViewModel = function(storedData){
        var self = this;

        if(!storedData) {
            storedData = {};
        }

        self.provider = ko.observable(storedData.provider);
        self.startDate = ko.observable(storedData.startDate);
        self.endDate = ko.observable(storedData.endDate);
        self.monthlyPayment = ko.observable(storedData.monthlyPayment);

        self.createStatementLines = function(systemDate) {
            var date = moment(self.startDate());
            var commitmentEnd = moment(self.endDate());
            var systemEnd = moment(systemDate);
            var lines = [];

            while(date.isBefore(commitmentEnd) && date.isBefore(systemEnd)) {
                var amount = parseInt(self.monthlyPayment());
                if(isNaN(amount)) {
                    amount = 0;
                }
                amount *= -1;

                lines.push({
                    date: date.format('YYYY-MM-DD'),
                    displayDate: date.format('Do MMMM YYYY'),
                    description: 'Payment to provider ' + self.provider(),
                    amount: amount,
                    displayCredit: amount > 0 ? '£' + amount.format() : '',
                    displayDebit: amount < 0 ? '£' + amount.format() : ''
                });

                date.add(1,'M');
            }

            return lines;
        }
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
            providers: convertProviders(viewModel)
        };

        localStorage.dasData = JSON.stringify(data);
        alert('Saved');
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
            systemDate: '2018-08-20',
            declarations: [

                {date:'2017-02-10',amount:649},
                {date:'2017-03-10',amount:649},
                {date:'2017-04-10',amount:649},
                {date:'2017-05-10',amount:649},
                {date:'2017-06-10',amount:649},
                {date:'2017-07-10',amount:649},
                {date:'2017-08-10',amount:649},
                {date:'2017-09-10',amount:649},
                {date:'2017-10-10',amount:649},
                {date:'2017-11-10',amount:649},
                {date:'2017-12-10',amount:649},
                {date:'2018-01-10',amount:674},
                {date:'2018-02-10',amount:674},
                {date:'2018-03-10',amount:674},
                {date:'2018-04-10',amount:674},
                {date:'2018-05-10',amount:674},
                {date:'2018-06-10',amount:674},
                {date:'2018-07-10',amount:674},
                {date:'2018-08-10',amount:674}
            ],
            commitments: [
                {provider:'Hackney Skills and Training Ltd',startDate:'2017-08-15',endDate:'2020-08-15',monthlyPayment:568}
            ],
            providers: [
                {providerName:"Hackney Skills and Training Ltd",reference:"98HGS3F", standards:"14 Aerospace engineering standards"},
                {providerName:"Learning management, skills and business training Ltd",reference:"HGHN734557", standards:"1 Aerospace engineering standards"},
                {providerName:"Lots of skills Ltd",reference:"NMJ786563", standards:"1 Aerospace engineering standards"}
            ]
        }
    }
})();