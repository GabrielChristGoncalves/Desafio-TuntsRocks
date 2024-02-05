const sendData = require("./config/sendData");
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
  manipulateStudentsInformation(objetos, minNumberOfClasses);
}

function manipulateStudentsInformation(studentsData, minNumberOfClasses) {
  const studentsApprovingStatus = [];
  for (let i = 0; i < studentsData.length; i++) {
    const element = studentsData[i];
    let gradeAverage = (element.p1 + element.p2 + element.p3) / 3;
    if (minNumberOfClasses < element.faltas) {
      element.situation = "Reprovado por falta";
      element.average = gradeAverage.toFixed(2);
    } else {
      if (gradeAverage >= 70) {
        element.situation = "Aprovado";
        element.average = Math.ceil(gradeAverage);
        element.finalAverage = 0;
      } else if (gradeAverage >= 50 && gradeAverage < 70) {
        element.situation = "Exame final";
        element.average = Math.ceil(gradeAverage);
        element.finalAverage = Math.ceil(
          (gradeAverage + (gradeAverage - 70)) / 2,
        );
      } else {
        element.situation = "Reprovado por nota";
        element.average = Math.ceil(gradeAverage);
      }
    }
    studentsApprovingStatus.push(element);
  }
  createResource(studentsApprovingStatus);
}

function createResource(students) {
  const resource = {
    values: students.map((student) => [
      student.id,
      student.name,
      student.absences,
      student.p1,
      student.p2,
      student.p3,
      student.situation,
      student.finalAverage,
    ]),
  };
  sendData(resource);
}

convertStudentsArrayIntoObject();
