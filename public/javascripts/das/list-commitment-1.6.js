
(function() {

    var view = {
        $noApprenticeshipsBlock: null,
        $apprenticeshipsBlock: null,
        $numberOfApprenticesLabel: null,
        $apprenticeshipsTableBody: null,
        $totalCostOfApprenticesLabel: null,

        load: function() {
            view.$noApprenticeshipsBlock = $('#no-apprenticeships');
            view.$apprenticeshipsBlock = $('#apprenticeships');
            view.$numberOfApprenticesLabel = $('#numberOfApprentices');
            view.$apprenticeshipsTableBody = $('#apprenticeships table > tbody');
            view.$totalCostOfApprenticesLabel = $('#totalCostOfApprentices');


        }
    };

    function showEmptyState() {
        $('#no-apprenticeships').removeClass('rj-dont-display');
        $('#apprenticeships').addClass('rj-dont-display');
        $('#bottomToolBarLotsofApprentices').addClass('rj-dont-display');
    }

    function showLotsExtraBar() {
    $('#bottomToolBarLotsofApprentices').removeClass('rj-dont-display');
    }

    function showApprenticeships(apprenticeships) {
        $('#no-apprenticeships').addClass('rj-dont-display');
        $('#apprenticeships').removeClass('rj-dont-display');
              $('#bottomToolBarLotsofApprentices').addClass('rj-dont-display');
              $('#addApprenticesEmptyState').addClass('rj-dont-display')

        // random global variable assignment - variable is used again later -  the copy in the training header.
        numberOfApps = apprenticeships.length;
        appsMoreThanOne = "";
        if (numberOfApps >= 2) {
            appsMoreThanOne ="s"} else {appsMoreThanOne=""};

        //end of robs random code

        view.$numberOfApprenticesLabel.text(apprenticeships.length);
        for(var i = 0; i < apprenticeships.length; i++) {
            var $tr = makeRow(apprenticeships[i]);
            view.$apprenticeshipsTableBody.append($tr);
        }
    }

    function makeRow(apprenticeship) {

        // changes heading, works when i put it in here
        var newCopy = apprenticeship.training.name;
        var x = document.getElementById("apprenticeReplaceMe");
        if(x) {
            x.innerHTML = numberOfApps + ' ' + newCopy + appsMoreThanOne;
        }

                 //robs ropey code to work out a fake total cost amount
    // formats numbers as cost

            var formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'GBP',
                minimumFractionDigits: 0,
            });

        for(var bb = 0; bb < numberOfApps; bb++) ;
              cc = bb+1;
              dd = cc * 1256;
        view.$totalCostOfApprenticesLabel.text(formatter.format(dd));
      
        //

        var displayCost = apprenticeship.cost ? '£' + apprenticeship.cost.format(0) : '----' ;
        var displayStart = apprenticeship.start.month ? apprenticeship.start.month + '/' + apprenticeship.start.year :  'unknown';
        var displayFinish = apprenticeship.finish.month ? apprenticeship.finish.month + '/' + apprenticeship.finish.year : 'unknown';
        var fullName = apprenticeship.apprentice.first ? apprenticeship.apprentice.first + ' ' + apprenticeship.apprentice.last : 'unknown';
        var allDates = apprenticeship.start.month ? apprenticeship.start.month + '/' +  + apprenticeship.start.year + ' to ' +  apprenticeship.finish.month + '/' + apprenticeship.finish.year : '----';
        var blankField = '  '
        var changesOne = ' '
        var endpointAssessor = '----'
        var dob = '---- '


        var $tr = $('<tr></tr>');
      //  $tr.append(makeCell(apprenticeship.training.name));
       // $tr.append(makeCell(apprenticeship.apprentice.first));
       //  $tr.append(makeCell(apprenticeship.apprentice.last));
       $tr.append(makeCell(fullName));
        if (employerOrNot!='yes') {
        $tr.append(makeCell(apprenticeship.apprentice.uln));}
        else {}
            $tr.append(makeCell(dob));
        // $tr.append(makeCell(displayStart));
        // $tr.append(makeCell(displayFinish));
        $tr.append(makeCell(allDates));
          //      $tr.append(makeCell(endpointAssessor)); // replace with endpoint assessor when ready
        $tr.append(makeCell(displayCost));

        $tr.append(makeActionCell(apprenticeship.id));

        return $tr;


    }

    function makeCell(text) {
        return $('<td style=""></td>').text(text || '----');
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
       switch (true) {
             case  (apprenticeships.length > 5):
                showApprenticeships(apprenticeships);
                showLotsExtraBar();
                break;
        case (apprenticeships.length > 0):
            showApprenticeships(apprenticeships);
            break;
        default:
             showEmptyState();
             console.log('gyahhhhhhhh')
            break;
        }
    });
})();

