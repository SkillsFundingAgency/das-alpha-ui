var ctx = document.getElementById("myChart").getContext("2d");

var plannedItems = [];

_.each(selected, function(item){
  var found = _.findWhere(standardsData, {Code: item.id});
  plannedItems.push({
    Code: item.id,
    Quantity: item.qty,
    Name: found.Name,
    Price: found.Price
  });
});

var data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "Planned costs",
      fillColor: "rgba(0,255,0,0.2)",
      strokeColor: "rgba(0,255,0,1)",
      pointColor: "rgba(0,255,0,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      label: "Levy",
      fillColor: "rgba(0,0,255,0.2)",
      strokeColor: "rgba(0,0,255,1)",
      pointColor: "rgba(0,0,255,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      label: "Balance",
      fillColor: "rgba(255,0,0,0.2)",
      strokeColor: "rgba(255,0,0,1)",
      pointColor: "rgba(255,0,0,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  ]
};

var myLineChart = new Chart(ctx).Line(data, {
  bezierCurve: false
});

function formatCurrency(value) {
  return "£" + value.toFixed(2);
}

function formatNumber(value) {
  return "" + value.toFixed(2);
}

var ForecastLine = function(parent, index, month, planned, payroll) {
  var self = this;
  self.parent = parent;
  self.index = index;
  self.month = ko.observable(month);
  self.planned = ko.observable(planned);
  self.payroll = ko.observable(payroll); //.extend({refreshChart: parent});
  self.levy = ko.pureComputed(function() {
    return self.payroll() >= 250000 ? (((self.payroll() - 250000) * 0.005 * 0.81) * 1.1) : 0;
  });
  self.levyFormatted = ko.pureComputed(function() {
    return formatCurrency(self.levy());
  });
  self.difference = ko.pureComputed(function() {
    return (self.levy() - self.planned());
  });
  self.differenceFormatted = ko.pureComputed(function() {

    return formatCurrency(self.difference());
  });
  self.balance = ko.pureComputed(function() {
    var total = 0;
    ko.utils.arrayForEach(self.parent.lines(), function(item, index) {
      if (index < self.index) {
        total += item.difference();
      }
    });
    return total;
  });
  self.balanceFormatted = ko.pureComputed(function() {
    return formatCurrency(self.balance());
  });
};

var Forecast = function(planned, payroll, chart) {
  // Stores an array of lines, and from these, can work out the grandTotal
  var self = this;
  var monthlyPlanned = planned ? formatNumber(planned / 12) : 0;
  var monthlyPayroll = payroll ? formatNumber(payroll / 12) : 0;
  self.lines = ko.observableArray([new ForecastLine(self, 1, 'Jan', monthlyPlanned, monthlyPayroll), new ForecastLine(self, 2, 'Feb', monthlyPlanned, monthlyPayroll), new ForecastLine(self, 3, 'Mar', monthlyPlanned, monthlyPayroll), new ForecastLine(self, 4, 'Apr', monthlyPlanned, monthlyPayroll), new ForecastLine(self, 5, 'May', monthlyPlanned, monthlyPayroll), new ForecastLine(self, 6, 'Jun', monthlyPlanned, monthlyPayroll), new ForecastLine(self, 7, 'Jul', monthlyPlanned, monthlyPayroll), new ForecastLine(self, 8, 'Aug', monthlyPlanned, monthlyPayroll), new ForecastLine(self, 9, 'Sep', monthlyPlanned, monthlyPayroll), new ForecastLine(self, 10, 'Oct', monthlyPlanned, monthlyPayroll), new ForecastLine(self, 11, 'Nov', monthlyPlanned, monthlyPayroll), new ForecastLine(self, 12, 'Dec', monthlyPlanned, monthlyPayroll)]);
  self.refreshChart = function () {
    for (var i = 0; i < 12; i++) {
      chart.datasets[0].points[i].value = -self.lines()[i].planned();
      chart.datasets[1].points[i].value = self.lines()[i].levy();
      chart.datasets[2].points[i].value = self.lines()[i].balance();
    }
    chart.update();
  };
  self.plannedItems = plannedItems;
  for (var i = 0; i < 12; i++) {
    self.lines()[i].balance.subscribe(function() {
      self.refreshChart();
    });
  }
};

var forecast = new Forecast(planned, payroll, myLineChart);
ko.applyBindings(forecast);
forecast.refreshChart();