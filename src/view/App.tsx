import { useEffect, useRef, useState } from 'react'
import '../style/app.css'
import { asyncGet } from '../utils/fetch'
import { api } from '../enum/api'
import { Student } from '../interface/Student'
import { resp } from '../interface/resp'


const App = () => {

  /**
   * studentsList => 學生證列的狀態
   * setStudentsList => 用來設置學生證列的狀態 , 是一個function
   */
  const [studentsList, setStudentsList] = useState<Array<Student>>();


  /**
 * 處理新增按鈕
 */
  const submitHandler = () => {
    const randomAbsences = Math.floor(Math.random() * 10); // 隨機生成 0 到 9 的數值
    const newStudent = {
      userName: (document.getElementById("newAccount") as HTMLInputElement).value,
      sid: parseInt((document.getElementById("newSeatNo") as HTMLInputElement).value),
      name: (document.getElementById("newName") as HTMLInputElement).value,
      department: (document.getElementById("newDepartment") as HTMLInputElement).value,
      grade: ((document.getElementById("newGrade") as HTMLInputElement).value),
      class: (document.getElementById("newClass") as HTMLInputElement).value,
      email: (document.getElementById("newEmail") as HTMLInputElement).value,
      absences: randomAbsences, // 使用隨機數值
    };

    console.log("新增學生資料：", newStudent);
    // 後續可呼叫 API 發送 newStudent 資料到後端
  };



  /**
 * 渲染列表
 */
  const students = studentsList?.map((student) => {
    const randomAbsences = Math.floor(Math.random() * 10); // 隨機生成 0 到 9 的數值

    return (
      <div className="student" key={student._id}>
        <p>
          <strong>帳號：</strong> {student.userName}
        </p>
        <p>
          <strong>座號：</strong> {student.sid}
        </p>
        <p>
          <strong>姓名：</strong> {student.name}
        </p>
        <p>
          <strong>院系：</strong> {student.department}
        </p>
        <p>
          <strong>年級：</strong> {student.grade}
        </p>
        <p>
          <strong>班級：</strong> {student.class}
        </p>
        <p>
          <strong>Email：</strong> {student.email}
        </p>
        <p>
          <strong>缺席次數：</strong> {student.absences ?? randomAbsences}
        </p>
      </div>
    );
  });




  // 網頁剛進的時候，取得學生資料
  useEffect(() => {
    asyncGet(api.findAll).then((res: resp<Array<Student>>) => {
      if (res && res.code === 200) {
        setStudentsList(res.body);
      }
    });
  }, []);


  /**
   * dom: 從index.html裡面拖出來
   */
  return (
    <div className="home">
      <h1>歡迎使用 StudentHub！</h1>
      {students}
      <div>
        <h3>新增學生資料</h3>
        <input type="text" id="newAccount" placeholder="帳號" />
        <input type="number" id="newSeatNo" placeholder="座號" />
        <input type="text" id="newName" placeholder="姓名" />
        <input type="text" id="newDepartment" placeholder="院系" />
        <input type="text" id="newGrade" placeholder="年級" />
        <input type="text" id="newClass" placeholder="班級" />
        <input type="email" id="newEmail" placeholder="Email" />
        <input type="number" id="newAbsences" placeholder="缺席次數" />
        <button onClick={submitHandler}>新增</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>帳號</th>
            <th>座號</th>
            <th>姓名</th>
            <th>院系</th>
            <th>年級</th>
            <th>班級</th>
            <th>Email</th>
            <th>缺席次數</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody id="studentsList">
        </tbody>
      </table>
    </div>
  )
}

export default App
