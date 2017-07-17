function formatCurrency(value) {
    return "£" + value.toFixed(2);
}

$( "#gotoForecast" ).bind( "click", function() {
  Lockr.set('payroll', $('#payroll').val());
  Lockr.set('selected', $('#selected').val());
  Lockr.set('planned', $('#planned').val());
});

var CartLine = function() {
    var self = this;
    self.standards = ko.observable(standardsData);
    self.standard = ko.observable();
    self.quantity = ko.observable(1);
    self.subtotal = ko.pureComputed(function() {
        return self.standard() ? self.standard().Price * parseInt("0" + self.quantity(), 10) : 0;
    });
};

var Cart = function() {
  var self = this;
  self.payroll = ko.observable(0);
    self.lines = ko.observableArray([new CartLine()]); // Put one line in by default
    self.grandTotal = ko.pureComputed(function() {
      var total = 0;
      $.each(self.lines(), function() { total += this.subtotal() });
      return total;
    });

    self.addLine = function() { 
      self.lines.push(new CartLine()) 
    };
    self.removeLine = function(line) { 
      self.lines.remove(line) 
    };

    self.save = function() {
      var dataToSave = $.map(self.lines(), function(line) {
        return line.standard() ? {
          id: line.standard().Code,
          qty: line.quantity()
        } : undefined;
      });
      return JSON.stringify(dataToSave);
    };
    self.saveJson = function() {
      var dataToSave = $.map(self.lines(), function(line) {
        return line.standard() ? {
          id: line.standard().Code,
          qty: line.quantity()
        } : undefined;
      });
      return dataToSave;
    };
};

ko.applyBindings(new Cart());
