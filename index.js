
 $("#rollNo").focus();
 
 function saveRecNo2LS(jsonObj)
 {
    var lvdata=JSON.parse(jsonObj.data); 
    localStorage.setItem("recno",lvdata.rec_no);
 }
 
 function getStudRollNoAsJsonObj()
 {
     var rollNoVar= $("#rollNo").val();
     var jsonStr={
         rollNo:rollNoVar
     };
    return JSON.stringify(jsonStr); 
 }
function validateAndGetFormData()
{
    var rollNoVar = $("#rollNo").val();
    var fullNameVar = $("#fullName").val();
    var stuClassVar = $("#stuClass").val();
    var birthDateVar = $("#birthDate").val();
    var addressVar = $("#address").val();
    var enrollDateVar = $("#enrollDate").val();
    
    if (rollNoVar === "") {
        alert("Roll No is Required Value");
        $("#rollNo").focus();
        return "";
    }
    
    if (fullNameVar === "") {
        alert("Full Name is Required Value");
        $("#fullName").focus();
        return "";
    }
   
    if (stuClassVar === "") {
        alert("Student Class is Required Value");
        $("#stuClass").focus();
        return "";
    }
    
    if (birthDateVar === "") {
        alert("Birth Date is Required Value");
        $("#birthDate").focus();
        return "";
    }
    
    if (addressVar === "") {
        alert("Address is Required Value");
        $("#address").focus();
        return "";
    }
    
    if (enrollDateVar === "") {
        alert("Enroll Date is Required Value");
        $("#enrollDate").focus();
        return "";
    }
    var jsonStrObj = {
        rollNo: rollNoVar,
        fullName: fullNameVar,
        stuClass: stuClassVar,
        birthDate: birthDateVar,
        address: addressVar,
        enrollDate: enrollDateVar,
        
    };
    return JSON.stringify(jsonStrObj);
    
}
function fillData(jsonObj)
{
    saveRecNo2LS(jsonObj);
    var data = JSON.parse(jsonObj.data).record;
    $("#rollNo").val(data.rollNo);
    $("#fullName").val(data.fullName);
    $("#stuClass").val(data.stuClass);
    $("#birthDate").val(data.birthDate);
    $("#address").val(data.address);
    $("#enrollDate").val(data.enrollDate);
}
function resetForm()
{
    $("#rollNo").val("");
    $("#fullName").val("");
    $("#stuClass").val("");
    $("#birthDate").val("");
    $("#address").val("");
    $("#enrollDate").val("");
    
    $("#rollNo").prop('disabled',false);
    $("#save").prop('disabled',true);
    $("#change").prop('disabled',true);
    $("#reset").prop('disabled',true);
    
    $("#fullName").prop('disabled',true);
    $("#stuClass").prop('disabled',true);
    $("#birthDate").prop('disabled',true);
    $("#address").prop('disabled',true);
    $("#enrollDate").prop('disabled',true);
    
    $("#rollNo").focus();
}
function getStudent()
{
    var studIdJsonObj = getStudRollNoAsJsonObj();
    var getRequest = createGET_BY_KEYRequest("90931416|-31949321946476827|90949988",
            "SCHOOL-DB", "STUDENT-TABLE", studIdJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, "http://api.login2explore.com:5577", "/api/irl");
    jQuery.ajaxSetup({async: true});
    if (resJsonObj.status === 400)
    {
        $("#save").prop('disabled', false);
        $("#reset").prop('disabled', false);
        $("#fullName").focus();

    } else if (resJsonObj.status === 200)
    {
        $("#rollNo").prop('disabled', true);
        fillData(resJsonObj);
        $("#change").prop('disabled', false);
        $("#reset").prop('disabled', false);
        $("#fullName").focus();
    }
    
    $("#fullName").prop('disabled',false);
    $("#stuClass").prop('disabled',false);
    $("#birthDate").prop('disabled',false);
    $("#address").prop('disabled',false);
    $("#enrollDate").prop('disabled',false);
    
    
}
function saveStudent()
{
    var jsonStrObj = validateAndGetFormData();
    if (jsonStrObj === "") {
        return "";
    }
    var putRequest = createPUTRequest("90931416|-31949321946476827|90949988",
            jsonStrObj, "SCHOOL-DB", "STUDENT-TABLE");
    //alert(putRequest);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(putRequest,"http://api.login2explore.com:5577", "/api/iml");
    jQuery.ajaxSetup({async: true});
    //alert(JSON.stringify(resultObj));

    resetForm();
    $("#rollNo").focus();
}

function changeData()
{
    $("#change").prop('disabled', true);
    var jsonChg = validateAndGetFormData();
    var updateRequest = createUPDATERecordRequest("90931416|-31949321946476827|90949988",
            jsonChg, "SCHOOL-DB", "STUDENT-TABLE", localStorage.getItem("recno"));

    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(updateRequest, "http://api.login2explore.com:5577", "/api/iml");
    jQuery.ajaxSetup({async: true});
    console.log(resultObj);
    resetForm();
    $("#rollNo").focus();
}

