(function() {
    var view = {
        $startMonthInput: null,
        $startYearInput: null,
        $finishMonthInput: null,
        $finishYearInput: null,
        $costInput: null,
        $apprenticeFirstInput: null,
        $apprenticeLastInput: null,
        $apprenticeUlnInput: null,
        $saveButton: null,
        $checkTrainingSourceInput: null,
        $displayTrainingContainer: null,
        $searchTrainingContainer: null,

        load: function() {
            view.$startMonthInput = $('#startMonth');
            view.$startYearInput = $('#startYear');
            view.$finishMonthInput = $('#finishMonth');
            view.$finishYearInput = $('#finishYear');
            view.$costInput = $('#apprenticeCost');
            view.$apprenticeFirstInput = $('#apprenticeGivenName');
            view.$apprenticeLastInput = $('#apprenticeFamilyName');
            view.$apprenticeUlnInput = $('#ULN');
            view.$saveButton = $('#saveAndReturn');
            view.$checkTrainingSourceInput = $('#checkTrainingSource');
            view.$displayTrainingContainer = $('#displayTraining');
            view.$searchTrainingContainer = $('#searchTraining');
        }
    };
    var model = {
        apprenticeship: null,
        load: function() {
            var editId = getParameterByName('id');
            if(editId) {
                model.apprenticeship = window.das.commitments.get(editId);
            }
        },
        save: function(updatedApprenticeship) {
            if(model.apprenticeship) {
                updatedApprenticeship.id = model.apprenticeship.id;
                window.das.commitments.update(updatedApprenticeship);
            }
            else {
                window.das.commitments.addApprenticeships([updatedApprenticeship]);
            }
        }
    };

    function setCourseView() {
        var courseSelection = getParameterByName('radio-group');
        if(courseSelection){
            view.$searchTrainingContainer.css('display', 'none');
            view.$displayTrainingContainer.css('display', 'block');
        }
    }
    function addSourceToCheckTraining() {
        var source = getParameterByName('source') || 'employer';
        view.$checkTrainingSourceInput.val(source);
    }
    function loadApprenticeship() {
        if(!model.apprenticeship) {
            return;
        }

        view.$startMonthInput.val(model.apprenticeship.start.month);
        view.$startYearInput.val(model.apprenticeship.start.year);
        view.$finishMonthInput.val(model.apprenticeship.finish.month);
        view.$finishYearInput.val(model.apprenticeship.finish.year);
        view.$costInput.val(model.apprenticeship.cost);
        view.$apprenticeFirstInput.val(model.apprenticeship.apprentice.first);
        view.$apprenticeLastInput.val(model.apprenticeship.apprentice.last);
        view.$apprenticeUlnInput.val(model.apprenticeship.apprentice.uln);
    }
    function onSave() {
        try {
            var apprenticeship = {
                training: {
                    code: 1,
                    name: "Mechatronics Engineer"
                },
                start: {
                    month: parseInt(view.$startMonthInput.val()),
                    year: parseInt(view.$startYearInput.val())
                },
                finish: {
                    month: parseInt(view.$finishMonthInput.val()),
                    year: parseInt(view.$finishYearInput.val())
                },
                cost: parseInt(view.$costInput.val()),
                apprentice: {
                    first: view.$apprenticeFirstInput.val(),
                    last: view.$apprenticeLastInput.val(),
                    uln: parseInt(view.$apprenticeUlnInput.val())
                }
            };

            model.save(apprenticeship);
            window.location.href = getReturnUrl();
        }
        catch (e) {
            alert(e.message);
        }
    }
    function getReturnUrl() {
        var source = getParameterByName('source');
        if(source=='provider') {
            return '../provider-in-progress/provider-list';
        }
        return '../new-contract/cohorts';
    }
    function getParameterByName(name, url) {
        // taken from http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    $(document).ready(function() {
        view.load();
        view.$saveButton.unbind('click').click(onSave);

        model.load();
        loadApprenticeship();

        setCourseView();
        addSourceToCheckTraining();
    });
})();