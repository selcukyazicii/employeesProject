export class UI {
  constructor() {
    this.employeesList = document.getElementById("employees");
    this.updateButton = document.getElementById("update");
    this.nameInput = document.getElementById("name");
    this.salaryInput = document.getElementById("salary");
    this.departmentInput = document.getElementById("department");
  }

  addAllEmployeeToUI(employees){
    // <tr>                                           
    //   <td>Mustafa Murat Coşkun</td>
    //   <td>Bilişim</td>
    //   <td>4000</td>
    //   <td>1</td>
    //   <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
    //   <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
    //   </tr>
    let result="";
    employees.forEach(employees=>{
      result+=`<tr>                                           
      <td>${employees.name}</td>
      <td>${employees.department}</td>
      <td>${employees.salary}</td>
      <td>${employees.id}</td>
      <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
      <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
      </tr>`
    });
    this.employeesList.innerHTML=result;
  }

  clearInput(){
    this.nameInput.value="";
    this.salaryInput.value="";
    this.departmentInput.value="";
  }

  addEmployeeToUI(employees){
    this.employeesList.innerHTML+=`<tr> 
    <td>${employees.name}</td>
    <td>${employees.department}</td>
    <td>${employees.salary}</td>
    <td>${employees.id}</td>
    <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
    <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
    </tr>`
  };

  deleteFromUI(element){
    element.remove();
  }

  toggleEmployeeButton(target){
    if(this.updateButton.style.display==="none"){
      this.updateButton.style.display="block";
      this.addInfoToInput(target)
    }else{
      this.updateButton.style.display="none";
      this.clearInput();
    }
  }
  addInfoToInput(target){
    const children=target.children;
    this.nameInput.value=children[0].textContent;
    this.departmentInput.value=children[1].textContent;
    this.salaryInput.value=children[2].textContent;
  }

  updateEmployeeOnUI(employees,parent){
    parent.innerHTML=`<tr>                                           
    <td>${employees.name}</td>
    <td>${employees.department}</td>
    <td>${employees.salary}</td>
    <td>${employees.id}</td>
    <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
    <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
    </tr>`
  }
}