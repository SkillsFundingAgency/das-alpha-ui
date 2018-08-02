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

    function generateUUID(){
        var d = new Date().getTime();
        if(window.performance && typeof window.performance.now === "function"){
            d += performance.now(); //use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    }

    // Exports
    window.das = window.das || {};
    window.das.commitments = {
        getAll: function() {
          return model.apprenticeships;
        },
        get: function(id) {
          for(var i = 0; i < model.apprenticeships.length; i++) {
              if(model.apprenticeships[i].id == id) {
                  return model.apprenticeships[i];
              }
          }
          return null;
        },
        addApprenticeships: function(apprenticeships) {
            for(var i = 0; i < apprenticeships.length; i++) {
                apprenticeships[i].id = generateUUID();
                model.apprenticeships.push(apprenticeships[i]);
            }
            model.save();
        },
        update: function(apprenticeship) {
            for(var i = 0; i < model.apprenticeships.length; i++) {
                if(model.apprenticeships[i].id == apprenticeship.id) {
                    model.apprenticeships[i] = apprenticeship;
                    model.save();
                    break;
                }
            }
        },
        clear: function() {
            model.apprenticeships = [];
            model.save();
        }
    }
})();