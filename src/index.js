const getData = require("./config/getData");

async function convertStudentsArrayIntoObject() {
  const studentsData = await getData();
  const students = studentsData.slice(3);
  const objetos = students.map(([id, name, absences, p1, p2, p3]) => {
    return {
      id,
      name,
      absences: Number(absences),
      p1: Number(p1),
      p2: Number(p2),
      p3: Number(p3),
    };
  });
  const totalNumberOfClasses = Number(
    studentsData[1].toString().split(":")[1].trim(),
  );
  const minNumberOfClasses = totalNumberOfClasses / 4;
  console.log(totalNumberOfClasses);
  manipulateStudentsInformation(objetos, minNumberOfClasses);
}

function manipulateStudentsInformation(studentsData, minNumberOfClasses) {
  const studentsApprovingStatus = [];
  for (let i = 0; i < studentsData.length; i++) {
    const element = studentsData[i];
    let gradeAverage = (element.p1 + element.p2 + element.p3) / 3;
    if (minNumberOfClasses < element.faltas) {
      element.situation = "Reprovado por falta";
      element.finalAverage = gradeAverage.toFixed(2);
      studentsApprovingStatus.push(element);
    } else {
      if (gradeAverage >= 70) {
        element.situation = "Aprovado";
        element.finalAverage = Math.ceil(gradeAverage);
        studentsApprovingStatus.push(element);
      } else {
        element.situation = "Reprovado por nota";
        element.finalAverage = Math.ceil(gradeAverage);
        studentsApprovingStatus.push(element);
      }
    }
  }
  console.log(studentsApprovingStatus);
}

convertStudentsArrayIntoObject();
