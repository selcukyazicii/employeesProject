import { Request } from "./requests";
import { UI } from "./ui";
//elementleri seçme
const form=document.getElementById("employee-form");
const nameInput=document.getElementById("name");
const departmentInput=document.getElementById("department");
const salaryInput=document.getElementById("salary");
const aler=document.getElementById("uyari");

//kayıtlı dataların olduğu yer (tbody)
const employeesList=document.getElementById('employees');
const updateEmployeeButton=document.getElementById('update');
let updateState=null;
const request=new Request("http://localhost:3000/employees");
const ui=new UI();
eventListener();
function eventListener(){
    document.addEventListener("DOMContentLoaded",getAllEmployees)
    form.addEventListener("submit",addEmployee)
    employeesList.addEventListener("click",UpdateOrDelete)
    updateEmployeeButton.addEventListener("click",updateEmployee)
}

function getAllEmployees(employees){
    request.get()
    .then(employees=>{
        ui.addAllEmployeeToUI(employees)
    })
    .catch(err=>console.log(err));
}

function addEmployee(e){
    const employeeName=nameInput.value.trim();
    const employeeDepartment=departmentInput.value.trim();
    const employeeSalary=salaryInput.value.trim();
    if(employeeName==""||employeeSalary==""||employeeDepartment==""){
        alert("Lütfen boşlukları doldurunuz.")
    }
    else{
        request.post({name:employeeName,salary:employeeSalary,department:employeeDepartment})
        .then(employees=>{
            ui.addEmployeeToUI(employees)
            aler.innerHTML=employees.name+" adlı kişi " + employees.department + " departmanına eklendi."
        })
        .catch(err=>console.log(err));
    }
    e.preventDefault();
    ui.clearInput();
    setTimeout(() => {
        aler.innerHTML = ""
    },2000)
}

function UpdateOrDelete(e){
    if(e.target.id==="delete-employee"){
        deleteEmployee(e.target)
    }else if(e.target.id==="update-employee"){
        updateEmployeeController(e.target.parentElement.parentElement)
       //update operation
    }
}

function deleteEmployee(targetEmployee){
    const id=targetEmployee.parentElement.previousElementSibling.previousElementSibling.textContent;
    request.delete(id)
    .then(message=>{
        ui.deleteFromUI(targetEmployee.parentElement.parentElement)
    })
    .catch(err=>console.log(err))
} 


function updateEmployeeController(targetEmployee){
    ui.toggleEmployeeButton(targetEmployee)
    if(updateState===null){
        updateState={
            updateId:targetEmployee.children[3].textContent,
            updateParent:targetEmployee
        }
    }else{
        updateState=null;
    }
}

function updateEmployee(){
    if(updateState){
        const data={name:nameInput.value.trim(),department:departmentInput.value.trim(),salary:Number(salaryInput.value.trim())}
        request.put(updateState.updateId,data)
        .then(updatedEmployee=>{
            ui.updateEmployeeOnUI(updatedEmployee,updateState.updateParent);
        })
        .catch(err=>console.log(err))
    }
}





// request.get()
// .then(employee=>console.log(employee))
// .catch(err=>console.log(err));


// //burda veri oluşturulacak
// request.post({name:"Serhat Say",department:"Software",salary:5000})
// .then(employee=>console.log(employee))
// .catch(err=>console.log(error));

// //veri güncellenecek
// request.put(1,{name:"Ferhat Say",department:"Software",salary:5000})
// .then(employee=>console.log(employee))
// .catch(err=>console.log(err));

// request.delete(25)
// .then(message=>console.log(message))
// .catch(err=>console.log(err));