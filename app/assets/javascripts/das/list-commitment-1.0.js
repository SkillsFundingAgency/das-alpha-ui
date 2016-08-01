(function() {
    var view = {
        $noApprenticeshipsBlock: null,
        $apprenticeshipsBlock: null,
        $numberOfApprenticesLabel: null,
        $apprenticeshipsTableBody: null,

        load: function() {
            view.$noApprenticeshipsBlock = $('#no-apprenticeships');
            view.$apprenticeshipsBlock = $('#apprenticeships');
            view.$numberOfApprenticesLabel = $('#numberOfApprentices');
            view.$apprenticeshipsTableBody = $('#apprenticeships table > tbody');
        }
    };

    function showEmptyState() {
        $('#no-apprenticeships').removeClass('rj-dont-display');
        $('#apprenticeships').addClass('rj-dont-display');
    }
    function showApprenticeships(apprenticeships) {
        $('#no-apprenticeships').addClass('rj-dont-display');
        $('#apprenticeships').removeClass('rj-dont-display');

        view.$numberOfApprenticesLabel.text(apprenticeships.length);
        for(var i = 0; i < apprenticeships.length; i++) {
            var $tr = makeRow(apprenticeships[i]);
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
        $tr.append(makeActionCell(apprenticeship.id));
        return $tr;
    }
    function makeCell(text) {
        return $('<td></td>').text(text);
    }
    function makeActionCell(id) {
        var source = commitmentListSource || 'employer';

        var a = $('<a>Edit</a>');
        a.attr('href', '../provider-interface/add-apprenticeship?id=' + id + '&source=' + source);

        var td = $('<td></td>');
        td.append(a);

        return td;
    }

    $(document).ready(function() {
        console.log('load commitment list');
        view.load();

        var apprenticeships = window.das.commitments.getAll();
        if(apprenticeships.length > 0) {
            showApprenticeships(apprenticeships);
        }
        else {
            showEmptyState();
        }
    });

})();
