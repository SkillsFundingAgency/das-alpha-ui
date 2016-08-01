(function(){
    var view = {
        $noApprenticeshipsBlock: null,
        $apprenticeshipsBlock: null,
        $numberOfApprenticesLabel: null,
        $apprenticeshipsTableBody: null
    };
    var model = {
        apprenticeships: []
    };

    function loadModelFromLocalStorage() {
        var json = window.localStorage.getItem('commitment-apprenticeships');
        model.apprenticeships  = JSON.parse(json);
    }
    function showEmptyState() {
        $('#no-apprenticeships').removeClass('rj-dont-display');
        $('#apprenticeships').addClass('rj-dont-display');
    }
    function showApprenticeships() {
        $('#no-apprenticeships').addClass('rj-dont-display');
        $('#apprenticeships').removeClass('rj-dont-display');

        view.$numberOfApprenticesLabel.text(model.apprenticeships.length);
        for(var i = 0; i < model.apprenticehips.length; i++) {
            var $tr = makeRow(model.apprenticehips[i]);
            view.$apprenticeshipsTableBody.append($tr);
        }
    }
    function makeRow(apprenticeship) {
        var $tr = $('<tr></tr>');
        $tr.append(makeCell(apprenticeship.training.name));
        $tr.append(makeCell(apprenticeship.apprentice.first));
        $tr.append(makeCell(apprenticeship.apprentice.last));
        $tr.append(makeCell(apprenticeship.apprentice.uln));
        $tr.append(makeCell(apprenticeship.start.month + '/' + apprenticeship.start.year));
        $tr.append(makeCell(apprenticeship.finish.month + '/' + apprenticeship.finish.year));
        $tr.append(makeCell('£' + apprenticeship.cost.format(0)));
        $tr.append(makeCell(''));
        return $tr;
    }
    function makeCell(text) {
        return $('<td></td>').text(text);
    }

    $(document).ready(function() {
        view.$noApprenticeshipsBlock = $('#no-apprenticeships');
        view.$apprenticeshipsBlock = $('#apprenticeships');
        view.$numberOfApprenticesLabel = $('#numberOfApprentices');
        view.$apprenticeshipsTableBody = $('#apprenticeships table > tbody');

        loadModelFromLocalStorage();

        if(model.apprenticehips.length > 0) {
            showApprenticeships();
        }
        else {
            showEmptyState();
        }
    });
})();