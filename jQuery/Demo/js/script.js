
$(document).ready(function () {

    let form = $("#form");
    enableFastFeedback(form);
    var validFormState = false;

    var modal = document.getElementById("myModal");

    const list = [];

    {   //Initial Data insertion in list
        const person1 = {
            name: 'Mark',
            dob: '2000-01-01',
            address: 'USA',
            country: 'USA',
            hobbies: ["Cricket"],
            gender: 'Male',
            email: 'mark@gmail.com',
            password: 'mark@123',
        }

        const person2 = {
            name: 'ABC',
            dob: '2000-01-01',
            address: 'Surat',
            country: 'India',
            hobbies: ["Reading"],
            gender: 'Male',
            email: 'abc@gmail.com',
            password: 'abc123',
        }
        list.push(person1);
        list.push(person2);
    }
    dataToTable();

    //Initial Data insertion in Table from list
    function dataToTable() {
        var tableBody = $("tbody");

        list.forEach(listData);

        function listData(element, index) {
            console.log("list iterating");

            tableRow = `<tr id="${index}">`;
            tableRow += '<td>' + element.name + "</td>";
            tableRow += '<td>' + element.dob + "</td>";
            tableRow += '<td>' + element.address + "</td>";
            tableRow += '<td>' + element.country + "</td>";
            tableRow += '<td>' + element.hobbies + "</td>";
            tableRow += `<td id="Gender${index}"><select data-index="${index}" name="" class="edit-gender"><option value="${element.gender}">${element.gender}</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></select></td>`;
            // tableRow += '<td>' + element.gender + "</td>";
            tableRow += '<td>' + element.email + "</td>>";
            tableRow += `<td> <button  data-index="${index}"  class='edit' >Edit</button> <button  data-index="${index}"   class='delete'>Delete</button></td>`;
            // tableRow += `<td> <button  data-index="${index}"  class='row-no btn btn-secondary' >RowNo</button></td>`;
            tableRow += `</tr>`;

            tableBody.append(tableRow);
        }
    }


    //Form Data Processing for adding or updating user 
    function formDataProcess(person, op) {

        var name = $("#name").val();
        var dob = $("#dob").val();
        var address = $("#address").val();
        var email = $("#email").val();
        var country = $("#country").val();
        var gender = $("#gender").val();
        var password = $("#password").val();

        var hobbiesArray = [];
        ($("#hobby1").is(":checked") ? hobbiesArray.push($("#hobby1").data("hobby1")) : "");
        ($("#hobby2").is(":checked") ? hobbiesArray.push($("#hobby2").data("hobby2")) : "");
        ($("#hobby3").is(":checked") ? hobbiesArray.push($("#hobby3").data("hobby3")) : "");


        person.name = name;
        person.dob = dob;
        person.address = address;
        person.email = email;
        person.country = country;
        person.gender = gender;
        person.password = password;
        person.hobbies = hobbiesArray;

        var tableBody = $("tbody");

        if (op === "new") {
            console.log("ADDING DATA TO TABLE");
            list.push(person);
            op = list.length - 1;
            list.forEach(element => {
                console.log(element);
            });
            var tableRow = '<tr>';
            dataManipulation(person, op);
            tableRow += "</tr>";
            tableBody.append(tableRow);

        } else {
            console.log("op is " + op);
            list[op] = person;
            // var tableRowEle = $(`#tbody tr:eq("${op}")`);
            var tableRow = "";
            console.log(tableRow);

            dataManipulation(person, op);
            $(`#tbody tr:eq("${op}")`).html(`${tableRow}`);

        }

        function dataManipulation(person, op) {
            tableRow += '<td>' + person.name + "</td>";
            tableRow += '<td>' + person.dob + "</td>";
            tableRow += '<td>' + person.address + "</td>";
            tableRow += '<td>' + person.country + "</td>";
            tableRow += '<td>' + person.hobbies + "</td>";
            tableRow += `<td id="Gender${op}"><select data-index="${op}" name="" class="edit-gender"><option value="${person.gender}">${person.gender}</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></select></td>`;
            tableRow += '<td>' + person.email + "</td>";
            // tableRow += `<td> <button  data-index="${op}"  class='edit btn btn-secondary' >Edit</button> <button   data-index="${op}"  class='delete btn btn-danger' >Delete</button></td>`;
            // tableRow += `<td> <button  data-index="${op}"  class='row-no btn btn-secondary' >RowNo</button></td>`;

            tableRow += `<td> <button  data-index="${op}"  class="edit" >Edit</button> <button  data-index="${op}"   class="delete">Delete</button></td>`;
            // tableRow += `<td> <button  data-index="${op}"  class='row-no btn btn-secondary' >RowNo</button></td>`;

        }

        return person;
    }



    //Password Visibility Toggle
    $("#eye").on("click", function () {
        console.log("button clicked");
        var passField = $("#password");
        if (passField.attr("type") === "password") {
            passField.attr("type", "text");
            $(this).attr("class", "fa fa-eye-slash password-icon");
        } else {
            passField.attr("type", "password");
            $(this).attr("class", "fa fa-eye password-icon");
        }
    });


    //Blank form to add new user by clicking ADD @ navbar ---- as of now default values are attached to input fields
    $("#add").on("click", clearForm);

    //Clears form
    function clearForm() {
        $("#submit").css("display", "inline-block");
        $("#update").css("display", "none");
        $("#reset").data("index", "");
        $("#reset").attr("type", "reset");
        $(":reset").click();
        $("input").css("box-shadow", "");
        $("select").css("box-shadow", "");

    }

    $("#tbody").on("click", ".row-no", function () {
        var rowNumber = $(this).closest("tr");
        console.log("Row no is " + rowNumber.index());
    })

    //Shows User details in form on-click Edit button against respective user
    $("#tbody").on("click", ".edit", function () {

        var curRow = $(this).closest("tr");
        console.log("Row no is " + curRow.index());

        var currIndexValue = curRow.index();
        console.log(currIndexValue);
        resetUpdateForm(currIndexValue);
        // //Getting user from list and Displaying user values in form
        // const currPerson = list[currIndexValue];

        // $("#name").val(currPerson.name);
        // $("#dob").val(currPerson.dob);
        // $("#address").val(currPerson.address);
        // $("#email").val(currPerson.email);
        // $("#country").val(currPerson.country);
        // $("#gender").val(currPerson.gender);
        // $("#password").val(currPerson.password);
        // // $("#hobbies").val(currPerson.hobbies);

        // var currHobbies = currPerson.hobbies;
        // $("#hobby1").prop("checked", currHobbies.includes("Cricket"));
        // $("#hobby2").prop("checked", currHobbies.includes("Reading"));
        // $("#hobby3").prop("checked", currHobbies.includes("Writting"));



        // $("#submit").css("display", "none");
        // $("#update").css("display", "inline-block");
        // $("#update").data("index", currIndexValue);
        // $("#reset").data("index", currIndexValue);
    });


    function resetUpdateForm(currIndexValue) {
        //Getting user from list and Displaying user values in form
        const currPerson = list[currIndexValue];

        $("#name").val(currPerson.name);
        $("#dob").val(currPerson.dob);
        $("#address").val(currPerson.address);
        $("#email").val(currPerson.email);
        $("#country").val(currPerson.country);
        $("#gender").val(currPerson.gender);
        $("#password").val(currPerson.password);
        // $("#hobbies").val(currPerson.hobbies);

        var currHobbies = currPerson.hobbies;
        $("#hobby1").prop("checked", currHobbies.includes("Cricket"));
        $("#hobby2").prop("checked", currHobbies.includes("Reading"));
        $("#hobby3").prop("checked", currHobbies.includes("Writting"));



        $("#submit").css("display", "none");
        $("#update").css("display", "inline-block");
        $("#update").data("index", currIndexValue);
        $("#reset").data("index", currIndexValue);
        $("#reset").attr("type", "button");
    }


    //Updating user details on-click Update button
    $("#update").on("click", function (event) {
        let updateIndex = $("#update").data("index");

        const person = list[updateIndex];

        formDataProcess(person, updateIndex);

        clearForm();

    });

    //Reseting user details on-click Reset button
    $("#reset").on("click", function (event) {

        if ($("#reset").attr("type") == "reset") {

        } else {
            let currIndexValue = $("#reset").data("index");

            resetUpdateForm(currIndexValue);

        }



    });


    //Gender Updation from DropDown
    $("#tbody").on("change", ".edit-gender", function () {
        console.log("button clicked");

        var updateIndex = $(this).data("index");
        var selectedOption = $(this).find(":selected").val();
        var genderBox = "Gender" + updateIndex;

        //Getting user from list, updating gender values, updating list and Table
        const existingPer = list[updateIndex];
        existingPer.gender = selectedOption;
        list[updateIndex] = existingPer;

        $(`#${genderBox}`).html(`<td id = "Gender${updateIndex}" > <select data-index="${updateIndex}" name="" class="edit-gender"><option value="${existingPer.gender}">${existingPer.gender}</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></select></td>`);
    });

    //Model-PopUp for before deletion
    $("#tbody").on("click", ".delete", function () {
        console.log("button clicked");
        var curRow = $(this).closest("tr");
        console.log("Row no is " + curRow.index());

        var currIndexValue = curRow.index();
        console.log(currIndexValue);

        var modelBox = $(".modal-content");
        modal.style.display = "flex";
        // modal.style.display = "block";

        modelBox.append("<p>").html("<h2>Delete Record?</h2>");

        modelBox.append(`<div><button id="del-yes"  data-index="${currIndexValue}" class='mod-btn btn btn-danger'>Yes</button> 
        <button id="del-no" class="mod-btn btn btn-success" type="reset">No</button></div>`);


        {// if (confirm(text) == true) {

            //     var currIndexValue = $(this).data("index");
            //     console.log(currIndexValue);

            //     list.splice(currIndexValue, 1);
            //     list.forEach(element => {
            //         console.log(element);
            //     });

            //     dataToTable();

            //     // console.log("next id is "+$(`tbody #${ currIndexValue } `).next().attr("id"));
            //     // var nextId = $(`tbody #${ currIndexValue } `).next().attr("id");
            //     // $(`tbody #${ currIndexValue } `).remove();

            //     // while(nextId != "undefined"){
            //     //     var preId = nextId;
            //     //     $(`tbody #${ preId } `).attr("id",currIndexValue);
            //     //     currIndexValue = nextId;

            //     //     nextId = $(`tbody #${ currIndexValue } `).next().attr("id");

            //     // }

            // } else {
            //     text = "You canceled!";
            // }
        }
    });

    //Deletes record
    $("#myModal").on("click", "#del-yes", function () {


        var remIndex = $(this).data("index");
        console.log(remIndex);

        list.splice(remIndex, 1);
        list.forEach(element => {
            console.log(element);
        });

        var tableRow = $(`#tbody tr:eq("${remIndex}")`).html();
        tableRow = "<tr>" + tableRow + "</tr>";
        console.log(tableRow);
        $(`#tbody tr:eq("${remIndex}")`).html('');

        modal.style.display = "none";
    });

    //Aborts Delete operation & Removes PopUp
    $("#myModal").on("click", "#del-no", function () {
        modal.style.display = "none";
    });

    //Aborts Delete operation & Removes PopUp
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }


    //New User entry on-click Submit button after filling input fields
    // $("#submit").on("click", function (event) {
    form.submit(function (event) {
        console.log("IN SUBMIT");
        const person = {
            name: '', dob: '', address: '', country: '', hobbies: '', gender: '', email: '', password: '',
        }


        var name = $("#name").val();
        var dob = $("#dob").val();
        var address = $("#address").val();
        var email = $("#email").val();
        // var country = $("#country").find(":selected").text();
        var country = $("#country").val();
        var gender = $("#gender").val();
        var password = $("#password").val();
        let checkedHobby = $("input[name='hobby']:checked");

        validateNameField(name, event);
        validatePasswordField(password, event);
        validateAddressField(address, event);
        validateEmailField(email, event);
        validateHobbies(checkedHobby, event);
        validateGender(gender, event);
        validateCountry(country, event);
        validateDOBField(dob, event);
        var validFormState = validateNameField(name, event) && validatePasswordField(password, event) && validateAddressField(address, event) && validateEmailField(email, event) && validateHobbies(checkedHobby, event) && validateGender(gender, event) && validateCountry(country, event) && validateDOBField(dob, event);
        console.log("form status is " + validFormState);
        if (validFormState) {
            // if (true) {
            console.log("IN VALID BLOCK");

            formDataProcess(person, "new");
            clearForm();
            event.preventDefault();

        } else {
            event.preventDefault();
        }
    });




    function enableFastFeedback(formElement) {

        var nameInput = formElement.find("#name");
        var dobInput = formElement.find("#dob");
        var addressInput = formElement.find("#address");
        var emailInput = formElement.find("#email");

        var passwordInput = formElement.find("#password");
        var genderInput = formElement.find("#gender");
        var countryInput = formElement.find("#country");
        var hobbyInput = $("input[name='hobby']");


        hobbyInput.change(function (event) {
            let checkedHobby = $("input[name='hobby']:checked");

            validateHobbies(checkedHobby, event)
            if (checkedHobby.length == 0) {
                //   $(this).add("label[for='checkbox2']").css("box-shadow", "0 0 4px #811");
                hobbyInput.css("box-shadow", "0 0 4px #811");
            } else {
                //   $(this).add("label[for='checkbox2']").css("box-shadow", "0 0 4px #181");
                hobbyInput.css("box-shadow", "0 0 4px #181");
            }
        });
        genderInput.change(function (event) {
            let selectedGender = $(this).val();
            console.log(selectedGender);

            validateGender(selectedGender, event);

            if (selectedGender == null) {
                //   $(this).add("label[for='checkbox2']").css("box-shadow", "0 0 4px #811");
                genderInput.css("box-shadow", "0 0 4px #811");
            } else {
                //   $(this).add("label[for='checkbox2']").css("box-shadow", "0 0 4px #181");
                genderInput.css("box-shadow", "0 0 4px #181");
            }
        });
        countryInput.change(function (event) {
            let selectedCountry = $(this).val();

            validateCountry(selectedCountry, event);
            if (selectedCountry == null) {
                //   $(this).add("label[for='checkbox2']").css("box-shadow", "0 0 4px #811");
                countryInput.css("box-shadow", "0 0 4px #811");
            } else {
                //   $(this).add("label[for='checkbox2']").css("box-shadow", "0 0 4px #181");
                countryInput.css("box-shadow", "0 0 4px #181");
            }
        });


        nameInput.blur(function (event) {

            var name = $(this).val();

            validateNameField(name, event);

            if (!isValidName(name)) {
                $(this).css("box-shadow", "0 0 4px #811");

            } else {
                $(this).css("box-shadow", "0 0 4px #181");
            }
        });
        dobInput.blur(function (event) {
            // var dob = $("#dob").val();
            // console.log("DOB is " + dob);
            var dob = $(this).val();

            validateDOBField(dob, event);

            if (!isValidDOB(dob)) {
                $(this).css("box-shadow", "0 0 4px #811");

            } else {
                $(this).css("box-shadow", "0 0 4px #181");
            }
        });

        addressInput.blur(function (event) {
            var address = $(this).val();

            validateAddressField(address, event);

            if (!isValidAddress(address)) {
                $(this).css("box-shadow", "0 0 4px #811");

            } else {
                $(this).css("box-shadow", "0 0 4px #181");
            }
        });



        emailInput.blur(function (event) {
            var email = $(this).val();
            validateEmailField(email, event);

            if (!isValidEmail(email)) {
                $(this).css("box-shadow", "0 0 4px #811");

            } else {
                $(this).css("box-shadow", "0 0 4px #181");
                console.log("false");
            }
        });

        passwordInput.blur(function (event) {
            var password = $(this).val();
            validatePasswordField(password, event);

            if (!isValidPassword(password)) {
                $(this).css("box-shadow", "0 0 4px #811");

            } else {
                $(this).css("box-shadow", "0 0 4px #181");
                console.log("false");
            }
        });

    }


    function validateHobbies(checkedHobby, event) {
        if (checkedHobby.length === 0) {
            $("#hobby-feedback").text("Select atleast one hobby");
            // validFormState = false;
            //   event.preventDefault();
            return false;
        } else {
            $("#hobby-feedback").text("");
            // validFormState = true;
            return true;
        }
    }
    function validateGender(selectedGender, event) {
        if (selectedGender == null) {
            console.log("in validate gender");
            $("#gender-feedback").text("Select Gender");
            // validFormState = false;
            //   event.preventDefault();
            $("#gender").css("box-shadow", "0 0 4px #811");
            return false;
        } else {
            $("#gender-feedback").text("");
            // validFormState = true;
            $("#gender").css("box-shadow", "0 0 4px #181");
            return true;
        }
    }
    function validateCountry(selectedCountry, event) {
        if (selectedCountry == null) {
            console.log("in validate gender");
            $("#country-feedback").text("Select Country");
            // validFormState = false;
            //   event.preventDefault();
            $("#country").css("box-shadow", "0 0 4px #811");
            return false;
        } else {
            $("#country-feedback").text("");
            // validFormState = true;
            $("#country").css("box-shadow", "0 0 4px #181");
            return true;
        }
    }


    function validateNameField(name, event) {
        if (!isValidName(name)) {
            $("#name-feedback").text("Name should be unique");
            // validFormState = false;
            return false;
        } else {
            $("#name-feedback").text("");
            // validFormState = true;
            return true;
        }
    }

    function isValidName(name) {
        let isValid = true;
        list.forEach(valid);
        function valid(element) {
            console.log(element.name);
            if (element.name == name || name == "") {
                isValid = false;
            }
        }
        console.log(isValid);
        return isValid;
    }
    function validateDOBField(dob, event) {
        if (!isValidDOB(dob)) {
            $("#dob-feedback").text("Select DOB");
            // validFormState = false;
            // $("#dob").css("box-shadow", "0 0 4px #811");
            return false;
        } else {
            $("#dob-feedback").text("");
            // validFormState = true;
            // $("#dob").css("box-shadow", "0 0 4px #181");
            return true;
        }
    }

    function isValidDOB(dob) {
        return dob !== "";
    }


    function validateEmailField(email, event) {
        if (!isValidEmail(email)) {
            $("#email-feedback").text("Password should contain min. 6 char");
            // validFormState = false;
            // event.preventDefault();
            return false;
        } else {
            $("#email-feedback").text("");
            // validFormState = true;
            return true;
        }
    }

    function isValidEmail(email) {
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!regex.test(email)) {
            console.log("false");
            return false;
        } else {
            console.log("okay");
            return true;
        }
    }

    function validatePasswordField(password, event) {
        if (!isValidPassword(password)) {
            $("#password-feedback").text("Password should contain min. 6 char");
            // validFormState = false;
            // event.preventDefault();
            return false;
        } else {
            $("#password-feedback").text("");
            // validFormState = true;
            return true;
        }
    }

    function isValidPassword(password) {
        return password.length >= 6;
    }

    function validateAddressField(address, event) {
        if (!isValidAddress(address)) {
            $("#address-feedback").text("Address required");
            // validFormState = false;
            // event.preventDefault(); 
            return false;
        } else {
            $("#address-feedback").text("");
            // validFormState = true;
            return true;
        }
    }


    function isValidAddress(address) {
        return address.trim() !== "";
    }
    function validateHobbyField(address, event) {
        if (!isValidHobby(address)) {
            $("#address-feedback").text("Address required");
            // validFormState = false;
            // event.preventDefault(); 
            return false;
        } else {
            $("#address-feedback").text("");
            // validFormState = true;
            return true;
        }
    }


    function isValidHobby(address) {
        return address.trim() !== "";
    }

});

