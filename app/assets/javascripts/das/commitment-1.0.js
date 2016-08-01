(function(){
    var model = {
        apprenticeships: [],

        load: function() {
            var json = window.localStorage.getItem('commitment-apprenticeships');
            model.apprenticeships  = JSON.parse(json) || [];
        },
        save: function() {
            window.localStorage.setItem('commitment-apprenticeships', JSON.stringify(model.apprenticeships));
        }
    };

    model.load();

    // Exports
    window.das = window.das || {};
    window.das.commitments = {
        getAll: function() {
          return model.apprenticeships;
        },
        addApprenticeships: function(apprenticeships) {
            for(var i = 0; i < apprenticeships.length; i++) {
                model.apprenticeships.push(apprenticeships[i]);
            }
            model.save();
        },
        update: function(apprenticeship) {

        },
        clear: function() {
            model.apprenticeships = [];
            model.save();
        }
    }
})();