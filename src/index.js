const getData = require("./config/getData");

async function fetchData() {
  try {
    const data = await getData();
    return data;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }
}

async function convertStudentsArrayIntoObject() {
  const studentsData = await fetchData();
  const students = studentsData.slice(3);
  const objetos = students.map(([matricula, nome, faltas, p1, p2, p3]) => {
    return { matricula, nome, faltas, p1, p2, p3 };
  });
  manipulateStudentsInformation(objetos);
}

function manipulateStudentsInformation(studentsData) {
  const studentsApprovingStatus = [];
  for (let i = 0; i < studentsData.length; i++) {
    const element = studentsData[i];
    let gradeAverage =
      (Number(element.p1) + Number(element.p2) + Number(element.p3)) / 3;
    if (gradeAverage >= 70) {
      element.approved = true;
      element.finalAverage = Number(gradeAverage.toFixed(2));
      studentsApprovingStatus.push(element);
    } else {
      element.approved = false;
      element.finalAverage = Number(gradeAverage.toFixed(2));
      studentsApprovingStatus.push(element);
    }
  }
  console.log(studentsApprovingStatus);
}

convertStudentsArrayIntoObject();
