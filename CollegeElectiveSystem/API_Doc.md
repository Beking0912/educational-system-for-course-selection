## 1. 基本

### 1.0 获取系别
url：/getDepartment GET

返回：
```js
{
    code: 1,
    data: [
        {
            departmentID: '1',
            departmentName: '系别名'
        },
        ... ...
    ]
}
```

### 1.1 用户登录
url: /login

类型：post

发送：
```js
// 学生用户登录
{
    studentID: "111",
    studentPwd: "123",
}
// 教师用户登录
{
    teacherID: "111",
    teacherPwd: "123",
}
// 管理员用户登录
{
    adminID: "111",
    adminPwd: "123",
}
```

返回：
```js
// 登录成功
{
    code: 1,
    data: {
        token: "asdas.asdadwe23.sdasdas"
    }
}

// 登录失败
{
    code: 0,
    msg: "密码错误或帐号不存在"
}
```


### 1.2 用户注册
url: /register

类型：post

发送：
```js
{
    studentID: "123",
    studentPwd: "123",
    name: "张三",
    departmentName: '计算机' 
    studentSemester: '大三下学期'
}
```

返回：
```js
// 注册成功
{
    code: "1"
}

// 注册失败
{
    code: "0",
    msg: "注册失败，账号已存在"
}
```

### 1.3 获取学生信息
url：/studentInfo 

类型：get

返回：
```js
// 如果有token，则返回
{
    code: 1,
    data:{
        studentID: "1",
        name: "张三",
        departmentName: '计算机',
+       studentSemester: '大三下学期'
    }
}

// 如果没有token，则返回
{
    coed: 2
}
```

### 1.4 获取教师信息
url：/teacherInfo 

类型：get

返回：
```js
// 如果有token，则返回
{
    code: 1,
    data:{
        teacherID: "1",
        teacherName: "张三",
        departmentName: '计算机',
+       teacherAge: '40' ,
        teacherDes: ' '
    }
}

// 如果没有token，则返回
{
    coed: 2
}
```
## 2. 管理员界面相关

### 2.2 获取学生信息
url：/getStudent GET

发送：
```
/getStudentData?page=1
```


返回：
```js
{
    code: 1,
    data: {
        total: 1000,
        studentData: [
            {
                studentID: "1",
                name: "张三",
                departmentName: '计算机',
        +       studentSemester: '大三下学期'
            }
            ... ... // 返回十条数据
        ]
    }
}
```

### 2.2 获取教师信息
url：/getTeacherData GET

发送：
```
/getTeacherData?page=1
```

返回：
```js
{
    code: 1,
    data: {
        total: 1000,
        teacherData: [
            {
                teacherID: "1",
                teacherName: "张三",
                departmentName: '计算机',
        +       teacherAge: '40' ,
                teacherDes: ' '
            }
            ... ... // 返回十条数据
        ]
    }
}
```

### 2.3 删除用户
url：/deleteStudent GET

发送：
```
/deleteStudent?teacherID=1
```
url：/deleteTeacher GET

发送：
```
/deleteTeacher?teacherID=1
```

### 2.4 添加教师
url：/addTeacher POST

发送：
```js
{
    teacherID: "",
    teacherName: "",
    departmentName: '',
    teacherAge: '' ,
    teacherDes: '',
    teacherPwd: ""
}
```
### 2.5 添加学生
url：/addStudent POST

发送：
```js
{
    studentID: "",
    name: "",
    departmentName: '',
    studentSemester: '',
    studentPwd: ""
}
```

## 3. 教师界面
### 3.1 获取教师排课信息（这些课对应的课程状态为未结课）
url：/getTeacherClass

发送：
```
/getTeacherClass?teacherID=1
```

返回：
```js
{
    code: 1,
    data: [
        {
            courseID: '2',
            teacherID: '1',
            day: '1',
            time: '2',
            classroom: '226',
            courseName: '软件工程',
            teacherName: '小'
        }
        ... ...
    ]
}
```

### 3.2 添加课程
url：/addCourse POST

