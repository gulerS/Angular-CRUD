app.service("crudService", function ($http) {
    // Get All Persons
    this.getAllPersons = function () {
        return $http.get("Home/GetAllPersons");
    };

    this.getPerson = function (personId) {
        var resp = $http({
            method: "post",
            url: "Home/GetPerson",
            params: { id: JSON.stringify(personId) }
        });

        return resp;
    }
    this.AddPerson = function (person) {
        var resp = $http({
            method: "post",
            url: "Home/AddPerson",
            data: JSON.stringify(person),
            datatype: "json"
        });
        return resp;
    }

    this.updatePerson = function (person) {
        var resp = $http({
            method: "post",
            url: "Home/UpdatePerson",
            data: JSON.stringify(person),
            dataType: "json"
        });
        return resp;
    }

    this.deletePerson = function (personId) {
        var resp = $http({
            method: "post",
            url: "Home/DeletePerson",
            params: {
                PersonId: JSON.stringify(personId)
            }
        });

        return resp;
    }
})