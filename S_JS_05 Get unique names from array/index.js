let students = [
  ["Nathalie Nader Nabil", "Task 01", "Option 1"],
  ["Youssef Mohamed Ahmed Mohamed Youssef", "Task 01", "Option 1"],
  ["Salma Nasreldin", "Task 01", "Option 1"],
  ["Engy Mostafa", "Task 01", "Option 1"],
  ["Engy Mostafa", "Task 01", "Option 1"],
  ["Engy ahmed mostafa ", "Task 01", "Option 1"],
  ["Abdelhay Nader Abdelhay Abozayed", "Task 01", "Option 1"],
  ["Abdelrahman Shemies", "Task 01", "Option 1"],
  ["Alaa Ahmed", "Task 01", "Option 2"],
  ["Youssef Fathy Mahmoud", "Task 01", "Option 1"],
  ["Mark Bassem", "Task 01", "Option 1"],
  ["Anas Ahmed", "Task 01", "Option 1"],
  ["Adham Hesham", "Task 01", "Option 1"],
  ["Mohamed Ahmed Fahmi", "Task 01", "Option 1"],
  ["rola wafi", "Task 01", "Option 1"],
  ["Moataz Youssef", "Task 01", "Option 2"],
  ["Ahmad Salama", "Task 01", "Option 1"],
  ["Mohamed Ahmed Fahmi", "Task 01", "Option 1"],
  ["Ahmad Salama Abdelaziz", "Task 01", "Option 2"],
  ["Kareem Ramzi El-Tahlawi", "Task 01", "Option 1"],
  ["Alaa Ahmed", "Task 01", "Option 2"],
  ["rola wafi", "Task 01", "Option 2"],
  ["Mohamed Fahmi", "Task 01", "Option 1"],
  ["Mohamed Fahmi", "Task 01", "Option 2"],
  ["Alaa Ahmed", "Task 01", "Option 2"],
  ["Abdelrahman Shemies", "Task 01", "Option 1"],
  ["Nathalie Nader Nabil", "Task 01", "Option 1"],
  ["Mariam Ahmed", "Task 01", "Option 1"],
];

//console.log(students);

const extractNames = (students) => {
  let studentsSet = new Set();
  for (let i = 0; i < students.length; ++i) {
    let value = students[i][0];
    if (value) {
      studentsSet.add(students[i][0]);
    }
  }

  let studentsMap = new Map();
  for (let i = 0; i < students.length; ++i) {
    if (studentsMap.has(students[i][0])) {
      studentsMap.set(students[i][0], studentsMap.get(students[i][0]) + 1);
    } else {
      studentsMap.set(students[i][0], 1);
    }
  }

  console.log(studentsSet);
  console.log(studentsMap);
};

extractNames(students);