发送：
```js
{
    courseName: "课程名",
    departmentID: "1",
    credit: "5",
    semester: "1",
    departmentName: "1",
    teacherID: "1",
    capacity:'',
    courseDes:'',
    classroom:''
}
```

### 3.3 获取某个老师发布的未结课的课程
url：/getTeacherCourse GET

发送：
```
/getTeacherCourse?teacherID=1
```

返回:
```js
{
    code: 1,
    data: [
        {
            teacherID:"",
            courseName: "课程名",
            credit: "5",
            semester: "1",
            departmentName: "1"
        }
        ... ...
    ]
}
```

### 3.4 添加课节
url：/addClass

发送：
```js
{
    courseID: "1",
    day: "",
    time: ""
}
```

### 3.5 获取某个老师发布的已结课的课程
url：/getTeacherCourseFinished GET

发送：
```
/getTeacherCourseFinished?teacherID=1
```

返回:
```js
{
    code: 1,
    data: [
        {
            teacherID:"",
            courseName: "课程名",
            credit: "5",
            semester: "1",
            departmentName: "1"
        }
        ... ...
    ]
}
```


### 3.6 获取某课程信息
url：/getCourseInfo GET

发送：
```
/getCourseInfo?courseID=1
```

返回：
```js
{
    code: 1,
    data: {
        courseName: "课程名",
        departmentID: "1",
        credit: "5",
        semester: "1",
        departmentName: "1",
        teacherID: "1",
        capacity:'',
        courseDes:'',
        classroom:'',
        status:"",
    }
}
```

### 3.7 获取选修该课程的学生的信息
url：/getCourseStudentInfo GET

发送：
```
/getCourseStudentInfo?courseID=1
```

返回：
```js
{
    code: 1,
    data: [
        {
            studentID: "1", // 学生id
            studentName: "李pc",
            grade: "98"
        },
        ... ...
    ]
}
```

### 3.8 设置学生成绩
url：/setGrade POST

发送：
```js
{
    courseID: "1", 
    studentID: "2", 
    grade: "99" 
}
```

### 3.9 课程结课
url：/finishedCourse GET

发送：
```
/finishedCourse?courseID=1
```
## 4. 学生系统

### 4.1 获取某个学生的课节（这些课对应的课程状态为未结课）
url：/getStudentClass GET

发送：
```
/getStudentClass?studentID=1
```

返回:
```js
{
    code: 1,
    data: [
        {
            timeID: '1', // 课节(class)表ID
            courseID: '2',
            classroom: '2',
            teacherID: '1',
            day: '1',
            time: '2',
            courseName: '软件工程',
            teacherName: '小红红'
        }
        ... ...
    ]
}
```

### 4.2 获取某学生可选的课程列表

批注：这些课程的搜索依据为学生的系别和学期，且课程状态为未结课

url: /getChooseCourseList GET

发送：
```
/getChooseCourseList?departmentName=计算机&semester=2
```

返回:
```js
{
    code: 1,
    data: [
        {
            courseID: '11',
            courseName: "课程名",
            credit: "2",
            departmentName: "院系名",
            semester: "1",
            teacherName: "授课教师",
            capacity:'',
            margin:'',
            courseDes:'',
            classroom:''
        },
        ... ...
    ]
}
```

### 4.3 获取某一课程的上课时间
url：/getClassByCourse GET

发送：
```
/getClassByCourse?courseID=1
```

返回：
```js
{
    code: 1,
    data: [
        {
            timeID: '1', // 课节(class)表ID
            courseID: '2',
            teacherId: '1',
            day: '1',
            time: '2',
            classroom: '226',
            courseName: '软件工程',
            teacherName: '小'
        }
        ... ...
    ]
}
```

### 4.4 学生选择课程
url: /chooseCourse POST

发送：
```js
{
    studentID: "1", //学生id
    courseID: "2" //课程id
}
```

### 4.5 获取学生某一学期的成绩

url：/getStudentGrade GET

发送：
```
/getStudentGrade?studentID=1&semester=1
```

返回：
```js
{
    code: 1,
    data: [
        {
            courseID: '2', 
            courseName: '课程名',
            grade: '100',
            credit: '2'
        }
        ... ...
    ]
}
```
