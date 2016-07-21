app.controller("CRUDCtrl", function ($scope, crudService, $timeout) {
    $scope.personForm = false;
    getAllPersons();

    function getAllPersons() {
        var getPersonData = crudService.getAllPersons();
        getPersonData.then(function (person) {
            $scope.persons = person.data;
        }, function () {
            alert("Error in getting person records");
        });
    }
    $scope.editPerson = function (person) {
        var getPersonx = crudService.getPerson(person.PersonID);
        getPersonx.then(function (prsn) {
            getPersonx.person = prsn.data;
            $scope.PersonId = person.PersonId;
            $scope.FirstName = person.FirstName;
            $scope.LastName = person.LastName;
            $scope.PhoneNumber = person.PhoneNumber;
            $scope.IsActive = person.IsActive;
            $scope.Address = person.Address;
            $scope.Action = "Update";
            $scope.personForm = true;
            scrollTo(0, 0);
        }, function () { alert("Error in getting person records"); });
    }

    $scope.AddUpdateperson = function () {
        var person = {
            FirstName: $scope.FirstName,
            LastName: $scope.LastName,
            PhoneNumber: $scope.PhoneNumber,
            IsActive: $scope.IsActive,
            Address: $scope.Address
        }
        var getPersonAction = $scope.Action;
        var getPersonData;
        if (getPersonAction === "Update") {
            person.PersonId = $scope.PersonId;
            getPersonData = crudService.updatePerson(person);
            getPersonData.then(function (e) {
                getAllPersons();
                $timeout(function () {
                    alert(e.data);
                });
                $scope.PersonForm = false;
            }, function () {
                alert("Error in updating book record");
            });
        } else {
            getPersonData = crudService.AddPerson(person);
            getPersonData.then(function (e) {
                getAllPersons();
                $timeout(function() {
                    alert(e.data);
                });
              
                $scope.personForm = false;
            }, function () {
                alert("Error in adding book record");
            });
        }
    }

    $scope.AddPersonButton = function () {
        clearFields();
        $scope.Action = "Add";
        $scope.personForm = true;
        scrollTo(0,0);

    }
    $scope.deletePerson = function (person) {
        var getPersonData = crudService.deletePerson(person.PersonId);
        getPersonData.then(function (e) {
            $timeout(function () {
                alert(e.data);
            });
            getAllPersons();
        }, function () {
            alert("Error in deleting person record");
        });
    }

    function clearFields() {
        $scope.bookId = "";
        $scope.bookTitle = "";
        $scope.bookAuthor = "";
        $scope.bookPublisher = "";
        $scope.bookIsbn = "";
    }

    $scope.Cancel = function () {
        $scope.personForm = false;
    };
})